let handler = async (m) => { global.db.data.chats[m.chat].isBanned = false
    m.reply('*『 Chat desbaneado correctamente 』✓*')}
    
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^unbanchat$/i
handler.owner = true

export default handler