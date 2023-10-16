//@DAVID774
import fs from 'fs'
import path from 'path'
import AdmZip from 'adm-zip'
let handler = async (m, { conn, text, args }) => {
    if (!args[0]) return m.reply('Y la dereccion del archivo?')
    const fileName = args[0].split('/').pop()
    const extension = fileName.split('.').pop()
    const ExtensionDetect = args[0].slice(-5)
    let Vary = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: 'VaryonBot / ' + fileName, jpegThumbnail: null } } }
    if (text.toLowerCase().includes('archive = true'.toLowerCase())) {
        const directorio = './tmp/' + fileName + '.zip'
        const Zip = new AdmZip()
        Zip.addLocalFolder(args[0])
        const ZipData = Zip.toBuffer()
        fs.writeFileSync(directorio, ZipData)
        conn.sendFile(m.chat, fs.readFileSync('./tmp/' + fileName + '.zip'), fileName + '.zip', '', m, null, { mimetype: 'application/.zip', quoted: Vary })
    }
    if (text.toLowerCase().includes('delete = true'.toLowerCase())) { fs.unlink(args[0], (err) => { if (err) { m.reply('Error al eliminar el archivo:', err) } else { m.reply('Archivo eliminado exitosamente') }})}
    if (text.toLowerCase().includes('create ='.toLowerCase())) {
        const regex = /\txt(.*?)(:\s*\d+)?\txt/
        const textD = regex.exec(`${text}`)
        const texto = textD && textD[1]
        fs.writeFileSync(`${args[0]}`, `${texto}`)
        m.reply(`se creó el archivo : ${fileName}\nCon el texto : ${texto}`)
    }

    if (!text.toLowerCase().includes('='.toLowerCase())) {
        if (!ExtensionDetect.includes('.')) return fs.readdir(args[0], (error, archivos) => { if (error) { m.reply('Error al leer el directorio : ', error); return } const ruta = archivos.map(archivos => path.join(args[0], archivos)).join('\n'); m.reply(ruta)})
        try { fs.accessSync(args[0], fs.constants.F_OK); if (args[0].endsWith('.jpg')) { conn.sendFile(m.chat, fs.readFileSync(args[0]), fileName, '', m, null, { quoted: Vary })} conn.sendFile(m.chat, fs.readFileSync(args[0]), fileName, '', m, null, { mimetype: 'application/' + extension, quoted: Vary }) } catch (error) { m.reply('El archivo mencionado no existe.') }
    }
}

handler.help = ['file <dirección>']
handler.tags = ['owner']
handler.command = /^(file)$/i
handler.rowner = true

export default handler