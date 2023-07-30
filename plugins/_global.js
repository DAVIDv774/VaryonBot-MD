import * as fs from 'fs'
let handler = m => m
handler.all = async function (m) {
	let Username = await this.getName(m.sender)
    let linkDiscord = 'https://discord.gg/vN533MJ8KF'

global.vary = { contextInfo: { externalAdReply: {
            thumbnail: fs.readFileSync('./multimedia/imagenes/music.jpg'),
            mediaUrl: WaLink,
            mediaType: 'VIDEO',
            description: 'El Bot mas chidori terser mundista',
            title: author,
            body: 'El Bot mas chidori terser mundista',
            sourceUrl: WaLink }}}

global.rpyt = { contextInfo: { externalAdReply: {
            thumbnail: fs.readFileSync('./multimedia/imagenes/mylogo.jpg'),
            mediaUrl: WaLink,
            mediaType: 'VIDEO',
            description: 'El Bot mas chidori terser mundista',
            title: author,
            body: 'El Bot mas chidori terser mundista',
            sourceUrl: WaLink }}}

   //NO SE XD
global.menu = { contextInfo: { externalAdReply: {
   	thumbnail: fs.readFileSync('./multimedia/imagenes/Discord.jpg'),
            mediaUrl: linkDiscord,
            mediaType: 'VIDEO',
            description: '¡Hola! '+ Username,
            title: '¡Hola! '+ Username + ', únete a nuestro servidor de Minecraft.',
            body: 'Presione aquí!',
            sourceUrl: linkDiscord
           }
        }
    }
}

