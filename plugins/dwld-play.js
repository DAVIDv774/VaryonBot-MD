import ytdl from '../lib/ytdl2.js'
import yts from 'yt-search'
import fs from 'fs'
let handler = async (m, { conn, text, command }) => {
    if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!text) return m.reply(`*Ingresa el título de una canción*`)
    const vid = (await yts(text)).all[0]
    if (!vid) return m.reply(`Sin resultados`)
    const { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
    const play = `▢ ${tituloemoji} *Titulo :* ${title}\n▢ ${publicadoemoji} *Publicado :* ${ago}\n▢ ${duracionemoji} *Duración :* ${timestamp}\n▢ ${vistasemoji} *Vistas :* ${views}\n\n@Cargando${readMore}\n*📎 Link :* https://www.youtube.com/watch?v=${videoId}\n▢ *Descripcion :* ${description}`
    const _Url = `https://www.youtube.com/watch?v=${videoId}`

    if (command == 'playad' || command == 'playmp3' || command == 'yta' || command == 'audio') {
        await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: play.replace('@Cargando', 'Cargando audio'), }, { quoted: m }); m.react(rwait)
        try {
            const audio = await ytdl.mp3(_Url)
            await conn.sendMessage(m.chat, { audio: fs.readFileSync(audio.path), contextInfo: { externalAdReply: { title: audio.meta.title, body: `${author}`, previewType: "PHOTO", thumbnailUrl: null, thumbnail: await ytdl.fetchBuffer(audio.meta.image), sourceUrl: _Url } }, mimetype: "audio/mp4", fileName: `${title}.mp3` }, { quoted: m }); m.react(done); fs.unlinkSync(audio.path)
            if (global.db.data.chats[m.chat].cmdRpg) { m.coin = true } else {/*FUAP*/ }
        } catch { await m.react(error) }
    } else
        if (command == 'play' || command == 'playvd' || command == 'playmp4' || command == 'ytv' || command == 'video') {
            await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: play.replace('@Cargando', 'Cargando video'), }, { quoted: m }); m.react(rwait)
            try {
                const { title, thumb, Date, duration, channel, quality, contentLength, description, videoUrl } = await ytdl.mp4(_Url)
                let cap = `*『 DV-YouTube 』*\n\n▢ *Título:* ${title}\n▢ *Calidad:* ${quality}`.trim()
                await conn.sendMessage(m.chat, { document: { url: videoUrl }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); if (global.db.data.chats[m.chat].cmdRpg) { m.coin = true } else {/*FUAP*/ }
            } catch { await m.react(error) }
        }
}
handler.help = ['playmp3', 'playmp4']
handler.tags = ['dl', 'servicio']
handler.command = ['playad', 'playmp3', 'yta', 'audio'/**/,/**/'play', 'playvd', 'playmp4', 'ytv', 'video']
handler.exp = 80

export default handler