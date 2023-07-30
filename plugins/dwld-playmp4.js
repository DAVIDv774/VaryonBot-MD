import Api from 'api-dylux'
import yts from 'yt-search'
const more = String.fromCharCode(8206)
const readMore = more.repeat(850)
let handler = async (m, { conn, text }) => {
	if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!text) return m.reply(`*Ingresa el título de un video*`)
    let vid = (await yts(text)).all[0]
    if (!vid) return m.reply(`Sin resultados`)
    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
    let play = `${cuadro} ${tituloemoji} *Titulo :* ${title}\n${cuadro} ${publicadoemoji} *Publicado :* ${ago}\n${cuadro} ${duracionemoji} *Duración :* ${timestamp}\n${cuadro} ${vistasemoji} *Vistas :* ${views}\n\n_Cargando Video..._\n${readMore}\n*Link :* https://www.youtube.com/watch?v=${videoId}`
    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: play, }, { quoted: m }); m.react(rwait)
    try { const { title, desc, thumb, channel, views, publish, duration, sizeB, size, dl_url } = await Api.ytmp4(`https://www.youtube.com/watch?v=${videoId}`)
    let cap = `*『 DV-YouTube 』*\n\n▢ *Título:* ${title}\n▢ *Tamaño* ${size}`.trim()
    await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); handler.coin = true } catch { await m.react(error) }
}
handler.help = ['playmp4']
handler.tags = ['dl', 'servicio']
handler.command = ['play','playvd','play4', 'playmp4', 'ytv']
handler.exp = 3

export default handler