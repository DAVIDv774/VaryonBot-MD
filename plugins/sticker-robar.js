import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text, command }) => {
  if (!m.quoted) return m.reply('Responda un sticker!')
  let ascii = [`──────▄▀▄─────▄▀▄
─────▄█░░▀▀▀▀▀░░█▄
─▄▄──█░░░░░░░░░░░█──▄▄
█▄▄█─█░░▀░░┬░░▀░░█─█▄▄█`, `───▄▄▄
─▄▀░▄░▀▄
─█░█▄▀░█
─█░▀▄▄▀█▄█▄▀
▄▄█▄▄▄▄███▀`, `──────▄▀─
─█▀▀▀█▀█─
──▀▄░▄▀──
────█────
──▄▄█▄▄──`, `──────────▄
────────▄██
─▄▀██▀█▀█▀███▀
▀▀▀▀▀████▀▀▀
──────▀██`, `▀▀▀▀█▀▀▀▀
─▄▀█▀▀█──────▄
█▄▄█▄▄██████▀
▀▀█▀▀▀█▀▀
─▀▀▀▀▀▀▀`, `───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
───█▒▒░░░░░░░░░▒▒█───
────█░░█░░░░░█░░█────
─▄▄──█░░░▀█▀░░░█──▄▄─
█░░█─▀▄░░░░░░░▄▀─█░░█`]
  let stiker = false
  try {
    let [teks1, teks2] = text.split`|`
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) return m.reply(`Envie ó Responda un sticker con el comando ${Prefijo + command}`)
    let img = await m.quoted.download()
    if (!img) return m.reply('Responda un sticker!')
    stiker = await addExif(img, teks1 || '', teks2 ? teks2 : teks1 ? '' : `\n- [ ${author} ] -\n\n\n${pickRandom(ascii)}`)
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    else throw '¡La conversión falló!'
  }
}
handler.help = ['robsticker <paquete>|<autor>']
handler.tags = ['conversor']
handler.command = /^(robars|robsticker)$/i
handler.limit = true

export default handler
