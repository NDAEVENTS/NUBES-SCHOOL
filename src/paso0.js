// ---------- Wedding Planner Bootcamp (Paso 0, 47 €): five real lessons of the programme in seven days ----------
// Lessons 1 to 5 open on days 1 to 5 after buying, the diagnosis on day 7. Each lesson is shown as slides:
// a cover, one slide per section (long lists split evenly) and her task. Clara y Marc are the practice wedding of the week;
// blocks 'tip' (Truco de Nubes) and 'case' (Caso práctico) show as boxes. The Online programme is only offered on day 7.
// Her answers live in "Mi negocio" (business.data.p0); the tools and the WhatsApp group are library rows for the plan 'paso0'.
const P0_BASE=[
  {n:1,img:'/img/ws-071.jpg',day:0,days:'Día 1',t:'Una boda de principio a fin',b:[
    ['h','Bienvenida al Bootcamp'],['p','Qué ilusión tenerte aquí. Esta semana vas a trabajar como trabaja una wedding planner: con método, con herramientas profesionales y con una boda real sobre la mesa. Una lección al día, y nosotras a tu lado en el grupo de WhatsApp.'],
    ['p','Al terminar los siete días sabrás cómo se organiza una boda de principio a fin, cómo se reparte un presupuesto, cuánto cobrar, cómo elegir proveedores, cómo crear un concepto de diseño y cómo arrancar tu negocio.'],
    ['h','Tu boda de práctica: Clara y Marc'],['p','Durante toda la semana vas a planificar una boda de práctica, como si fueran tus primeros clientes. Cada día darás un paso más con ellos.'],
    ['case','Clara y Marc se casan en septiembre del año que viene en la Costa Brava. Serán 110 invitados, 25 de ellos llegan desde Francia. Tienen un presupuesto total de 38.000 €, IVA incluido. Les encanta el Mediterráneo, la comida y la música en directo, y no quieren una boda recargada.'],
    ['h','Qué hace de verdad una wedding planner'],['p','Una wedding planner no organiza fiestas bonitas. Gestiona el proyecto más importante de la vida de una pareja, con su dinero, sus emociones y sus familias. Su trabajo se apoya en cuatro pilares:'],
    ['li','Presupuesto: repartirlo según las prioridades de la pareja y que se respete hasta el final.'],['li','Proveedores: elegirlos, negociar, revisar contratos y coordinarlos.'],['li','Diseño: convertir el gusto de la pareja en un concepto que se pueda producir.'],['li','Coordinación: calendario, timing, wedding book y el día de la boda.'],
    ['h','Los tres servicios que puedes ofrecer'],
    ['li','Organización integral: todo, desde la búsqueda del espacio hasta el último baile. Se contrata con 12 a 18 meses de antelación y se lleva unas 200 horas de trabajo.'],
    ['li','Diseño y producción: el concepto, la decoración, las flores y la papelería. Para parejas que organizan ellas pero quieren una boda con un estilo claro.'],
    ['li','Coordinación del día: entras 2 o 3 meses antes, revisas todo lo contratado y diriges el día B. Es la puerta de entrada de muchas planners.'],
    ['tip','Empieza ofreciendo coordinación del día: aprenderás muchísimo con menos riesgo, y cada boda te dará fotos, proveedores y recomendaciones.'],
    ['h','La primera reunión: las preguntas que siempre hacemos'],
    ['li','Fecha: ¿tenéis fecha o temporada? ¿Sois flexibles?'],['li','Invitados: ¿cuántos, más o menos? ¿Cuántos vienen de fuera?'],['li','Presupuesto: ¿cuánto queréis invertir en total, y quién aporta?'],['li','Prioridades: si solo pudierais elegir tres cosas, ¿cuáles serían?'],
    ['li','Imprescindibles: ¿qué no puede faltar? ¿Y qué no queréis de ninguna manera?'],['li','Ceremonia: civil, religiosa o simbólica. ¿Dónde?'],['li','Estilo: ¿cómo queréis que se sientan vuestros invitados?'],['li','Vosotros: ¿cómo os conocisteis? ¿Qué os hace felices como pareja?'],
    ['tip','Las tres prioridades son tu mejor herramienta. Cuando el presupuesto no llegue a todo, y nunca llega, te dirán dónde recortar sin que la pareja sufra.'],
    ['h','Los 12 meses de una boda'],['p','Toda boda sigue el mismo camino. Si lo dominas, la pareja duerme tranquila y tú también.'],
    ['li','12 a 10 meses: presupuesto y prioridades, lista de invitados provisional, búsqueda y reserva del espacio (no más de tres visitas) y fecha cerrada.'],
    ['li','10 a 8 meses: catering si no va con el espacio, fotografía, vídeo y música. Son los que antes se agotan. Bloqueo de habitaciones si hay invitados de fuera.'],
    ['li','8 a 6 meses: concepto y mood board, florista y decoración, save the date y vestido.'],
    ['li','6 a 4 meses: invitaciones, web de la boda, transporte, prueba de menú y oficiante.'],
    ['li','4 a 2 meses: papelería del día (minutas, seating, señalética), detalles, prueba de peluquería y maquillaje y lista de canciones.'],
    ['li','2 meses a 1 mes: fecha límite de confirmaciones (unas 6 semanas antes), plano de mesas, timing minuto a minuto y pagos finales.'],
    ['li','La última semana: llamada final con cada proveedor, wedding book enviado a todos, kit de emergencia y ensayo de la ceremonia.'],
    ['li','El día B: llegas la primera, supervisas el montaje, marcas los tiempos y te vas la última.'],
    ['tip','Si hay muchos invitados de fuera, adelanta el save the date a 9 o 12 meses. Necesitan reservar vuelos y hotel.'],
    ['h','El timing de un día de boda'],['p','Así puede ser el día de una boda de tarde en la Costa Brava. Cada boda es distinta, pero el esqueleto se repite:'],
    ['li','10:00 · Montaje: decoración, mobiliario y flores. Tú revisas con el plano en la mano.'],['li','15:00 · Preparativos: peluquería, maquillaje y fotos de los novios.'],['li','17:30 · Llegada de invitados: bebida de bienvenida y música suave.'],['li','18:00 · Ceremonia: entre 30 y 40 minutos.'],
    ['li','18:45 · Cóctel: hora y media, con la puesta de sol y las fotos de grupo.'],['li','20:30 · Banquete: entrada, discursos y primer baile al terminar.'],['li','23:00 · Fiesta y barra libre: normalmente 3 o 4 horas.'],['li','03:00 · Fin: recogida de objetos personales y regalos.'],
    ['h','El wedding book y el kit de emergencia'],['p','El wedding book es el documento con el que trabaja todo el equipo el día B: horarios, contactos de cada proveedor, plano de mesas, menú y alergias, música de cada momento y plan B de lluvia. Lo envías a todos una semana antes.'],
    ['p','Y en tu bolso nunca falta el kit de emergencia: imperdibles, costurero, tiritas, analgésicos, toallitas, laca, cargadores, cinta adhesiva, tijeras, mecheros y pañuelos.'],
    ['h','Lo que nadie te cuenta'],['li','Una boda se contrata con 12 a 18 meses de antelación: tu negocio crece a ese ritmo.'],['li','El día de la boda son 14 horas de pie, y siempre pasa algo. Tu trabajo es que nadie lo note.'],['li','Eres empresaria: vender, presupuestar, facturar y cuidar tu marca es la mitad del trabajo.'],['li','Las parejas no te contratan por un decorado bonito. Te contratan para estar tranquilas durante un año entero.']],
    tasks:['Preséntate en el grupo de WhatsApp: tu nombre, desde dónde escribes y a qué te dedicas hoy.','Haz el calendario de Clara y Marc: escribe, mes a mes, qué tiene que estar hecho hasta su boda en septiembre.','Prepara su timing del día: a qué hora empieza cada momento si la ceremonia es a las 18:00.','Responde en “Mi negocio”: ¿por qué quiero ser wedding planner? ¿Qué bodas me imagino organizando?'],
    tool:'La agenda semanal: reserva en ella tus horas del Bootcamp.',more:['¿Puedo ser wedding planner? 7 señales','/guia-senales.pdf'],sec:'why'},

  {n:2,img:'/img/ws-043.jpg',day:1,days:'Día 2',t:'Presupuesto y honorarios',b:[
    ['h','El dinero, sin miedo'],['p','La primera conversación seria con una pareja es el dinero, y la última también. Hoy aprendes a repartir un presupuesto, a encontrar los costes que nadie ve y a calcular cuánto cobrar tú.'],
    ['h','El reparto de un presupuesto'],['p','Un reparto orientativo para una boda en España. Lo ajustarás siempre a las prioridades de cada pareja:'],
    ['li','Espacio y catering: 45 a 50 %'],['li','Fotografía y vídeo: 10 a 12 %'],['li','Flores y decoración: 8 a 10 %'],['li','Vestuario y belleza: 7 a 9 %'],['li','Música: 5 a 7 %'],['li','Papelería y detalles: 3 a 5 %'],['li','Transporte y otros: 3 a 5 %'],['li','Imprevistos: 8 a 10 %. Nunca lo quites.'],
    ['h','Caso práctico: el presupuesto de Clara y Marc'],['case','38.000 € para 110 invitados. Así quedaría con el reparto de referencia:'],
    ['li','Espacio y catering (48 %): 18.240 €'],['li','Fotografía y vídeo (11 %): 4.180 €'],['li','Flores y decoración (9 %): 3.420 €'],['li','Vestuario y belleza (8 %): 3.040 €'],['li','Música (6 %): 2.280 €'],['li','Papelería y detalles (4 %): 1.520 €'],['li','Transporte y otros (4 %): 1.520 €'],['li','Imprevistos (10 %): 3.800 €'],
    ['h','El número que más usarás: el precio por invitado'],['p','Divide lo que hay para espacio y catering entre los invitados. Para Clara y Marc: 18.240 € entre 110 son unos 166 € por persona, con el espacio incluido. Con esa cifra sabes en minutos qué espacios y qué caterings puedes enseñarles y cuáles no.'],
    ['tip','Enseña solo opciones que caben en el presupuesto. Si una pareja se enamora de un espacio que no puede pagar, todo lo demás le parecerá poco.'],
    ['h','Los costes que nadie ve'],['li','IVA: comprueba siempre si el precio lo incluye. En catering suele ser el 10 % y en la mayoría de servicios, el 21 %.'],['li','Horas extra: de barra libre, de música, de fotografía. Pide el precio por escrito.'],['li','Menús de proveedores: fotógrafos, músicos y tu equipo también cenan.'],['li','Montaje y desmontaje: algunos espacios cobran el día anterior o el siguiente.'],
    ['li','Plan B de lluvia: una carpa o un espacio cubierto puede ser una partida importante.'],['li','Desplazamientos y dietas: de proveedores que vienen de lejos.'],['li','Derechos de música y luz: algunos espacios cobran por el generador o por los derechos de autor.'],['li','Descorche: si la pareja quiere traer su propio vino o cava.'],
    ['h','Cómo controlar el presupuesto todo el año'],['p','Por cada partida apunta cuatro columnas: lo presupuestado, lo contratado, lo pagado y lo pendiente. Revísalo con la pareja después de cada contratación. Así nunca hay sustos, y si una partida se pasa, decidís juntos de cuál sale.'],
    ['tip','Cuando la pareja quiera algo que no cabe, no digas que no: enséñales de qué partida sale. Así deciden ellos y tú cuidas el total.'],
    ['h','Tus honorarios: tres formas de cobrar'],['li','Tarifa fija por servicio: la más clara para la pareja y la que usamos en Nubes.'],['li','Porcentaje del presupuesto: entre un 10 y un 15 %. Si lo usas, ponle siempre un mínimo.'],['li','Por horas: útil para coordinaciones o consultas sueltas.'],
    ['h','Cómo se calcula tu honorario mínimo'],['p','Tu precio sale de tus números, no de los de la competencia. Un ejemplo para tu primer año:'],
    ['li','Gastos fijos del año: cuota de autónoma (tarifa plana de 80 € al mes), gestoría, seguro, web, teléfono, desplazamientos y formación. Unos 4.500 €.'],['li','Lo que quieres ganar antes de impuestos: por ejemplo, 26.000 €.'],['li','Bodas que puedes organizar al año: por ejemplo, 12.'],['li','Honorario mínimo: (4.500 + 26.000) ÷ 12 = unos 2.540 € por boda integral, más IVA.'],
    ['p','Ahora divídelo entre las 200 horas de una organización integral: 12,70 € la hora. Por eso no puedes cobrar 1.500 €.'],
    ['h','Cómo te pagan: nuestro método 30 / 20 / 20 / 30'],['p','Un 30 % de paga y señal al reservar la fecha, dos pagos intermedios del 20 % y el 30 % final un mes antes de la boda. Con un honorario de 2.600 €: 780 € al firmar, 520 €, 520 € y 780 € un mes antes.'],
    ['tip','Que el último pago llegue antes de la boda, nunca después. Así la pareja vive el día sin pensar en cuentas, y tú también.']],
    tasks:['Rellena la calculadora de honorarios con tus números reales y mira la pestaña “Escenarios”.','Apunta en “Mi negocio” tu honorario mínimo y cuántas bodas necesitas al año.','Caso práctico: Clara y Marc te dicen que la fotografía y la comida son su prioridad. Rehaz su reparto para darles un 3 % más a cada una. ¿De qué partidas lo sacas?','Calcula su precio por invitado después del cambio.'],
    tool:'La calculadora de honorarios.',more:['Cuánto gana una wedding planner en España','/guia-numeros.pdf'],sec:'nums'},

  {n:3,img:'/img/ws-082.jpg',day:2,days:'Día 3',t:'Proveedores: tu equipo de confianza',b:[
    ['h','Tu reputación depende de ellos'],['p','La pareja te contrata a ti, pero el día de la boda trabajan diez equipos distintos. Si uno falla, la que falla eres tú. Por eso una wedding planner nunca recomienda a un proveedor que no conoce.'],
    ['h','Los gremios de una boda'],['li','Espacio y catering: el corazón de la boda.'],['li','Fotografía y vídeo: lo único que queda para siempre.'],['li','Música: ceremonia, cóctel y fiesta, a veces con tres equipos distintos.'],['li','Flores y decoración: con el alquiler de mobiliario, menaje e iluminación.'],
    ['li','Papelería: save the date, invitaciones, minutas, seating y señalética.'],['li','Belleza: peluquería y maquillaje.'],['li','Ceremonia: oficiante y, si es civil, la parte legal.'],['li','Transporte, pastelería y alojamiento: los que se olvidan y luego corren.'],
    ['h','Dónde encontrarlos'],['li','Los espacios: cada espacio trabaja con proveedores habituales. Pregunta siempre por ellos.'],['li','Otros proveedores: un buen fotógrafo conoce a todas las floristas de su zona.'],['li','Instagram: para descubrir, nunca para decidir.'],['li','Bodas reales: ofrécete a ayudar en una boda y verás a todos trabajar.'],
    ['h','Cómo elegirlos'],['li','Míralos trabajar: pide ver una boda real completa, no solo lo mejor de su Instagram.'],['li','Compara igual con igual: haz a todos las mismas preguntas.'],['li','Presupuesto por escrito y desglosado, con IVA.'],['li','Lee el contrato antes que la pareja.'],
    ['h','Las preguntas al espacio'],['li','¿Es exclusivo o se pueden celebrar otras bodas el mismo día?'],['li','¿El catering es propio o se puede traer uno externo?'],['li','¿A qué hora tiene que terminar la música? ¿Hay limitador de sonido?'],['li','¿Cuál es el plan B si llueve, y cuánto cuesta?'],
    ['li','¿Se puede montar el día anterior?'],['li','¿Hay un mínimo de invitados o de facturación?'],['li','¿Tiene alojamiento o hoteles cerca?'],['li','¿Cómo son la señal, los pagos y la cancelación?'],
    ['h','Las preguntas al catering'],['li','¿El precio por persona incluye IVA, bebidas, mobiliario, mantelería y vajilla?'],['li','¿La prueba de menú está incluida? ¿Para cuántas personas?'],['li','¿Cuántos camareros pone por invitado en el banquete y en el cóctel?'],['li','¿Cómo trabaja las alergias y los menús infantiles?'],
    ['li','¿Cuántas horas de barra libre incluye y cuánto cuesta la hora extra?'],['li','¿Hay menú para proveedores, y a qué precio?'],
    ['h','Las preguntas a fotografía, vídeo y música'],['li','Fotografía y vídeo: ¿cuántas horas incluye? ¿Hay segundo fotógrafo? ¿Cuándo y cómo entrega? ¿Puedes usar sus fotos para tu portfolio?'],['li','Música: ¿lleva equipo propio? ¿Qué potencia necesita? ¿Cuántos descansos hace y cuánto cuesta la hora extra?'],['li','Todos: ¿cuántas horas antes llega, cuánto ocupa el montaje y cuánto cuesta el desplazamiento?'],
    ['tip','Pide siempre permiso por escrito para usar las fotos de la boda en tu web y tu Instagram. Es tu portfolio.'],
    ['h','El contrato: lo que siempre revisamos'],['li','Cancelación y devolución de la señal, por las dos partes.'],['li','Cambio de fecha: si se puede y con qué coste.'],['li','Qué pasa si el proveedor no puede venir: quién le sustituye.'],['li','Horas extra y su precio exacto.'],['li','Calendario de pagos.'],['li','Seguro de responsabilidad civil.'],
    ['h','Cómo cuidarlos'],['p','Los mejores proveedores eligen con quién trabajan. Paga a tiempo, envía la información completa y con antelación, y da las gracias después de cada boda, con una reseña o mencionándoles en tus redes. El día que tengas una urgencia, te contestarán a ti la primera.'],
    ['h','La semana de la boda'],['li','Llama a cada proveedor y confirma horarios de llegada, montaje y desmontaje.'],['li','Envía el wedding book a todos con los teléfonos de contacto.'],['li','Confirma accesos, aparcamiento y quién abre el espacio.'],['li','Revisa los pagos pendientes, para que nadie cobre el día B.']],
    tasks:['Descarga la base de datos de proveedores y apunta los cinco primeros de tu zona, de gremios distintos.','Caso práctico: elige un espacio real de la Costa Brava (o de tu zona) que podría encajar con Clara y Marc y prepara las ocho preguntas que le harías.','Compara dos fotógrafos de tu zona con las preguntas de hoy.','Cuéntanos en el grupo qué espacio has elegido y por qué.'],
    tool:'La base de datos de proveedores.'},

  {n:4,img:'/img/ws-079.jpg',day:3,days:'Día 4',t:'Diseño: del Pinterest a un concepto',b:[
    ['h','La pareja trae 300 fotos'],['p','Casi todas las parejas llegan con un tablero de Pinterest lleno de ideas que no tienen nada que ver entre sí. Tu trabajo es escucharlas y convertir todo eso en un concepto: una idea clara que se pueda producir y presupuestar.'],
    ['h','El briefing de diseño'],['li','¿Cómo os conocisteis? ¿Hay un lugar, un viaje o una canción que sea vuestro?'],['li','¿Cómo queréis que se sientan vuestros invitados al llegar?'],['li','¿Qué colores os gustan, y cuáles no queréis ver?'],['li','¿Qué bodas de amigos os han encantado, y qué no os gustó?'],['li','¿Qué es lo primero que queréis que recuerden de vuestra boda?'],
    ['h','Del gusto al concepto en cinco pasos'],['li','Escucha: el briefing, sin opinar todavía.'],['li','Filtra: de todo su Pinterest, quédate con las 10 imágenes que más se repiten en estilo y color.'],['li','Nombra: resume el concepto en tres palabras.'],['li','Elige la paleta: tres colores principales y dos de acento.'],['li','Monta el mood board: espacio, flores, mesa, papelería y vestuario en una sola lámina.'],
    ['h','Caso práctico: el concepto de Clara y Marc'],['case','Mediterráneo, luminoso y sereno. Una boda que huele a sal y a olivo, con mucha luz natural, materiales nobles y nada recargado.'],
    ['li','Paleta: blanco roto, arena y verde oliva, con terracota suave y azul mar como acentos.'],['li','Materiales: lino, cerámica artesanal, madera natural, ramas de olivo y cítricos.'],['li','Luz: puesta de sol en el cóctel y velas protegidas del viento en la cena.'],['li','Papelería: papel de algodón, tipografía fina y una ilustración del espacio.'],
    ['h','Cómo se monta un buen mood board'],['li','Una sola lámina, con nueve imágenes como máximo.'],['li','Una foto del espacio real, para que todo tenga sentido allí.'],['li','Flores, mesa, papelería, vestuario y un detalle especial.'],['li','La paleta con muestras de color y las tres palabras del concepto.'],
    ['p','El mood board es el documento que comparten la pareja, la florista, la papelería y el catering. Si está bien hecho, todos ven la misma boda.'],
    ['h','Del mood board al presupuesto'],['p','El diseño se come el presupuesto si no lo controlas. Primero cuenta: 110 invitados son 11 mesas de 10, así que 11 centros de mesa. Luego elige los tres momentos que más impacto tienen y pon ahí el dinero.'],
    ['li','La ceremonia: es la primera imagen y la que más se fotografía.'],['li','La mesa: los invitados pasan en ella casi tres horas.'],['li','Un momento sorpresa: la entrada, la mesa dulce o una barra de cócteles.'],
    ['tip','Reutiliza: las flores de la ceremonia pueden pasar a la mesa presidencial o a la barra. La pareja ahorra y nadie lo nota.'],
    ['h','Los errores más comunes'],['li','Copiar Pinterest al pie de la letra, sin pensar en el espacio real.'],['li','Demasiados colores: más de cinco no es una paleta.'],['li','Olvidar la luz: una boda de noche necesita velas e iluminación pensadas desde el principio.'],['li','No pensar en el clima: en la costa, el viento apaga velas y vuela manteles.'],['li','Diseñar sin presupuesto: primero los números, luego la belleza.'],
    ['h','Cómo presentarlo a la pareja'],['p','Un PDF corto y bonito: las tres palabras del concepto, la paleta, el mood board y los tres momentos clave. Preséntalo en persona o por videollamada, nunca solo por email: tienes que ver su cara cuando lo ven.']],
    tasks:['Abre la plantilla de mood board.','Caso práctico: monta el mood board de Clara y Marc con su concepto, su paleta y sus materiales.','Elige sus tres momentos clave y explica en dos líneas qué harías en cada uno.','Si te apetece, compártelo en el grupo. Nos encantará verlo.'],
    tool:'La plantilla de mood board.'},

  {n:5,img:'/img/ws-039.jpg',day:4,days:'Días 5 y 6',t:'Tu negocio en 90 días',b:[
    ['h','No dejes tu trabajo mañana'],['p','Ya has trabajado como una wedding planner: calendario, presupuesto, proveedores y diseño. Ahora toca tu negocio. Con cinco a siete horas a la semana puedes tener la base en 90 días, sin dejar todavía tu trabajo.'],
    ['h','Tu nicho: qué planner quieres ser'],['p','No puedes ser la planner de todas las bodas. Cuanto más claro sea tu nicho, más fácil será que te encuentren. Respóndete:'],
    ['li','¿Qué bodas? Íntimas, grandes, de lujo, rurales, de destino, LGTBI, de otras culturas…'],['li','¿Para qué parejas? Su edad, su estilo, su presupuesto, de dónde vienen.'],['li','¿En qué zona? Tu ciudad, tu provincia, la costa o la montaña.'],['li','¿Qué servicio primero? Integral, diseño o coordinación del día.'],
    ['h','La parte legal, sin miedo'],['p','Lo básico para empezar en España. Confírmalo siempre con tu gestoría:'],
    ['li','Alta en Hacienda con la declaración censal (modelo 036) y en la Seguridad Social como autónoma.'],['li','Tarifa plana: 80 € al mes durante el primer año, si cumples los requisitos.'],['li','Puedes darte de alta sin dejar tu trabajo por cuenta ajena.'],['li','Tus facturas llevan IVA del 21 %. Cada trimestre presentas el IVA y el IRPF.'],
    ['tip','Contrata un seguro de responsabilidad civil desde la primera boda. Es barato y te protege a ti y a tus parejas.'],
    ['h','Tu marca mínima'],['li','Nombre: fácil de decir, de escribir y de encontrar en Instagram.'],['li','Identidad: un logotipo sencillo, dos tipografías y tres colores.'],['li','Foto profesional tuya: las parejas contratan a personas.'],['li','Tu frase: qué haces, para quién y dónde, en una línea.'],
    ['h','Tu portfolio, aunque no tengas bodas'],['li','Un shooting de inspiración: une a una fotógrafa, una florista y un espacio que también necesitan contenido.'],['li','Bodas de amigas o familia, coordinadas con todo el cariño y bien fotografiadas.'],['li','Ayuda en bodas de otras planners: aprenderás y conocerás proveedores.'],['li','Tus mood boards y tus diseños, como el de Clara y Marc.'],
    ['h','Tu primera reunión, paso a paso'],['li','Romper el hielo (5 minutos): cómo se conocieron, cómo se imaginan el día.'],['li','Escuchar (20 minutos): las preguntas del día 1, sin vender todavía.'],['li','Explicar cómo trabajas (10 minutos): tus servicios, tu método y tu forma de pago.'],['li','Próximos pasos (5 minutos): cuándo recibirán tu propuesta.'],
    ['tip','Envía la propuesta en 24 horas, mientras la ilusión está viva. Una propuesta que tarda una semana ya llega tarde.'],
    ['h','Fase 1 · Días 1 a 30 · Decide qué planner quieres ser'],['li','Tu nicho, escrito en una frase.'],['li','Tus primeros 10 proveedores en la base de datos.'],['li','Una cita con una gestoría.'],
    ['h','Fase 2 · Días 31 a 60 · Que se te vea'],['li','Nombre e identidad sencilla.'],['li','Instagram profesional y una página con tus servicios.'],['li','Tu primer shooting de inspiración.'],['li','Un café con al menos diez proveedores.'],
    ['h','Fase 3 · Días 61 a 90 · Lista para tu primera pareja'],['li','Dossier de servicios con tus precios (los de tu calculadora).'],['li','Contrato y forma de presupuestar.'],['li','Tu primera reunión, ensayada con una amiga.']],
    tasks:['Escribe tu nicho en una frase: qué bodas, para qué parejas y en qué zona.','Rellena tu plan en “Mi negocio”: una acción concreta y una fecha para cada punto.','Pon en tu agenda semanal tus horas fijas para el negocio, como una cita más.','Descarga “Mi plan de 90 días” en PDF y guárdalo donde lo veas cada semana.'],
    tool:'La agenda semanal y tu plan en “Mi negocio”.',more:['De la oficina a las bodas: el plan de 90 días','/guia-90-dias.pdf'],sec:'plan'},

  {n:6,img:'/img/ws-020.jpg',day:6,days:'Día 7',t:'Tu diagnóstico y tu siguiente paso',b:[
    ['h','Lo has conseguido'],['p','En una semana has planificado una boda de principio a fin: el calendario y el timing de Clara y Marc, su presupuesto y tu honorario, las preguntas a sus proveedores, su concepto de diseño y tu plan de 90 días. Eso ya es mucho más de lo que hace la mayoría. Estamos muy orgullosas de ti.'],
    ['h','Lo que te queda por aprender'],['p','Esta semana has visto la base. Para organizar bodas con seguridad y vivir de ello aún te queda camino, y es el que recorremos juntas en The Wedding Creators:'],
    ['li','Invitados: listas, confirmaciones, alojamiento y el plano de mesas sin dramas.'],['li','Producción: el wedding book completo y cómo se coordina el día B, minuto a minuto.'],['li','Tu negocio: marca, contrato, dossier, tarifas por servicio y la parte legal.'],['li','Visibilidad: tu web, tu Instagram y tu primer shooting.'],['li','Clientas: de la primera reunión a la firma, y cómo cuidar a cada pareja.'],
    ['h','Tu diagnóstico'],['p','Responde estas seis preguntas pensando en cómo estás hoy, no en cómo te gustaría estar. Al terminar te contamos qué camino te encaja y cómo descontarte los 47 € del Bootcamp.']],tasks:[],diag:true},
];
// ---------- Panel → Editar Bootcamp: the slides of each lesson ----------
// A lesson is saved whole in site_content (web.bootcamp[n] = {t, img, b, tasks, tool}); a lesson never saved keeps the text above.
let P0=P0_BASE;
const p0Lesson=n=>{ const L=P0_BASE.find(x=>x.n===n), o=((S.web||{}).bootcamp||{})[n]; return o?Object.assign({},L,o):L; };
function p0Apply(){ P0=P0_BASE.map(L=>p0Lesson(L.n)); }
// Blocks ⇄ one form per slide: title, text, practice case, points, text after the points, Nubes tip
function p0Secs(b){ const out=[]; let c=null;
  b.forEach(([k,t])=>{ if(k==='h'||!c){ c={h:k==='h'?t:'',p:[],case:[],li:[],post:[],tip:[]}; out.push(c); if(k==='h') return; }
    if(k==='li') c.li.push(t); else if(k==='tip'||k==='case') c[k].push(t); else (c.li.length?c.post:c.p).push(t); });
  return out; }
