import fs from 'fs'
let handler = async (m, { conn, text, participants }) => {
	let data = global.owner.filter(([id, isCreator]) => id && isCreator)
	let etiqueta = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
	let tname = await conn.getName(m.sender)
	for (let [number] of data) {
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
		let adiuser = users.slice(0, -15)
		if (users.startsWith(number)) return m.reply(`ª`)
		if (isNaN(adiuser && m.mentionedJid[0] && text)) {
			await conn.groupParticipantsUpdate(m.chat, [users], 'remove')
			await delay(1 * 1000)
			conn.sendMessage(m.chat, { text: `*[ @${adiuser} ]* fue eliminado del grupo ✓`, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `Acción ejecutada por\nUser : ${tname}`, jpegThumbnail: fs.readFileSync('./multimedia/imagenes/mythumb.jpg')}}}})
		} else {
			m.reply(`A que usuario desea eliminar!?\nPor favor etiqueta a uno`)
		}
	}
}

handler.help = ['ban @usuario']
handler.tags = ['group']
handler.command = /^(ban|kick|funar)$/i

handler.admin = !0
handler.group = true
handler.botAdmin = true

export default handler

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))