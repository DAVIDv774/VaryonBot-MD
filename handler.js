import { smsg } from './lib/simple.js'
import { plugins } from './lib/plugins.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import Connection from './lib/connection.js'
import printMessage from './lib/print.js'
import Helper from './lib/helper.js'
import Queque from './lib/queque.js'
import moment from 'moment-timezone'
const { getContentType } = (await import('@adiwajshing/baileys')).default
const isNumber = x => typeof x === 'number' && !isNaN(x)
export async function handler(chatUpdate) { this.msgqueque = this.msgqueque || new Queque()
    if (!chatUpdate) return
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    if (!m) return
    if (global.db.data == null) await global.loadDatabase()
    try { m = smsg(this, m) || m
        if (!m) return
        m.exp = 0
        m.coin = false
        try { let user = global.db.data.users[m.sender]
            if (typeof user !== 'object') global.db.data.users[m.sender] = {}
            if (user) {
            if (!isNumber(user.exp)) user.exp = 0
            if (!isNumber(user.coin)) user.coin = 10
            if (!isNumber(user.lastclaim)) user.lastclaim = 0
            if (!('registered' in user)) user.registered = false
            //-- user registered
            if (!user.registered) { if (!('name' in user)) user.name = m.name
               if (!isNumber(user.age))  user.age = -1
               if (!isNumber(user.regTime))  user.regTime = -1 }
            //--user number
            if (!isNumber(user.afk)) user.afk = -1
            if (!('afkReason' in user)) user.afkReason = ''
            if (!('banned' in user)) user.banned = false
            if (!isNumber(user.warn)) user.warn = 0
            if (!isNumber(user.level)) user.level = 0
            if (!('role' in user)) user.role = 'Novato'
            if (!('autolevelup' in user)) user.autolevelup = false
            if (!('chatbot' in user)) user.chatbot = false } else
            global.db.data.users[m.sender] = {
            exp: 0,
            coin: 10,
            lastclaim: 0,
            registered: false,
            name: m.name,
            age: -1,
            regTime: -1,
            afk: -1,
            afkReason: '',
            banned: false,
            warn: 0,
            level: 0,
            role: 'Novato',
            autolevelup: false,
            chatbot: false,
                }
            let chat = global.db.data.chats[m.chat]
            if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
            if (chat) {
                if (!('isBanned' in chat)) chat.isBanned = false
                if (!('welcome' in chat)) chat.welcome = false
                if (!('detect' in chat)) chat.detect = true
                if (!('sWelcome' in chat)) chat.sWelcome = ''
                if (!('sBye' in chat)) chat.sBye = ''
                if (!('sPromote' in chat)) chat.sPromote = ''
                if (!('sDemote' in chat)) chat.sDemote = ''
                if (!('delete' in chat)) chat.delete = true
                if (!('antiLink' in chat)) chat.antiLink = false
                ////
                if (!('cmdDl' in chat)) chat.cmdDl = true
                if (!('cmdRpg' in chat)) chat.cmdRpg = true
                ////
                if (!('antiTraba' in chat)) chat.antiTraba = false
                if (!('viewonce' in chat)) chat.viewonce = false
                if (!('antiToxic' in chat)) chat.antiToxic = false
                if (!isNumber(chat.expired)) chat.expired = 0 } else
                global.db.data.chats[m.chat] = {
                    isBanned: false,
                    welcome: false,
                    detect: true,
                    sWelcome: '',
                    sBye: '',
                    sPromote: '',
                    sDemote: '',
                    delete: true,
                    antiLink: false,
                    cmdDl: true,
                    cmdRpg: true,
                    viewonce: false,
                    antiTraba: false,
                    antiToxic: true,
                    expired: 0,
                }
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
                if (!('self' in settings)) settings.self = false
                if (!('autoread' in settings)) settings.autoread = false
                if (!('restrict' in settings)) settings.restrict = false
            } else global.db.data.settings[this.user.jid] = { self: false, autoread: false, restrict: false }
        } catch (e) { console.error(e)}
        
        const isROwner = [this.decodeJid(this.user.id), ...global.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isOwner = isROwner || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

        if (!m.fromMe && opts['nyimak']) return
        if (!isOwner && opts['self']) return
        if (opts['gconly'] && !m.chat.endsWith('g.us')) return setTimeout(()=>{teslagod.updateBlockStatus(m.sender,'block')},1000)
        if (typeof m.text !== 'string')
            m.text = ''

        if (opts['queque'] && m.text && !m.fromMe && !(isMods || isPrems)) { const id = m.id
            this.msgqueque.add(id)
            await this.msgqueque.waitQueue(id)
        }

        if (m.isBaileys) return m.exp += Math.ceil(Math.random() * 10)
        let usedPrefix
        let _user = global.db.data?.users?.[m.sender]
        const groupMetadata = (m.isGroup ? await Connection.store.fetchGroupMetadata(m.chat, this.groupMetadata) : {}) || {}
        const participants = (m.isGroup ? groupMetadata.participants : []) || []
        const user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
        const bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
        const isRAdmin = user?.admin == 'superadmin' || false
        const isAdmin = isRAdmin || user?.admin == 'admin' || false // Is User Admin?
        const isBotAdmin = bot?.admin || false // Are you Admin?

        const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (let name in plugins) { let plugin = plugins[name]
            if (!plugin) continue
            if (plugin.disabled) continue
            const __filename = join(___dirname, name)
            if (typeof plugin.all === 'function') { try { await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename })} catch (e) { console.error(e)
                for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) { let data = (await this.onWhatsApp(jid))[0] || {}; if (data.exists) m.reply(`*Se detecto un error:*\nPlugin: ${name}\nCliente: ${m.sender.split("@")[0]}\nChat: ${m.chat}\nComando: ${m.text}\n\n\`\`\`${format(e)}\`\`\``.trim(), data.jid) }}} if (!opts['restrict'])
                if (plugin.tags && plugin.tags.includes('admin')) { continue }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : global.prefix
            let match = (_prefix instanceof RegExp ?  [[_prefix.exec(m.text), _prefix]] : Array.isArray(_prefix) ? _prefix.map(p => { let re = p instanceof RegExp ? p : new RegExp(str2Regex(p)); return [re.exec(m.text), re] }) : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :  [[[], new RegExp]]).find(p => p[1])
            if (typeof plugin.before === 'function') { if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename })) continue }
            if (typeof plugin !== 'function') continue
            if ((usedPrefix = (match[0] || '')[0])) { let noPrefix = m.text.replace(usedPrefix, '')
                let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                args = args || []
                let _args = noPrefix.trim().split` `.slice(1)
                let text = _args.join` `
                command = (command || '').toLowerCase()
                let fail = plugin.fail || global.dfail // When failed
                let isAccept = plugin.command instanceof RegExp ? plugin.command.test(command) :
                    Array.isArray(plugin.command) ? plugin.command.some(cmd => cmd instanceof RegExp ? cmd.test(command) : cmd === command ) : typeof plugin.command === 'string' ? plugin.command === command : false
                if (!isAccept) continue 
                m.plugin = name
                if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let user = global.db.data.users[m.sender]
                    if (name != 'propietario-desbanear_grupo.js' && chat?.isBanned) return // Except this
                    if (name != 'propietario-desban-user.js' && user?.banned) return
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.rowner && !isROwner) { // Real Owner
                    fail('rowner', m, this)
                    continue
                }
                if (plugin.owner && !isOwner) { // Number Owner
                    fail('owner', m, this)
                    continue
                }
                if (plugin.mods && !isMods) { // Moderator
                    fail('mods', m, this)
                    continue
                }
                if (plugin.premium && !isPrems) { // Premium
                    fail('premium', m, this)
                    continue
                }
                if (plugin.group && !m.isGroup) { // Group Only
                    fail('group', m, this)
                    continue
                } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                    fail('botAdmin', m, this)
                    continue
                } else if (plugin.admin && !isAdmin) { // User Admin
                    fail('admin', m, this)
                    continue
                }
                if (plugin.private && m.isGroup) { // Private Chat Only
                    fail('private', m, this)
                    continue
                }
                if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                    fail('unreg', m, this)
                    continue
                }
                m.isCommand = true
                let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                if (xp > 200)
                    m.reply('-_-') // Hehehe
                else
                    m.exp += xp
                if (!isPrems && plugin.coin && global.db.data.users[m.sender].coin < plugin.coin * 1) {
                    this.reply(m.chat, `¡Te quedaste sin coins para usar algunas funciones¡ T_T, puede comprar mas coins usando este comando:\n\n${usedPrefix}comprar`, m)
                    continue // Limit habis
                }
                if (plugin.level > _user.level) {
                    this.reply(m.chat, `*¡Por favor, necesitas tener el nivel *${plugin.level}¡ para comenzar a usar este comando.* Tu nivel actual : ${_user.level}`, m)
                    continue // If the level has not been reached
                }
                let extra = {
                    match,
                    usedPrefix,
                    noPrefix,
                    _args,
                    args,
                    command,
                    text,
                    conn: this,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    __dirname: ___dirname,
                    __filename
                }
                try {
                    await plugin.call(this, m, extra)
                    if (!isPrems)
                        m.coin = m.coin || plugin.coin || false
                } catch (e) {
                    // Error occured
                    m.error = e
                    console.error(e)
                    if (e) {
                        let text = format(e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        if (e.name)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                                let data = (await this.onWhatsApp(jid))[0] || {}
                                if (data.exists)
                                    m.reply(`*¡Se detecto un error en el bot¡:*\n\n*▢ Plugin:* ${m.plugin}\n*▢ Usuario:* wa.me/${m.sender.split("@")[0]}\n*▢ Chat:* ${m.chat}\n*▢ Comando:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\` \n`.trim(), data.jid)
                            }
                        //m.reply(text)
                    }
                } finally {
                    // m.reply(util.format(_user))
                    if (typeof plugin.after === 'function') {
                        try {
                            await plugin.after.call(this, m, extra)
                        } catch (e) {
                            console.error(e)
                        }
                    }
                    if (m.coin)
                        m.reply(+m.coin + '㉿ Coin/s utilizadas')
                }
                break
            }
        }
    } catch (e) {
        console.error(e)
    } finally {
        if (opts['queque'] && m.text) {
            const id = m.id
            this.msgqueque.unqueue(id)
        }
        let user, stats = global.db.data.stats
        if (m) {
            if (m.sender && (user = global.db.data.users[m.sender])) {
                user.exp += m.exp
                user.coin -= m.coin * 1
            }

            let stat
            if (m.plugin) {
                let now = +new Date
                if (m.plugin in stats) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total))
                        stat.total = 1
                    if (!isNumber(stat.success))
                        stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last))
                        stat.last = now
                    if (!isNumber(stat.lastSuccess))
                        stat.lastSuccess = m.error != null ? 0 : now
                } else
                    stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                stat.total += 1
                stat.last = now
                if (m.error == null) {
                    stat.success += 1
                    stat.lastSuccess = now
                }
            }
        }

        try {
            if (!opts['noprint']) await printMessage(m, this)
        } catch (e) {
            console.log(m, m.quoted, e)
        }
        if (opts['autoread'])
            await this.readMessages([m.key])

    }
}

