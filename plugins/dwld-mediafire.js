import axios from 'axios';
import cheerio from 'cheerio';
import { mediafiredl } from '@bochilteam/scraper';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!global.db.data.chats[m.chat].cmdDl && m.isGroup) return m.reply(`_Este comando está deshabilitado para este grupo._`)
    if (!args[0]) return m.reply(`Y el link?`)
    try {
        m.react(rwait)
        const resEX = await mediafiredl(args[0]);
        const captionES = `『 MEDIAFIRE / VaryonBot 』
    
*▢ Nombre:*  ${resEX.filename}
*▢ Tamaño:* ${resEX.filesizeH}
*▢ Extension:* ${resEX.ext}

Enviando archivo${readMore}`.trim();
        m.reply(captionES);
        await conn.sendFile(m.chat, resEX.url, resEX.filename, '', m, null, { mimetype: resEX.ext, asDocument: true }); m.react(done)
        if (global.db.data.chats[m.chat].cmdRpg) { m.coin = true } else {/*FUAP*/ }
    } catch {
        try {
            m.react(rwait)
            const res = await mediafireDl(args[0]);
            const { name, size, date, mime, link } = res;
            const caption = `『 MEDIAFIRE / VaryonBot 』
      
*▢ Nombre:*  ${name}
*▢ Tamaño:* ${filesizeH} ${size}
*▢ Extension:* ${mime}

Enviando archivo${readMore}`.trim();
            await m.reply(caption);
            await conn.sendFile(m.chat, link, name, '', m, null, { mimetype: mime, asDocument: true }); m.react(done)
            if (global.db.data.chats[m.chat].cmdRpg) { m.coin = true } else {/*FUAP*/ }
        } catch {
            await m.reply(error)
        }
    }
}

handler.help = ['mediafire'].map(v => v + ' <url>')
handler.tags = ['dl']
handler.command = /^(mediafire|mf)$/i
export default handler;

async function mediafireDl(url) {
    const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/', '')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
    const $ = cheerio.load(res.data);
    const link = $('#downloadButton').attr('href');
    const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ', '').replaceAll('\n', '');
    const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
    const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ', '');
    let mime = '';
    const rese = await axios.head(link);
    mime = rese.headers['content-type'];
    return { name, size, date, mime, link };
}