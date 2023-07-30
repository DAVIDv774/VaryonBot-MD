import { areJidsSameUser } from '@adiwajshing/baileys'
import * as fs from 'fs'

let handler = async (m, { conn, args }) => { let group = m.chat
   if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
   if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) return global.dfail('group', m, conn)
   let groupMetadata = await conn.groupMetadata(group)
   if (!groupMetadata) m.reply('groupMetadata no esta definido :/')
   if (!('participants' in groupMetadata)) m.reply('participants no esta definido :(')
   let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
   if (!me) return m.reply('no estoy en ese grupo')
   let linkgc = await conn.groupLeave(group)
   conn.sendMessage(m.chat, { text: `『 Comando ejecutado exitosamente 』`}, { quoted: m })
}

handler.help = ['exitgrupo']
handler.tags = ['owner']
handler.command = /^(exitgrupo|salirgrupo|salirgp|salirbot|gpexit)$/i
handler.rowner = true

export default handler