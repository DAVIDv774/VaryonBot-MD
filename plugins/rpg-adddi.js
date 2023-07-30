let handler = async (m, { conn, text }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0]
   else who = m.chat
   if (!who) m.reply('Taguea al usuario')
   let txt = text.replace('@' + who.split`@`[0], '').trim()
   if (!txt) m.reply('Ingrese la cantidad de *coins* que quiere añadir')
   if (isNaN(txt)) m.reply('sólo números')
   let dmt = parseInt(txt)
   let diamond = dmt

   if (diamond < 1) m.reply('Mínimo es  *1*')
   let users = global.db.data.users
   users[who].diamond += dmt

   await m.reply(`*『©️ / Coin - AÑADIDO 』*\n\n▢ *Total:* ${dmt}\n`)
   conn.fakeReply(m.chat, `*RECIBISTES *\n\n*+${dmt}* coins`, who, m.text)
}

handler.help = ['adddi <@user>']
handler.tags = ['econ']
handler.command = ['addcoin']
handler.rowner = true

export default handler