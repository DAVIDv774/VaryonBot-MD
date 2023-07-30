import { spawn } from 'child_process'
let handler = async (m, { conn, isROwner, text }) => {
   if (!process.send) m.reply('Dont: node main.js\nDo: node index.js')
   if (conn.user.jid == conn.user.jid) { await m.reply('Reiniciando Bot...\n Espere un momento')
      process.send('reset') } else m.reply('eh')
}

handler.help = ['restart']
handler.tags = ['owner']
handler.command = ['restart', 'reiniciar']

handler.rowner = true

export default handler