global.rpg = { emoticon(string) { string = string.toLowerCase()
    let emot = { role: '🏅', level: '⬆️' }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]}, role(level) { level = parseInt(level)
    if (isNaN(level)) return { name: '', level: '' }
    const role = [{ name: 'Warrior V', level: 0 }, { name: 'Warrior IV', level: 4 }, { name: 'Warrior III', level: 8 }, { name: 'Warrior II', level: 12 }, { name: 'Warrior I', level: 16 }, { name: 'Paladin V', level: 20 }, { name: 'Paladin IV', level: 24 }, { name: 'Paladin III', level: 28 }, { name: 'Paladin II', level: 32 }, { name: 'Paladin I', level: 36 }, { name: 'Sorcerer V', level: 40 }, { name: 'Sorcerer IV', level: 44 }, { name: 'Sorcerer III', level: 48 }, { name: 'Sorcerer II', level: 52 }, { name: 'Sorcerer I', level: 56 }, { name: 'Ranger V', level: 60 }, { name: 'Ranger IV', level: 64 }, { name: 'Ranger III', level: 68 }, { name: 'Ranger II', level: 72 }, { name: 'Ranger I', level: 76 }, { name: 'Mage V', level: 80 }, { name: 'Mage IV', level: 84 }, { name: 'Mage III', level: 88 }, { name: 'Mage II', level: 92 }, { name: 'Mage I', level: 96 }, { name: 'Cleric V', level: 100 }, { name: 'Cleric IV', level: 104 }, { name: 'Cleric III', level: 108 }, { name: 'Cleric II', level: 112 }, { name: 'Cleric I', level: 116 }, { name: 'Thief V', level: 120 }, { name: 'Thief IV', level: 124 }, { name: 'Thief III', level: 128 }, { name: 'Thief II', level: 132 }, { name: 'Thief I', level: 136 }, { name: 'Assassin V', level: 140 }, { name: 'Assassin IV', level: 144 }, { name: 'Assassin III', level: 148 }, { name: 'Assassin II', level: 152 }, { name: 'Assassin I', level: 156 }, { name: 'Monk V', level: 160 }, { name: 'Monk IV', level: 164 }, { name: 'Monk III', level: 168 }, { name: 'Monk II', level: 172 }, { name: 'Monk I', level: 176 }, { name: 'Bard V', level: 180 }, { name: 'Bard IV', level: 184 }, { name: 'Bard III', level: 188 }, { name: 'Bard II', level: 192 }, { name: 'Bard I', level: 196 }, { name: 'Necromancer V', level: 200 }, { name: 'Necromancer IV', level: 204 }, { name: 'Necromancer III', level: 208 }, { name: 'Necromancer II', level: 212 }, { name: 'Necromancer I', level: 216 }, { name: 'Warlock V', level: 220 }, { name: 'Warlock IV', level: 224 }, { name: 'Warlock III', level: 228 }, { name: 'Warlock II', level: 232 }, { name: 'Warlock I', level: 236 }, { name: 'Wizard V', level: 240 }, { name: 'Wizard IV', level: 244 }, { name: 'Wizard III', level: 248 }, { name: 'Wizard II', level: 252 }, { name: 'Wizard I', level: 256 }, { name: 'Sage V', level: 260 }, { name: 'Sage IV', level: 264 }, { name: 'Sage III', level: 268 }, { name: 'Sage II', level: 272 }, { name: 'Sage I', level: 276 }, { name: 'Priest V', level: 280 }, { name: 'Priest IV', level: 284 }, { name: 'Priest III', level: 288 }, { name: 'Priest II', level: 292 }, { name: 'Priest I', level: 296 }, { name: 'Rogue V', level: 300 }, { name: 'Rogue IV', level: 304 }, { name: 'Rogue III', level: 308 }, { name: 'Rogue II', level: 312 }, { name: 'Rogue I', level: 316 }, { name: 'Brawler V', level: 320 }, { name: 'Brawler IV', level: 324 }, { name: 'Brawler III', level: 328 }, { name: 'Brawler II', level: 332 }, { name: 'Brawler I', level: 336 }, { name: 'Archer V', level: 340 }, { name: 'Archer IV', level: 344 }, { name: 'Archer III', level: 348 }, { name: 'Archer II', level: 352 }, { name: 'Archer I', level: 356 }, { name: 'Sniper V', level: 360 }, { name: 'Sniper IV', level: 364 }, { name: 'Sniper III', level: 368 }, { name: 'Sniper II', level: 372 }, { name: 'Sniper I', level: 376 }, { name: 'Ninja V', level: 380 }, { name: 'Ninja IV', level: 384 }, { name: 'Ninja III', level: 388 }, { name: 'Ninja II', level: 392 }, { name: 'Ninja I', level: 396 }, { name: 'Samurai V', level: 400 }, { name: 'Samurai IV', level: 404 }, { name: 'Samurai III', level: 408 }, { name: 'Samurai II', level: 412 }, { name: 'Samurai I', level: 416 }, { name: 'Berserker V', level: 420 }, { name: 'Berserker IV', level: 424 }, { name: 'Berserker III', level: 428 }, { name: 'Berserker II', level: 432 }, { name: 'Berserker I', level: 436 }, { name: 'Legend V', level: 440 }, { name: 'Legend IV', level: 444 }, { name: 'Legend III', level: 448 }, { name: 'Legend II', level: 452 }, { name: 'Legend I', level: 456 }, { name: 'Champion V', level: 460 }, { name: 'Champion IV', level: 464 }, { name: 'Champion III', level: 468 }, { name: 'Champion II', level: 472 }, { name: 'Champion I', level: 476 }, { name: 'Grandmaster V', level: 480 }, { name: 'Grandmaster IV', level: 484 }, { name: 'Grandmaster III', level: 488 }, { name: 'Grandmaster II', level: 492 }, { name: 'Grandmaster I', level: 496 }, { name: 'Elder V', level: 500 }, { name: 'Elder IV', level: 504 }, { name: 'Elder III', level: 508 }, { name: 'Elder II', level: 512 }, { name: 'Elder I', level: 516 }, { name: 'Immortal V', level: 520 }, { name: 'Immortal IV', level: 524 }, { name: 'Immortal III', level: 528 }, { name: 'Immortal II', level: 532 }, { name: 'Immortal I', level: 536 }, { name: 'Nephalem V', level: 540 }, { name: 'Nephalem IV', level: 544 }, { name: 'Nephalem III', level: 548 }, { name: 'Nephalem II', level: 552 }, { name: 'Nephalem I', level: 556 }, { name: 'Eternal V', level: 560 }, { name: 'Eternal IV', level: 564 }, { name: 'Eternal III', level: 568 }, { name: 'Eternal II', level: 572 }, { name: 'Eternal I', level: 576 }, { name: 'Neptune V', level: 580 }, { name: 'Neptune IV', level: 584 }, { name: 'Neptune III', level: 588 }, { name: 'Neptune II', level: 592 }, { name: 'Neptune I', level: 596 }, { name: 'Pluto V', level: 600 }, { name: 'Pluto IV', level: 604 }, { name: 'Pluto III', level: 608 }, { name: 'Pluto II', level: 612 }, { name: 'Pluto I', level: 616 }, { name: 'Eris V', level: 620 }, { name: 'Eris IV', level: 624 }, { name: 'Eris III', level: 628 }, { name: 'Eris II', level: 632 }, { name: 'Eris I', level: 636 }, { name: 'Ascension V', level: 640 }, { name: 'Ascension IV', level: 644 }, { name: 'Ascension III', level: 648 }, { name: 'Ascension II', level: 652 }, { name: 'Ascension I', level: 656 }, { name: 'Elysium V', level: 660 }, { name: 'Elysium IV', level: 664 }, { name: 'Elysium III', level: 668 }, { name: 'Elysium II', level: 672 }, { name: 'Elysium I', level: 676 }, { name: 'Ether V', level: 680 }, { name: 'Ether IV', level: 684 }, { name: 'Ether III', level: 688 }, { name: 'Ether II', level: 692 }, { name: 'Ether I', level: 696 }, { name: 'Gaea V', level: 700 }, { name: 'Gaea IV', level: 704 }, { name: 'Gaea III', level: 708 }, { name: 'Gaea II', level: 712 }, { name: 'Gaea I', level: 716 }, { name: 'Hades V', level: 720 }, { name: 'Hades IV', level: 724 }, { name: 'Hades III', level: 728 }, { name: 'Hades II', level: 732 }, { name: 'Hades I', level: 736 }, { name: 'Heimdall V', level: 740 }, { name: 'Heimdall IV', level: 744 }, { name: 'Heimdall III', level: 748 }, { name: 'Heimdall II', level: 752 }, { name: 'Heimdall I', level: 756 }, { name: 'Hyperion V', level: 760 }, { name: 'Hyperion IV', level: 764 }, { name: 'Hyperion III', level: 768 }, { name: 'Hyperion II', level: 772 }, { name: 'Hyperion I', level: 776 }, { name: 'Iris V', level: 780 }, { name: 'Iris IV', level: 784 }, { name: 'Iris III', level: 788 }, { name: 'Iris II', level: 792 }, { name: 'Iris I', level: 796 }, { name: 'Jupiter V', level: 800 }, { name: 'Jupiter IV', level: 804 }, { name: 'Jupiter III', level: 808 }, { name: 'Jupiter II', level: 812 }, { name: 'Jupiter I', level: 816 }, { name: 'Kronos V', level: 820 }, { name: 'Kronos IV', level: 824 }, { name: 'Kronos III', level: 828 }, { name: 'Kronos II', level: 832 }, { name: 'Kronos I', level: 836 }, { name: 'Lilith V', level: 840 }, { name: 'Lilith IV', level: 844 }, { name: 'Lilith III', level: 848 }, { name: 'Lilith II', level: 852 }, { name: 'Lilith I', level: 856 }, { name: 'Maelstrom V', level: 860 }, { name: 'Maelstrom IV', level: 864 }, { name: 'Maelstrom III', level: 868 }, { name: 'Maelstrom II', level: 872 }, { name: 'Maelstrom I', level: 876 }, { name: 'Nova V', level: 880 }, { name: 'Nova IV', level: 884 }, { name: 'Nova III', level: 888 }, { name: 'Nova II', level: 892 }, { name: 'Nova I', level: 896 }, { name: 'Odin V', level: 900 }, { name: 'Odin IV', level: 904 }, { name: 'Odin III', level: 908 }, { name: 'Odin II', level: 912 }, { name: 'Odin I', level: 916 }, { name: 'Osiris V', level: 920 }, { name: 'Osiris IV', level: 924 }, { name: 'Osiris III', level: 928 }, { name: 'Osiris II', level: 932 }, { name: 'Osiris I', level: 936 }, { name: 'Poseidon V', level: 940 }, { name: 'Poseidon IV', level: 944 }, { name: 'Poseidon III', level: 948 }, { name: 'Poseidon II', level: 952 }, { name: 'Poseidon I', level: 956 }, { name: 'Ragnarok V', level: 960 }, { name: 'Ragnarok IV', level: 964 }, { name: 'Ragnarok III', level: 968 }, { name: 'Ragnarok II', level: 972 }, { name: 'Ragnarok I', level: 976 }, { name: 'Saturn V', level: 980 }, { name: 'Saturn IV', level: 984 }, { name: 'Saturn III', level: 988 }, { name: 'Saturn II', level: 992 }, { name: 'Saturn I', level: 996 }, { name: 'Titan V', level: 1000 }, { name: 'Titan IV', level: 1004 }, { name: 'Titan III', level: 1008 }, { name: 'Titan II', level: 1012 }, { name: 'Titan I', level: 1016 }, { name: 'Uranus V', level: 1020 }, { name: 'Uranus IV', level: 1024 }, { name: 'Uranus III', level: 1028 }, { name: 'Uranus II', level: 1032 }, { name: 'Uranus I', level: 1036 }, { name: 'Venus V', level: 1040 }, { name: 'Venus IV', level: 1044 }, { name: 'Venus III', level: 1048 }, { name: 'Venus II', level: 1052 }, { name: 'Venus I', level: 1056 }, { name: 'Zeus V', level: 1060 }, { name: 'Zeus IV', level: 1064 }, { name: 'Zeus III', level: 1068 }, { name: 'Zeus II', level: 1072 }, { name: 'Zeus I', level: 1076 }]; return role.reverse().find(role => level >= role.level)}}
      
