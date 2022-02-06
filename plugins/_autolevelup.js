let handler = m => m
let levelling = require('../lib/levelling')
handler.before = m => {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup) return
    if (m.sender === global.conn.user.jid) return
    let before = user.level * 1
    while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let str = `Selamat @${m.sender.split`@`[0]} Kamu Telah Naik level 😱
*Level Sebelumnya : ${before}*\nLevel Saat Ini : *${user.level}*
`.trim()
        conn.send2Button(m.chat, str, footer, 'PROFILE', '#profile', 'Off AutoLevelUp', '#off autolevelup', false, {
            contextInfo: {
                mentionedJid: [m.sender]
            }
        })
    }
    return true
}
 
module.exports = handler
