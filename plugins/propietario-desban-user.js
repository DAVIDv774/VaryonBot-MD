let handler = async (m, { conn, text, isROwner, isOwner, isModr }) => {
   let who
   const data = global.owner.filter(([id, isCreator]) => id && isCreator)
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
   else who = m.chat
   if (isROwner || isOwner || isModr) {
      if (!text) return m.reply('A quien desea desbanear?')
      if (!who) return m.reply(`¡Por favor etiquete al usuario que desea desbanear!`)
      for (const [number] of data) {
         const textBaneado = `El usuario ${who.split`@`[0]}, no esta baneado`
         const textBanAction = `『 Usuario desbaneado correctamente 』✓`
         const Dbdata = global.db.data.users[who]
         if (m.sender.startsWith(number)) {
            if (!Dbdata.banned) return m.reply(textBaneado)
            Dbdata.banned = false
            conn.reply(m.chat, textBanAction, m)
         } else
            if (Dbdata.banActor.startsWith(number)) { m.reply(`Este usuario fue baneado por el creador del Bot, no puedes desbanearlo.`) } else {
               if (!Dbdata.banned) return m.reply(textBaneado)
               Dbdata.banned = false
               conn.reply(m.chat, textBanAction, m)
            }
      }
   } else global.dfail('owner', m, conn)
}
handler.help = ['desbanear @user']
handler.tags = ['owner']
handler.command = /^unban|desbanear$/i
handler.rowner = true

export default handler