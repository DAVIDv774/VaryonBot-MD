import { areJidsSameUser } from '@adiwajshing/baileys'
import * as fs from 'fs'

let handler = async (m, { conn, args }) => {
   let group = m.chat
   if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
   if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) return global.dfail('group', m, conn)
   let groupMetadata = await conn.groupMetadata(group)
   if (!groupMetadata) throw 'groupMetadata no esta definido :/'
   if (!('participants' in groupMetadata)) throw 'participants no esta definido :('
   let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
   if (!me) return m.reply('no estoy en ese grupo :v')
   if (!me.admin) return global.dfail('botAdmin', m, conn)
   let linkgc = await conn.groupInviteCode(group)
   conn.sendMessage(m.chat, { text: `https://chat.whatsapp.com/`+linkgc, matchedText: `https://chat.whatsapp.com/`+linkgc, description: groupMetadata.desc, title: groupMetadata.subject, previewType: "NONE", jpegThumbnail: fs.readFileSync('./multimedia/imagenes/mylogo.jpg'), inviteLinkGroupType: "DEFAULT"}, { quoted: m})
}

handler.help = ['gplink']
handler.tags = ['group']
handler.command = /^(gplink|grouplink|linkgroup)$/i

export default handler