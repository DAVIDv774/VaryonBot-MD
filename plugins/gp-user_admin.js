let handler = async (m, { conn, command, text, isAdmin, isROwner, isOwner }) => {
   let who
   if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
   const User = who.slice(0, -15)
   const textmetion = `Etiqueta o menciona al usuario`
   if (!isAdmin ?? !isOwner ?? !isROwner) return global.dfail('admin', m, conn)
   if (!isNaN(User && m.mentionedJid[0] && text)) return m.reply(textmetion)
   if (command == 'promote' || command == 'addadmin') { try { await conn.groupParticipantsUpdate(m.chat, [who], "promote"); m.react(done) } catch { await m.react(error) } } else if (command == 'demote' || command == 'deladmin') { try { await conn.groupParticipantsUpdate(m.chat, [who], "demote"); m.react(done) } catch { await m.react(error) }}
}

handler.help = ['demote', 'promote'].map(v => v + ' < @user >')
handler.tags = ['group']
handler.command = ['demote', 'deladmin', /**/ 'promote', 'demote']
handler.group = true

export default handler