import { GradioChatBot } from 'gradio-chatbot'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Y el texto?')
  m.react('\uD83D\uDCAC')
  const chatbot = async (numero) => {
    const bot = new GradioChatBot(numero)
    const message = await bot.chat(text)
    return m.reply(message)
  }
  try { await chatbot('10') } catch (e) { try { await chatbot('5') } catch (e) { try { await chatbot('1') } catch (e) { try { await chatbot('3') } catch (e) { m.reply('No se pudo completar la acción solicitada. Por favor, revisa los datos ingresados e inténtalo nuevamente.') } } } }
}
handler.help = ['IA <texto>']
handler.tags = ['main', 'servicio']
handler.command = ['ia', 'ai']
export default handler