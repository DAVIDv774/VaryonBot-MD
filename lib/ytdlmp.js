import ytdl from 'youtubedl-core'
import { randomBytes } from 'crypto'
import fs from 'fs'

const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/
const isYTUrl = (url) => { return ytIdRegex.test(url) }
const getVideoID = (url) => { if (!isYTUrl(url)) throw new Error('No es un link de YouTube'); return ytIdRegex.exec(url)[1] }
const fetchBuffer = async (url, options) => { try { options ? options : {}; const res = await axios({ method: "GET", url, headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36", 'DNT': 1, 'Upgrade-Insecure-Request': 1 }, ...options, responseType: 'arraybuffer' }); return res.data } catch (err) { return err } }

async function dlmp(link, formato = false, calidad) {
    if (!link) throw new Error('la ID del video es requerida')
    if (calidad == '480p' ?? calidad == '480') { calidad = 'medium' }
    else if (calidad == '720p' ?? calidad == '720') { calidad = 'hd720' }
    else if (calidad == '1080p' ?? calidad == '1080') { calidad = 'hd1080' }
    else if (calidad) { calidad = 'medium' } else { calidad = 'medium' }

    const url = isYTUrl(url) ? 'https://www.youtube.com/watch?v=' + getVideoID(link) : link
    const Info = await ytdl.getInfo(url, { lang: 'id' })
    const path = `./tmp/${randomBytes(3).toString('hex')}`

    const options = {
        quality: formato ? 'audio' : calidad,
        format: formato ? 'mp3' : 'mp4',
        output: formato ? path + '.mp3' : path + '.mp4'
    }
    ytdl.exec(url, options, (err, output) => { if (err) { console.error(err) } else { console.log(output) } })

    return {
        video: {
            title: Info.videoDetails.title,
            thumb: Info.videoDetails.thumbnails.slice(-1)[0],
            date: Info.videoDetails.publishDate,
            duration: Info.videoDetails.lengthSeconds,
            channel: Info.videoDetails.ownerChannelName,
            description: Info.videoDetails.description,
            path: path
        },
        audio: {
            title: Info.videoDetails.title,
            channel: Info.videoDetails.author.name,
            seconds: Info.videoDetails.lengthSeconds,
            image: Info.videoDetails.thumbnails.slice(-1)[0].url,
            size: fs.statSync(path).size,
            path: path
        }
    }
}

export { dlmp, fetchBuffer }

/*
highest: Descarga el video en la máxima calidad disponible.
lowest: Descarga el video en la calidad más baja disponible.
best: Descarga el video en la mejor calidad disponible.
worst: Descarga el video en la peor calidad disponible.
hd1080: Descarga el video en resolución 1080p.
hd720: Descarga el video en resolución 720p.
medium: Descarga el video en una calidad media.
small: Descarga el video en una calidad pequeña.
audio: Descarga solo el audio del video.
*/