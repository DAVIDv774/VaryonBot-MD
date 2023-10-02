import { mediafireDl } from '../lib/mediafire.js'
let handler = async (m, { conn, args }) => {
    if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!args[0]) return m.reply(`Y el link?`)
    m.react(rwait)
    const mediafire = await mediafireDl(args[0])
    const text = `『 MEDIAFIRE / Varyon-Bot 』
*▢ Nombre:* ${mediafire[0].nama}
*▢ Tamaño:* ${mediafire[0].size}`
    m.reply(text)
    try { conn.sendMessage(m.chat, { document: { url: mediafire[0].link }, fileName: mediafire[0].nama, mimetype: mediafire[0].mime }, { quoted: m }); m.react(done); if (global.db.data.chats[m.chat].cmdRpg && m.isGroup) { m.coin = true } else {/*FUAP*/} } catch { m.react(error) }
}

handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^(mediafire|mf)$/i

export default handler