const p0Blocks=secs=>secs.flatMap(s=>[['h',s.h],...s.p.map(t=>['p',t]),...s.case.map(t=>['case',t]),...s.li.map(t=>['li',t]),...s.post.map(t=>['p',t]),...s.tip.map(t=>['tip',t])]);
function pBootcamp(arg){
  const n=P0_BASE.some(x=>x.n===+arg)?+arg:1, L=p0Lesson(n), secs=p0Secs(L.b), saved=!!((S.web||{}).bootcamp||{})[n];
  const area=(name,label,val,rows)=>`<div class="field"><span>${label}</span><textarea id="${name}" name="${name}" rows="${rows||3}">${esc(val)}</textarea></div>`;
  return `<header><h1>Editar Bootcamp</h1><p>Las lecciones del Wedding Planner Bootcamp, slide a slide. Cada lección se guarda por separado y las alumnas la ven así al momento.</p></header>
  <div class="row">${P0_BASE.map(x=>`<a class="btn sm${x.n===n?' primary':''}" href="/panel/bootcamp/${x.n}">${x.diag?'Día 7 · Diagnóstico':`Lección ${x.n}`}</a>`).join('')}</div>
  <form class="sheet pad" data-form="boot" data-n="${n}" id="boot-form">
    <span class="eyebrow">${esc(L.days)}</span><h3 style="font-size:22px">Portada</h3>
    <div class="field"><span>Título de la lección</span><input id="boot-t" name="t" value="${esc(L.t)}"></div>
    ${webField('img','Foto de portada (horizontal)','photo',L.img)}
    ${secs.map((s,i)=>`<div style="display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--line);padding-top:16px">
      <div class="spread"><h3 style="font-size:20px">Slide ${i+2}</h3><label class="check"><input type="checkbox" name="s${i}.del"> Quitar esta slide</label></div>
      <div class="field"><span>Título</span><input id="s${i}.h" name="s${i}.h" value="${esc(s.h)}"></div>
      ${area(`s${i}.p`,'Texto (una línea en blanco separa los párrafos)',s.p.join('\n\n'),Math.min(8,2+s.p.length*2))}
      ${area(`s${i}.case`,'Caso práctico de Clara y Marc (opcional, sale en un recuadro oscuro)',s.case.join('\n\n'),2)}
      ${area(`s${i}.li`,'Puntos (uno por línea; si empieza por «Título: …» se ve como tarjeta con título)',s.li.join('\n'),Math.max(3,s.li.length+1))}
      ${area(`s${i}.post`,'Texto después de los puntos (opcional)',s.post.join('\n\n'),2)}
      ${area(`s${i}.tip`,'Truco de Nubes (opcional)',s.tip.join('\n\n'),2)}</div>`).join('')}
    <button type="submit" class="btn sm" name="add" value="1" style="align-self:flex-start">+ Añadir una slide al final</button>
    ${L.diag?'':`<div style="display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--line);padding-top:16px"><h3 style="font-size:20px">Tu tarea de hoy</h3>
      ${area('tasks','Tareas (una por línea)',L.tasks.join('\n'),Math.max(3,L.tasks.length+1))}<div class="field"><span>Herramienta del día</span><input id="boot-tool" name="tool" value="${esc(L.tool||'')}"></div></div>`}
    <div class="row"><button class="btn primary" type="submit">Guardar la lección</button>${saved?`<button class="btn sm" type="submit" name="reset" value="1">Volver al texto original</button>`:''}</div>
    <p class="hint">Para verla como la alumna: Alumnas → «Ver el portal como una alumna nueva de nivel…» → Wedding Planner Bootcamp.</p>
  </form>`;
}
FORM.boot=async (f,form)=>{ const n=+form.dataset.n, L=p0Lesson(n), all=Object.assign({},(S.web||{}).bootcamp||{});
  if(f.reset) delete all[n];
  else { const par=v=>String(v||'').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean), lines=v=>String(v||'').split('\n').map(x=>x.trim()).filter(Boolean);
    const secs=p0Secs(L.b).map((_,i)=>i).filter(i=>!f[`s${i}.del`]).map(i=>({h:(f[`s${i}.h`]||'').trim(),p:par(f[`s${i}.p`]),case:par(f[`s${i}.case`]),li:lines(f[`s${i}.li`]),post:par(f[`s${i}.post`]),tip:par(f[`s${i}.tip`])}));
    if(f.add) secs.push({h:'Nueva slide',p:[],case:[],li:[],post:[],tip:[]});
    const file=form.querySelector('input[name="img.file"]')?.files[0];
    const o={t:(f.t||'').trim()||L.t,img:file?await DB.uploadWebImage(file):(f.img||L.img),b:p0Blocks(secs)};
    if(!L.diag){ o.tasks=lines(f.tasks); o.tool=(f.tool||'').trim(); }
    all[n]=o; }
  await DB.saveWeb('bootcamp',all); render(); toast(f.reset?'Texto original recuperado':f.add?'Slide añadida al final: rellénala y guarda':'Guardado. Las alumnas ya lo ven así.'); };
