import fs from 'fs'
let handler = async (m, { conn, groupMetadata }) => {
   const { isBanned, welcome, antiLink, cmdDl, cmdRpg, viewonce, antiTraba, delete: del } = global.db.data.chats[m.chat]
   let more = String.fromCharCode(8206)
   let masss = more.repeat(850)
   let text = (`• ${cmdDl ? '( ✗ )' : '( ✓ )'} : CmdDl
• ${cmdRpg ? '( ✗ )' : '( ✓ )'} : Cmdrpg
• ${viewonce ? '( ✓ )' : '( ✗ )'} : Viewonce
• ${antiTraba ? '( ✓ )' : '( ✗ )'} : Anti-Traba
• ${isBanned ? '( ✓ )' : '( ✗ )'} : Baneado
• ${welcome ? '( ✓ )' : '( ✗ )'} : Bienvenida
• ${del ? '( ✗ )' : '( ✓ )'} : Anti-Delete
• ${antiLink ? '( ✓ )' : '( ✗ )'} : Anti-Link
${masss}
• ID-Grupo : _${groupMetadata.id}_`).trim()
   conn.sendMessage(m.chat, { text: text, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `[ ESTADO BOT ]`, jpegThumbnail: fs.readFileSync('./multimedia/imagenes/mythumb.jpg') } } } })
}

handler.help = ['estadobot']
handler.tags = ['group']
handler.command = /^(estadobot|estado|infocmd)$/i
handler.group = true

export default handler