import * as fs from 'fs'

export async function before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
   if (m.isBaileys && m.fromMe) return !0
   if (m.isGroup) return !1
   if (!m.message) return !0
   let chat = global.db.data.chats[m.chat]
   let bot = global.db.data.settings[this.user.jid] || {}
   if (bot.antiPrivado && !isOwner && !isROwner) {
      await conn.sendMessage(m.chat, { text: `*¡『 El chat por privado esta prohibido 』!*\nMi dueño por si necesita información : wa.me/${Numowner}\n\n_Adios..._`, mentions: [m.sender]}, { quoted: { key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net" }, "message": { "groupInviteMessage": { "groupJid": "573122021049-1616169743@g.us", "inviteCode": "m", "groupName": "P", "caption": authort, 'jpegThumbnail': fs.readFileSync('./multimedia/imagenes/logo.jpg')}}}})
      setTimeout(() => { this.updateBlockStatus(m.chat, 'block')}, 3000)} return !1 }