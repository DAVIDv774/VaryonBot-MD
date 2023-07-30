import Api from 'api-dylux'
let handler = async (m, { conn, args }) => {
  if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
  if (!args[0]) m.reply('*Ingrese el comando junto al link de YouTube*')
  m.react(rwait)
  try { const { title, desc, thumb, channel, views, publish, duration, sizeB, size, dl_url } = await Api.ytmp4(`https://www.youtube.com/watch?v=${videoId}`)
  let cap = `*『 DV-YouTube 』*\n\n▢ *Título:* ${title}\n▢ *Tamaño* ${size}`.trim()
  await conn.sendMessage(m.chat, { document: { url: dl_url }, caption: cap, mimetype: 'video/mp4', fileName: title + `.mp4` }, { quoted: m }); m.react(done); handler.coin = true } catch { await m.react(error) }
}
handler.help = ['ytmp4'].map(v => v + ' < Link >')
handler.tags = ['dl']
handler.command = ['ytmp4']
handler.exp = 3
export default handler