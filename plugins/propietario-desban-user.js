let handler = async (m, { conn, text, usedPrefix, command }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0]: m.quoted ? m.quoted.sender: false
   else who = m.chat
   let user = global.db.data.users[who]
   if (!who) throw `¡『Por favor etiquete al usuario que desea desbanear』!`
   let users = global.db.data.users
   users[who].banned = false
   conn.reply(m.chat, `▢『 DESBANEO 』

@${who.split`@`[0]} 『user desbaneado correctamente』✓`, m, { mentions: [who]})
}
handler.help = ['desbanear @user']
handler.tags = ['owner']
handler.command = /^unban|desbanear$/i
handler.rowner = true

export default handler