global.sabiasq = [
"El 16% de las mujeres nacen rubias, y 33% de las mujeres son rubias.",
   "El sol libera más energía en un segundo que toda la energía consumida por la humanidad desde su inicio.",
   "Napoleón Bonaparte calculo que las piedras de las pirámides de Egipto, serían suficientes para construir un  muro alrededor de Francia.",
   "La letra “J”, es la única letra que no aparece en la tabla periódica.",
   "Una persona parpadea aproximadamente 25 mil veces por semana.",
   "El elefante es el único animal con 4 rodillas.",
   "El material más resistente creado por la naturaleza es la tela de Araña.",
   "Los rusos atienden el teléfono diciendo “Estoy oyendo”",
   "La hija de Shakespeare era analfabeta.",
   "Einstein nunca fue un buen alumno, y ni siquiera hablaba bien a los 9 años, sus padres creían que era retrasado mental.",
   "Los CDs fueron diseñados para recibir 72 minutos de música porque esa es la duración de la Novena Sinfonía de Beethoven.",
   "Las caricaturas del Pato Donald fueron vetadas en Finlandia porque éste no usaba pantalón.",
   "Un kilo de papas fritas cuesta 200 veces lo que vale un kilo de patatas.",
   "En la ciudad de Los Ángeles hay más automóviles que gente.",
   "El nombre más común del mundo es Mohammed.",
   "Los perezosos pueden aguantar más tiempo el aliento que los delfines",
   "Los Froot Loops son todos del mismo sabor",
   "Las manzanas en el supermercado pueden tener hasta un año",
   "Los pulpos tienen 3 corazones",
   "En las Filipinas, McDonald´s vende spaghetti",
   "Hitler fue nominado a un Nobel de la Paz",
   "Las langostas saborean con los pies",
   "El Empire State tiene su propio código postal",
   "Las sombras son más oscuras en la luna",
   "La Estatua de la Libertad solía ser un faro",
   "Las ManhattAnts son una especie de hormigas únicas de Nueva York",
   "Los tanques británicos están equipados para hacer té",
   "*( Los aguacates son una fruta, no una verdura. )* Técnicamente se consideran una baya de una sola semilla, lo creas o no.",
   "*( La Torre Eiffel puede ser 15 cm más alta durante el verano. )* Todo tiene una explicación, se debe a la expansión térmica que significa que el hierro se calienta, las partículas ganan energía cinética y ocupan más espacio.",
   "*( La tripofobia es el miedo a los agujeros muy juntos. )* O más específicamente, una aversión a la vista de patrones irregulares o grupos de pequeños agujeros o protuberancias.",
   "*( Australia es más ancha que la Luna. )* La Luna tiene 3400 km de diámetro, mientras que el diámetro de Australia de este a oeste es de casi 4000 km.",
   "*( 'Melifluo' es un sonido que resulta agradablemente suave y musical al escucharlo. )*",
   "*( Las Spice Girls se llamaban originalmente Touch. )* Cuando empezamos [con el nombre Touch], éramos bastante sosas, dijo Mel C a The Guardian en 2018. Sentíamos que teníamos que encajar en un molde.",
   "*( Los dientes humanos son la única parte del cuerpo que no puede curarse por sí misma. )* Los dientes están recubiertos de esmalte, que no es un tejido vivo.",
   "*( En Suiza es ilegal tener una sola cobaya. )* Se considera maltrato animal porque son seres sociales y se sienten solos.",
   "*Los antiguos romanos solían echar un trozo de pan tostado en el vino* para tener buena salud, de ahí que brindemos.",
   "*( El corazón de las gambas se encuentra en la cabeza. )* También tienen un sistema circulatorio abierto, lo que significa que no tienen arterias y sus órganos flotan directamente en la sangre.",
   "*( Amy Poehler sólo tenía siete años más que Rachel McAdams* cuando asumió el papel de mamá guay en Chicas malas. Rachel tenía 25 años como Regina George, Amy tenía 32 como su madre.",
   "*( La gente es más creativa en la ducha. )* Cuando nos duchamos con agua caliente, experimentamos un mayor flujo de dopamina que nos hace más creativos.",
   "*( Los conejos bebé se llaman gazapos. )* ¡Qué bonito!",
   "*( El unicornio es el animal nacional de Escocia. )* Al parecer, se eligió por su relación con el dominio y la caballerosidad, así como con la pureza y la inocencia en la mitología celta.",
   "*( El primer avión voló el 17 de diciembre de 1903. )* Wilbur y Orville Wright realizaron cuatro breves vuelos en Kitty Hawk, Carolina del Norte, con su primera aeronave a motor, también conocida como el primer avión.",
   "*( Venus es el único planeta que gira en el sentido de las agujas del reloj. )* Viaja alrededor del sol una vez cada 225 días terrestres, pero gira en el sentido de las agujas del reloj una vez cada 243 días.",
   "*( La nuez moscada es un alucinógeno. )* La especia contiene miristicina, un compuesto natural que tiene efectos alteradores de la mente si se ingiere en grandes dosis.",
   "*( Las artes solía ser un deporte olímpico. )* Entre 1912 y 1948, los eventos deportivos internacionales otorgaban medallas a la música, la pintura, la escultura y la arquitectura.",
   "*( El gorro de cocinero tiene 100 pliegues. )* Al parecer, pretende representar las 100 formas en que se puede cocinar un huevo.",
   "*( En 2014, hubo un 'match' de Tinder en la Antártida. )* Dos investigadores coincidieron en la aplicación global de citas en la parte más remota del mundo: un hombre que trabajaba en la estación antártica McMurdo de Estados Unidos y una mujer que acampaba a 45 minutos en helicóptero. ¿Qué posibilidades hay?",
   "*( El himno nacional español no tiene letra. )* La Marcha Real es uno de los cuatro únicos himnos nacionales del mundo (junto con los de Bosnia y Herzegovina, Kosovo y San Marino) que no tienen letra oficial.",
   "*( La palabra japonesa, Kuchi zamishi )* es el acto de comer cuando no se tiene hambre porque, literalmente, la boca se siente sola. Nosotras lo hacemos a menudo.",
   "*( La probabilidad de que exista una langosta azul es de una entre dos millones. )* Las langostas azules son de ese color debido a una anomalía genética que hace que produzcan más cantidad de una determinada proteína que de otras.",
   "*( Sólo hay una letra que no aparece en el nombre de ningún estado americano. )* Hay una Z en Arizona y una X en Texas, pero ninguna Q en ninguno de ellos.",
   "*( Las icónicas suelas rojas de los zapatos Louboutin se inspiraron en Andy Warhol. )* El dibujo del artista pop de los años 60, Flowers, llamó la atención del famoso diseñador y le dio la idea de añadir la famosa suela a sus diseños.",
   "*El libro A la recherche du temps perdu,* de Marcel Proust, contiene unos 9.609.000 caracteres, lo que lo convierte en el libro más largo del mundo. El título se traduce como Recuerdo de las cosas pasadas.",
   "*Google Images se creó literalmente después de que* Jennifer López llevara ese famoso vestido en los Grammy del año 2000. Tanta gente buscaba su 'look' que el motor de búsqueda añadió una función de buscar imágenes.",
   "*( El reloj del Big Ben se detuvo a las 22:07 horas del 27 de mayo de 2005, )* probablemente debido a una temperatura extremadamente alta de 31,8 grados centígrados.",
   "*( Walt Disney es actualmente el que más premios de la Academia tiene. )* Disney ganó 26 premios Oscar a lo largo de su carrera y fue nominado un total de 59 veces.",
   "*( Hay una fruta que sabe a budín de chocolate. )* Al parecer, hay una fruta originaria de América Central y del Sur llamada zapote negro que sabe a chocolate y a natillas dulces.",
   "*( La Reina Isabel II tenía formación en mecánica. )* Con 16 años se incorporó a la bolsa de trabajo británica y aprendió los fundamentos de la reparación de camiones. Al parecer, sabía reparar neumáticos y motores. ¿Hay algo que la Reina no pudiera hacer?",
   "*( Las cabezas de la Isla de Pascua tienen cuerpo. )* Hablamos de esas icónicas cabezas de piedra, ya las conoces. En la década de 2010, los arqueólogos descubrieron que dos de las figuras de las islas del Pacífico tenían torsos que medían hasta 10 metros.",
   "*( Las palomas pueden distinguir entre Picasso y Monet. )* Un estudio realizado en 1995 demuestra que las aves pueden diferenciar entre los dos artistas.",
   "*( Los actores que ponen voz a Mickey y Minnie se han casado en la vida real. )* Russi Taylor (Minnie) y Wayne Allwine (Mickey) se casaron en 1991.",
]

export default handler