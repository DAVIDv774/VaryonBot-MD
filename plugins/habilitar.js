import fs from 'fs'
const more = String.fromCharCode(8206)
const readMore = more.repeat(850)
let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner, groupMetadata }) => {
  let admin = isAdmin?'Si':'No'
  let isEnable = /true|encender|(turn)?on|1/i.test(command)
  let chat = global.db.data.chats[m.chat]
  let user = global.db.data.users[m.sender]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = (args[0] || '').toLowerCase()
  let isAll = false, isUser = false
  let etiqueta = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = await conn.getName(m.sender)
  let Imagen = './multimedia/imagenes/logo.jpg'
  let _Reply = { contextInfo: { externalAdReply: {
  thumbnail: fs.readFileSync('./multimedia/imagenes/mylogo.jpg'),
  mediaUrl: 'https://whatsapp.com',
  mediaType: 'VIDEO',
  description: 'null',
  title: `User name: ${name}`,
  body: `indefinido`,
  sourceUrl: 'https://whatsapp.com' }}}
  let texto = (`*LISTA DE AJUSTES ADMIN/OWNER*
${readMore}
*『 BIENVENIDA AUTOMÁTICA 』*
🛬 ~ᴱˡ ᵇᵒᵗ ᵈᵃʳᵃ́ ᵇᶦᵉⁿᵛᵉⁿᶦᵈᵃ ᵃ ˡᵒˢ ⁿᵘᵉᵛᵒˢ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉˢ ᵉⁿ ᵘⁿ ᵍʳᵘᵖᵒ

*${usedPrefix}encender* bienvenida
*${usedPrefix}apagar* bienvenida
 ________________________
 
*『 ANTI - LINK 』*
🗡️ ~ᴱˡ ᵇᵒᵗ ᵉˡᶦᵐᶦⁿᵃʳᵃ́ ᵃˡ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉ ᑫᵘᵉ ᵉⁿᵛᶦ́ᵉ ᵘⁿ ˡᶦⁿᵏ ᵉⁿ ᵘⁿ ᵍʳᵘᵖᵒ

*${usedPrefix}encender* antilink
*${usedPrefix}apagar* antilink
________________________

*『 🔧 MODO DE USO 』*
🏬 ~ᴹᵒᵈᵒ ᵖᵘᵇˡᶦᶜᵒ ᵃᶜᵗᶦᵛᵃᵈᵒ ᵃʰᵒʳᵃ ᵗᵒᵈᵒˢ ˡᵒˢ ᵘˢᵘᵃʳᶦᵒˢ ᵖᵒᵈʳᵃⁿ ᵘˢᵃʳ ᵃˡ ᵇᵒᵗ~

*${usedPrefix}encender* publico
*${usedPrefix}apagar* publico
________________________

*『 ⚙️ MODO / RESTRINGIDO 』*
🌚 ~ᴬᶜᵗᶦᵛᵃ ˡᵃ ᶠᵘⁿᶜᶦᵒ́ⁿ ᵖᵃʳᵃ ᵉˡᶦᵐᶦⁿᵃʳ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉˢ ᵉⁿ ᵍʳᵘᵖᵒˢ⁽ᴺᵒ ʳᵉᶜᵒᵐᵉⁿᵈᵃᵇˡᵉ⁾~

*${usedPrefix}encender* restringir
*${usedPrefix}apagar* restringir
________________________

*『 MODO SIN BOT 』*
🙈 ~ˢᵒˡᵒ ᶦᵐᵖʳᶦᵐᵉ ˡᵒˢ ᵐᵉⁿˢᵃʲᵉˢ ʳᵉᶜᶦᵇᶦᵈᵒˢ ʸ ᵃᵍʳᵉᵍᵃ ᵘˢᵘᵃʳᶦᵒˢ ᵃ ˡᵃ ᵇᵃˢᵉ ᵈᵉ ᵈᵃᵗᵒˢ~

*${usedPrefix}encender* atender
*${usedPrefix}apagar* atender
________________________

*『 ANTI - PRIVADO 』*
💔 ~ᴬʰᵒʳᵃ ᵗᵒᵈᵒ ᵃᑫᵘᵉˡ ᑫᵘᵉ ʰᵃᵇˡᵉ ᵃˡ ᵇᵒᵗ ᵖᵒʳ ᵖʳᶦᵛᵃᵈᵒ ˢᵉʳᵃ ᵇˡᵒᑫᵘᵉᵃᵈᵒ~

*${usedPrefix}encender* noprivado
*${usedPrefix}apagar* noprivado
________________________

*『 ANTI - ELIMINADO 』*
♻️ ~ᵀᵒᵈᵒ ᵐᵉⁿˢᵃʲᵉ ᵉˡᶦᵐᶦⁿᵃᵈᵒ ˢᵉʳᵃ́ ʳᵉᶜᵘᵖᵉʳᵃᵈᵒ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ~

*${usedPrefix}encender* antidelete
*${usedPrefix}encender* delete
________________________

*『 AUTO - LEER 』*
🤓 ~ᴱˡ ᵇᵒᵗ ᶜᵒᵐᵉⁿᶻᵃʳᵃ́ ᵃ ᵐᵃʳᶜᵃʳ ˡᵒˢ ᶜʰᵃᵗˢ ᶜᵒᵐᵒ ˡᵉᶦ́ᵈᵒˢ~

*${usedPrefix}encender* autoleer
*${usedPrefix}apagar* autoleer
________________________

*『NO / DOWNLOAD』* En desarrollo
📺 ~ᴸᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ᵈᵉ ᵇᵘˢᵠᵘᵉᵈᵃ ʸ ᴰᵉˢᶜᵃʳᵍᵃ ᵉˢᵗᵃʳᵃ́ⁿ ᵈᵉˢᵃᶜᵗⁱᵛᵃᵈᵒˢ~
Ajuste predeterminada *( encendido )*

*${usedPrefix}encender* cmddl
*${usedPrefix}apagar* cmddl
________________________

*『NO / RPG』* En desarrollo
📺 ~ᴸᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ᵈᵉ ᵇᵘˢᵠᵘᵉᵈᵃ ʸ ᴰᵉˢᶜᵃʳᵍᵃ ᵉˢᵗᵃʳᵃ́ⁿ ᵈᵉˢᵃᶜᵗⁱᵛᵃᵈᵒˢ~
Ajuste predeterminada *( encendido )*

*${usedPrefix}encender* cmdrpg
*${usedPrefix}apagar* cmdrpg
________________________

*『 🦟 ANTI-TRABA 』*
🚫 ~indefinido~
Esta opción aun no esta en funcionamiento.
*${usedPrefix}encender* antitraba
*${usedPrefix}apagar* antitraba
________________________

*『 ⬆️ AUTO - NIVELEAR 』*
👑 ~ᴸᵒˢ ᵘˢᵘᵃʳᶦᵒˢ ᵖᵒᵈʳᵃⁿ ˢᵘᵇᶦʳ ᵈᵉ ⁿᶦᵛᵉˡ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃᵐᵉⁿᵗᵉ~

*${usedPrefix}encender* autolevelup
*${usedPrefix}apagar* autolevelup`)
  switch (type) {
    case 'bienvenida' : {
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn)
          throw false
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn)
        throw false
      }
      chat.welcome = isEnable
}
break
    case 'publico': case 'público':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['self'] = !isEnable
      break
    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiLink = isEnable
      break
    case 'restringir':
      isAll = true
      if (!isOwner) {
        global.dfail('owner', m, conn)
        throw false
      }
      bot.restrict = isEnable
      break
    case 'atender':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['nyimak'] = isEnable
      break
    case 'autoleer':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['autoread'] = isEnable
      break
    case 'noprivado':
      isAll = true
      if (!isROwner) {
        global.dfail('rowner', m, conn)
        throw false
      }
      global.opts['gconly'] = isEnable
      break
     case 'antitraba': case 'antivirtex': {
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.antiTraba = isEnable
      }
      break
    case 'delete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = isEnable
      break
    case 'antidelete':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.delete = !isEnable
      break
