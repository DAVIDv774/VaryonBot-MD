let handler = async (m, { conn, usedPrefix, command }) => { let who
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: false
   else who = m.chat
   if (!who) m.reply(`Etiqueta o menciona a alguien\n\n📌 Ejemplo : ${usedPrefix + command} @user`)
   if (global.owner.includes(who.split`@`[0])) m.reply('El usuario mensionado ya es Owner')
   global.owner.push(`${who.split`@`[0]}`)

   conn.reply(m.chat, `@${who.split`@`[0]} ahora te conviertes en Owner`, m, { mentions: [who]})
}
handler.help = ['addowner <@tag>']
handler.tags = ['owner']
handler.command = ['addowner', 'addowne']

handler.group = true
handler.rowner = true

export default handler