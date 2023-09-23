import speed from 'performance-now'
import { spawn, exec, execSync } from 'child_process'
let handler = async (m, { conn }) => { let timestamp = speed(); let latensi = speed() - timestamp; exec(`neofetch --stdout`, (error, stdout, stderr) => { let child = stdout.toString("utf-8"); let ssd = child.replace(/Memory:/, "Ram:")
      let pongs = ["Pierde la partida*","Pong!!!","Pong!!!","Pong!","Pong!","Pong!","Pong!","Pong! Responde con un golpe a 160 kmh","Pong ","Pong ","Pong! Le da un golpe en la cabeza","Pong ","Pong ","Pong!! Le rompe el craneo","Pong ","Pong!","Pong!","Pong ","Pong!!! Le gana la partida","Pong!! Lo mata"]
      let Pong = pongs[Math.floor(Math.random() * pongs.length)]; m.reply(`${ssd} ${Pong}. *Velocidad de Repuesta* ${latensi.toFixed(4)} ms`)})}
handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping']

export default handler