//=====================
      case 'cmdDl':
      case 'antidescargas':
      case 'cmddl':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.cmdDl = isEnable
      break
      
      case 'cmdRpg':
      case 'antiRpg':
      case 'cmdrpg':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn)
          throw false
        }
      }
      chat.cmdRpg = isEnable
      break
//=====================
    case 'autolevelup':
      isUser = true
      user.autolevelup = isEnable
      break

    default:
      if (!/[01]/.test(command)) return await conn.sendFile( m.chat, Imagen, 'Imagen.jpg', texto, m, null, _Reply)
      throw false
 }
  conn.sendMessage(m.chat, { text: `\n@${etiqueta.replace(/@.+/, '')} ${isEnable ? 'activó' : 'desactivó'} *${type}* exitosamente ${isAll ? 'para este bot' : isUser ? '' : 'para este chat'}\n`, mentions: [m.sender] }, { ephemeralExpiration: 24*3600,quoted: {key : {participant : '0@s.whatsapp.net'},message: {documentMessage: {title: `${isEnable ? '*『 ✓ | Habilitado 』*' : '*『 ✗ | deshabilitado 』*'}`, jpegThumbnail: null }}}})
}

handler.help = ['encender', 'apagar'].map(v => v + ' <opción>')
handler.tags = ['group', 'owner', 'enable']
handler.command = /^((encender|apagar)|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

export default handler
