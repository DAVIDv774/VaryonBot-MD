import { promises } from 'fs'
import { join } from 'path'

let handler = async function (m, { conn, __dirname }) {
let github = 'https://github.com/DAVIDv774/VaryonBot-MD'
  
m.reply(`*▢ ${namebot} / SCRIPT*

▢ Git : ${github}`.trim())}

handler.help = ['script']
handler.tags = ['main']
handler.command = ['sc', 'git', 'script'] 

export default handler