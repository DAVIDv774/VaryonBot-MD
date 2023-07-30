let handler = async (m, { conn, isAdmin }) => {  
if (m.fromMe) return
if (isAdmin) m.reply('『 Bienvenido 』')
try {  
await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
} catch {
await m.reply('● X_X ocurrio un error')}}
handler.command = /^autoadmin$/i
handler.rowner = true
handler.group = true
handler.botAdmin = true
export default handler
