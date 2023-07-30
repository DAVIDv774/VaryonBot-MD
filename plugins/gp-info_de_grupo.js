let handler = async (m, { conn, participants, groupMetadata }) => {
   
   let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './multimedia/avatar_contact.png'
   let groupAdmins = participants.filter(p => p.admin)
   let listAdmin = groupAdmins.map((v, i) => `${i + 1}. _@${v.id.split('@')[0]}_`).join('\n')
   let owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
   let sumadmin = participants.filter(x => x.admin === 'admin').length + participants.filter(x => x.admin === 'superadmin').length
   let more = String.fromCharCode(8206)
   let masss = more.repeat(850)
   let text = `
   *Nombre del grupo* : ${groupMetadata.subject}
   *Creado por* : _${'@'+owner.split('@')[0] ? '@'+owner.split('@')[0]: "Número del creador principal no encontrado"}_
   *Fecha de creación* : _${formatDate(groupMetadata.creation * 1000)}_
   *Total de participantes* : _${participants.length}_
   *Total de administradores* : _${sumadmin}_
   ${listAdmin}
   *No administradores* : _${participants.filter(x => x.admin === null).length}_
   *ID del grupo* : _${groupMetadata.id}_
   *Descripción* : \n${masss}\n${groupMetadata.desc?.toString()}
   `.trim()
   conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, {
      mentions: [...groupAdmins.map(v => v.id), owner]
   })
}

handler.help = ['gpinfo']
handler.tags = ['group']
handler.command = /^(gpinfo|infogp|groupinfo)$/i

handler.group = true

export default handler

   function formatDate(n, locale = 'es') {
      let d = new Date(n)
      return d.toLocaleDateString(locale, {
         weekday: 'long',
         day: 'numeric',
         month: 'long',
         year: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric'
      })
   }