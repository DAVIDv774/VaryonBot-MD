let handler = async (m, { conn, text, isROwner, isOwner, isModr }) => {
   let who
   const data = global.owner.filter(([id, isCreator]) => id && isCreator)
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
   else who = m.chat
   if (isROwner || isOwner || isModr) {
      if (!text) return m.reply('A quien desea banear?')
      if (!who) return m.reply('¡Por favor etiquete al usuario que desea banear!')
      for (let [number] of data) {
         const Dbdata = global.db.data.users[who]
         if (who.startsWith(number)) return m.reply(`No puedes banear al creador del Bot`)
         if (Dbdata.banned) { m.reply(`El usuario ${who.split`@`[0]}, ya estuvo baneado anteriormente`) } else {
            Dbdata.banned = true
            Dbdata.banActor = m.sender
            conn.reply(m.chat, `*Usuario baneado correctamente ✓*\n~*ᴬʰᵒʳᵃ ᵉˡ ᴮᵒᵗ ⁿᵒ ʳᵉˢᵖᵒⁿᵈᵉʳᵃ ᵃ ⁿⁱⁿᵍᵘⁿ*~\n~*ᶜᵒᵐᵃⁿᵈᵒ ᵉⁿᵛⁱᵃᵈᵒ ᵖᵒʳ ᵉˢᵗᵉ ᵘˢᵘᵃʳⁱᵒ*~`, m)
         }
      }
   } else global.dfail('owner', m, conn)
}

handler.help = ['banear @user']
handler.tags = ['owner']
handler.command = /^banear$/i

export default handler