const xppercoin = 350
let handler = async (m, { conn, command, args }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
   let count = command.replace(/^buy/i, '')
   count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xppercoin): parseInt(count): args[0] ? parseInt(args[0]): 1
   count = Math.max(1, count)
   if (global.db.data.users[m.sender].exp >= xppercoin * count) {
      global.db.data.users[m.sender].exp -= xppercoin * count
      global.db.data.users[m.sender].coin += count
      conn.reply(m.chat, `\n┏╼I『 *Comprar* 』: + ${count}©️\n┗⊱ *Gastado* : -${xppercoin * count} XP`, m)} else conn.reply(m.chat, `Lo siento, no tienes suficientes *XP* para comprar *${count}* coins / ©️`, m)
}
handler.help = ['buy', 'buyall']
handler.tags = ['econ']
handler.command = ['buy', 'buyall', 'comprar', 'compr']

handler.disabled = false

export default handler