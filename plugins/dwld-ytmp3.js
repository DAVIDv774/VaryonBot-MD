import Api from 'api-dylux'
let handler = async (m, { conn, args }) => {
   if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
   if (!args[0]) m.reply('*Ingrese el comando junto al link de YouTube*'); m.react(rwait); try {
    const { title, desc, thumb, channel, views, publish, duration, sizeB, size, dl_url } = await Api.ytmp3(args[0])
    await conn.sendMessage(m.chat, { audio: { url: dl_url }, contextInfo: { externalAdReply: {
      title: `${title}`,
      body: `${author}`,
      previewType: "PHOTO",
      thumbnailUrl: thumb,
      thumbnail: "",
      sourceUrl: `${dl_url}` }}, mimetype: "audio/mp4", fileName: `${title}.mp3` }, { quoted: m }); m.react(done) } catch { await m.react(error)}
}
handler.help = ['ytmp3'].map(v => v + ' < Link >')
handler.tags = ['dl']
handler.command = ['ytmp3']
handler.exp = 3
export default handler