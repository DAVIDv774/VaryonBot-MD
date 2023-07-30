let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: false
   else who = m.chat
   let user = global.db.data.users[who]
   if (!who) m.reply(`Etiqueta o menciona a alguien\n\n📌 Ejemplo : ${usedPrefix + command} @user`)
   if (global.prems.includes(who.split`@`[0])) m.reply('El usuario mensionado ya es premium')
   global.prems.push(`${who.split`@`[0]}`)

   conn.reply(m.chat, `✅ PREMIUM\n@${who.split`@`[0]} ahora te conviertes en un usuario premium\n\n▢ *Nombre:* ${user.name}`, m, { mentions: [who]})

}
handler.help = ['addprem <@tag>']
handler.tags = ['owner']
handler.command = ['addprem', 'addpremium']

handler.group = true
handler.rowner = true

export default handler