// The plan, phase by phase: each point gets her action and a date
const P0PLAN=[['Fase 1 · Días 1 a 30 · Decide qué planner quieres ser',['Tu nicho: qué bodas, para qué parejas y en qué zona','Tus primeros 10 proveedores','Cita con una gestoría']],
  ['Fase 2 · Días 31 a 60 · Que se te vea',['Nombre e identidad sencilla','Instagram profesional y página de servicios','Tu primer mood board','Café con diez proveedores']],
  ['Fase 3 · Días 61 a 90 · Lista para tu primera pareja',['Dossier de servicios con tus precios','Contrato y forma de presupuestar','Tu primera reunión, ensayada']]];
const P0Q=[['¿Dónde estás hoy?','Trabajo en otra cosa y quiero aprender la profesión.','He decidido dedicarme a esto y quiero lanzar mi negocio.','Ya trabajo en bodas o eventos.'],
  ['¿Cuánto tiempo puedes dedicarle?','Unas horas a la semana, a mi ritmo.','Una parte fija de mi semana durante 6 meses.','Puedo dedicarme a fondo y viajar.'],
  ['¿Cómo aprendes mejor?','Sola, con buenos materiales.','Con alguien que revise lo que hago.','Al lado de profesionales, en bodas reales.'],
  ['¿Qué te frena más ahora?','No conozco la profesión por dentro.','No sé por dónde empezar mi negocio.','Quiero subir de nivel y no sé cómo.'],
  ['¿Qué bodas te imaginas?','Todavía no lo sé.','Bodas de mi zona, con mi estilo.','Bodas de lujo y de destino, con parejas internacionales.'],
  ['Dentro de un año quieres…','Saber organizar una boda de principio a fin.','Tener mi negocio en marcha y mis primeras parejas.','Trabajar en el segmento de lujo.']];
