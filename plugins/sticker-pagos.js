let handler = async (m, { conn, args }) => {
	if (!m.quoted) return m.reply('\u00A1 Responda un sticker!')
    if (/sticker/.test(m.quoted.mtype)) {
	await conn.relayMessage(m.chat,{requestPaymentMessage:{currencyCodeIso4217:'USD',amount1000:priceRand(10,10000),noteMessage:{stickerMessage:Object.assign({},m.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage)}}},{})
	m.react('\uD83D\uDCB2')
	}
}

handler.help = ['spago']
handler.tags = ['conversor']
handler.command = /^(spago|sprecio|scosto)$/i

export default handler

function priceRand(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
