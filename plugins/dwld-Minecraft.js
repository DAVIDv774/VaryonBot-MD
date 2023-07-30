let handler = async (m, { conn, args }) => {
  const Minecraft = 'https://www.dropbox.com/scl/fi/maqciebunyqhms36nvm0y/Minecraft-1-20-12-Oficial.apk?rlkey=nhs8oxd6ahhrv7ii9el8pfyz8&dl=true'
  let Mensaje = 'Únete a nuestro servidor de Minecraft!'
  m.react(rwait); try { await conn.sendMessage(m.chat, { document: { url: Minecraft }, caption: Mensaje, mimetype: 'video/mp4', fileName: 'Minecraft 1.20.12 Oficial.apk' }, { quoted: m }); m.react(done)} catch { await m.react(error) }
}
handler.help = ['Minecraft']
handler.tags = ['dl']
handler.command = ['minecraft', 'maincra', 'mc']
handler.exp = 100
export default handler