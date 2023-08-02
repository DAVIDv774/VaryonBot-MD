let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let handler = async (m, { conn, text, isMods, isOwner, isPrems }) => {
let link = (m.quoted ? m.quoted.text ? m.quoted.text : text : text) || text
let [_, code] = link.match(linkRegex) || []
if (!code) m.reply('_Error, verifique si el link es correcto_')
if ( isPrems || isMods || isOwner || m.fromMe) { let res = await conn.groupAcceptInvite(code)
await m.reply(`_El Bot se unió al grupo_ ✔️`)} else {
const data = global.owner.filter(([id]) => id)
for (let jid of data.map(([id]) => [id] + '@s.whatsapp.net').filter(v => v != conn.user.jid)) await m.reply('Nueva solicitud del Bot para un Grupo\n\n*Usuario :* ' + 'wa.me/' + m.sender.split('@')[0] + '\n*Link del grupo solicitado:* ' + link, jid)
await m.reply('Su solicitud fue enviada a mi creador, es recomendable que se comunique con el directamente')}}

handler.help = ['join <chat.whatsapp.com>']
handler.tags = ['owner']
handler.command = ['join', 'invite']

export default handler