const P0RES={online:['Online','Estás descubriendo la profesión y quieres aprenderla bien, sin dejarlo todo. Online te da el método completo a tu ritmo y una sesión de dudas al mes. Te descontamos los 47 € si te apuntas en los próximos 30 días.'],
  completo:['Completo','Ya has decidido y quieres hacerlo bien a la primera. En Completo lanzas tu negocio con nosotras revisando cada paso, 12 horas de tutoría y prácticas en una de nuestras bodas. Te descontamos los 47 €.'],
  signature:['Signature','Ya conoces el sector y quieres dar el salto al lujo y al destino. Signature son 8 plazas por edición, con una boda desde cero en nuestro equipo. Te descontamos los 47 €.']};
// Most repeated answer wins; on a tie, the higher level
function p0Level(ans){ const c=[0,0,0]; ans.forEach(a=>c[a]++); const max=Math.max(...c); return ['online','completo','signature'][c.lastIndexOf(max)]; }
const p0=()=>S.biz.p0||(S.biz.p0={});
const p0Open=L=>S.me.unlocked||daysSince(S.me.started_at||todayISO())>=L.day;
const p0Done=L=>!!S.progress['p0-'+L.n]||(L.diag&&!!p0().diag);
const p0Lib=()=>S.library.filter(l=>(l.plans||[]).includes('paso0'));
const p0Wa=()=>p0Lib().find(l=>/whatsapp/i.test(l.path||'')||/whatsapp/i.test(l.title||''));
const P0MENU=[['','Bootcamp'],['negocio','Mi negocio'],['herramientas','Herramientas'],['cuenta','Mi cuenta']];
function p0Portal(){
  p0Apply();
  const pg=page(), L=ui('lesson');
  const body=L?p0Reader(P0.find(x=>x.n===L)):({'':p0Home,negocio:p0Negocio,herramientas:p0Tools,cuenta})[pg]?.()||p0Home();
  return shell(body,P0MENU,pg,0);
}
function p0Home(){
  const me=S.me, d=Math.min(7,daysSince(me.started_at||todayISO())+1), done=P0.filter(p0Done).length, wa=p0Wa(), dg=p0().diag;
  return `<header><span class="eyebrow">Wedding Planner Bootcamp · día ${d} de 7</span><h1>Hola, ${esc(me.name.split(' ')[0])}</h1><p>Qué ilusión tenerte aquí. Esta semana aprendes con nosotras cómo trabaja de verdad una wedding planner: una lección al día, con una boda de práctica y una herramienta profesional para cada paso. Y cada mañana te escribimos para recordarte lo que toca. No estás sola.</p></header>
  ${wa?`<div class="next"><div><span class="label">Comunidad de WhatsApp</span><h3>Preséntate y conoce a las demás</h3><p class="hint">Pilar y Ainoa responden de lunes a viernes, de 10 a 18 h.</p></div><a class="btn primary" href="${esc(wa.path)}" target="_blank" rel="noopener">Entrar en la Comunidad</a></div>`:''}
  <div class="sheet pad"><div class="spread"><h3 style="font-size:20px">Tu semana</h3><span class="num">${done} de ${P0.length}</span></div><div class="bar"><i style="width:${Math.round(done/P0.length*100)}%"></i></div>
    <div class="list">${P0.map(L=>{ const open=p0Open(L), ok=p0Done(L);
      return `<div class="li${open?'':' locked'}"><span class="tick${ok?' on':''}">${ok?'✓':L.n}</span><div class="t"><small>${L.days}</small><b style="font-weight:400">${esc(L.t)}</b></div>${open?`<button type="button" class="btn sm${ok?'':' primary'}" data-act="p0lesson" data-arg="${L.n}">${ok?'Repasar':'Empezar'}</button>`:`<span class="hint">Se abre el ${fdate(addDays(me.started_at||todayISO(),L.day),{weekday:'long',day:'numeric'})}</span>`}</div>`; }).join('')}</div></div>
  ${dg?p0Result(dg.level):''}
  <div class="grid2"><a class="sheet pad tile" href="/portal/herramientas" style="text-decoration:none;color:inherit"><span class="label">Tus herramientas</span><h3 style="font-size:20px">Agenda, proveedores, mood board y calculadora</h3><p class="hint">Descárgalas y úsalas durante la semana.</p></a>
  <a class="sheet pad tile" href="/portal/negocio" style="text-decoration:none;color:inherit"><span class="label">Mi negocio</span><h3 style="font-size:20px">Tus respuestas y tu plan de 90 días</h3><p class="hint">Todo lo que escribes en el Bootcamp se guarda aquí.</p></a></div>`;
}
// A lesson becomes slides, like a deck made in Canva: cover, one slide per section, the teaser and her task
const P0MORE='En el programa Online';
function p0Slides(L){
  const S0=[{k:'cover'}]; let cur=null;
  L.b.forEach(([k,t])=>{ if(k==='h'){ cur={k:t===P0MORE?'more':'sec',h:t,p:[],li:[],post:[],pre:[],box:[]}; S0.push(cur); return; }
    if(!cur){ cur={k:'sec',h:'',p:[],li:[],post:[],pre:[],box:[]}; S0.push(cur); }
    if(k==='li') cur.li.push(t); else if(k==='tip'||k==='case') (cur.li.length?cur.box:cur.pre).push([k,t]); else (cur.li.length?cur.post:cur.p).push(t); });
  // Long lists are split evenly (up to six short points or four long ones per slide); the text after the list and the boxes go on the last slide
  const out=[]; S0.forEach(s=>{ const li=s.li||[], avg=li.join('').length/Math.max(li.length,1), max=(avg>95?4:6)-((s.p||[]).join('').length>220||(s.pre||[]).length?2:0), parts=Math.ceil(li.length/max);
    if(s.k!=='sec'||parts<2) return out.push(s);
    const per=Math.ceil(li.length/parts);
    for(let i=0;i<parts;i++){ const last=i===parts-1; out.push({...s,p:i?[]:s.p,pre:i?[]:s.pre,post:last?s.post:[],box:last?s.box:[],li:li.slice(i*per,i*per+per),from:i*per,part:[i+1,parts]}); } });
  if(!L.diag) out.push({k:'task'});
  return out;
}
// "Título · texto" or a short "Título: texto" becomes a card with its title in bold
function p0Card(t){ let i=t.indexOf(' · '), k=3; if(i<0){ i=t.indexOf(': '); k=2; if(i>38) i=-1; } const b=t.slice(i+k); return i<0?[t]:[t.slice(0,i),b.charAt(0).toUpperCase()+b.slice(1)]; }
const p0Boxes=b=>(b||[]).map(([k,t])=>`<div class="sc-box ${k}"><b>${k==='tip'?'Truco de Nubes':'Caso práctico · Clara y Marc'}</b><span>${esc(t)}</span></div>`).join('');
const P0FOOT='<span class="sc-foot" aria-hidden="true">Nubes de Algodón School · The Wedding Creators</span>';
function p0Slide(L,s,i,n){
  const sec=n=>String(n).padStart(2,'0');
  if(s.k==='cover') return `<section class="slide cover"><div class="sc-copy"><span class="eyebrow">Wedding Planner Bootcamp · ${esc(L.days)}</span><h2>${esc(L.t)}</h2><p class="sc-sub">${L.diag?'Tu cierre del Bootcamp':`Lección ${L.n} de 5`}</p><p class="sc-sign">Pilar y Ainoa · The Wedding Creators</p></div>${L.img?`<div class="sc-img" style="background-image:url('${L.img}')" role="img" aria-label=""></div>`:''}</section>`;
  if(s.k==='more') return `<section class="slide more"><span class="eyebrow">¿Quieres más?</span><h3>${esc(s.h)}</h3>${s.p.map(t=>`<p>${esc(t)}</p>`).join('')}<a class="btn" href="/#precios">Ver el programa Online</a>${P0FOOT}</section>`;
  if(s.k==='task') return `<section class="slide task"><span class="eyebrow">${esc(L.days)}</span><h3>Tu tarea de hoy</h3><ol class="sc-tasks">${L.tasks.map(t=>`<li>${esc(t)}</li>`).join('')}</ol>
    ${L.tool?`<p class="sc-tool"><b>Tu herramienta:</b> ${esc(L.tool)} <a href="/portal/herramientas">Ver herramientas</a></p>`:''}
    ${L.more?`<p class="sc-tool"><b>Para ampliar:</b> <a href="${L.more[1]}" target="_blank" rel="noopener">${esc(L.more[0])}</a></p>`:''}
    <div class="row">${L.sec?`<a class="btn" href="/portal/negocio#p0-${L.sec}" data-act="p0go" data-arg="${L.sec}">Responder en Mi negocio</a>`:''}
    <button type="button" class="btn primary" data-act="p0done" data-arg="${L.n}">${S.progress['p0-'+L.n]?'Volver al Bootcamp':'Lección hecha'}</button></div>${P0FOOT}</section>`;
  const tone=['', ' rose',' sky'][i%3], big=!s.li.length&&s.p.join(' ').length<260;
  return `<section class="slide sec${tone}${big?' big':''}"><span class="sc-num" aria-hidden="true">${sec(i)}</span><div class="sc-body"><span class="eyebrow sc-rule">${esc(L.t)}${s.part?` · ${s.part[0]}/${s.part[1]}`:''}</span>${s.h?`<h3>${esc(s.h)}</h3>`:''}
    ${s.p.map(t=>`<p>${esc(t)}</p>`).join('')}${p0Boxes(s.pre)}${s.li.length?`<ol class="sc-cards${s.li.length===1?' one':''}" start="${(s.from||0)+1}">${s.li.map((t,j)=>{ const [a,b]=p0Card(t); return `<li><span class="n">${(s.from||0)+j+1}</span>${b?`<b>${esc(a)}</b><span>${esc(b)}</span>`:`<span>${esc(a)}</span>`}</li>`; }).join('')}</ol>`:''}${(s.post||[]).map(t=>`<p>${esc(t)}</p>`).join('')}${p0Boxes(s.box)}</div>${P0FOOT}</section>`;
}
function p0Reader(L){
  if(!L||!p0Open(L)){ ui('lesson',null); return p0Home(); }
  const sl=p0Slides(L), i=Math.min(ui('slide')||0,sl.length-1);
  return `<div class="row"><button type="button" class="btn sm" data-act="p0close">← Bootcamp</button></div>
  <div class="deck" data-deck="${L.n}">${p0Slide(L,sl[i],i,sl.length)}
    <div class="decknav"><button type="button" class="btn sm" data-act="p0slide" data-arg="${i-1}" ${i?'':'disabled'} aria-label="Slide anterior">←</button>
      <div class="dots" role="tablist">${sl.map((_,j)=>`<button type="button" class="dot${j===i?' on':''}" data-act="p0slide" data-arg="${j}" aria-label="Slide ${j+1}"></button>`).join('')}</div>
      <span class="hint num">${i+1} / ${sl.length}</span>
      <button type="button" class="btn sm${i<sl.length-1?' primary':''}" data-act="p0slide" data-arg="${i+1}" ${i<sl.length-1?'':'disabled'} aria-label="Slide siguiente">→</button></div></div>
  ${L.diag?`<div class="reader">${p0().diag?p0Result(p0().diag.level):p0DiagForm()}</div>`:''}`;
}
ACT.p0slide=j=>{ ui('slide',Math.max(0,+j)); render(); };
// Arrow keys and a swipe move through the slides
document.addEventListener('keydown',e=>{ if(!document.querySelector('.deck')||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!d) return; const L=P0.find(x=>x.n===ui('lesson')); if(!L) return;
  const j=(ui('slide')||0)+d; if(j<0||j>=p0Slides(L).length) return; ui('slide',j); render(); });
