import { googleImage } from '@bochilteam/scraper'
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
if (!text) return m.reply( `*Ejemplo de uso de comando ${usedPrefix + command} Minecraft*`)
m.react(rwait)
const res = await googleImage(text)
let image = await res.getRandom()
let link = image
let captionn = `▢ *Resultado de:* ${text}\n▢ *Buscador: 『 Google 』*`
try { await conn.sendMessage(m.chat, { image: {url: link }, caption: captionn,}, { quoted: m }); m.react(done); handler.coin = true} catch { await m.react(error) }}
/*conn.sendButton(m.chat, captionn, author, link, [['『 Siguiente 』', `.imagen ${text}`]], m)}*/
handler.help = ['gimage <query>', 'imagen <query>']
handler.tags = ['servicio']
handler.command = /^(gimage|image|imagen)$/i
export default handler
