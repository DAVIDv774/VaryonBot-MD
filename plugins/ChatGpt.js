import { GradioChatBot } from 'gradio-chatbot'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Y el texto?')
  const bot = new GradioChatBot()
  m.react('\uD83D\uDCAC')
  async function start() { const message = await bot.chat(text, { onMessage(partialMsg) {console.log('stream output:', partialMsg)}}); console.log('message', m.reply(message))}; start()
}
handler.help = ['IA <texto>']
handler.tags = ['main', 'servicio']
handler.command = ['ia', 'ai']
export default handler