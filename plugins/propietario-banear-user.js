let handler = async (m, { conn, text }) => {
   if (!text) return m.reply('A quien desea banear?')
   let who
   if (m.isGroup) who = m.mentionedJid[0]
   else who = m.chat
   if (!who) return m.reply('¡『Por favor etiquete al usuario que desea banear』!')
   let users = global.db.data.users
   users[who].banned = true
   conn.reply(m.chat, `『Usuario baneado』✓*\n~*ᴬʰᵒʳᵃ ᵉˡ ᴮᵒᵗ ⁿᵒ ʳᵉˢᵖᵒⁿᵈᵉʳᵃ ᵃ ⁿⁱⁿᵍᵘⁿ*~\n~*ᶜᵒᵐᵃⁿᵈᵒ ᵉⁿᵛⁱᵃᵈᵒ ᵖᵒʳ ᵉˢᵗᵉ ᵘˢᵘᵃʳⁱᵒ*`, m)
}

handler.help = ['banear @user']
handler.tags = ['owner']
handler.command = /^banear$/i
handler.rowner = true

handler.rowner = true

export default handler