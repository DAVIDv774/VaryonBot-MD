
import { canLevelUp } from '../lib/levelling.js'
export function before(m) { let user = global.db.data.users[m.sender]
    if (!user.autolevelup) return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++

    if (before !== user.level) {
        user.role = global.rpg.role(user.level).name
        m.reply(`
Felicidades, ${this.getName(m.sender)} subiste de nivel!
♻️ Nivel anterior : ${before}
🪀 Nivel actual : ${user.level}
⚔️ Rol : ${user.role}
	`.trim())
    }
}
export const disabled = true