let p0x=null;
document.addEventListener('touchstart',e=>{ p0x=e.target.closest('.slide')?e.touches[0].clientX:null; },{passive:true});
document.addEventListener('touchend',e=>{ if(p0x===null) return; const dx=e.changedTouches[0].clientX-p0x; p0x=null; if(Math.abs(dx)<50) return;
  const L=P0.find(x=>x.n===ui('lesson')); if(!L) return; const j=(ui('slide')||0)+(dx<0?1:-1); if(j<0||j>=p0Slides(L).length) return; ui('slide',j); render(); });
function p0DiagForm(){
  return `<form data-form="p0diag" class="sheet pad" style="gap:18px">${P0Q.map((q,i)=>`<fieldset class="field" style="border:0;padding:0;margin:0"><span><b style="font-weight:400">${i+1}. ${esc(q[0])}</b></span>${q.slice(1).map((a,j)=>`<label class="check"><input type="radio" name="q${i}" value="${j}" required> <span>${esc(a)}</span></label>`).join('')}</fieldset>`).join('')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Ver mi resultado</button></form>`;
}
function p0Result(k){ const [t,d]=P0RES[k];
  return `<div class="sheet pad up" id="p0-result"><span class="label">Tu diagnóstico</span><h3 style="font-size:24px">Tu nivel: ${t}</h3><p>${esc(d)}</p>
    ${k==='online'?`<a class="btn primary sm" style="align-self:flex-start" href="/#precios">Ver el programa Online</a>`:`<p class="hint">Ya tenemos tu resultado. Te escribimos en 48 horas para buscar tu llamada de 20 minutos.</p>`}</div>`; }
