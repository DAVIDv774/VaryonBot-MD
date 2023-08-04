//By DAVID-774
import { mediafiredl } from '@bochilteam/scraper'
let handler = async (m, { conn, args, usedPrefix, command }) => {
	if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!args[0]) return m.reply(`Use example ${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`)
    m.react(rwait)
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
    『 MEDIAFIRE / 𝐊ᴇᴘʟᴇʀ/𝐁ᴏᴛ 』
*▢ Nombre:* ${filename}
*▢ Tamaño:* ${filesizeH}
*▢ Extension:* ${ext}
*▢ Subido:* ${aploud}
`.trim()
    m.reply(caption)
    await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true }); m.react(done); handler.coin = true }
    
handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^(mediafire|mf)$/i

export default handler