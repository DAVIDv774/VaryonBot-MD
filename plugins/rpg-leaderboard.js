import { areJidsSameUser } from '@adiwajshing/baileys'

let handler = async (m, { conn, args, participants }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
  let users = Object.entries(global.db.data.users).map(([key, value]) => { return {...value, jid: key}})
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('coin')).sort(sort('coin'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  let len = args[0] && args[0].length > 0 ? Math.min(50, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  let text = `
       ≡ *TABLA DE CLASIFICACION*
    
▢ *TOP ${len} XP* 🧬
Tú : *${usersExp.indexOf(m.sender) + 1}* de *${usersExp.length}*

${sortedExp.slice(0, len).map(({ jid, exp }, i) => `*${i + 1}.* ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ _*XP ${exp}*_`).join`\n`}

▢ *TOP ${len} coins ©️* 
Tú : *${usersLim.indexOf(m.sender) + 1}* de *${usersLim.length}*

${sortedLim.slice(0, len).map(({ jid, coin }, i) => `*${i + 1}.* ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ _*Coins ${coin}*_`).join`\n`}

▢ *TOP ${len} NIVEL* ⬆️
Tú : *${usersLevel.indexOf(m.sender) + 1}* de *${usersLevel.length}*

${sortedLevel.slice(0, len).map(({ jid, level }, i) => `*${i + 1}.* ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} ➭ _*Nivel ${level}*_`).join`\n`}
`.trim()
  conn.reply(m.chat, text, m, {
    mentions: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len)].filter(v => !participants.some(p => areJidsSameUser(v, p.id) )) 
})
 
}
handler.help = ['top']
handler.tags = ['econ']
handler.command = ['top'] 

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
