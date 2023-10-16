import Connection from '../lib/connection.js'
import * as fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let tmap = Object.entries(Connection.store.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let quoted = m.quoted ? m.quoted : m
  let mime = (quoted.msg || quoted).mimetype || ''
  let isMedia = /image|video|sticker|audio/.test(mime)
  let mythumb = fs.readFileSync('./multimedia/imagenes/mythumb.jpg')
  let link = ['https://youtube.com']
  let textbc = `${text ? text : `✍️`}`
  let NombreBot = 'Varyon-Bot'
if ((isMedia && quoted.mtype === 'imageMessage') && textbc) { m.reply(`Transmitiendo mensaje en ${tmap.length} chats activos, en aproximadamente ${tmap.length * 1.5} segundos`); var mediax = await quoted.download?.(); for (let cid of tmap) { await delay(5000); conn.sendMessage(cid, { image: mediax, caption: textbc }, {quoted: {key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "573245088667-1613049930@g.us" } : {})}, message: {"videoMessage": { "title":`${NombreBot} 📡`, "h": `UwU`,'seconds': '359996400', 'gifPlayback': 'true', 'caption': `${NombreBot} 📡`, 'jpegThumbnail': mythumb}}} })} m.reply(`Finalizando la transmision del mensaje :D`) } else if ((isMedia && quoted.mtype === 'videoMessage') && textbc) { m.reply(`Transmitiendo mensaje en ${tmap.length} chats activos, en aproximadamente ${tmap.length * 1.5} segundos`); var mediax = await quoted.download?.(); for (let cid of tmap) { await delay(5000); conn.sendMessage(cid, { video: mediax, mimetype: 'video/mp4', caption: textbc }, {quoted: {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: "573245088667-1613049930@g.us" } : {}) },message: { "videoMessage": { "title":`${NombreBot} 📡`, "h": `UwU`,'seconds': '359996400', 'caption': `${NombreBot} 📡`, 'jpegThumbnail': mythumb}}}})} m.reply(`Finalizando la transmision del mensaje :D`)} else if ((isMedia && quoted.mtype === 'audioMessage') && textbc) { m.reply(`Transmitiendo mensaje en ${tmap.length} chats activos, en aproximadamente ${tmap.length * 1.5} segundos`); var mediax = await quoted.download?.(); for (let cid of tmap) { await delay(5000); conn.sendMessage(cid, { audio: mediax, contextInfo:{externalAdReply: {title: `${textbc}`, body: `${NombreBot} 📡`, sourceUrl: link, mimetype: 'audio/mp4', fileName: `${NombreBot}.mp3` }}})} m.reply(`Finalizando la transmision del mensaje :D`)} else if ((isMedia && quoted.mtype === 'stickerMessage') && textbc) { m.reply(`Transmitiendo mensaje en ${tmap.length} chats activos, en aproximadamente ${tmap.length * 1.5} segundos`); var mediax = await quoted.download?.(); for (let cid of tmap) { await delay(5000); conn.sendMessage(cid, {sticker: mediax,contextInfo:{externalAdReply: {title: `${textbc}`, body: `${NombreBot} 📡`, sourceUrl: link, thumbnail: mythumb}} })} m.reply(`Finalizando la transmision del mensaje :D`)} else { for (let cid of tmap){ conn.sendMessage(cid, { text: `${text ? text : '\n[ TRANSMISIÓN ]\n'}`, contextInfo:{ forwardingScore: 200, isForwarded: true} } )} m.reply(`Finalizando la transmision del mensaje :D`)}}

handler.help = ['bc', 'broadcast'].map(v => v + ' <texto>')
handler.tags = ['owner']
handler.command = /^(bc|broadcast)$/i

handler.owner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))

