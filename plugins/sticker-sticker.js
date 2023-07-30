import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import moment from 'moment-timezone'

let handler = async (m, { conn, args, usedPrefix, command, groupMetadata }) => {
	let sname = await conn.getName(m.sender)
	let sfecha = moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format('DD/MM/YY HH:mm:ss')
	let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply(`*[ ! ] Máxima duración de vídeo son 10 segundos!*`)
      let img = await q.download?.()
      if (!img) return m.reply(`*Por favor Envie o Responda un video o una imagen usando el comando ${usedPrefix + command}*\nNOTA : duracion de video *1* a *10* segundos máximo ✓`)
      let out
      try { stiker = await sticker(img, false, ``, `${sname ? sname : Nomowner}\n${author}\n${sfecha}\n`) } catch (e) { console.error(e) } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, ``, `${sname ? sname : Nomowner}\n${author}\n${sfecha}\n`)
        }
      }
    } else if (args[0]) { if (isUrl(args[0])) stiker = await sticker(false, args[0], ``, `${sname ? sname : Nomowner}\n${author}\n${sfecha}\n\n\n\n\n\n\n\n\n\n\n\n`)
      else return m.reply('¡Url inválido! :v')} } catch (e) { console.error(e)
        if (!stiker) stiker = e } finally { if (stiker) try { conn.sendMessage(m.chat, { sticker: fs.readFileSync(stiker), mentions: [m.sender]})} catch { conn.sendFile(m.chat, stiker, 'sticker.webp', '', m); handler.coin = true}
        else m.reply('')}
}
handler.help = ['sticker (multimedia|url)']
handler.tags = ['conversor']
handler.command = /^s(tic?ker)?(gif)?(wm)?$/i

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
