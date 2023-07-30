import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
	if (!global.db.data.chats[m.chat].cmdRpg && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
   let name = conn.getName(m.sender)
   let user = global.db.data.users[m.sender]
   if (!canLevelUp(user.level, user.exp, global.multiplier)) {
      let { min, xp, max } = xpRange(user.level, global.multiplier); m.reply(`*『TU NIVEL ACTUAL』*\n\n▢ Nombre : *${name}*\n▢ Nivel : *${user.level}*\n▢ XP : *${user.exp - min}/${xp}*\n▢ Rango : *${user.role}*\n\nTe falta *${max - user.exp}* de *XP* para subir de nivel`)}
      
   let before = user.level * 1
   while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
   if (before !== user.level) {
      user.role = global.rpg.role(user.level).name
      let teks = `Bien hecho ${conn.getName(m.sender)} Nivel:`
      let str = `*『 SUBES DE LEVEL 』*\n\n▢ Nivel anterior : *${before}*\n▢ Nivel actual : *${user.level}*\n▢ Rango : *${user.role}*\n\n*Cuanto más interactúes con los bots, mayor será tu nivel*`.trim()
      
      try { const img = await levelup(teks, user.level)
         conn.sendFile(m.chat, img, 'levelup.jpg', str, m)} catch (e) { m.reply(str)}}
}

handler.help = ['levelup']
handler.tags = ['econ']
handler.command = ['level', 'nivel', 'subirnivel', 'lvl', 'levelup']

export default handler