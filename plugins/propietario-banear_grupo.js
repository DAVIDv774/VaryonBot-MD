let handler = async (m) => { global.db.data.chats[m.chat].isBanned = true; m.reply('*『 Chat baneado correctamente 』✓*\n  ~*ᴬʰᵒʳᵃ ᵉˢᵗᵉ ᴮᵒᵗ ⁿᵒ ʳᵉˢᵖᵒⁿᵈᵉʳᵃ́ ᵃ ˡᵒˢ*~\n  ~*ᵐᵉⁿˢᵃʲᵉˢ ᵉⁿᵛⁱᵃᵈᵒˢ ᵃ ᵉˢᵗᵉ ᶜʰᵃᵗ*~')}

handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.owner = true

export default handler