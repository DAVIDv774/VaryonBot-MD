import { Configuration, OpenAIApi } from 'openai'
let handler = async (m, { text, conn }) => {
const ApikeyOpenai = "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"
const configuration = new Configuration({ApikeyOpenai})
const openai = new OpenAIApi(configuration)
const response = await openai.createImage({ prompt: text, n: 1, size: "512x512" })
m.react(rwait)
try { await conn.sendMessage(m.chat, { image: {url: response.data.data[0].url }, caption: text,}, { quoted: m }); m.react(error)} catch (err) { m.react(error) }
}

handler.help = ['IAimage <texto>']
handler.tags = ['main', 'servicio']
handler.command = ['iaimagen', 'aimagen']
export default handler