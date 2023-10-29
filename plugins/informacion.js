import Connection from '../lib/connection.js'
import { plugins } from '../lib/plugins.js'
import { cpus as _cpus, totalmem, freemem, platform, type, arch, hostname } from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import fs from 'fs'
import now from 'performance-now'
let format = sizeFormatter({ std: 'JEDEC', decimalPlaces: 2, keepTrailingZeroes: false, render: (literal, symbol) => `${literal} ${symbol}B` })
let handler = async (m, { conn }) => {
  let pp = './multimedia/imagenes/logo.jpg'
  const chats = Object.entries(Connection.store.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us')) //groups.filter(v => !v.read_only)
  const used = process.memoryUsage()
  const cpus = _cpus().map(cpu => { cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0); return cpu })
  const cpu = cpus.reduce((last, cpu, _, { length }) => { 
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, { speed: 0, total: 0, times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 } })
  const message = m.reply('Obteniendo información...')
  let old = performance.now(); await message
  let neww = performance.now()
  let speed = neww - old
  let _uptime = process.uptime() * 1000
  let uptime = timeString(process.uptime())
  let more = String.fromCharCode(8206)
  let masss = more.repeat(850)
  var timestamp = now()
  let texto = `*INFORMACIÓN DEL BOT*
${masss}
▢ *Bot : _(activo)*
▢ *Tiempo de ejecucion :* [ ${uptime} ]
▢ *Apodo en Whatsapp :*
● ${conn.user.name}
▢ *Version del bot :* 0.2.1 beta
▢ *Grupos con mayor actividad : ${groupsIn.length}*
▢ *Grupos nuevos : ${groupsIn.length}*
▢ *Grupos abandonados : ${groupsIn.length - groupsIn.length}*
▢ *Chats personales : ${chats.length - groupsIn.length}*
▢ *Total de chats : ${chats.length}*
▢ *Menu hits : ${menu_hit.length}*
▢ *Total de plugins : ${Object.keys(plugins).length}*
▢ *Velocidad de procesamiento : ${speed} MLS...*
▢ *Velocidad de conexion: ${now() - timestamp.toFixed(4)} S...*
▢ *RAM: ${format(totalmem() - freemem())} / ${format(totalmem())}*
▢ *Plataforma : ${platform()}*
▢ *Base OS : ${type()}*
▢ *Arquitectura : ${arch()}*
▢ *Host :* ${hostname()}

● *Consumó de memoria :*
${'```' + Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n') + '```'}

● ${cpus[0] ? ` *Uso total de CPU*
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}

*CPU Core(s) Usado (${cpus.length} Core CPU)*
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}`

  let _Reply = {
    contextInfo: {
      externalAdReply: {
        thumbnail: fs.readFileSync('./multimedia/imagenes/mylogo.jpg'),
        mediaUrl: 'https://varyon.com',
        mediaType: 'VIDEO',
        description: 'null',
        title: '『 Varyon-Bot 』| ○ en linea',
        body: `Activo: ${uptime} / procesamiento : ${speed} milisegundos`,
        sourceUrl: 'https://varyon.com'
      }
    }
  }
  conn.sendFile(m.chat, pp, 'Imagen.jpg', texto, m, null, _Reply)
}

handler.tags = ['main']
handler.help = ['informacion']
handler.command = /^(informacion|speed|info)$/i

export default handler

function timeString(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " : " : " : ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " : " : " : ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " : " : " : ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}
