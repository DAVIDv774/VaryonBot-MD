import { addExif } from '../lib/sticker.js'

let handler = async (m, { conn, text }) => {
  if (!m.quoted) m.reply('Y el sticker?')
  let stiker = false
  try {
    let [packname, ...author] = text.split('|')
    author = (author || []).join('|')
    let mime = m.quoted.mimetype || ''
    if (!/webp/.test(mime)) m.reply('Responde a un sticker')
    let img = await m.quoted.download()
    if (!img) m.reply('Responde a un sticker!')
    stiker = await addExif(img, packname || '', author || '')
  } catch (e) {
    console.error(e)
    if (Buffer.isBuffer(e)) stiker = e
  } finally {
    if (stiker) conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
    else m.reply('La conversión falló')
  }
}
handler.help = ['take <nombre>|<autor>']
handler.tags = ['conversor']
handler.command = ['take', 'robar', 'wm'] 

export default handler