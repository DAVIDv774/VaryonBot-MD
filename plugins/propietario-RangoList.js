let handler = async (m, { conn, command, isROwner, isOwner, isModr }) => {
   if (command == 'banlist') {
      if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
      let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
      m.reply(`*${llavea} USUARIOS BANEADOS ${llavec}*\n\n▢ Total : *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `
${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}
▢ ${jid}`.trim()).join('\n\n') : ''}`.trim())
   } else
      if (command == 'premlist') {
         if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
         let users = Object.entries(global.db.data.users).filter(user => user[1].premium)
         m.reply(`*${llavea} USUARIOS PREMIUM ${llavec}*\n\n▢ Total : *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `
${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}
▢ ${jid}`.trim()).join('\n\n') : ''}`.trim())
      } else
         if (command == 'modrlist' || command == 'moderadorlist') {
            if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
            let users = Object.entries(global.db.data.users).filter(user => user[1].modr)
            m.reply(`*${llavea} MODERADORES ${llavec}*\n\n▢ Total : *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `
${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}
▢ ${jid}`.trim()).join('\n\n') : ''}`.trim())
         } else
            if (command == 'ownerlist') {
               if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
               let users = Object.entries(global.db.data.users).filter(user => user[1].owner)
               m.reply(`*${llavea} OWNERS ${llavec}*\n\n▢ Total : *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `
${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}
▢ ${jid}`.trim()).join('\n\n') : ''}`.trim())
            } else
               if (command == 'rownerlist') {
                  if (!isModr ?? !isOwner ?? !isROwner) return global.dfail('owner', m, conn)
                  let users = Object.entries(global.db.data.users).filter(user => user[1].rowner)
                  m.reply(`*${llavea} ROWNERS ${llavec}*\n\n▢ Total : *${users.length}*\n\n${users ? '\n' + users.map(([jid], i) => `
${i + 1}. ${conn.getName(jid) == undefined ? 'Desconocido' : conn.getName(jid)}
▢ ${jid}`.trim()).join('\n\n') : ''}`.trim())
               }
}
handler.help = ['banlist', 'premlist', 'modrlist', 'ownerlist']
handler.tags = ['owner']
handler.command = ['banlist', 'premlist', 'modrlist', 'moderadorlist', 'ownerlist', 'rownerlist']

export default handler