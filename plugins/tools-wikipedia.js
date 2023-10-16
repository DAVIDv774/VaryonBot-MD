import axios from 'axios'
import cheerio from 'cheerio'


let handler = async (m, { text }) => {
   if (!text) m.reply(`Ingrese lo que quiere buscar en Wikipedia`)
   try { const link = await axios.get(`https://es.wikipedia.org/wiki/${text}`)
      const $ = cheerio.load(link.data)
      let wik = $('#firstHeading').text().trim()
      let resulw = $('#mw-content-text > div.mw-parser-output').find('p').text().trim()
      m.reply(`▢ *Wikipedia*\n\n‣ Buscado : ${wik}\n\n${resulw}`)} catch (e) { m.reply('No se han encontrado resultados ')}
}
handler.help = ['wikipedia']
handler.tags = ['servicio']
handler.command = ['wiki', 'wikipedia']


export default handler