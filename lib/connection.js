import * as ws from 'ws'
import path from 'path'
import pino from 'pino'
import storeSystem from './store.js'
import Helper from './helper.js'
import { HelperConnection } from './simple.js'
import single2multi from './single2multi.js'
import chalk from 'chalk'
import importFile from './import.js'
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = (await import("@adiwajshing/baileys")).default
const fixFileName = (file) => file?.replace(/\//g, '__')?.replace(/:/g, '-')
const authFolder = fixFileName(`${Helper.opts._[0] || ''}VarySesion`)
const authFile = `${Helper.opts._[0] || 'VarySesion'}.dt.json`
const [isCredsExist, isAuthSingleFileExist] = await Promise.all([Helper.checkFileExists(authFolder + '/creds.json'), Helper.checkFileExists(authFile)])
let authState = await storeSystem.useMultiFileAuthState(authFolder)
const store = storeSystem.makeInMemoryStore()

if (Helper.opts['singleauth'] || Helper.opts['singleauthstate']) { if (!isCredsExist && isAuthSingleFileExist) { console.debug('- singleauth -', 'creds.json no encontrado', 'compilando singleauth a multiauth...'); await single2multi(authFile, authFolder, authState); console.debug('- singleauth -', 'compilado con éxito'); authState = await storeSystem.useMultiFileAuthState(authFolder) } else if (!isAuthSingleFileExist) console.error('- singleauth -', 'archivo singleauth no encontrado') }

global.authFile = 'VarySesion'
const { state, saveCreds } = await useMultiFileAuthState(global.authFile)
let { version } = await fetchLatestBaileysVersion()
const connectionOptions = { logger: pino({ level: 'silent' }), printQRInTerminal: true, auth: state, version }

let conns = new Map()
async function start(oldSocket = null, opts = { store }) {
    let conn = makeWASocket(connectionOptions); HelperConnection(conn)
    if (oldSocket) { conn.isInit = oldSocket.isInit; conn.isReloadInit = oldSocket.isReloadInit }
    if (conn.isInit == null) { conn.isInit = false; conn.isReloadInit = true }
    store.bind(conn.ev, { groupMetadata: conn.groupMetadata })
    await reload(conn, false, opts).then((success) => console.log(chalk.bgWhite('Evento controlador de enlace : ', success + '\n'))); return conn
}

let OldHandler = null
async function reload(conn, restartConnection, opts = {}) {
    if (!opts.handler) opts.handler = importFile(Helper.__filename(path.resolve('./handler.js'))).catch(console.error)
    if (opts.handler instanceof Promise) opts.handler = await opts.handler
    if (!opts.handler && OldHandler) opts.handler = OldHandler
    OldHandler = opts.handler
    const isReloadInit = !!conn.isReloadInit
    if (restartConnection) { try { conn.ws.close() } catch { }; conn.ev.removeAllListeners(); Object.assign(conn, await start(conn) || {}) }
    Object.assign(conn, getMessageConfig())

    if (!isReloadInit) {
        if (conn.handler) conn.ev.off('messages.upsert', conn.handler)
        if (conn.participantsUpdate) conn.ev.off('group-participants.update', conn.participantsUpdate)
        if (conn.groupsUpdate) conn.ev.off('groups.update', conn.groupsUpdate)
        if (conn.onDelete) conn.ev.off('messages.delete', conn.onDelete)
        if (conn.connectionUpdate) conn.ev.off('connection.update', conn.connectionUpdate)
        if (conn.credsUpdate) conn.ev.off('creds.update', conn.credsUpdate)
    }
    if (opts.handler) {
        conn.handler = (opts.handler).handler.bind(conn)
        conn.participantsUpdate = (opts.handler).participantsUpdate.bind(conn)
        conn.groupsUpdate = (opts.handler).groupsUpdate.bind(conn)
        conn.onDelete = (opts.handler).deleteUpdate.bind(conn)
    }

    if (!opts.isChild) conn.connectionUpdate = connectionUpdate.bind(conn)
    conn.credsUpdate = saveCreds.bind(conn)
    conn.ev.on('messages.upsert', conn.handler)
    conn.ev.on('group-participants.update', conn.participantsUpdate)
    conn.ev.on('groups.update', conn.groupsUpdate)
    conn.ev.on('messages.delete', conn.onDelete)
    if (!opts.isChild) conn.ev.on('connection.update', conn.connectionUpdate)
    conn.ev.on('creds.update', conn.credsUpdate)
    conn.isReloadInit = false
    return true
}
async function connectionUpdate(update) {
    console.log(update)
    const { connection, lastDisconnect, isNewLogin } = update
    if (isNewLogin) this.isInit = true
    const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
    if (code && code !== DisconnectReason.loggedOut && this?.ws.readyState !== ws.CONNECTING) { console.log(await reload(this, true).catch(console.error)); global.timestamp.connect = new Date }

    if (update.qr != 0 && update.qr != undefined) { console.log(chalk.yellow('Escanea este codigo QR, el codigo QR expira en 60 segundos.')) }
    if (connection == 'open') console.log(chalk.green('\n ✓ CONECTADO :D\n'))
    if (connection == 'close') { console.log(chalk.yellow('Conexion cerrada, por favor borre la carpeta ' + global.authFile + ' y reescanee el codigo QR')) }

    if (global.db.data == null) global.loadDatabase()
}
function getMessageConfig() {
    const welcome = '👋 *Bienvenid@* @user\n*▢ Normas del grupo*\n' + String.fromCharCode(8206).repeat(850) + '\n@desc'
    const bye = '[ ! ] C fue alv : @user'
    const spromote = '@user Ahora es admin!'
    const sdemote = '@user Ya no es admin'
    const sDesc = 'La descripción fue actualizada \n@desc'
    const sSubject = 'El nombre del grupo fue cambiado \n@subject'
    const sIcon = 'Imagen del grupo actualizada correctamente!'
    const sRevoke = 'El link del grupo fue actualizado \n@revoke'
    return { welcome, bye, spromote, sdemote, sDesc, sSubject, sIcon, sRevoke }
}
const conn = start(null, { store }).catch(console.error)
export default { start, getMessageConfig, reload, conn, conns, connectionOptions, authFolder, authState, store }

