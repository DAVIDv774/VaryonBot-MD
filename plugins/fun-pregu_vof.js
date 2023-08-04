async function handler(m, {conn, command }) {
    let type = (command).toLowerCase()
    let username = await conn.getName(m.sender)
    switch (type) {

        case 'preguntame': {
            var pregunta = ['¿Crees que las amistades son para siempre?', '¿Hasta qué punto llegarías por conseguir fama?', '¿Qué te frustra más no haber conseguido?', '¿Qué talento desearía tener?', '¿Cómo definirías tu tipo de sentido del humor?', '¿Qué tipo de personas son más atractivas para ti?', '¿Quién te ha influenciado más en esta vida?', '¿Con qué personaje de ficción te identificas más?', '¿Cuál ha sido tu mejor momento de tu vida?', '¿Qué es lo que echas más de menos de tu infancia?', '¿Quién es la persona más importante de tu vida?', '¿Qué tipo de música te gusta más?', 'Si te hicieras un tatuaje, ¿de qué se trataría?', '¿Qué es lo que más deseas en este mundo?', '¿Cuál es tu película favorita? ¿Por qué?', '¿Cuál es el recuerdo más vergonzoso de tu infancia?', '¿Qué comerías en tu última cena?', '¿Hay alguna prenda de ropa que no te pondrías nunca?', '¿Qué superpoder tendrías si pudieras elegir?', 'Si dominaras el mundo, ¿qué harías para cambiarlo?', '¿Tienes algún libro favorito? ¿Cuál es?', '¿Cuál sería tu trabajo soñado?', '¿Tienes algún secreto que no me hayas contado?', '¿Alguna vez te has descargado una app para ligar?', '¿Te has sentido atraído hacia una hermana (o hermano) de un amigo/a?', '¿Quieres más a tu perro (o gato) que a algún otro miembro de tu familia?', '¿Qué tipo de personas te asustan más?', '¿Qué es lo más extraño que has hecho por comer algo que te apetecía?', 'Si te gastaran una broma pesada, ¿cómo te vengarías?', '¿Cómo sería un día perfecto para ti?', 'Si pudieses saber sólo una cosa del futuro, ¿qué preguntarías?', 'Si fueras un fantasma que habita una casa encantada, ¿Cómo atraerías a la gente dentro?', '¿Qué es lo que te pone más nervioso?', '¿Cuál es el momento en el que te has sentido más sexy a lo largo de tu vida?', '¿Qué harías si te diera un ataque de risa en una situación inapropiada o en lugar del que no puedes salir?', '¿Qué es lo más vergonzoso que te han atrapado haciendo?', '¿A quién querrías ver desnudo/a y a quién odiarías ver así?', 'Si te tuvieras que poner un nombre a ti mismo, ¿cuál sería?', '¿Qué animal te gustaría ser y por qué?', '¿Qué harías si ganaras la lotería?', 'Si pudieses intercambiar tu vida con alguien, ¿con quién sería?', '¿Cómo harías reír a alguien?', '¿Qué parte de tu cuerpo te gusta más y por qué?', '¿Qué es lo más loco que has hecho por amor?', 'Si pudieras encerrar a alguien de por vida, ¿a quién sería?', '¿Qué harías si un/a desconocido/a te besara en plena calle?', '¿Cuál ha sido el sueño más extraño que has tenido nunca?', '¿En qué época te hubiese gustado vivir?', '¿Qué superpoder querrías tener?', 'Si tuvieras diez segundos para un deseo, ¿qué pedirías?', '¿Sin cuál de los cinco sentidos podrías vivir?', 'Si pudieras cenar con cualquier personaje histórico, ¿a quién elegirías?', 'Si te dijesen que eres inmortal y que ninguno de tus actos va a ser castigado, ¿qué sería lo primero que harías?', 'Si fueses capaz de cambiar algo en el mundo... ¿qué cambiarías?', 'Si pudieras viajar en el tiempo, ¿viajarías al pasado o al futuro?', '¿Qué querías ser de adulto cuando eras niño?', 'Si fueras un producto, ¿cuál sería tu nombre?', '¿Por qué crees que te pusieron tu nombre?', '¿crees que es peligroso comer halgo que cayo al suelo?', 'Si los seres humanos crecemos a partir de aprender de nuestros errores, ¿por qué tenemos miedo a fallar?', '¿Qué es lo que haces por la noche cuando no puedes dormir?', '¿Cómo crees que vas a ser como pareja?', '¿Qué crees que es lo que te impide ser completamente feliz?', '¿Qué es lo que más miedo te da?', 'Si tuvieras suficiente dinero como para que no tener que trabajar nunca, ¿en qué te dedicarías en tu tiempo libre?', '¿Cómo cambiarías el mundo si pudieras?', 'Si pudieras convertirte en famoso, ¿qué te gustaría que fuera lo que te hiciera famoso?', 'Si pudieras viajar tres años atrás en el tiempo, ¿qué consejo te darías a ti mismo?', 'Piensa en la peor cosa que te haya ocurrido en toda tu vida. ¿Qué aprendiste sobre ello?', '¿Crees que el dinero ayuda a comprar la felicidad?', '¿Cómo le explicarías la palabra “amor” a alguien sin usar la palabra “amor”?', '¿Cómo describirías un día perfecto desde que te levantas hasta que te acuestas?', '¿Qué has aprendido en tu vida que consideras que te va a ser lo más útil?', 'Si pudieras vivir en cualquier lugar del mundo, ¿dónde sería?', 'Imagina que eres el presidente y necesitas escoger a tres personas para que te ayuden: ¿cuáles serían y por qué?', 'Si pudieras hacer un regalo a cada persona del mundo pero solo pudiera ser el mismo, ¿cuál sería?', 'Si pudieras tener un solo superpoder, ¿cuál sería?', '¿Preferirías ser el jefe o un empleado?', '¿Qué preferirías: 1.000.000 € hoy mismo o 1 céntimo duplicado cada día durante 30 días?', '¿Crees que los de tu generación son realmente diferentes a cómo son las otras generaciones?', '¿Cómo crees que se acabará el mundo?', '¿Hay algo de tu cuerpo con lo que no te sientas a gusto?', '¿Qué es lo que más te motiva?', '¿Cómo de masculino o femenino te sientes?', '¿Crees que los alienígenas existen?', '¿Qué series te gusta ver?', '¿Quién es tu profesor favorito y cuál es el que peor te cae?', '¿Quién me dirías que es tu mejor amigo?', '¿Cuál crees que es la cosa más vergonzosa que ha hecho tu padre o madre?', '¿Dónde te gustaría vivir?', '¿En qué lugar transcurrirían tus vacaciones perfectas?', '¿Me puedes describir tu dormitorio?', '¿A qué personaje histórico te gustaría entrevistar?', '¿Qué tipo de ropa no llevarías puesta en ningún caso?', '¿Cuáles son tus tres bandas de música favoritas?']
            let random = pregunta[Math.floor(Math.random() * (pregunta.length))]
            m.reply(`*${username}* \n*~> _${random}_*`)} break

        case 'v_o_f': {
            var trivia = ['Ramses II es considerado el faraon con el reinado mas largo del antiguo egipto', 'Se cree que la via lactea contiene mas materia oscura que andromeda la galaxia mas grande del grupo local', 'Brasil dubuto en waterpolo en los juegos olimpicos de verano de 1932', 'Entre 1900 y 1920 el juego de la soga era un juego olimpico', 'En japon se considera mala suerte dejar que un luchador de sumo haga llorar a tu bebe', 'La cobra de cuello negro rocia veneno en los ojos de su victima para causar ceguera', 'Es imposible estornudar con los ojos abiertos', 'La persona promedio sueña solo una vez durante la noche', 'El núcleo del sujeto puede no aparecer en la frase', 'Todas las palabras esdrújulas llevan tilde', 'Las palabras graves están acentuadas en la última sílaba', 'Todas las palabras agudas llevan tilde', 'Egipto se encuentra al Noreste de África', 'Colombia limita con Ecuador, Surinam, Bolivia y Perú', 'La capital de Corea del Norte es Seúl', 'Mg2O es óxido de magnesio', 'Fe2O3 es óxido de hierro', 'NaCl es cloruro de sodio', 'O3 es oxígeno', 'CO2 es dióxido de carbono', 'El koala es un oso', 'La flor es un órgano reproductor de las plantas', 'Las arañas son insectos', 'Los líquenes son la unión simbiótica de un hongo y un alga', 'Existen animales autótrofos', 'Solo hay 2 generos para calificar a los seres humanos', 'El planeta tierra es plana', 'El humano moderno evolucionó de una especie animal anterior', 'Los antibióticos matan virus y bacterias', 'Un gen paterno es el que determina que el bebé sea niño o niña', 'El Universo se inició con una gran explosión', 'Los láseres son una emisión de ondas de sonido', 'los electrones son más pequeños que los átomos', 'La radioactividad es de origen humano', 'Los continentes llevan millones de años moviéndose y siguen moviéndose', 'El centro de la Tierra está muy caliente', 'El hipopótamo es el gran animal que más muertes causa en África', 'Comer un pescado japonés puede matarte si no está bien preparado', 'Algunos japoneses sufren una enfermedad mental al visitar París', 'Los viajes largos en avión pueden causar trombos en las piernas y la aspirina lo previene', 'Los remolinos de agua giran en sentido contrario en los dos hemisferios', 'Es imposible que las pirámides de Egipto fueran construidas por seres humanos', 'Los agujeros negros nunca mueren', 'Los planetas pueden vagar por el espacio sin una estrella madre', 'La Voyager 1 ha viajado más lejos en el espacio que cualquier objeto creado por humanos', 'El volcán más grande del sistema solar se encuentra en la Luna', 'Es muy poco frecuente que las galaxias choquen e interactúen unas con otras', 'En Venus todas las formaciones tienen nombre de mujer', 'Si se perforara tu traje espacial mientras te encuentras en el vacío del espacio, podrías sobrevivir al menos 3 o 4 minutos', 'El público general se enteró de los peligros de las sustancias radiactivas gracias a las chicas del radio', 'El satélite de Saturno Mimas también se conoce como Estrella de la muerte', 'La luna Calisto es mitad negra y mitad blanca', 'El mejor planeta para conseguir un bronceado de verdad y duradero es Mercurio', 'Los acantilados más elevados del sistema solar están precisamente en la Tierra', 'Aristarco de Samos fue la primera persona conocida que propuso el modelo heliocéntrico del sistema solar', 'La materia ordinaria es el elemento más abundante del cosmos', 'El cometa Halley no volverá a visitarnos hasta el 2041', 'Las nubes en el centro de la Vía Láctea huelen a ron saben a frambuesas y están llenas de alcohol', 'El viento solar es una corriente de partículas energéticas expulsadas por el Sol', 'Nigeria está en el hemisferio sur', 'Existen mas de 3 dimensiones en nuestro universo', 'Una división entera es aquella en la que el resto es cero', 'las plantas se reproducen', 'Todos los animales invertebrados son ovíparos', 'Las plantas elaboran su propio alimento a través de la fotosíntesis', 'SixDegrees fue la primera red social que se creó', 'El aguacate es una hortaliza', 'Instagram es la red social más usada del mundo', 'en un teclado, al lado de la letra Ñ, se encuentra la letra K', 'Marie Curie falleció de leucemia a causa de su contacto con sustancias radioactivas', 'El nitrógeno es el elemento químico más abundante en la atmósfera', 'Abraham fue quien impulsó la migración hebrea hacia Canaán', 'Miguel Indurain fue el ciclista más joven en vestir el jersey de líder en la Vuelta Ciclista a España', 'Ofelia era el amor de Hamlet', 'Los holandeses introdujeron en España los molinos de viento', 'Machu Picchu se encuentra en peru', 'El Museo del Prado es la pinacoteca más grande de España', 'Albert Einstein dijo que la cuarta guerra mundial se lucharía con piedras', 'Paul McCartney era el miembro más joven de los Beatles', 'La India fue el primer país en utilizar el papel lo hicieron cien años después de la muerte de Cristo', 'el francés es el idioma oficial de Andorra', 'Gengis Kan fue un guerrero mongol que se convirtió en emperador de China', 'Francia es el segundo país más grande de Europa', 'En el parchís tradicional se utilizan 20 fichas como máximo', 'Escocia tiene a la flor del cardo por símbolo', 'En la playa normanda de Grandville están prohibidos los elefantes', 'Un buitre chocó contra un avión a una altitud de 11.300 metros', 'Todos los insectos tienen seis patas', 'Mark Zuckerberg es daltónico El fondo de Facebook es azul porque es el color que puede distinguir mejor', 'Si tiras un céntimo desde lo alto de un rascacielos puedes atravesarle el cráneo a alguien', 'La mayoría de los seres humanos utilizamos solamente el 10% de nuestro cerebro a menudo se sugiere que mediante algunos procesos una persona puede ser capaz de aprovechar ese potencial no utilizado', 'La principal limitación de las neuronas de nuestro cerebro es que si son dañadas no tienen la posibilidad de regenerarse', 'Cuando un avión aterriza de noche se apagan todas sus luces interiores', 'Las huellas dactilares suelen estar determinadas por nuestros genes, así que pueden tener ciertas semejanzas con las de nuestros progenitores', 'Durante su vida, un hombre con una alimentación normal puede ingerir una cantidad de alimentos equivalente al peso de cien elefantes adultos', 'Nunca se ha visto a un elefante saltando en vertical', 'La Gran Muralla China es la única obra construida por el hombre visible a simple vista desde el espacio', 'En los hogares españoles hay más pájaros que gatos', 'Los esquimales utilizan 226 palabras distintas para designar la nieve según su estado', 'Una tostada con mantequilla lanzada al aire cae por el lado de la mantequilla tres de cada cuatro veces', 'Los cabellos y las uñas siguen creciendo después de la muerte', 'Cuando hace mucho frío un vasito de alcohol hace entrar en calor', 'Hay arsénico en el café', 'Francia perdió la Guerra de los Cien Años', 'Las Cícladas es un lugar real', 'Guillermo Marconi en 1943 se reafirma como el inventor de la radio por encima de Nikola Tesla', 'Las moscas macho viven en promedio 5 años', 'Los asesinos en serie tienen un coeficiente intelectual inferior a la media', 'En el año 2017 se hizo el primer trasplante de cerebro de seres humanos', 'Brasil ha sido el único país latinoamericano que ha organizado unos Juegos Olímpicos', 'Una cuarta parte de los huesos del cuerpo humano se encuentran en las manos', 'En 1694 los jueces se vistieron de negro para llorar la muerte de la reina Maria II', 'La silla eléctrica fue inventada por un dentista', 'Una libélula vive aproximadamente 48 horas', 'Al nacer tenemos 300 huesos pero de adulto solo tenemos 206', 'La jirafa es el único mamífero que no produce sonido alguno', 'No puedes puedes tocar la punta de tu nariz con la lengua', 'No puedes lamer tu codo con la lengua', 'Usas tiktok', 'La Tierra pesa alrededor de 6.588.000.000.000.000.000.000.000.000.000.000.000 toneladas', 'Los perros y los gatos no pueden ser diestros o zurdos como los humanos', '*Ella no te ama*', 'Un hombre llamado Charles Osborne tuvo hipo durante 69 años', 'Los conejillos de indias no pueden oler la menta', 'Debido a que el metal escaseaba los premios Oscar otorgados durante la Segunda Guerra Mundial eran de yeso', 'Uno de los anillos de Saturno es polvo de plata casi pura', 'Todos los cisnes de Inglaterra pertenecen a la Reina', 'La letra J es la única que no aparece en la tabla periódica', 'Hay un patrón dentro de su párpado superior que es tan único como su huella digital', 'Si un humano y un perezoso tuvieran que medir fuerzas con los brazos el perezoso ganaría sin duda', 'Todos los pandas del mundo pertenecen a China', 'Nueva York es la Gran Manzana mientras que Manhattan Kansas es la Pequeña Manzana', 'Las medusas tienen 3 corazones', 'La miel nunca se caduca Aunque pasen siglos sigue siendo comestible', 'Los toros odian el color rojo', 'Thomas Alba Edison tenía miedo a la oscuridad', 'Siglo XXI donde la contaminación ya no tiene solución', 'Cada día producimos más de un litro de saliva', 'Los delfines duermen con un ojo abierto', 'Tenemos alrededor de 100.000 pelos en la cabeza', 'La comida que cae al suelo no se contamina si se recoge antes de 5 segundos', 'Las personas tienen más probabilidades de ser contratadas si usan gafas para la entrevista', 'No hay moscas en la Antártida', 'Rusia es el país con más fumadores en el mundo', 'Neil Armstrong fue el primer humano en pisar la luna', 'El everest es la montaña mas alta del mundo', 'Una persona nunca lograra sus sueños', 'La pantalla de un móvil tiene 18 veces más bacterias que un baño público', 'Los surdos estan sordos', 'Tienes más probabilidades de que te toque la lotería que de que te caiga un rayo encima', 'En la actualidad el número de personas en el planeta tierra son 7 Mil millones aproximadamente', 'El sistema solar tiene 12 planetas', 'Los pansexuales son amantes de los panes', 'Los necrofilos son amantes del color negro', 'Hasta el siglo XIX los zapatos izquierdo y derecho eran iguales', 'Las huellas dactilares de los hijos se parecen a las de sus padres', 'El nombre completo de Picasso era\nPablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso', 'Las cebras son negras con rallas blancas', 'Cada año se imprime más dinero de Monopoly que dinero real en todo el mundo', 'El hombre es el animal más rápido sobre dos patas', 'El cuello de la jirafa tiene el doble de huesos que el nuestro', 'Las tortugas pueden llegar a vivir más de 500 años', 'En la cara oculta de la luna es siempre de noche', 'Hay una ciudad llamada Roma en cada continente', 'El cerebro es el órgano más pesado del cuerpo humano', 'Napoleón era bajo de estatura', 'Los Ángeles es la segunda ciudad del mundo con más mexicanos', 'la Antártida es el único continente sin serpientes', 'Los relojes con números romanos muestran el número 4 como IIII en lugar de IV', '1 La jirafa es el único mamífero que no tiene cuerdas vocales', 'El perezoso es el animal más dormilón', 'Los conejos son roedores', 'El ojo del avestruz es mas grande que su cerebro', 'segun la tabla periódica H2O es awa :v']
            let randrom = trivia[Math.floor(Math.random() * (trivia.length))]
            let txt = (`${randrom} 🤓`)

            conn.sendButton(m.chat, txt, author, [ ['[ VERDADERO ]', `${Prefijo}vofrpt1`], ['[ FALSO ]', `${Prefijo}vofrpt2`]], m, menu) } break
            
            case 'vofrpt1': { m.reply(`${username} por que?`) } break
            case 'vofrpt2': { m.reply(`${username} por que?`) } break
    }
}

handler.help = ['v_o_f', 'preguntame']
handler.tags = ['game']
handler.command = /^(v_o_f|preguntame)$/i

handler.group = true
handler.exp = 40

export default handler