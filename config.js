import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { join, dirname } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const dPkg = require(join(__dirname, './package.json'))
//
global.Botvercion = `${dPkg.version}`
global.Nombrebot = `${dPkg.name}`
global.DescripBot = `${dPkg.description}`
global.Prefijo = '.'
global.author = '○ Varyon-Bot - 𝟸𝟺/𝟽'
global.namebot = 'Varyon-Bot'
global.Nomowner = '『𝗗𝗔𝗩𝗜𝗗/⁷̶⁷̶⁴̶』'
global.Numowner = '573127268448'
global.WaLink = 'https://chat.whatsapp.com'
//global.fgig = '○ Varyon-Bot - 𝟸𝟺/𝟽'

global.owner = [
   ['573245088667', '『𝗗𝗔𝗩𝗜𝗗/⁷̶⁷̶⁴̶』', true],
   ['51924543252'],
   ['5216671993513'],
   ['549262244-1096']
] //Numeros de owner

global.mods = ['573127268448', '5216671993513']
global.prems = ['573127268448', '5216671993513', '549262244-1096', '51924543252']

// API Prefix
global.APIs = { name: 'https://website'}
global.APIKeys = { 'https://website': 'apikey'}

global.wait = '_*Procesando, por favor espere...*_'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✔️'
global.error = '✖️'
global.xmoji = '🔥'

global.llavea = '『'
global.llavec = '』'
global.cuadro = '▢'
global.XP = '✨'
global.MONEDA = '©️'
global.felicidades = '🎉'
global.puntonegro = '●'
global.listasig = '☲'

global.tituloemoji = '📌'
global.publicadoemoji = '📆'
global.duracionemoji = '⏳'
global.vistasemoji = '👀'
global.linkemoji = '🔗'
global.tvantigua = '📺'

global.mp3audio = '🎧'
global.mp4video = '🎥'

global.multiplier = 69
global.maxwarn = '2' // máxima advertencias
global.multiplier = 1000

let file = fileURLToPath(import.meta.url)
watchFile(file, () => { unwatchFile(file)
console.log(chalk.redBright("Update 'config.js'"))
import(`${file}?update=${Date.now()}`)})