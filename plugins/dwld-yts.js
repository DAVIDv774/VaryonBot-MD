import yts from 'yt-search'
let handler = async (m, { conn, text }) => {
   if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`Este comando está deshabilitado para este grupo.`)
   if (!text) return m.reply('Que quieres que busque en YouTube?')
   let vid = (await yts(text)).all[0]
   let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid
   let results = await yts(text)
   let tes = results.all
   let teks = results.all.map(v => {
      switch (v.type) {
         case 'video': return `${cuadro} ${v.title}\n${cuadro} *Link* : ${v.url}\n${cuadro} *Duración* : ${v.timestamp}\n${cuadro} *Subido :* ${v.ago}\n${cuadro} *Vistas:* ${v.views}`.trim()

         case 'canal': return `${cuadro} *${v.name}* (${v.url})\n${cuadro}${v.subCountLabel} (${v.subCount}) Suscribirse\n${cuadro} ${v.videoCount} videos`.trim()
      }
   }).filter(v => v).join('\n\n________________________\n\n')
   try { conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: teks, }, { quoted: m }) }
   catch { m.reply('Error') /*conn.sendFile(m.chat, tes[0].thumbnail, 'yts.jpeg', teks, m)*/ }
}
handler.help = ['ytsearch', 'play2']
handler.tags = ['dl']
handler.command = ['ytsearch', 'yts', 'play2']

export default handler