
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) m.reply(`Ingrese el número al que quiere enviar una invitación al grupo\n\nEjemplo :\n*${usedPrefix + command}* 57324`)
if (text.includes('+')) m.reply(`Ingrese el número todo junto sin el *+*`)
if (isNaN(text)) m.reply(' Ingrese sólo números más su código de país sin espacios')
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
await conn.reply(text+'@s.whatsapp.net', `*INVITACIÓN A GRUPO*\n\nUn usuario te invitó a unirte a este grupo \n\n${link}`, m, {mentions: [m.sender]}) 
m.reply(`se envió un enlace de invitación al usuario`) 

}
handler.help = ['invitacion < Numero >']
handler.tags = ['group']
handler.command = ['invite','invitar', 'invitación', 'invitacion'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
