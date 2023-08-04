let handler = async (m, { conn, text, participants }) => {
   let member = participants.map(u => u.id)
   if (!text) { var sum = member.length } else { var sum = text }
   var total = 0
   var sider = []
   for (let i = 0; i < sum; i++) { let users = m.isGroup ? participants.find(u => u.id == member[i]): {}
      if ((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { if (typeof global.db.data.users[member[i]] !== 'undefined') {
            if (global.db.data.users[member[i]].whitelist == false) { total++
               sider.push(member[i])}} else { total++
            sider.push(member[i])}}}
   if (total == 0) return conn.reply(m.chat, `*Fantasmas... ¿No hay?*`, m)
   m.reply(`*!『 Inspeccion de inactivos 』¡*\n\n*GRUPO:* ${await conn.getName(m.chat)}\n*Miembros del grupo:* ${sum}\n\n*『 Lista de Fantasmas 』*\n${sider.map(v => '  👉🏻 @' + v.replace(/@.+/, '')).join('\n')}`, null, { mentions: sider })}
handler.command = /^(verfantasmas|fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true
export default handler