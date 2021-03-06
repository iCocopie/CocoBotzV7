let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const chats = conn.chats.all()
const groups = chats.filter(v => v.jid.endsWith('g.us'))
const defaultMenu = {
  before: `
${ucapan()} *%name* ๐

๐ Hari : *%week %weton* 
๐๏ธ Tanggal Masehi : *%date*
๐ Tanggal Hijriyah : *%dateIslamic*
โฒ Server Time : *%time*

โ ๐ค *USER INFO*
๐ช WhatsApp Version : *2.21.24.22*
๐ Limit : *%limit*
๐ท Role : *%role*
๐ Level : *%level* 
๐ Total XP : *%totalexp*

โ ๐ค๏ธ *BOT INFO*
๐คพโโ๏ธ Bot Name : *CocoBotz*
๐งพ Mode : *Public Mode*
โ๏ธ Prefix : *Multi Prefix*
๐ป Platform : *Linux*
๐ Browser : *Chrome*
๐ Server : *Baileys*
โฐ Uptime : *%uptime (%muptime)*
๐ฅ Database : *%rtotalreg* Of *%totalreg*
`.trimStart(),
  header: 'ใ *%category* ใ',
  body: 'โข %cmd %islimit %isPremium',
  footer: '\n',
  after: `
*CocoBotz V7*
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
	let { anon, anticall, antispam, antitroli, backup, jadibot, groupOnly, nsfw } = global.db.data.settings[conn.user.jid]
    let totaljadibot = [...new Set([...global.conns.filter(conn => conn.user && conn.state !== 'close').map(conn => conn.user)])]

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'edukasi', 'news', 'xp', 'stiker', 'image', 'anime', 'kerangajaib', 'quotes', 'admin', 'rpg', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'sound', 'vn', 'jadibot', 'info','virus', 'vote', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'edukasi': 'Edukasi',
    'news': 'News',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'rpg': 'Epic Rpg',
    'group': 'Grup',
    'anime': 'Anime',
    'premium': 'Premium',
    'internet': 'Internet',
    'image': 'Random Image',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Islam',
    'audio': 'Pengubah Suara',
    'sound': 'Sound Music',
    'vn': 'Vn Imuet',
    'jadibot': 'Jadi Bot',
    'virus': 'Virus',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'news') tags = {
    'news': 'News'
  }
  if (teks == 'edukasi') tags = {
    'edukasi': 'Edukasi'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'rpg') tags = {
    'rpg': 'Epic Rpg'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'image') tags = {
    'image': 'Random Image'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
    if (teks == 'anime') tags = {
    'anime': 'Anime'
  }
  if (teks == 'quran') tags = {
    'quran': 'Islam'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'sound') tags = {
    'sound': 'Sound Music'
  }
  
  if (teks == 'vn') tags = {
    'vn': 'Vn Imuet'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'virus') tags = {
    'virus': 'Virus'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let names = m.fromMe ? conn.user : conn.contacts[who]
    let pushname = `${names.vnmae || names.notify || names.names || ('+' + names.jid.split`@`[0])}`
    let pushn = '_*Daftar Dulu Ya Kak Supaya Namanya Muncul Disini :3*_'
    let name = registered ? global.db.data.users[m.sender].name : pushn
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, ${name}`.trim(),
          "description": `
โ *BOT INFO*
๐คพโโ๏ธ Bot Name : *CocoBotz V7*
๐งพ Mode : *Multi Mode*
โ๏ธ Prefix : *Multi Prefix*
๐ช WhatsApp Version : *2.21.24.20*
๐ป Platform : *Linux*
๐ Browser : *Chrome*
๐ Server : *Baileys*
๐ฅ Database : *Lib 4.0.0*

ยฉCocopie || 2022`.trim(),
          "buttonText": "๐ CLICK HERE",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `[๐งพ] Semua Perintah`,
                  "description": "Memberikan Semua Command Bot",
                  "rowId": ".? all"
                }, {
                  "title": "[๐] Islam",
                  "description": "Menu Tentang Islam",
                  "rowId": ".? quran"
                }, {
                  "title": "[๐ซ] Edukasi",
                  "description": "Menu Edukasi",
                  "rowId": ".? edukasi"
                }, {
                  "title": "[๐ฐ] News",
                  "description": "Menu Berita",
                  "rowId": ".? News"
                },  {
                  "title": "[๐ฎ] Game",
                  "description": "Menu Game",
                  "rowId": ".? game"
                }, {
                  "title": "[๐บ๏ธ] Epic Rpg",
                  "description": "Menu Game RPG",
                  "rowId": ".? rpg"
                }, {
                  "title": "[๐] XP",
                  "description": "XP Dan Level",
                  "rowId": ".? xp"
                }, {
                  "title": "[๐ผ๏ธ] Random Image",
                  "description": "Menu Foto Random",
                  "rowId": ".? image"
                }, {
                  "title": "[๐] Stiker",
                  "description": "Menu Buat Stiker",
                  "rowId": ".? stiker"
                }, {
                  "title": "[๐] Kerang Ajaib",
                  "description": "Menurut Kerang Ajaib....",
                  "rowId": ".? kerangajaib"
                }, {
                  "title": "[๐] Quotes",
                  "description": "Menu Quotes",
                  "rowId": ".? quotes"
                }, {
                  "title": "[๐๏ธ] Admin",
                  "description": "Menu Admin Group",
                  "rowId": ".? admin"
                }, {
                  "title": "[๐ข] Grup",
                  "description": "Menu Group",
                  "rowId": ".? grup"
                }, {
                  "title": "[๐] Premium",
                  "description": "Menu Untuk Premium User",
                  "rowId": ".? premium"
                }, {
                  "title": "[๐ฅ๏ธ] Internet",
                  "description": "Cari Sesuatu Di Bot",
                  "rowId": ".? internet"
                }, {
                  "title": "[๐ฅท] Anonymous",
                  "description": "Mainkan Anonymous Chat",
                  "rowId": ".? anonymous"
                }, {
                  "title": "[โ๏ธ] Nulis & Logo",
                  "description": "Menu Nulis & Logo",
                  "rowId": ".? nulis"
                }, {
                  "title": "[๐บ] Downloader",
                  "description": "Download Sesuatu Di Bot",
                  "rowId": ".? downloader"
                }, {
                  "title": "[๐ง] Tools",
                  "description": "Tools Yang Bisa di Gunakan Di Bot",
                  "rowId": ".? tools"
                }, {
                  "title": "[๐] Fun",
                  "description": "Menu Ceria",
                  "rowId": ".? fun"
                }, {
                  "title": "[๐] Database",
                  "description": "Simpan Sesuatu Di Bot",
                  "rowId": ".? database"
                }, {
                  "title": "[๐] Vote & Absen",
                  "description": "Menu Vote & Absen",
                  "rowId": ".? vote"
                }, {
                  "title": "[๐๏ธ] Pengubah Suara",
                  "description": "Ubah Suaramu",
                  "rowId": ".? audio"
                }, {
                  "title": "[๐๏ธ] Sound Music",
                  "description": "Dengar Music Singkat",
                  "rowId": ".? sound"
                }, {
                  "title": "[๐๏ธ] Vn Imuet",
                  "description": "Mendengarkan Vn Yang Sangat Imuet",
                  "rowId": ".? vn"
                }, {
                  "title": "[๐ค] Jadi Bot",
                  "description": "Jadi Bot",
                  "rowId": ".? jadibot"
                }, {
                  "title": "[โฉ๏ธ] Anime",
                  "description": "Cari Anime Di Bot",
                  "rowId": ".? anime"
                }, {
                  "title": "[โน๏ธ] Info",
                  "description": "Info Tentang Bot",
                  "rowId": ".? info"
                }, {
                  "title": "[๐ง] Virus",
                  "description": "Virus Yang Bisa Membuat Whatsapp Orang Ngelag/Error",
                  "rowId": ".? virus"
                }, {
                  "title": "Tanpa Kategori",
                  "description": "",
                  "rowId": ".? tanpakategori"
                }, {
                  "title": "[๐งโ๐ป] Owner",
                  "description": "Menu Khusus Owner",
                  "rowId": ".? owner"
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // โใ DAFTAR MENU ใ
    // โ ${_p + command} all
    // โ ${_p + command} game
    // โ ${_p + command} xp
    // โ ${_p + command} stiker
    // โ ${_p + command} kerang
    // โ ${_p + command} quotes
    // โ ${_p + command} admin
    // โ ${_p + command} group
    // โ ${_p + command} premium
    // โ ${_p + command} internet
    // โ ${_p + command} anonymous
    // โ ${_p + command} nulis
    // โ ${_p + command} downloader
    // โ ${_p + command} tools
    // โ ${_p + command} fun
    // โ ${_p + command} database
    // โ ${_p + command} vote
    // โ ${_p + command} quran
    // โ ${_p + command} audio
    // โ ${_p + command} sound
    // โ ${_p + command} vn
    // โ ${_p + command} virus
    // โ ${_p + command} jadibot
    // โ ${_p + command} info
    // โ ${_p + command} tanpa kategori
    // โ ${_p + command} owner
    // โโโโโ  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.sendButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), footer, '๐ค OWNER', '.owner', m)
    // await conn.send3ButtonLoc(m.chat, await (await fetch(`https://i.ibb.co/fH0hppT/mikey.jpg`)).buffer(), text.trim(), 'Recoded By Dawnfrosty', 'Pemilik Bot', '.owner', 'Donasi', '.donasi', 'Rules', '.infobot', m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', '?', 'help']
handler.tags = ['main']
handler.command = /^(menu|\?|help)$/i

handler.exp = 3

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat Pagi ๐"
  if (time >= 4) {
    res = "Selamat Pagi ๐"
  }
  if (time > 10) {
    res = "Selamat Siang ๐"
  }
  if (time >= 15) {
    res = "Selamat Sore ๐"
  }
  if (time >= 18) {
    res = "Selamat Malam ๐"
  }
  return res
}
