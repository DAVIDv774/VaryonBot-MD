let handler = async (m, { conn, text, isROwner, isOwner, isModr }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0]
   else who = m.chat
   if (!isModr?? !isOwner?? !isROwner) return global.dfail('owner', m, conn)
   if (!who) return m.reply('Taguea al usuario')
   let txt = text.replace('@' + who.split`@`[0], '').trim()
   if (!txt) return m.reply('Ingrese la cantidad de *coins* que quiere añadir')
   if (isNaN(txt)) return m.reply('sólo números')
   let cn = parseInt(txt)
   let coins = cn

   if (coins < 1) return m.reply('Mínimo es  *1*')
   let users = global.db.data.users
   users[who].coin += cn

   await m.reply(`*『©️ / Coin - AÑADIDO 』*\n\n▢ *Total:* ${cn}\n`)
   conn.fakeReply(m.chat, `*RECIBISTE*\n\n*+${cn}* coins`, who, m.text)
}

handler.help = ['adddi <@user>']
handler.tags = ['econ']
handler.command = ['addcoin']

export default handler