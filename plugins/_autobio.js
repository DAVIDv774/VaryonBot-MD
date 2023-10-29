let handler = m => m
handler.all = async function (m) {

    let uptime = timeString(process.uptime())
    let settingstatus = 0
    if (new Date() * 1 - settingstatus > 1000) {
        await this.query({ tag: 'iq', attrs: { to: '@s.whatsapp.net', type: 'set', xmlns: 'status', }, content: [{ tag: 'status', attrs: {}, content: Buffer.from(`『Ѵᴀʀʏᴏɴ/𝐁ᴏᴛ』Tiempo activo : ` + uptime, 'utf-8') }] }).catch((_) => _)
        settingstatus = new Date() * 1
    }

    /*let setting = global.db.data.settings[this.user.jid]

    let _muptime
    if (process.send) { 
        process.send('uptime')
        _muptime = await new Promise(resolve => {
            process.once('message', resolve)
            setTimeout(resolve, 1000)
        }) * 1000


    let muptime = clockString(_muptime)
    let bio = `\n🟢 Tiempo Activo ${muptime}\n\n ┃ 💎  By FG98`
    await this.updateProfileStatus(bio).catch(_ => _)
    setting.status = new Date() * 1

    /*function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [d, ' Día(s) ️', h, ' Hora(s) ', m, ' Minuto(s)'].map(v => v.toString().padStart(2, 0)).join('')
}*/

}
export default handler

function timeString(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ":" : ":") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? ":" : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}