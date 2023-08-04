import Connection from '../lib/connection.js'

let handler = async (m, { conn }) => { let txt = ''
for (let [ jid, chat ] of Object.entries(Connection.store.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)) txt += `▢ ${ await conn.getName(jid)} :\n● _${jid} [${chat?.metadata?.read_only ? 'Fuera del grupo' : 'Dentro del grupo'}]_\n\n`
m.reply(`*Grupos con mayor actividad de ${author}*

${txt}`.trim())
}
handler.help = ['gplist']
handler.tags = ['owner', 'main']
handler.command = /^(gplist|listgp|grouplist|groups)$/i
handler.rowner = true

export default handler 