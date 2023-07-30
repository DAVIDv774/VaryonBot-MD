let handler = async (m, { conn, usedPrefix }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
   let who = m.quoted ? m.quoted.sender: m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
   let user = global.db.data.users[who]
   if (!(who in global.db.data.users)) throw `El usuario no se encuentra en mi base de datos`
   conn.reply(m.chat, `\n*『 BALANCE 』*\n▢ *👤 / Nombre* : _@${who.split('@')[0]}_\n▢ *coins / ©️* : _${user.coin}_\n▢ *XP / ✨* : _Total ${user.exp}_\n\n*NOTA :*\nPuedes comprar ©️ coins usando los comandos\n▢ *${usedPrefix}buy <cantidad>*\n▢ *${usedPrefix}buyall*`, m, {
         mentions: [who]
      })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'coins', 'coin', 'balance']

export default handler