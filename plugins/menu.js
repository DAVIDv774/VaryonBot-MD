import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import { plugins } from '../lib/plugins.js'
let tags = {
  'rg': 'REGISTRO',
   'main': 'CMDS / RANDOM',
   'conversor': 'STICKER / CONVERSORES',
   'game': 'RPG / JUEGOS',
   'econ': 'CMDS / RPG',
   'group': 'CMDS / GRUPO',
   'enable': 'EN/DISABLE OPCIONES',
   'servicio': 'BÚSQUEDAS',
   'dl': 'DESCARGAS',
   'owner': 'PROPIETARIO / CREADOR',
   'advanced': 'AVANZADO',
}
global.menu_hit = []
let handler = async (m, { conn, usedPrefix: _p, __dirname, command, isPrems }) => {
	try {
    let sabiasque = sabiasq[Math.floor(Math.random() * sabiasq.length)]
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, level, role } = global.db.data.users[m.sender]
    let prem = isPrems?'Si':'No'
    let coin = isPrems?'∞': global.db.data.users[m.sender].coin
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) { process.send('uptime')
    _muptime = await new Promise(resolve => { process.once('message', resolve); setTimeout(resolve, 1000)}) * 1000}
    let muptime = clockString(_muptime)
    let uptime = timeString(process.uptime())
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(plugins).filter(plugin => !plugin.disabled).map(plugin => { return { help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help], tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags], prefix: 'customPrefix' in plugin, limit: plugin.coin, premium: plugin.premium, enabled: !plugin.disabled,}}); for (let plugin of help) if (plugin && 'tags' in plugin) for (let tag of plugin.tags) if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `By https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [ before, ...Object.keys(tags).map(tag => { return header.replace(/%category/g, tags[tag]) + '\n' + [ ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => { return menu.help.map(help => { return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? '(Limitado)' : '').replace(/%isPremium/g, menu.premium ? '(Premium)' : '').trim()}).join('\n')}), footer ].join('\n') }), after ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = { '%': '%', p: _p, uptime, muptime, me: conn.getName(conn.user.jid), npmname: global.namebot, npmdesc: _package.description, version: _package.version, exp: exp - min, maxexp: xp, totalexp: exp, xp4levelup: max - exp, sabíasque : sabiasque, prop: global.Nomowner, pref: global.Prefijo, github: _package.homepage ? _package.homepage.url || _package.homepage : '[ URL de github inválido ]', level, coin, name, prem, totalreg, rtotalreg, role, readmore: readMore }

    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = './multimedia/imagenes/logo.jpg'
    conn.sendFile(m.chat, pp, 'Imagen.jpg', text.trim(), m, null, menu); m.react('📚') 
    
    let settingstatus = 0; if (new Date() * 1 - settingstatus > 1000) { await conn.query({tag: 'iq', attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status', }, content: [{ tag: 'status', attrs: {}, content: Buffer.from(`『Ѵᴀʀʏᴏɴ/𝐁ᴏᴛ』Tiempo activo : `+uptime, 'utf-8')}]}).catch((_) => _); settingstatus = new Date() * 1;} } catch (e) { conn.reply(m.chat, '*『 Ocurrio un error en el menú 』*', m); throw e }}

const defaultMenu = { before: `
╭─╼I『 \`\`\`%npmname\`\`\` 』I╾∘
┃
┃ *Usuario :* %name
┃ *Coin/s :* %coin
┃ *premium :* %prem
┃ *Rol :* %role
┠─────────────
┃ *Tiempo activo :* [ %uptime ]
┃ *Version del bot :* %version
┃ *Usuarios registrados :* %rtotalreg/%totalreg
┃ *Creador :* %prop
┃ *wa.me/573245088667*
╰─────────────
● *Hola!* %name, únete a nuestro servidor de Minecraft!
▢ Ingresa al servidor de Discord, una vez dentro busca en el apartado de [ *Server-IP* ], ahí encontrarás la *IP* y el *Puerto* del servidor de Minecraft.

▢ *Discord :* https://discord.gg/vN533MJ8KF

%readmore
*☲ Menu de comandos*\n`.trimStart(),
  header: '╔I *「 %category 」*\n║╭—————————',
  body: '║├  %cmd %islimit %isPremium',
  footer: '║╰—————————\n╚══════════\n',
  after: ``,
}
handler.help = ['menu', 'help', '?']
handler.command = /^(menu|help|menú|\?)$/i
handler.exp = 3

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(850)

function timeString(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? ":" : ":") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
