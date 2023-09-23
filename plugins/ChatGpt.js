import { GradioChatBot } from 'gradio-chatbot'
import fs from 'fs'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Y el texto?')
  const bot = new GradioChatBot('10')
  m.react('\uD83D\uDCAC')
  const message = await bot.chat(text)
  if (message) { conn.sendMessage(m.chat, { text: message, mentions: [m.sender] }, { ephemeralExpiration: 24 * 3600, quoted: { key: { participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: `[IA] Desarrollado por OpenAI`, jpegThumbnail: fs.readFileSync('./multimedia/imagenes/mythumb.jpg') } } } }) } else { m.reply('No se pudo completar la acción solicitada. Por favor, revisa los datos ingresados e inténtalo nuevamente.') }
}
handler.help = ['IA <texto>']
handler.tags = ['main', 'servicio']
handler.command = ['ia', 'ai']
export default handler