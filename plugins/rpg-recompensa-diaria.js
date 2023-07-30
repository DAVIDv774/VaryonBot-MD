const free = 5000
const prem = 20000
let handler = async (m, { conn, isPrems }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando est� deshabilitado para este grupo._`)
   let time = global.db.data.users[m.sender].lastclaim + 86400000
   if (new Date - global.db.data.users[m.sender].lastclaim < 86400000) throw `*Ya recogiste tu recompensa diaria*\n\n🕚 Vuelve en *${msToTime(time - new Date())}* `
   global.db.data.users[m.sender].exp += isPrems ? prem: free
   m.reply(`\n *${llavea} RECOMPENSA DIARIA ${llavec}*\n\n${cuadro} *Has recibido:*\n${XP}/ *XP* : +${isPrems ? prem: free}`)
   global.db.data.users[m.sender].lastclaim = new Date * 1
}
handler.help = ['diario']
handler.tags = ['econ']
handler.command = ['diario', 'claim']

export default handler



   function msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

      hours = (hours < 10) ? "0" + hours: hours
      minutes = (minutes < 10) ? "0" + minutes: minutes
      seconds = (seconds < 10) ? "0" + seconds: seconds

      return hours + " Horas " + minutes + " Minutos"
   }