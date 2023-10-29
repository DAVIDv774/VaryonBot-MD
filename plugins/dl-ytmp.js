import ytdl from '../lib/ytdl2.js'
import fs from 'fs'
let handler = async (m, { conn, args, command }) => {
  if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
  if (!args[0]) m.reply('*Ingrese el comando junto al link de YouTube*')
  if (command == 'ytmp4') {
    m.react(rwait); try {
      const { title, thumb, Date, duration, channel, quality, contentLength, description, videoUrl } = await ytdl.mp4(args[0])
      let cap = `*『 DV-YouTube 』*\n\n▢ *Título:* ${title}\n▢ *Calidad:* ${quality}`.trim()
      await conn.sendMessage(m.chat, { document: { url: videoUrl }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); if (global.db.data.chats[m.chat].cmdRpg && m.isGroup) { m.coin = true } else {/*FUAP*/ }
    } catch { await m.react(error) }
  } else
    if (command == 'ytmp3') {
      m.react(rwait); try {
        const audio = await ytdl.mp3(args[0])
        await conn.sendMessage(m.chat, { audio: fs.readFileSync(audio.path), contextInfo: { externalAdReply: { title: audio.meta.title, body: `${author}`, previewType: "PHOTO", thumbnailUrl: null, thumbnail: await ytdl.fetchBuffer(audio.meta.image), sourceUrl: 'xd.com' } }, mimetype: "audio/mp4", fileName: `${audio.meta.title}.mp3` }, { quoted: m }); m.react(done); fs.unlinkSync(audio.path); if (global.db.data.chats[m.chat].cmdRpg && m.isGroup) { m.coin = true } else {/*FUAP*/ }
      } catch { await m.react(error) }
    }
}
handler.help = ['ytmp4', 'ytmp3'].map(v => v + ' < Link >')
handler.tags = ['dl']
handler.command = ['ytmp4', 'ytmp3']
handler.exp = 3
export default handler