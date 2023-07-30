import Api from 'api-dylux'
import yts from 'yt-search'
const more = String.fromCharCode(8206)
const readMore = more.repeat(850)
let handler = async (m, { conn, text }) => {
	if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando esta deshabilitado para este grupo._`)
   if (!text) return m.reply(`*Ingresa el título de una canción*`)
   m.react(rwait)
   let vid = (await yts(text)).all[0]
   if (!vid) return m.reply(`Sin resultados`)
   let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
   let play = `${cuadro} ${tituloemoji} *Titulo :* ${title}\n${cuadro} ${publicadoemoji} *Publicado :* ${ago}\n${cuadro} ${duracionemoji} *Duración :* ${timestamp}\n${cuadro} ${vistasemoji} *Vistas :* ${views}\n\n_Cargando audio${readMore}\n*📎 Link :* https://www.youtube.com/watch?v=${videoId}`
   await conn.sendMessage(m.chat, { image: {url: thumbnail }, caption: play,}); try {
   const { title, desc, thumb, channel, views, publish, duration, sizeB, size, dl_url } = await Api.ytmp3(`https://www.youtube.com/watch?v=${videoId}`)
   let full = [24/7] //No hace nada XD
   await conn.sendMessage(m.chat, { audio: { url: dl_url }, contextInfo: { externalAdReply: {
    title: `${title}`,
    body: `${author}`,
    previewType: "PHOTO",
    thumbnailUrl: thumbnail,
    thumbnail: "",
    sourceUrl: `${dl_url}`}}, mimetype: "audio/mp4", fileName: `${title}.mp3` }, { quoted: m })
    m.react(done); handler.coin = true } catch { await m.react(error)}
}
handler.help = ['playmp3']
handler.tags = ['dl', 'servicio']
handler.command = ['playad', 'playmp3', 'yta', 'audio']
handler.exp = 3

export default handler