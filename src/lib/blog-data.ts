export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
  image?: string;       // imagen opcional dentro del cuerpo
  imageAlt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  location: string;
  author: string;
  date: string; // ISO string
  readTime: string;
  content: BlogPostSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'disco-separador-muro-de-concreto-silleta-lateral',
    title: 'Disco separador para muro de concreto: la silleta que garantiza recubrimientos precisos',
    excerpt:
      'En la construcción de muros de concreto reforzado, el disco separador —también conocido como silleta lateral— es el accesorio clave para mantener el acero centrado y lograr recubrimientos uniformes.',
    image: '/Image/blog-imagenes/portada-dos.jpeg',
    category: 'Productos',
    location: 'México',
    author: 'Equipo DFAC',
    date: '2026-07-20',
    readTime: '4 min',
    content: [
      {
        heading: '¿Qué es un disco separador para muro de concreto?',
        paragraphs: [
          'El disco separador es un distanciador vertical diseñado para mantener el acero de refuerzo exactamente al centro del muro durante el colado del concreto. Gracias a su diseño con clip interno, proporciona una sujeción firme de la varilla, evitando desplazamientos que puedan afectar el recubrimiento del concreto.',
          'Su uso permite cumplir con las especificaciones estructurales y obtener acabados aparentes de alta calidad.',
        ],
        image: '/Image/blog-imagenes/dentro-del-texto-dos.jpeg',
        imageAlt: 'Disco separador instalado en muro de concreto',
      },
      {
        heading: 'Beneficios de utilizar discos separadores',
        paragraphs: [
          'Mantienen el acero de refuerzo perfectamente centrado y garantizan recubrimientos uniformes de concreto en ambos lados del muro. Proporcionan acabados limpios, sin marcas visibles en el concreto aparente.',
          'Facilitan la colocación del acero durante el armado y ayudan a proteger la varilla contra la corrosión al asegurar el espesor adecuado del recubrimiento. Reducen errores durante el proceso de colado.',
        ],
      },
      {
        heading: 'Características técnicas',
        paragraphs: [
          'Los discos separadores para muro de concreto de DFAC ofrecen resistencia de carga de hasta 100 kg, diseño ligero y de alta resistencia, y clip interno para una sujeción segura del acero.',
          'Son ideales para muros de concreto con acero de refuerzo al centro, con excelente desempeño en proyectos residenciales, comerciales e industriales.',
        ],
      },
      {
        heading: 'Medidas disponibles',
        paragraphs: [
          'Para adaptarse a los requerimientos de cada proyecto, el disco separador está disponible en las siguientes medidas: 2 cm, 2.5 cm, 3 cm, 4 cm, 4.5 cm, 5 cm, 6.5 cm y 7.5 cm.',
          'Estas opciones permiten cumplir con diferentes especificaciones de recubrimiento según el diseño estructural de la obra.',
        ],
      },
      {
        heading: 'Aplicaciones',
        paragraphs: [
          'Los discos separadores son ideales para muros estructurales, muros de concreto aparente, muros de contención, cisternas, edificios habitacionales, naves industriales y obras civiles y de infraestructura.',
        ],
      },
      {
        heading: 'DFAC, tu aliado en accesorios para cimbra',
        paragraphs: [
          'En DFAC sabemos que cada detalle cuenta para lograr una construcción segura y eficiente. Por ello, ofrecemos una amplia gama de accesorios para cimbra y concreto que cumplen con altos estándares de calidad, brindando soluciones confiables para cada etapa de tu proyecto.',
          'Si buscas discos separadores para muro de concreto, nuestro equipo puede asesorarte para elegir la medida adecuada y ayudarte a optimizar el desempeño de tu obra.',
        ],
      },
    ],
  },
  {
    slug: 'banda-de-pvc-sello-retenedor-de-agua',
    title: 'Banda de PVC: el sello retenedor de agua que protege tus estructuras',
    excerpt:
      'En proyectos donde el concreto está en contacto constante con el agua, la banda de PVC es el sistema de sellado más confiable para evitar filtraciones en juntas de construcción y expansión.',
    image: '/Image/blog-imagenes/imagen-portada.jpeg',
    category: 'Productos',
    location: 'México',
    author: 'Equipo DFAC',
    date: '2026-07-14',
    readTime: '4 min',
    content: [
      {
        heading: '¿Qué es una banda de PVC?',
        paragraphs: [
          'La banda de PVC es un sello retenedor de agua fabricado con cloruro de polivinilo (PVC) de alta resistencia. Se instala durante el colado del concreto para crear una barrera impermeable que impide el paso del agua a través de las juntas.',
          'Gracias a su flexibilidad y resistencia, se adapta a los movimientos naturales de la estructura sin perder su capacidad de sellado.',
        ],
        image: '/Image/blog-imagenes/va-dentro-del-texto.jpeg',
        imageAlt: 'Banda de PVC instalada en junta de concreto',
      },
      {
        heading: 'Características',
        paragraphs: [
          'Fabricada en Cloruro de Polivinilo (PVC). Longitud: 25 metros lineales.',
          'Diseño con bulbo central, que permite absorber los movimientos de expansión y contracción. Laterales estriados, que mejoran el anclaje al concreto. Ojillos integrados, para una mejor fijación durante la instalación y un sellado más eficiente.',
          'Alta resistencia al agua y a las condiciones propias de obras hidráulicas y civiles.',
        ],
      },
      {
        heading: 'Beneficios',
        paragraphs: [
          'Evita filtraciones de agua en juntas de concreto e incrementa la vida útil de las estructuras.',
          'Reduce costos de mantenimiento y reparaciones por humedad. Excelente adherencia gracias a sus laterales estriados.',
          'Instalación segura con ojillos integrados que facilitan su fijación. Material resistente, flexible y de larga duración.',
        ],
      },
      {
        heading: 'Aplicaciones',
        paragraphs: [
          'La banda de PVC es ideal para proyectos donde se requiere un sellado confiable contra el paso del agua: cisternas, albercas, plantas de tratamiento, tanques de almacenamiento, canales hidráulicos, muros de contención, sótanos y cimentaciones, túneles, y obras hidráulicas e industriales.',
        ],
        image: '/Image/blog-imagenes/va-dentro-del-texto-2.jpeg',
        imageAlt: 'Aplicaciones de banda de PVC en obras hidráulicas',
      },
      {
        heading: '¿Por qué elegir una banda de PVC de calidad?',
        paragraphs: [
          'Utilizar una banda retenedora de agua de alta calidad garantiza un mejor desempeño durante toda la vida útil de la estructura. Su diseño con bulbo central, laterales estriados y ojillos integrados permite un sellado más efectivo, incluso cuando el concreto presenta movimientos por cambios de temperatura o asentamientos naturales.',
          'Invertir en un sistema de impermeabilización adecuado desde la construcción ayuda a prevenir filtraciones, proteger la estructura y evitar costosas reparaciones futuras.',
        ],
      },
      {
        heading: 'DFAC: Soluciones confiables para la construcción',
        paragraphs: [
          'En DFAC ofrecemos bandas de PVC diseñadas para brindar un sellado eficiente y una excelente resistencia en proyectos de construcción e infraestructura. Nuestros productos cumplen con altos estándares de calidad para ayudarte a proteger tus instalaciones y garantizar estructuras más seguras y duraderas.',
        ],
      },
    ],
  },
  {
    slug: 'entrega-de-cimbra-y-andamios-en-24-horas-cdmx',
    title: 'Entrega de cimbra y andamios en 24 horas en la CDMX y Zona Metropolitana',
    excerpt:
      'Descubre cómo nuestro sistema logístico garantiza que tu material de cimbra y andamiaje llegue a tu obra en la Ciudad de México y el Estado de México en menos de 24 horas.',
    image: '/Image/CARRUSEL-DFAC17-D5.jpg',
    category: 'Logística',
    location: 'Ciudad de México',
    author: 'Equipo DFAC',
    date: '2026-06-02',
    readTime: '4 min',
    content: [
      {
        heading: 'El tiempo es el recurso más valioso en obra',
        paragraphs: [
          'En la construcción, cada hora que una obra permanece detenida por falta de material representa costos que se acumulan rápidamente: mano de obra parada, renta de maquinaria y penalizaciones por retraso. Por eso en DFAC construimos un sistema logístico pensado para la realidad de la Ciudad de México y su Zona Metropolitana.',
          'Nuestra promesa es simple y poderosa: material de cimbra y andamiaje de alta resistencia entregado en tu obra en menos de 24 horas.',
        ],
      },
      {
        heading: 'Cobertura en el Valle de México',
        paragraphs: [
          'Atendemos las 16 alcaldías de la CDMX y los municipios conurbados del Estado de México, incluyendo Naucalpan, Tlalnepantla, Ecatepec, Nezahualcóyotl y Cuautitlán Izcalli. Conocemos los horarios de restricción de carga y las rutas más eficientes para llegar a tiempo.',
          'Ya sea que necesites puntales, vigas H20, andamios certificados o accesorios, coordinamos la entrega directo al pie de tu obra.',
        ],
      },
      {
        heading: '¿Cómo aprovechar la entrega express?',
        paragraphs: [
          'Te recomendamos anticipar el pedido con una lista clara de material y las especificaciones de tu proyecto. Nuestro equipo de asesoría te ayuda a dimensionar correctamente para que no te falte ni te sobre.',
          'Contáctanos y cotiza hoy mismo: mantenemos tu obra en movimiento.',
        ],
      },
    ],
  },
  {
    slug: 'viga-h20-ventajas-construccion-valle-de-mexico',
    title: 'Viga H20: ventajas para la construcción en el Valle de México',
    excerpt:
      'La viga H20 se ha vuelto un estándar en el encofrado moderno. Te explicamos por qué es ideal para las condiciones de obra en la CDMX y sus alrededores.',
    image: '/Image/Viga-H20/viga-h20-1.png',
    category: 'Productos',
    location: 'Valle de México',
    author: 'Equipo DFAC',
    date: '2026-05-20',
    readTime: '5 min',
    content: [
      {
        heading: '¿Qué es la viga H20?',
        paragraphs: [
          'La viga H20 es un elemento estructural de madera con perfil en forma de "H" y 20 cm de peralte, utilizado como soporte principal en sistemas de cimbra para losas y muros. Su diseño combina ligereza con una gran capacidad de carga.',
          'Es una solución probada a nivel mundial y cada vez más común en las obras del Valle de México por su versatilidad.',
        ],
      },
      {
        heading: 'Ventajas para obras en la CDMX',
        paragraphs: [
          'Su bajo peso facilita el manejo en obras con accesos complicados, algo habitual en la densa zona urbana de la Ciudad de México. Al ser reutilizable, reduce el costo por uso a lo largo de varios colados.',
          'Además, ofrece un acabado uniforme del concreto y disminuye los tiempos de armado y desarme de la cimbra, acelerando el ciclo de trabajo.',
        ],
      },
      {
        heading: 'Recomendaciones de uso y cuidado',
        paragraphs: [
          'Almacena las vigas bajo techo y sobre polines para protegerlas de la humedad, especialmente en la temporada de lluvias. Revisa periódicamente que no presenten fisuras o daños en los extremos.',
          'En DFAC contamos con viga H20 disponible para entrega inmediata. Pregunta por nuestras condiciones de compra y renta.',
        ],
      },
    ],
  },
  {
    slug: 'impermeabilizantes-temporada-de-lluvias-estado-de-mexico',
    title: 'Impermeabilizantes para la temporada de lluvias en el Estado de México',
    excerpt:
      'La temporada de lluvias en el centro del país exige preparación. Conoce los impermeabilizantes acrílicos y asfálticos ideales para proteger tus construcciones.',
    image: '/Image/mono-proceso-muro-concreto.jpeg',
    category: 'Productos químicos',
    location: 'Estado de México',
    author: 'Equipo DFAC',
    date: '2026-05-08',
    readTime: '4 min',
    content: [
      {
        heading: 'Un clima que pone a prueba tus obras',
        paragraphs: [
          'Entre mayo y octubre, el Valle de México y el Estado de México reciben la mayor parte de sus lluvias anuales. Las filtraciones y la humedad son la principal causa de deterioro prematuro en losas, muros y cimentaciones.',
          'Aplicar el impermeabilizante correcto antes de la temporada evita reparaciones costosas y protege la vida útil de la estructura.',
        ],
      },
      {
        heading: 'Acrílicos vs. asfálticos: ¿cuál elegir?',
        paragraphs: [
          'Los impermeabilizantes acrílicos son ideales para azoteas expuestas al sol, ya que reflejan el calor y resisten los rayos UV. Los asfálticos ofrecen mayor espesor y son excelentes para zonas de encharcamiento o cimentaciones.',
          'La elección depende de la superficie, el tránsito y la exposición. Nuestro equipo te asesora para elegir la mejor opción según tu proyecto.',
        ],
      },
      {
        heading: 'Prepara tu obra a tiempo',
        paragraphs: [
          'Lo ideal es impermeabilizar durante la temporada seca, cuando la superficie está completamente libre de humedad. Anticipar la compra evita quedarte sin material cuando llegan las primeras lluvias.',
          'En DFAC manejamos una línea completa de impermeabilizantes acrílicos, asfálticos, membranas de curado y selladores con entrega rápida en toda la Zona Metropolitana.',
        ],
      },
    ],
  },
  {
    slug: 'apuntalamiento-seguro-puntales-y-silletas-zona-metropolitana',
    title: 'Apuntalamiento seguro: puntales y silletas para obras en la Zona Metropolitana',
    excerpt:
      'El apuntalamiento correcto es sinónimo de seguridad. Te contamos cómo elegir puntales y silletas adecuados para tus colados en la CDMX y municipios cercanos.',
    image: '/Image/mono-proceso-construccion.jpeg',
    category: 'Apuntalamiento',
    location: 'Zona Metropolitana',
    author: 'Equipo DFAC',
    date: '2026-04-22',
    readTime: '5 min',
    content: [
      {
        heading: 'La base de un colado seguro',
        paragraphs: [
          'El apuntalamiento sostiene la cimbra y el peso del concreto fresco hasta que este alcanza su resistencia. Un sistema mal dimensionado puede provocar deformaciones, fallas o accidentes graves en obra.',
          'En proyectos de la Zona Metropolitana, donde conviven construcciones de distintas alturas y cargas, elegir el puntal correcto es fundamental.',
        ],
      },
      {
        heading: 'Puntales y silletas: cada uno con su función',
        paragraphs: [
          'Los puntales metálicos ajustables permiten soportar losas a diferentes alturas con gran capacidad de carga y fácil nivelación. Las silletas, por su parte, mantienen el acero de refuerzo en su posición correcta dentro del colado, garantizando el recubrimiento adecuado.',
          'Usar accesorios certificados y en buen estado es clave para la seguridad de todo el personal en obra.',
        ],
      },
      {
        heading: 'Inspección y buenas prácticas',
        paragraphs: [
          'Antes de cada uso, revisa que los puntales no estén doblados, oxidados en exceso o con roscas dañadas. Respeta siempre las separaciones indicadas por el proyecto estructural.',
          'En DFAC encuentras puntales, silletas y todos los accesorios de apuntalamiento con la calidad certificada que tu obra necesita, disponibles para entrega en 24 horas.',
        ],
      },
    ],
  },
  {
    slug: 'aditivos-para-concreto-clima-de-la-cdmx',
    title: 'Aditivos para concreto: cómo mejorar tus colados en el clima de la CDMX',
    excerpt:
      'Los aditivos permiten adaptar el concreto a las condiciones de cada obra. Conoce cuáles te ayudan a colar con éxito bajo el clima de la Ciudad de México.',
    image: '/Image/CARRUSEL-DFAC23-D5.jpg',
    category: 'Productos químicos',
    location: 'Ciudad de México',
    author: 'Equipo DFAC',
    date: '2026-04-05',
    readTime: '4 min',
    content: [
      {
        heading: 'Concreto a la medida de tu obra',
        paragraphs: [
          'El concreto no siempre se comporta igual: la temperatura, la humedad y los tiempos de traslado afectan su fraguado y resistencia. Los aditivos permiten controlar estas variables para lograr un colado exitoso.',
          'En la Ciudad de México, con su altitud y variaciones de temperatura entre el día y la noche, dominar estos factores marca la diferencia.',
        ],
      },
      {
        heading: 'Tipos de aditivos más usados',
        paragraphs: [
          'Los plastificantes y superplastificantes mejoran la trabajabilidad sin agregar más agua, aumentando la resistencia final. Los retardantes son útiles en climas cálidos o para traslados largos, mientras que los acelerantes ayudan en colados de temporada fría.',
          'También existen impermeabilizantes integrales y estabilizadores de volumen que aportan durabilidad a la estructura.',
        ],
      },
      {
        heading: 'Dosificación y asesoría',
        paragraphs: [
          'La dosis correcta es clave: un exceso puede ser tan perjudicial como una falta. Por eso conviene apoyarse en fichas técnicas y en la asesoría de un especialista.',
          'En DFAC contamos con una amplia línea de aditivos y productos químicos para concreto, junto con el respaldo técnico para que elijas el adecuado.',
        ],
      },
    ],
  },
  {
    slug: 'andamios-certificados-seguridad-en-altura-mexico',
    title: 'Andamios certificados: seguridad en construcciones de gran altura en México',
    excerpt:
      'Trabajar en altura exige andamios confiables. Te explicamos qué revisar para garantizar la seguridad de tu equipo en obras de la CDMX y el resto del país.',
    image: '/Image/Galeria/CARRUSEL-DFAC1-D5.jpg',
    category: 'Andamios',
    location: 'México',
    author: 'Equipo DFAC',
    date: '2026-03-18',
    readTime: '5 min',
    content: [
      {
        heading: 'La seguridad no se negocia',
        paragraphs: [
          'Las caídas de altura son una de las principales causas de accidentes en la construcción. Contar con andamios certificados, bien armados y en buen estado es la mejor inversión para proteger a tu personal.',
          'En obras de gran altura en la Ciudad de México y otras ciudades del país, la normatividad y las buenas prácticas son indispensables.',
        ],
      },
      {
        heading: 'Qué revisar en un sistema de andamiaje',
        paragraphs: [
          'Verifica que la estructura esté nivelada y apoyada sobre bases firmes, que cuente con crucetas, plataformas completas y barandales de protección. Las conexiones deben estar aseguradas y sin piezas faltantes.',
          'El acceso debe realizarse por escaleras integradas, nunca trepando por la estructura. Un andamio certificado cumple con estándares de resistencia que garantizan estabilidad.',
        ],
      },
      {
        heading: 'Capacitación y mantenimiento',
        paragraphs: [
          'El montaje debe estar a cargo de personal capacitado, y el equipo debe inspeccionarse antes de cada jornada. Retira de servicio cualquier pieza dañada u oxidada.',
          'En DFAC ofrecemos andamios certificados y accesorios que cumplen con los más altos estándares de seguridad, listos para entrega rápida en tu obra.',
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