FORM.p0diag=async f=>{ const ans=P0Q.map((_,i)=>+f['q'+i]), level=p0Level(ans);
  p0().diag={level,ans,at:new Date().toISOString()}; await DB.saveBusiness();
  if(!S.realMe) await DB.addLead(S.me.name,S.me.email,'signature',{plan:level,why:`Diagnóstico del Bootcamp: le recomendamos ${P0RES[level][0]}.`});
  render(); document.getElementById('p0-result')?.scrollIntoView({block:'center'}); };
ACT.p0lesson=n=>{ if(page()) history.pushState({},'','/portal'); S.route=location.pathname; ui('lesson',+n); ui('slide',0); render(); scrollTo(0,0); };
ACT.p0close=()=>{ ui('lesson',null); render(); scrollTo(0,0); };
ACT.p0go=sec=>{ ui('lesson',null); nav('/portal/negocio#p0-'+sec); };
ACT.p0done=async n=>{ n=+n; const first=!S.progress['p0-'+n]; if(first) await DB.markLesson('p0-'+n);
  ui('lesson',null); render(); scrollTo(0,0); if(first) toast('¡Lección completada! Qué orgullosas estamos de ti'); };
function p0Negocio(){
  const a=p0(), pl=a.plan||{}, field=(k,label,kind)=>`<div class="field"><span>${label}</span>${kind==='area'?`<textarea id="p0-${k}" name="${k}" rows="3">${esc(a[k]||'')}</textarea>`:`<input id="p0-${k}" name="${k}" ${kind==='num'?'type="number" min="0"':''} value="${esc(a[k]??'')}">`}</div>`;
  return `<header><h1>Mi negocio</h1><p>Tus respuestas del Bootcamp. Vuelve a ellas cuando lo necesites: son la base de tu negocio.</p></header>
  <form class="sheet pad" data-form="p0biz" id="p0-why"><span class="eyebrow">Día 1</span><h3 style="font-size:22px">Por qué quieres dedicarte a esto</h3>
    ${field('why','¿Por qué quiero ser wedding planner?','area')}${field('bodas','¿Qué tipo de bodas me imagino organizando?','area')}${field('senales','¿Cuántas de las 7 señales reconozco en mí?','num')}
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <form class="sheet pad" data-form="p0biz" id="p0-nums"><span class="eyebrow">Día 2</span><h3 style="font-size:22px">Tus números</h3>
    <div class="formgrid">${field('fee','Mi honorario mínimo por boda (€)','num')}${field('count','Bodas que necesito al año','num')}</div>
    <button class="btn primary" type="submit" style="align-self:flex-start">Guardar</button></form>
  <form class="sheet pad p0plan" data-form="p0plan" id="p0-plan"><span class="eyebrow">Días 5 y 6</span><h3 style="font-size:22px">Mi plan de 90 días · ${esc(S.me.name)}</h3>
    ${a.fee?`<p class="hint">Mi honorario mínimo: ${eur(+a.fee)} · ${esc(a.count||'')} bodas al año</p>`:''}
    ${P0PLAN.map(([ph,items],i)=>`<div><h4 style="font-size:18px;margin:10px 0 6px">${esc(ph)}</h4>${items.map((it,j)=>{ const k=`${i}-${j}`, v=pl[k]||{};
      return `<div class="formgrid p0row" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr);align-items:end"><div class="field"><span>${esc(it)}</span><input id="p0p-${k}" name="a${k}" value="${esc(v.a||'')}" placeholder="Qué vas a hacer"></div><div class="field"><span>Fecha</span><input id="p0d-${k}" name="d${k}" type="date" value="${esc(v.d||'')}"></div></div>`; }).join('')}</div>`).join('')}
    <div class="row noprint"><button class="btn primary" type="submit">Guardar mi plan</button><button class="btn" type="button" data-act="p0print">Descargar en PDF</button></div></form>`;
}
FORM.p0biz=async f=>{ Object.assign(p0(),f); await DB.saveBusiness(); toast('Guardado'); };
FORM.p0plan=async f=>{ const pl={}; P0PLAN.forEach(([,items],i)=>items.forEach((_,j)=>{ const k=`${i}-${j}`; pl[k]={a:(f['a'+k]||'').trim(),d:f['d'+k]||''}; })); p0().plan=pl; await DB.saveBusiness(); render(); toast('Plan guardado'); };
// The browser's print window saves it as a PDF; the print styles leave only the plan
ACT.p0print=()=>{ document.body.classList.add('print-plan'); setTimeout(()=>{ print(); document.body.classList.remove('print-plan'); },50); };
function p0Tools(){
  const items=p0Lib().filter(l=>l!==p0Wa());
  return `<header><h1>Herramientas</h1><p>Tus primeras herramientas de trabajo. Descárgalas y úsalas durante la semana: son tuyas.</p></header>
  <div class="sheet pad">${items.length?`<div class="list">${items.map(l=>`<div class="li"><div class="t"><b style="font-weight:400">${esc(l.title)}</b>${l.detail?`<small>${esc(l.detail)}</small>`:''}</div><button type="button" class="btn sm" data-act="openFile" data-arg="course|${esc(l.path||'')}">${/^https?:/.test(l.path||'')?'Abrir':'Descargar'}</button></div>`).join('')}</div>`:`<p class="empty">Estamos subiendo tus herramientas. Vuelve en un rato.</p>`}</div>
  <div class="sheet pad"><span class="label">Lecturas de apoyo</span><div class="list">${[['¿Puedo ser wedding planner? 7 señales','/guia-senales.pdf'],['Cuánto gana una wedding planner en España','/guia-numeros.pdf'],['De la oficina a las bodas: el plan de 90 días','/guia-90-dias.pdf']].map(([t,u])=>`<div class="li"><div class="t"><b style="font-weight:400">${t}</b><small>Guía en PDF</small></div><a class="btn sm" href="${u}" target="_blank" rel="noopener">Abrir</a></div>`).join('')}</div></div>`;
}
