import { spawn } from 'child_process'
import { join } from 'path'

const __dirname = global.__dirname(import.meta.url)
export function levelup(teks, level) {
    return new Promise(async (resolve, reject) => {
        if (!(global.support.convert || global.support.magick || global.support.gm)) return reject('\n¡No soportado!\n')
        const font = join(__dirname, '../multimedia/font')
        let fontLevel = join(font, './level_c.otf')
        let fontTexts = join(font, './texts.otf')
        let fontMini = join(font, './futur.ttf')
        let xtsx = join(__dirname, '../multimedia/lvlup_template.jpg')
        let anotations = '+1420+245' // gapake else if kadang error
        if (level > 2) anotations = '+1415+245'
        if (level > 9) anotations = '+1380+245'
        if (level > 19) anotations = '+1370+245'
        if (level > 99) anotations = '+1335+245'
        
        const [_spawnprocess, ..._spawnargs] = [...(global.support.gm ? ['gm'] : global.support.magick ? ['magick'] : []),
            'convert',
            xtsx,
            '-font',
            fontTexts,
            '-fill',
            '#000000',
            '-size',
            '1024x784',
            '-pointsize',
            '68.5',
            '-interline-spacing',
            '-1.5',
            '-annotate',
            '+110+70',
            teks,
            '-font',
            fontTexts,
            '-fill',
            '#00f3a3',
            '-size',
            '1024x784',
            '-pointsize',
            '68',
            '-interline-spacing',
            '-7.5',
            '-annotate',
            '+110+70',
            teks,
            //
            '-font',
            fontLevel,
            '-fill',
            '#00c3ff',
            '-size',
            '1024x784',
            '-pointsize',
            '100',
            '-interline-spacing',
            '-1.2',
            '-annotate',
            anotations,
            level,
            //
            '-font',
            fontMini,
            '-fill',
            '#c9d0db',
            '-size',
            '1024x784',
            '-pointsize',
            '30',
            '-interline-spacing',
            '-2.5',
            '-annotate',
            '+110+380',
            NombreBot,
            '-append',
            'jpg:-'
        ]
        let bufs = []
        spawn(_spawnprocess, _spawnargs)
            .on('error', reject)
            .on('close', () => {
                return resolve(Buffer.concat(bufs))
            })
            .stdout.on('data', chunk => bufs.push(chunk))
    })
}