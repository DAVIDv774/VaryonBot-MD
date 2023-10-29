
let linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
export async function before(m, { conn, isAdmin, isBotAdmin, usedPrefix }) {
    if (m.isBaileys && m.fromMe) return !0
    if (!m.isGroup) return !1
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[this.user.jid] || {}
    let prt = m.key.participant
    let yid = m.key.id
    const isGroupLink = linkRegex.exec(m.text)
    if (chat.antiLink && isGroupLink && !isAdmin) {
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`
            if (m.text.includes(linkThisGroup)) return m.reply('[ ! ] Aea causa acabas de enviar un enlace, lo weno es que el enlace detectado es de este grupo owo')}
        await  conn.sendMessage(m.chat, { text: `_Enlace detectado_\n_@${m.sender.split("@")[0]} Adios..._\n`, mentions: [m.sender] }) 
        conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: yid, participant: prt }})
setTimeout(() => { conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove') }, 1000)}
    return !0
}
