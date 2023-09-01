let handler = async (m, { conn, text }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0]
   else who = m.chat
   if (!who) m.reply('Taguea al usuario')
   let txt = text.replace('@' + who.split`@`[0], '').trim()
   if (!txt) m.reply('Ingrese la cantidad de *XP* que quiere añadir')
   if (isNaN(txt)) m.reply('Sólo números')
   let xp = parseInt(txt)
   let exp = xp

   if (exp < 1) m.reply('Mínimo es  *1*')
   let users = global.db.data.users
   users[who].exp += xp

   await m.reply(`*『✨ / XP - AÑADIDO』*\n\n▢  *Total:* ${xp}\n`)
   conn.fakeReply(m.chat, `*RECIBISTES*\n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['econ']
handler.command = ['addxp']
handler.rowner = true

export default handler