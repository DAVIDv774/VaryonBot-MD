let handler = async (m, { conn, command, text, isROwner, isOwner, isModr }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    const db = global.db.data.users[who]
    const usuario = who.slice(0, -15)
    const textMention = `Etiqueta o menciona al usuario`
    const User = `@${who.split`@`[0]}`

    if (command == 'addowner') {
        if (!isOwner ?? !isROwner) return global.dfail('owner', m, conn)
        if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
        if (db.owner) return m.reply('El usuario mensionado ya es owner')
        db.owner = true
        db.modr = true
        db.premium = true
        conn.reply(m.chat, User + ' ahora te conviertes en Owner', m, { mentions: [who] })
    } else
        if (command == 'delowner') {
            if (!isOwner ?? !isROwner) return global.dfail('owner', m, conn)
            if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
            if (!db.owner) return m.reply('El usuario mensionado no es owner')
            db.owner = false
            db.modr = false
            db.premium = false
            conn.reply(m.chat, User + ' ya no eres owner', m, { mentions: [who] })
        } else

            if (command == 'addmodr' || command == 'addmoderador') {
                if (!isOwner ?? !isROwner) return global.dfail('owner', m, conn)
                if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
                db.owner = false
                ///////
                db.modr = true
                db.premium = true
                conn.reply(m.chat, db.owner ? User +' Has sido degradado a moderador': User + ' ahora te conviertes en moderador' , m, { mentions: [who] })
            } else

                if (command == 'delmodr' || command == 'delmoderador') {
                    if (!isOwner ?? !isROwner) return global.dfail('owner', m, conn)
                    if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
                    db.owner = false
                    ///////
                    db.modr = false
                    db.premium = false
                    conn.reply(m.chat, User + ' ya no eres moderador', m, { mentions: [who] })
                } else

                    if (command == 'addprem' || command == 'addpremium') {
                        if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
                        if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
                        db.owner = false
                        db.modr = false
                        ///////
                        db.premium = true

                        conn.reply(m.chat, db.modr ? User +' Has sido degradado a usuario premium': User + ' ahora te conviertes en un usuario premium' , m, { mentions: [who] })
                    } else

                        if (command == 'delprem' || command == 'delpremium') {
                            if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
                            if (!isNaN(usuario && m.mentionedJid[0] && text)) return m.reply(textMention)
                            db.owner = false
                            db.modr = false
                            ///////
                            db.premium = false
                            conn.reply(m.chat, User + ' Ya no eres usuario premium' , m, { mentions: [who] })
                        }
}
handler.help = ['addowner', 'delowner', 'addmoderador', 'delmoderador', 'addprem', 'delprem'].map(v => v +' @tag')
handler.tags = ['owner']
handler.command = ['addowner', 'delowner', 'addmodr', 'delmodr', 'addmoderador', 'delmoderador', 'delprem', 'delpremium', 'addprem', 'addpremium']
handler.group = true

export default handler