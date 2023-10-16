let handler = async (m, {
   conn, groupMetadata, text, participants, isAdmin, isOwner
}) => {
   let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
   let etiqueta = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
   let more = String.fromCharCode(8206)
   let masss = more.repeat(850)
   m.reply(`*[ ! ] Invocando a los integrantes del grupo* : ${groupMetadata.subject}\n*~> Invocador* : _@${etiqueta.replace(/@.+/, '')}_\n*~> Mensaje* : _${text ? text: 'No hay :v'}_\n${masss}\n╔═══ஜ۩۞۩ஜ═══╗\n` + users.map(v => '╠➥ @' + v.replace(/@.+/, '')).join`\n` + '\n╚═══════════\n', null, {
      mentions: users
   })
}

handler.help = ['invocar', 'todos', 'tagall']
handler.tags = ['group']
handler.command = /^(invocar)|(todos)|(tagall)$/i

handler.admin = true
handler.group = true

export default handler