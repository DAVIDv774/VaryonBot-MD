import Connection from '../lib/connection.js'
import * as fs from 'fs'

let handler = async (m, { conn, text }) => {
   if (!text) return m.reply(`Y el mensaje?`)
  let gmap = Object.entries(Connection.store.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  let quoted = m.quoted ? m.quoted : m
  let mime = (quoted.msg || quoted).mimetype || ''
  let isMedia = /image|video|sticker|audio/.test(mime)
  m.reply(`Enviando transmisión a ${gmap.length} grupo(s), en aproximadamente ${gmap.length * 1.5} segundo(s)`)
if (isMedia) { var mediax = await quoted.download?.()
for (let i of gmap){ await delay(5000); conn.sendMessage(i, { image: mediax, caption: text })} m.reply(`Finalizando transmisión a ${gmap.length} grupo(s) ✓`) } else { for (let i of gmap) { await delay(5000); conn.sendMessage(i, { text: text, mentions: [m.sender] }, { ephemeralExpiration: 24*3600, quoted: { key : { participant : '0@s.whatsapp.net'}, message: { documentMessage: { title: `• Transmisión / Varyon Bot`, jpegThumbnail: fs.readFileSync('./multimedia/imagenes/mythumb.jpg')}}}})}; m.reply(`Finalizando transmisión a ${gmap.length} grupo(s) ✓`)}
}

handler.help = ['bcgc', 'broadcastgroup'].map(v => v + ' <mensaje>')
handler.tags = ['owner']
handler.command = /^(bcgc|broadcastgroup|bcgp)$/i
handler.rowner = true

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
