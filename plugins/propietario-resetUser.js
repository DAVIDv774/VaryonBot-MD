let handler = async (m, { conn, text, isROwner, isOwner, isModr }) => {
   function no(number) { return number.replace(/\s/g, '').replace(/([@+-])/g, '') }

   text = no(text)
   if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
   if (isNaN(text)) { var number = text.split`@`[1] } else if (!isNaN(text)) { var number = text }
   if (!text && !m.quoted) return conn.reply(m.chat, `Etiquete al usuario, escriba el número o responda al mensaje del usuario que desea REINICIAR`, m)
   if (isNaN(number)) return conn.reply(m.chat, `El número que ingresaste no es válido`, m)
   try {
      if (text) { var user = number + '@s.whatsapp.net' } else if (m.quoted.sender) { var user = m.quoted.sender } else if (m.mentionedJid) { var user = number + '@s.whatsapp.net' }
   } catch (e) { } finally {
      let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {}
      let participants = m.isGroup ? groupMetadata.participants : []
      let users = m.isGroup ? participants.find(u => u.jid == user) : {}
      let number = user.split('@')[0]
      delete global.db.data.users[user]
      conn.reply(m.chat, `*${llavea} USUARIO REINICIADO ${llavec}*\n\nSe reinició a @${number} de la *base de datos*`, null, { mentions: [user] })
   }
}
handler.help = ['resetear < @Num-user >']
handler.tags = ['owner']
handler.command = ['reset', 'reiniciaruser', 'resetear']

export default handler