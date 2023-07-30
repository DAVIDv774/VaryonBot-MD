import { toAudio } from '../lib/converter.js'
import * as fs from 'fs'

let handler = async (m, { conn, usedPrefix, command, text }) => {
   let redes = ['https://youtube.com', 'https://vm.tiktok.com']
   let q = m.quoted ? m.quoted: m
   let mime = (m.quoted ? m.quoted: m.msg).mimetype || ''
   if (!/video|audio|document/.test(mime)) return m.reply(`Envie ó Responda un (video/grabación) con el comando:\n\n${usedPrefix + command}`)
   let media = await q.download?.()
   if (!media) return m.reply('No se pudo descargar el archivo')
   let audio = await toAudio(media, 'mp4')
   if (!audio.data) return m.reply('No se pudo convertir a audio')
   conn.sendMessage(m.chat, { audio: audio.data, contextInfo: { externalAdReply: { title: `🎥 ${author} 🎧`, "body": `Convertido a audio ✓`, "previewType": "PHOTO", "thumbnail": fs.readFileSync('./multimedia/imagenes/mylogo.jpg'), "sourceUrl": redes[Math.floor(Math.random() * redes.length)]}}, mimetype: 'audio/mp4', fileName: `${text ? text: 'audio'}.mp3`}, {quoted: m })
}

handler.help = ['amp3']
handler.tags = ['conversor']
handler.command = ['amp3']

export default handler