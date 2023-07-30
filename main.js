process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
process.on('uncaughtException', console.error)

import chalk from 'chalk';
import { spawn } from 'child_process';
import { JSONFile, Low } from 'lowdb';
import './config.js';
import lodash from 'lodash';
import clearTmp from './lib/clearTmp.js';
import Connection from './lib/connection.js';
import Helper from './lib/helper.js';
import { loadPluginFiles, pluginFilter, pluginFolder, plugins } from './lib/plugins.js';
import { protoType, serialize } from './lib/simple.js';
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000; protoType(); serialize(); Object.assign(global, { ...Helper, timestamp: { start: Date.now() } })

/// conn 
const conn = Object.defineProperty(Connection, 'conn', { value: await Connection.conn, enumerable: true, configurable: true, writable: true }).conn
loadPluginFiles(pluginFolder, pluginFilter, { logger: conn.logger, recursiveRead: !1 }).then(e => console.log(chalk.rgb(255, 131, 0).underline("\n『 Se encontraron 』" + Object.keys(plugins).length + " plugins\n"))).catch(console.error);
global.plugins = {}

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

///Database
global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))
global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() { if (global.db.READ) return new Promise((resolve) => setInterval(async function () { if (!global.db.READ) { clearInterval(this); resolve(global.db.data == null ? global.loadDatabase() : global.db.data)}}, 1 * 1000)); if (global.db.data !== null) return global.db.READ = true; await global.db.read().catch(console.error); global.db.READ = null; global.db.data = { users: {}, chats: {}, stats: {}, msgs: {}, sticker: {}, settings: {}, ...(global.db.data || {})}; global.db.chain = chain(global.db.data)}
loadDatabase()

///Limpieza de archivos temporales
if (!opts['test']) { setInterval(async () => { await Promise.allSettled([global.db.data ? global.db.write() : Promise.reject('db.data es nulo'), (opts['autocleartmp'] || opts['cleartmp']) ? clearTmp() : Promise.resolve()]) }, 60 * 1000) } setInterval(async () => { await clearTmp() }, 180000)
if (opts['server']) (await import('./server.js')).default(conn, PORT)


async function _quickTest() { let test = await Promise.all([spawn('ffmpeg'), spawn('ffprobe'), spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']), spawn('convert'), spawn('magick'), spawn('gm'), spawn('find', ['--version'])].map(p => { return Promise.race([new Promise(resolve => { p.on('close', code => { resolve(code !== 127) }) }), new Promise(resolve => { p.on('error', _ => resolve(false)) })]) })); let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test; let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }; Object.freeze(global.support); if (!s.ffmpeg) (conn?.logger || console).warn('\n\n『 IMPORTANTE 』 : Por favor instalé el paquete ffmpeg para el envío de archivos multimedia\n[▢] (pkg install ffmpeg)\n\n'); if (s.ffmpeg && !s.ffmpegWebp) (conn?.logger || console).warn('\n\n『 IMPORTANTE 』: Es posible que los stickers no estén animadas sin libwebp en ffmpeg\n[▢] (pkg install libwebp) ó (--enable-ibwebp while compiling ffmpeg)\n\n'); if (!s.convert && !s.magick && !s.gm) (conn?.logger || console).warn('\n\n『 IMPORTANTE 』: Es posible que los stickers no funcionen sin imagemagick si libwebp y ffmpeg no esten instalados\n[▢] (pkg install imagemagick)\n\n')}; _quickTest().then(() => (conn?.logger?.info || console.log)('\n\n『 Prueba rápida realizada 』 ✓\n')).catch(console.error)
