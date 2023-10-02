let handler = async (m, { conn, command, isROwner, isOwner, isModr }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    const db = global.db.data.users[who]
    const textMention = `Etiqueta o menciona al usuario`

    if (command == 'addowner') {
        if (!isROwner || !isOwner) return global.dfail('owner', m, conn)
        if (!who) return m.reply(textMention)
        if (db.owner) return m.reply('El usuario mensionado ya es owner')
        db.owner = true
        conn.reply(m.chat, `@${who.split`@`[0]} ahora te conviertes en Owner`, m, { mentions: [who] })
    } else
        if (command == 'delowner') {
            if (!isROwner || !isOwner) return global.dfail('owner', m, conn)
            if (!who) return m.reply(textMention)
            if (!db.owner) return m.reply('El usuario mensionado no es owner')
            db.owner = false
            conn.reply(m.chat, `@${who.split`@`[0]} ya no eres owner`, m, { mentions: [who] })
        } else

            if (command == 'addmodr' || command == 'addmoderador') {
                if (!isROwner || !isOwner) return global.dfail('owner', m, conn)
                if (!who) return m.reply(textMention)
                if (db.owner) return m.reply('El usuario mensionado ya es moderador')
                db.owner = true
                conn.reply(m.chat, `@${who.split`@`[0]} ahora te conviertes en un moderador`, m, { mentions: [who] })
            } else

                if (command == 'delmodr' || command == 'delmoderador') {
                    if (!isROwner || !isOwner) return global.dfail('owner', m, conn)
                    if (!who) return m.reply(textMention)
                    if (!db.owner) return m.reply('El usuario mensionado no es moderador')
                    db.owner = false
                    conn.reply(m.chat, `@${who.split`@`[0]} ya no eres moderador`, m, { mentions: [who] })
                } else

                    if (command == 'addprem' || command == 'addpremium') {
                        if (!isROwner || !isOwner || !isModr) return global.dfail('owner', m, conn)
                        if (!who) return m.reply(`Menciona al usuario que desea volver premium`)
                        if (db.premium) return m.reply('El usuario mensionado ya es premium')
                        db.premium = true
                        conn.reply(m.chat, `@${who.split`@`[0]} ahora te conviertes en un usuario premium`, m, { mentions: [who] })
                    } else

                        if (command == 'delprem' || command == 'delpremium') {
                            if (!isROwner || !isOwner || !isModr) return global.dfail('owner', m, conn)
                            if (!who) return m.reply(textMention)
                            if (!db.premium) return m.reply('El usuario mensionado no es premium')
                            db.premium = false
                            conn.reply(m.chat, `@${who.split`@`[0]} ahora te conviertes en un usuario premium`, m, { mentions: [who] })
                        }
}
handler.help = ['addowner <@tag>', 'delowner <@tag>', 'addmoderador <@tag>', 'delmoderador <@tag>', 'addprem <@tag>', 'delprem <@tag>']
handler.tags = ['owner']
handler.command = ['addowner', 'delowner', 'addmodr', 'delmodr', 'addmoderador', 'delmoderador', 'delprem', 'delpremium', 'addprem', 'addpremium']
handler.group = true

export default handler