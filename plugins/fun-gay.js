let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const User = who.slice(0, -15)
    if (!isNaN(User && m.mentionedJid[0] && text)) return m.reply('A quien quieres follarte? 🥵')
    const numero = Math.floor(Math.random() * 1000)
    await conn.reply(m.chat, `🤤👅🥵 *ACABAS DE FOLLARTEL@!* 🥵👅🤤\n\n*_Te acabas de follar a la perra de @${who.split`@`[0]} a 4 patas mientras te gemia como una maldita perra_* *"Aaahh, sigue, no pares.."* *_y la has dejado tan revendata que no puede sostener ni su propio cuerpo la maldita zorra${numero < 200 ? ' barata' : ''}!_*\n\n*@${who.split`@`[0]} ¡YA TE HAN FOLLADO! Y${numero < 200 ? ' SOLO' : ''} TE RELLENARON CON ${numero} DE XP*`, m, { mentions: [who] })
    global.db.data.users[m.sender].exp -= numero
    global.db.data.users[who].exp += numero
}

handler.help = ['follar']
handler.tags = ['main']
handler.command = ['follar', 'follr']
export default handler

/*await conn.reply(m.chat, `🤤👅🥵 *ACABAS DE FOLLARTEL@!* 🥵👅🤤
    *_Te acabas de follar a la perra de @${who.split`@`[0]} a 4 patas mientras te gemia como una maldita perra_* *"Aaahh, sigue, no pares.."* *_y la has dejado tan revendata que no puede sostener ni su propio cuerpo la maldita zorra${numero < 200 ? ' barata' : null}!_*\n\n@${who.split`@`[0]}\n🤤🥵 *¡YA TE HAN FOLLADO!* 🥵🤤\nTe rellenaron con ${numero} de XP`, m, { mentions: [who] })*/
