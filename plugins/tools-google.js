import googleIt from 'google-it'
let handler = async (m, { conn, args }) => {
   let text = args.join` `
   if (!text) return conn.reply(m.chat, `Que quieres buscar en Google?`, m)
   m.react(rwait)
   let search = await googleIt({ query: text })
   let msg = search.map(({ title, link, snippet }) => { return `*${title}*\n_${link}_\n_${snippet}_` }).join`\n\n`
   try { await m.reply(msg); m.react(done) } catch (e) { m.react(error) }
}

handler.help = ['google']
handler.tags = ['servicio']
handler.command = ['google']

export default handler