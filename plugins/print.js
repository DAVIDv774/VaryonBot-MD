import PhoneNumber from 'awesome-phonenumber'
import chalk from 'chalk'
import { watchFile } from 'fs'
import Helper from './helper.js'
import moment from 'moment-timezone'
const terminalImage = Helper.opts['img'] ? (await import('terminal-image')).default : ''
const urlRegex = (await import('url-regex-safe')).default({ strict: false })
export default async function (m, conn = { user: {} }) {
   let _name = await conn.getName(m.sender)
   let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '')
   let chat = await conn.getName(m.chat)
   let img
   try { if (Helper.opts['img']) img = /sticker|image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false } catch (e) { console.error(e) }
   let filesize = (m.msg ? m.msg.vcard ? m.msg.vcard.length : m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength : m.msg.axolotlSenderKeyDistributionMessage ? m.msg.axolotlSenderKeyDistributionMessage.length : m.text ? m.text.length : 0 : m.text ? m.text.length : 0) || 0
   let user = global.db.data.users[m.sender]
   let me = PhoneNumber('+' + ((conn.user?.jid || conn.user?.id)?.replace('@s.whatsapp.net', '') || '')).getNumber('international')
   console.log('\x1b[1;31m~\x1b[1;37m>', chalk.white('['), chalk.blue(m.isCommand ? 'EJECUTANDO' : 'MENSAJE'), chalk.white(']'), chalk.green('{'), chalk.rgb(255, 131, 0).underline(m.text || m.isCommand || m.mtype), chalk.yellow(filesize + ['B', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || ''), chalk.green('}'), chalk.blue(m.isCommand ? 'Por' : 'De'), chalk.cyan(_name), 'Chat', m.isGroup ? chalk.bgGreen('grupo:' + chat) : chalk.bgRed('Privado:' + sender), 'Fecha', chalk.magenta(moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')).trim())
   if (img) console.log(img.trimEnd())
   if (typeof m.text === 'string' && m.text) {
      let log = m.text.replace(/\u200e+/g, '')
      let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
      let mdFormat = (depth = 4) => (_, type, text, monospace) => { let types = { _: 'italic', '*': 'bold', '~': 'strikethrough' }; text = text || monospace; let formatted = !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1))); return formatted }
      if (log.length < 4096) log = log.replace(urlRegex, (url, i, text) => { let end = url.length + i; return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url })
      log = log.replace(mdRegex, mdFormat(4))
      if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)))
   }
   if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => { jid = conn.decodeJid(jid); let name = conn.getName(jid); return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''))}).join(', '))
   if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.fileName || m.msg.displayName || 'Document'}`)
   else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
   else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
   else if (/audio/i.test(m.mtype)) { const duration = m.msg.seconds; console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(duration / 60).toString().padStart(2, 0)}:${(duration % 60).toString().padStart(2, 0)}`)} console.log()}

let file = Helper.__filename(import.meta.url)
watchFile(file, () => { console.log(chalk.cyan("\n[" + file + "] Fue actualizado con exito!\n"))})