export async function participantsUpdate({ id, participants, action }) {
    if (opts['self']) return
    if (this.isInit) return
    if (global.db.data == null)
        await global.loadDatabase()
    let chat = global.db.data.chats[id] || {}
    let bot = global.db.data.settings[this.user.jid] || {}
    let text = ''
    switch (action) {
        case 'add':
        case 'remove':
            if (chat.welcome) {
               let groupMetadata = await Connection.store.fetchGroupMetadata(id, this.groupMetadata)
               for (let user of participants) {
                  let pp = './multimedia/avatar_contact.png'
                  let ppg = await this.profilePictureUrl(id, 'image').catch(_ => pp)
                    let fesha = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')
                    let mas = String.fromCharCode(8206).repeat(850)
                    try {
                     pp = await this.profilePictureUrl(user, 'image')
                     } catch (e) {} finally {
                     	let apii = await this.getFile(pp)
                     text = (action === 'add' ? (chat.sWelcome || this.welcome || Connection.conn.welcome || 'Welcome, @user!').replace('@subject', await this.getName(id)).replace('@desc', groupMetadata.desc?.toString() || '*Descripción*'):
                        (chat.sBye || this.bye || Connection.conn.bye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])

                        this.sendFile(id, apii.data, 'Imagen.jpg', text, null, { mentions: this.parseMention(text)})

                     /*this.sendButton(id, apii.data, text, groupMetadata.subject, [[(action == 'add' ? '¡¡PING¡¡': '...adios'), (action == 'add' ? '.ping': '.adiosaudio')], ['⦙☰ MENU', `.menu`]], null, {
                        mentions: this.parseMention(text)})*/
                  }
               }
            }
            break
        case 'promote':
            text = (chat.sPromote || this.spromote || Connection.conn.spromote || '@user ```Ahora es admin```')
        case 'demote':
            if (!text)
                text = (chat.sDemote || this.sdemote || Connection.conn.sdemote || '@user ```Ya no es admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
}
export async function groupsUpdate(groupsUpdate) {
    if (opts['self']) return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || Connection.conn.sDesc || '```La descripción fue actualizada```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || Connection.conn.sSubject || '```El nombre del grupo fue actualizada```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || Connection.conn.sIcon || '```Imagen del grupo actualizada correctamente```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || Connection.conn.sRevoke || '```El link del grupo fue actualizado```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

export async function deleteUpdate(message) {
    if (Array.isArray(message.keys) && message.keys.length > 0) {
        const tasks = await Promise.allSettled(message.keys.map(async (key) => {
            if (key.fromMe) return
            const msg = this.loadMessage(key.remoteJid, key.id) || this.loadMessage(key.id)
            if (!msg || !msg.message) return
            let chat = global.db.data.chats[key.remoteJid]
            if (!chat || chat.delete) return

            const mtype = getContentType(msg.message)
            const dfecha = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')
            if (mtype === 'conversation') {
                msg.message.extendedTextMessage = { text: msg.message[mtype] }
                delete msg.message[mtype]
            }

            const participant = msg.participant || msg.key.participant || msg.key.remoteJid

            await this.reply(key.remoteJid, `『 Borró un mensaje 』

▢ *Nombre :* @${participant.split`@`[0]}

Para desactivar esta función, escriba
*.apagar delete*
`.trim(), msg, { mentions: [participant] })
            return await this.copyNForward(key.remoteJid, msg).catch(e => console.log(e, msg))
        }))
        tasks.map(t => t.status === 'rejected' && console.error(t.reason))
    }
}


global.dfail = (type, m, conn) => {
    let msg = {
        rowner: 'Este comando solo puede ser utilizado por el *dueño*',
        owner: 'Este comando solo puede ser utilizado por el *propietario del bot*',
        mods: '*Este comando solo puede ser utilizado por un *moderador*',
        premium: 'Esta solicitud es solo para usuarios *premium*',
        group: 'Este comando solo se puede usar en *grupos*',
        private: 'Este comando solo se puede usar por *chat privado*',
        admin: 'Este comando solo puede ser usado por los *administradores del grupo*',
        botAdmin: 'El bot necesita *ser administrador* para usar este comando',
        unreg: 'Regístrese para comenzar a usar esta función escribiendo:\n\ndaftar nombre.edad\n\nContoh: daftar Juanito.15*',
        restrict: 'Esta función está desactivada'
    }[type]
    if (msg) return m.reply(msg)
}

let file = Helper.__filename(import.meta.url, true)
watchFile(file, async () => { unwatchFile(file)
    console.log(chalk.redBright(file+" fue actualizado correctamente ✓"))
    if (Connection.reload) console.log(await Connection.reload(await Connection.conn))
})