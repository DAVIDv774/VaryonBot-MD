let handler = async (m, { conn, args }) => {
	let Consejos = ['Aprende a utilizar las redstone para crear circuitos y mecanismos complejos, como puertas automáticas, sistemas de iluminación y trampas.',
'Utiliza granjas automáticas para obtener alimentos, materiales y experiencia de manera eficiente.',
'Practica técnicas de construcción avanzadas, como la redstone, la pistonería y los sistemas de transporte de elementos.',
'Experimenta con diferentes estilos de construcción y utiliza bloques decorativos y detallados para crear estructuras impresionantes.',
'Domina las técnicas de combate, como el uso del arco, la esquiva y el bloqueo, para enfrentarte a enemigos más desafiantes y jefes.',
'Descubre y explota las mazmorras, fortalezas y templos para obtener valiosos tesoros y desbloquear secretos del juego.',
'Participa en eventos de velocidad y parkour para poner a prueba y mejorar tus habilidades de movimiento y salto.',
'Domina el uso de encantamientos para mejorar tus armas, herramientas y armaduras.',
'Participa en desafíos de supervivencia personalizados o mapas de aventuras creados por la comunidad para poner a prueba tus habilidades',
'Experimenta con comandos de administrador para crear efectos especiales, ajustar la dificultad del juego y personalizar tu experiencia',
'Construye estructuras masivas y paisajes impresionantes utilizando herramientas de modelado de terreno y programas de diseño.',
'Participa en eventos de construcción y competencias de construcción para mostrar tus habilidades y ganar reconocimiento en la comunidad',
'Crea y administra tu propio servidor para jugar con amigos y crear tu propio mundo personalizado',
'Únete a comunidades de jugadores expertos para compartir ideas, consejos y proyectos interesantes',
'Participa en torneos PvP para competir contra otros jugadores y mejorar tu habilidad en el combate',
'Experimenta con mods y paquetes de modificaciones complejas para expandir aún más las posibilidades del juego',
'Domina el comercio con otros jugadores o aldeanos para obtener objetos raros y valiosos',
'Crea tus propios desafíos personalizados, como sobrevivir en un mundo desértico o completar ciertas tareas sin morir',
'Utiliza herramientas externas, como editores de inventario, para experimentar y personalizar aún más tu experiencia de juego.',
'¡Inspira a otros jugadores compartiendo tus proyectos, tutoriales y consejos en línea!'
]
  const Minecraft = 'https://www.dropbox.com/scl/fi/maqciebunyqhms36nvm0y/Minecraft-1-20-12-Oficial.apk?rlkey=nhs8oxd6ahhrv7ii9el8pfyz8&dl=true'
  let RandConsejos = Consejos[Math.floor(Math.random() * (Consejos.length))]
  let Mensaje = `*▢ Consejo :* ${RandConsejos}\n\n● Únete a nuestro servidor de Minecraft!`
  m.react(rwait); try { await conn.sendMessage(m.chat, { document: { url: Minecraft }, caption: Mensaje, mimetype: 'document/apk', fileName: 'Minecraft 1.20.12 Oficial.apk' }, { quoted: m }); m.react(done)} catch { await m.react(error) }
}
handler.help = ['Minecraft']
handler.tags = ['dl']
handler.command = ['minecraft', 'maincra', 'mc']
handler.exp = 100
export default handler