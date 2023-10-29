import fetch from "node-fetch"
let handler = async (m, { text }) => {
  if (!text) m.reply(`Y el texto?`)
  try {
    let api = await fetch("https://api.simsimi.net/v2/?text=" + text + "&lc=es")
    let resSimi = await api.json()
    m.reply(resSimi.success)
  } catch { m.react(error) }
}
handler.help = ['bot']
handler.tags = ['main']
handler.command = ['bot', 'simi']
export default handler
