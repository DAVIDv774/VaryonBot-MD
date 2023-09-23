import PhoneNumber from 'awesome-phonenumber'
let handler = async (m, { conn }) => {
  await sendContactArray(conn, m.chat, [
    [`573245088667`, `${await conn.getName('573245088667@s.whatsapp.net')}`, `⚡ Creador principal`, null],
    [`5216671993513`, `${await conn.getName('5216671993513@s.whatsapp.net')}`, `✨ Creador secundario`, null],
    [`5492622441096`, `${await conn.getName('5492622441096@s.whatsapp.net')}`, `🤝 Colaborador`, null]
 ], { key: { fromMe: false, participant: "0@s.whatsapp.net", ...(m.chat ? { remoteJid: "status@broadcast"} : {}) }, message: { contactMessage: { displayName: 'Varyon-Bot 24/7', vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;0,;;;\nFN:0,\nitem1.TEL;waid=${m.sender.split("@")[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`}}})
} 
handler.tags = ['main']
handler.help = ['creador']
handler.command = /^(creador)$/i
handler.exp = 100
export default handler

async function sendContactArray(conn, jid, data, quoted, options) { if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data]; let contacts = []; for (let [number, name, isi, isi1, isi2, isi3, isi4, isi5] of data) { number = number.replace(/[^0-9]/g, ''); let njid = number + '@s.whatsapp.net'; let biz = await conn.getBusinessProfile(njid).catch(_ => null) || {}
let vcard = `
BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN:${name.replace(/\n/g, '\\n')}
item.ORG:${isi}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:${isi1}
END:VCARD`.trim(); contacts.push({ vcard, displayName: name })}; return await conn.sendMessage(jid, { contacts: { displayName: (contacts.length > 1 ? `2013 kontak` : contacts[0].displayName) || null, contacts}}, { quoted, ...options })}