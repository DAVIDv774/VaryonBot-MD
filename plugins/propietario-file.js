//@DAVID774
import fs from 'fs'
import path from 'path'
let handler = async (m, { conn, text, args }) => {
    if (!args[0]) return m.reply('Y la dereccion del archivo?')
    const fileName = args[0].split('/').pop()
    const extension = fileName.split('.').pop()
    const ExtensionDetect = args[0].slice(-5)
    if (!ExtensionDetect.includes('.')) return fs.readdir(args[0], (error, archivos) => { if (error) { m.reply('Error al leer el directorio : ', error); return } const ruta = archivos.map(archivos => path.join(args[0], archivos)).join('\n'); m.reply(ruta) })
    let Vary = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: 'VaryonBot / ' + fileName, jpegThumbnail: null }}}
    if (text.toLowerCase().includes('delete = true'.toLowerCase())) { fs.unlink(args[0], (err) => { if (err) { m.reply('Error al eliminar el archivo:', err) } else { m.reply('Archivo eliminado exitosamente')}})}
    try { fs.accessSync(args[0], fs.constants.F_OK); if (args[0].endsWith('.jpg')) { conn.sendFile(m.chat, fs.readFileSync(args[0]), fileName, '', m, null, { quoted: Vary }) } conn.sendFile(m.chat, fs.readFileSync(args[0]), fileName, '', m, null, { mimetype: 'application/' + extension, quoted: Vary }) } catch (error) { m.reply('El archivo mencionado no existe.') }
}

handler.help = ['file < dirección >']
handler.tags = ['owner']
handler.command = /^(file)$/i
handler.rowner = true

export default handler