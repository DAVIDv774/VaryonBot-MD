import { createHash } from 'crypto'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {

   let user = global.db.data.users[m.sender]
   let name2 = conn.getName(m.sender)
   if (user.registered === true) m.reply(`Ya estás registrado\n\n¿Quiere volver a registrarse?\n\nUse este comando para eliminar su registro \n*${usedPrefix}unreg* <Número de serie>`)
   if (!Reg.test(text)) m.reply(`Formato incorrecto\n\n Uso del comamdo: *${usedPrefix + command} nombre.edad*\nEjemplo : *${usedPrefix + command}* ${name2}.16`)

   let [_, name, splitter,age] = text.match(Reg)

   if (!name) m.reply('El nombre no puede estar vacío')
   if (!age) m.reply('La edad no puede estar vacía')
   if (name.length >= 30) m.reply('El nombre es demasiado largo')
   age = parseInt(age)
   if (age > 100) m.reply('👴🏻 Wow el abuelo quiere jugar al bot')
   if (age < 5) m.reply('🚼  hay un abuelo bebé jsjsj ')

   user.name = name.trim()
   user.age = age
   user.regTime = + new Date
   user.registered = true

   let sn = createHash('md5').update(m.sender).digest('hex')
   m.reply(`『 *REGISTRADO* 』\n▢ *Nombre:* ${name}\n▢ *Edad* : ${age} años\n▢ *Numero de serie* :\n${sn}\n\n_*${usedPrefix}help* para ver el Menu_`.trim())
}
handler.help = ['reg'].map(v => v + ' <nombre.edad>')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler