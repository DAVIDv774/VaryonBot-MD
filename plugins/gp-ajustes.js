import * as fs from 'fs'

let handler = async (m, {
   conn, args, text, usedPrefix, command
}) => {
   let etiqueta = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0]: m.fromMe ? conn.user.jid: m.sender
   if (command == "cgp") {
      if (args[1] == "segundos") {
         var timer = args[0]+"000"
      } else if (args[1] == "minutos") {
         var timer = args[0]+"0000"
      } else if (args[1] == "horas") {
         var timer = args[0]+"00000"
      } else {
         return m.reply(`*En que tiempo desea cerrar el grupo?*\n\n_Ejemplo de uso_ : \n${usedPrefix + command} 10 segundos`)
      }
      conn.sendMessage(m.chat, {
         text: `*El grupo se cerrará en ${text}*\nAccion ejecutada por : @${etiqueta.replace(/@.+/, '')}`, mentions: [etiqueta]
      })
      setTimeout(() => {
         conn.groupSettingUpdate(m.chat, 'announcement')
         conn.sendMessage(m.chat, {
            text: `* 『Grupo cerrado correctamente ✓』*`,}, { quoted: { key: { participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"
               }, "message": {
                  "groupInviteMessage": {
                     "groupJid": "573127268448-1616169743@g.us", "inviteCode": "m", "groupName": "P", "caption": `${author} ✓`, 'jpegThumbnail': fs.readFileSync('./multimedia/imagenes/mylogo.jpg')
                  }}}
         })
      }, timer)
   } else if (command == "agp") {
      conn.groupSettingUpdate(m.chat, 'not_announcement')
      conn.sendMessage(m.chat, {
         text: `*『Grupo abierto correctamente ✓』*`,
      }, {
         quoted: {
            key: {
               participant: "0@s.whatsapp.net", "remoteJid": "0@s.whatsapp.net"
            }, "message": {
               "groupInviteMessage": {
                  "groupJid": "573127268448-1616169743@g.us", "inviteCode": "m", "groupName": "P", "caption": `${author} ✓`, 'jpegThumbnail': fs.readFileSync('./multimedia/imagenes/mylogo.jpg')
               }}}
      })
   } else {}
}

handler.help = ['cgp', 'agp'].map(v => v + ' <opción>')
handler.tags = ['group']
handler.command = /^(cgp)|(agp)$/i

handler.admin = true
handler.botAdmin = true

export default handler