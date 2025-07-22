
import { Course } from './types';

export const COURSES: Course[] = [
  // ING. DIEGO ARMANDO BALAREZO LÓPEZ
  {
    id: 'electricidad-residencial',
    commercialName: 'Electricidad Residencial: Instalación y Mantenimiento Seguro',
    code: 'K.1',
    area: 'Eléctrica',
    instructor: 'ING. DIEGO ARMANDO BALAREZO LÓPEZ',
    details: {
      totalDuration: '1 mes',
      totalHours: '40 horas',
      focus: 'Práctico en instalaciones eléctricas domiciliarias seguras y eficientes.'
    },
    curriculum: [
      { title: 'MÓDULO 1: Fundamentos de Electricidad', duration: '1 semana', topics: ['Conceptos básicos', 'Ley de Ohm', 'Circuitos en serie y paralelo'] },
      { title: 'MÓDULO 2: Seguridad y Normativa', duration: '1 semana', topics: ['Equipos de protección personal (EPP)', 'Normativa Eléctrica Ecuatoriana', 'Primeros auxilios en riesgos eléctricos'] },
      { title: 'MÓDULO 3: Instalaciones Domiciliarias', duration: '2 semanas', topics: ['Lectura de planos', 'Instalación de tomacorrientes e interruptores', 'Tableros de distribución', 'Sistemas de puesta a tierra'] }
    ]
  },
  {
    id: 'luminotecnia-variables-electricas',
    commercialName: 'Curso Técnico en Luminotecnia y Variables Eléctricas',
    code: 'K.6',
    area: 'Eléctrica',
    instructor: 'ING. DIEGO ARMANDO BALAREZO LÓPEZ',
    details: {
      totalDuration: '1 mes',
      totalHours: '40 horas',
      focus: 'Uso industrial y artístico del sistema de alumbrado, voltaje y resistencia.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Principios de Luminotecnia', duration: '1 semana', topics: ['Magnitudes lumínicas', 'Tipos de fuentes de luz', 'Software de diseño de iluminación'] },
        { title: 'MÓDULO 2: Variables Eléctricas Avanzadas', duration: '2 semanas', topics: ['Análisis de voltaje y corriente AC/DC', 'Medición de resistencia y capacitancia', 'Uso de multímetros y osciloscopios'] },
        { title: 'MÓDULO 3: Proyectos de Iluminación', duration: '1 semana', topics: ['Iluminación de interiores y exteriores', 'Iluminación industrial', 'Eficiencia energética en alumbrado'] }
    ]
  },
  {
    id: 'redes-electricas-liniero',
    commercialName: 'Curso de Capacitación Técnica en Redes Eléctricas - Liniero Eléctrico',
    code: 'K.8',
    area: 'Eléctrica',
    instructor: 'ING. DIEGO ARMANDO BALAREZO LÓPEZ',
    details: {
      totalDuration: '1.5 meses',
      frequency: '3 vez por semana',
      sessionDuration: '4 horas académicas',
      totalHours: '44 horas (11 sesiones x 4 horas)',
      focus: 'Formación predominantemente práctica en redes eléctricas de baja y media tensión.'
    },
    curriculum: [
      { title: 'MÓDULO 1: Introducción y Seguridad en Redes Eléctricas', duration: '1 Día (4 horas)', topics: ['Clasificación de redes: baja, media y alta tensión', 'Normativa vigente', 'Riesgos eléctricos y EPP', 'Simulacros de seguridad'] },
      { title: 'MÓDULO 2: Herramientas y Equipos', duration: '1 Día (4 horas)', topics: ['Herramientas manuales y eléctricas', 'Equipos de izaje, tensado y medición', 'Mantenimiento de equipos'] },
      { title: 'MÓDULO 3: Trabajo en Altura y Ascenso a Postes', duration: '1 Día (4 horas)', topics: ['Técnicas de ascenso y descenso seguro', 'Uso de arneses, estribos, eslingas', 'Prácticas supervisadas en postes'] },
      { title: 'MÓDULO 4: Instalación de Redes de Baja Tensión (BT)', duration: '1 Día (4 horas)', topics: ['Tendido de conductor', 'Instalación de crucetas, aisladores', 'Empalmes y conexiones'] },
      { title: 'MÓDULO 5: Instalación de Redes de Media Tensión (MT)', duration: '2 Días (8 horas)', topics: ['Características de líneas MT', 'Montaje de seccionadores, pararrayos', 'Práctica de armado de estructuras'] },
      { title: 'MÓDULO 6: Puesta en Servicio y Mantenimiento', duration: '2 Días (8 horas)', topics: ['Pruebas de continuidad y aislamiento', 'Protocolos de energización', 'Mantenimiento correctivo'] },
      { title: 'MÓDULO 7: Proyecto Final Integrador en Campo', duration: '3 Días (12 horas)', topics: ['Planificación y ejecución de red trifásica', 'Montaje completo', 'Evaluación integral'] },
      { title: 'MÓDULO TRANSVERSAL: Ética y Comunicación', duration: '11 Días (46 horas)', topics: ['Responsabilidad en trabajos con riesgo eléctrico', 'Comunicación efectiva', 'Reportes técnicos', 'Compromiso ambiental'] },
    ]
  },
  {
    id: 'sistemas-automatizados',
    commercialName: 'Sistemas Automatizados',
    code: 'P.4',
    area: 'Automatización',
    instructor: 'ING. DIEGO ARMANDO BALAREZO LÓPEZ',
    details: {
        totalDuration: '2 meses',
        totalHours: '80 horas',
        focus: 'Diseño e implementación de sistemas de automatización industrial y robótica.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Introducción a la Automatización', duration: '2 semanas', topics: ['Conceptos de control', 'Tipos de sistemas automatizados', 'Sensores y actuadores'] },
        { title: 'MÓDULO 2: Controladores Lógicos Programables (PLC)', duration: '3 semanas', topics: ['Arquitectura de PLC', 'Programación en Ladder', 'Comunicación industrial'] },
        { title: 'MÓDULO 3: Robótica Industrial', duration: '3 semanas', topics: ['Tipos de robots', 'Programación de robots', 'Integración de sistemas robóticos', 'Proyecto final'] }
    ]
  },
  // LCD. JUAN RIVERA TORRES
  {
    id: 'arquitectura-aprendizaje',
    commercialName: 'Arquitectura del Aprendizaje: Diseña Programas Educativos de Alto Impacto',
    code: 'J.1',
    area: 'Formación',
    instructor: 'LCD. JUAN RIVERA TORRES',
    details: {
        totalDuration: '1 mes',
        totalHours: '40 horas',
        focus: 'Capacitación en identificación de necesidades, procesos de capacitación continua y por competencias laborales.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Diagnóstico de Necesidades', duration: '1 semana', topics: ['Análisis organizacional', 'Detección de brechas de competencias', 'Modelos de diagnóstico'] },
        { title: 'MÓDULO 2: Diseño Curricular por Competencias', duration: '2 semanas', topics: ['Definición de perfiles de egreso', 'Redacción de objetivos de aprendizaje', 'Estrategias instruccionales'] },
        { title: 'MÓDULO 3: Evaluación y Seguimiento', duration: '1 semana', topics: ['Modelos de evaluación (Kirkpatrick)', 'Indicadores de impacto (ROI)', 'Planes de seguimiento'] }
    ]
  },
  {
    id: 'evaluacion-competencias',
    commercialName: 'Más Allá de la Calificación: Técnicas Modernas de Evaluación de Competencias',
    code: 'J.3',
    area: 'Formación',
    instructor: 'LCD. JUAN RIVERA TORRES',
    details: {
        totalDuration: '1 mes',
        totalHours: '30 horas',
        focus: 'Evaluación del aprendizaje con enfoque en competencias.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Fundamentos de la Evaluación por Competencias', duration: '1 semana', topics: ['Diferencia entre evaluación tradicional y por competencias', 'Tipos de evidencias'] },
        { title: 'MÓDULO 2: Instrumentos de Evaluación', duration: '2 semanas', topics: ['Diseño de rúbricas', 'Creación de listas de cotejo', 'Estudios de caso y portafolios'] },
        { title: 'MÓDULO 3: Feedback Efectivo', duration: '1 semana', topics: ['Técnicas de retroalimentación', 'Evaluación 360°', 'Planes de mejora'] }
    ]
  },
  {
    id: 'formacion-instructores',
    commercialName: 'Lidera el Aprendizaje: Herramientas para Instructores y Capacitadores del Siglo XXI',
    code: 'J.4',
    area: 'Formación',
    instructor: 'LCD. JUAN RIVERA TORRES',
    details: {
        totalDuration: '1.5 meses',
        totalHours: '50 horas',
        focus: 'Formación de instructores, facilitadores, monitores, maestros, guías, formadores.'
    },
    curriculum: [
        { title: 'MÓDULO 1: El Rol del Facilitador Moderno', duration: '2 semanas', topics: ['Andragogía vs. Pedagogía', 'Estilos de aprendizaje', 'Neuroeducación'] },
        { title: 'MÓDULO 2: Técnicas de Facilitación y Dinámicas de Grupo', duration: '2 semanas', topics: ['Manejo de grupos difíciles', 'Storytelling', 'Gamificación en el aula'] },
        { title: 'MÓDULO 3: Tecnología Educativa', duration: '2 semanas', topics: ['Plataformas LMS', 'Herramientas de colaboración online', 'Creación de contenido digital'] }
    ]
  },
  // ING. LUIS SARATE NAULA
  {
    id: 'diagnostico-sistemas-electricos-vehiculo',
    commercialName: 'Diagnóstico y reparación de Sistemas eléctricos y electrónicos del vehículo',
    code: 'K.2',
    area: 'Eléctrica',
    instructor: 'ING. LUIS SARATE NAULA',
    details: {
        totalDuration: '1.5 meses',
        totalHours: '60 horas',
        focus: 'Diagnóstico y reparación de sistemas eléctricos y electrónicos automotrices.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Electricidad Automotriz Básica', duration: '2 semanas', topics: ['Batería, alternador y motor de arranque', 'Lectura de diagramas eléctricos', 'Uso del multímetro automotriz'] },
        { title: 'MÓDULO 2: Electrónica del Vehículo', duration: '2 semanas', topics: ['Sensores y actuadores', 'Unidad de Control Electrónico (ECU)', 'Sistemas de inyección electrónica'] },
        { title: 'MÓDULO 3: Diagnóstico con Escáner', duration: '2 semanas', topics: ['Protocolos de comunicación (OBD-II)', 'Interpretación de códigos de falla', 'Análisis de datos en tiempo real'] }
    ]
  },
  {
    id: 'diagnostico-sistemas-automotrices',
    commercialName: 'Diagnóstico y reparación de sistemas automotrices',
    code: 'N.5',
    area: 'Mecánica',
    instructor: 'ING. LUIS SARATE NAULA',
    details: {
        totalDuration: '2 meses',
        totalHours: '80 horas',
        focus: 'Mecánica general básica para el diagnóstico y reparación de sistemas automotrices.'
    },
    curriculum: [
        { title: 'MÓDULO 1: Motores de Combustión Interna', duration: '3 semanas', topics: ['Ciclo Otto y Diesel', 'Sistema de distribución', 'Sistema de lubricación y refrigeración'] },
        { title: 'MÓDULO 2: Sistemas de Transmisión', duration: '2 semanas', topics: ['Cajas de cambio manuales y automáticas', 'Embrague', 'Diferencial'] },
        { title: 'MÓDULO 3: Frenos, Suspensión y Dirección', duration: '3 semanas', topics: ['Sistemas de frenos ABS', 'Tipos de suspensión', 'Sistemas de dirección asistida', 'Alineación y balanceo'] }
    ]
  },
  {
    id: 'tecnico-soldadura-electrica',
    commercialName: 'Técnico en soldadura electrica',
    code: 'O.12',
    area: 'Mecánica',
    instructor: 'ING. LUIS SARATE NAULA',
    details: {
      totalDuration: '1 mes',
      frequency: '3 vez por semana',
      sessionDuration: '4 horas académicas',
      totalHours: '48 horas (12 sesiones)',
      focus: 'Teórico-práctico centrado en el dominio de técnicas de soldadura eléctrica por arco, manejo de herramientas, lectura de planos y seguridad industrial.'
    },
    curriculum: [
      { title: 'MÓDULO 1: Introducción a la Soldadura Eléctrica', duration: '1 Día (4 horas)', topics: ['Conceptos básicos de soldadura', 'Tipos de soldadura eléctrica', 'Normativas y seguridad'] },
      { title: 'MÓDULO 2: Equipos y Herramientas de Soldadura', duration: '1 Día (4 horas)', topics: ['Fuentes de poder para soldadura por arco', 'Electrodos y materiales de aporte', 'Uso correcto del EPP'] },
      { title: 'MÓDULO 3: Técnicas de Soldadura por Arco', duration: '1 Día (4 horas)', topics: ['Preparación de piezas y posición', 'Soldadura en plano, horizontal y vertical', 'Técnicas de encendido y apagado del arco', 'Control de la corriente y voltaje'] },
      { title: 'MÓDULO 4: Tipos de Uniones y Posiciones de Soldadura', duration: '1.5 Día (6 horas)', topics: ['Uniones a tope, en T, solapadas y en esquina', 'Soldadura en posiciones 1G, 2G, 3G y 4G', 'Prácticas con diferentes espesores y tipos de metales'] },
      { title: 'MÓDULO 5: Lectura de Planos y Simbología de Soldadura', duration: '1.5 Días (6 horas)', topics: ['Interpretación de planos estructurales y mecánicos', 'Simbología normalizada', 'Tolerancias y especificaciones'] },
      { title: 'MÓDULO 6: Soldadura de Metales Ferrosos y No Ferrosos', duration: '1.5 Días (6 horas)', topics: ['Soldadura en acero al carbono y acero inoxidable', 'Técnicas para aluminio y cobre', 'Preparación y tratamiento previo y posterior'] },
      { title: 'MÓDULO 7: Ensayos No Destructivos y Control de Calidad', duration: '1.5 Días (6 horas)', topics: ['Inspección visual de cordones', 'Pruebas de penetración y líquidos reveladores', 'Normas de calidad aplicadas'] },
      { title: 'MÓDULO 8: Proyecto Final de Fabricación', duration: '3 Días (12 horas)', topics: ['Diseño y ejecución de una estructura metálica real', 'Aplicación de técnicas aprendidas', 'Presentación, evaluación y recomendaciones'] },
      { title: 'MÓDULO TRANSVERSAL: Seguridad Industrial y Medio Ambiente', duration: '12 semanas (48 horas)', topics: ['Protocolos de seguridad', 'Prevención de incendios y manejo de residuos', 'Normativas ambientales'] }
    ]
  },
];

export const GALLERY_IMAGES = [
  {
    id: '1',
    src: '/assets/gallery/p1.jpg',
    alt: 'Electricidad Residencial',
    title: 'Electricidad Residencial',
    description: 'Instalación y mantenimiento seguro de sistemas eléctricos domiciliarios',
    category: 'Eléctrica'
  },
  {
    id: '2',
    src: '/assets/gallery/p2.jpg',
    alt: 'Luminotecnia y Variables Eléctricas',
    title: 'Luminotecnia y Variables Eléctricas',
    description: 'Uso industrial y artístico del sistema de alumbrado',
    category: 'Eléctrica'
  },
  {
    id: '3',
    src: '/assets/gallery/p3.jpg',
    alt: 'Redes Eléctricas - Liniero',
    title: 'Redes Eléctricas - Liniero',
    description: 'Formación práctica en redes eléctricas de baja y media tensión',
    category: 'Eléctrica'
  },
  {
    id: '4',
    src: '/assets/gallery/p4.jpg',
    alt: 'Sistemas Automatizados',
    title: 'Sistemas Automatizados',
    description: 'Diseño e implementación de sistemas de automatización industrial',
    category: 'Automatización'
  },
  {
    id: '5',
    src: '/assets/gallery/p5.jpg',
    alt: 'Arquitectura del Aprendizaje',
    title: 'Arquitectura del Aprendizaje',
    description: 'Diseño de programas educativos de alto impacto',
    category: 'Formación'
  },
  {
    id: '6',
    src: '/assets/gallery/p6.jpg',
    alt: 'Evaluación de Competencias',
    title: 'Evaluación de Competencias',
    description: 'Técnicas modernas de evaluación por competencias',
    category: 'Formación'
  },
  {
    id: '7',
    src: '/assets/gallery/p7.jpg',
    alt: 'Formación de Instructores',
    title: 'Formación de Instructores',
    description: 'Herramientas para instructores del siglo XXI',
    category: 'Formación'
  },
  {
    id: '8',
    src: '/assets/gallery/p8.jpg',
    alt: 'Diagnóstico Automotriz',
    title: 'Diagnóstico Automotriz',
    description: 'Sistemas eléctricos y electrónicos del vehículo',
    category: 'Eléctrica'
  },
  {
    id: '9',
    src: '/assets/gallery/p9.jpg',
    alt: 'Diagnóstico de Sistemas Automotrices',
    title: 'Diagnóstico de Sistemas Automotrices',
    description: 'Mecánica general básica para el diagnóstico y reparación',
    category: 'Mecánica'
  },
  {
    id: '10',
    src: '/assets/gallery/p10.jpg',
    alt: 'Técnico en Soldadura Eléctrica',
    title: 'Técnico en Soldadura Eléctrica',
    description: 'Dominio de técnicas de soldadura eléctrica por arco',
    category: 'Mecánica'
  },
  {
    id: '11',
    src: '/assets/gallery/p11.jpg',
    alt: 'Trabajo en Altura',
    title: 'Trabajo en Altura',
    description: 'Técnicas de ascenso y descenso seguro',
    category: 'Eléctrica'
  },
  {
    id: '12',
    src: '/assets/gallery/p12.jpg',
    alt: 'Instalaciones Eléctricas',
    title: 'Instalaciones Eléctricas',
    description: 'Instalación de redes de baja y media tensión',
    category: 'Eléctrica'
  },
  {
    id: '13',
    src: '/assets/gallery/p13.jpg',
    alt: 'Controladores Lógicos Programables',
    title: 'Controladores Lógicos Programables',
    description: 'Programación en Ladder y comunicación industrial',
    category: 'Automatización'
  },
  {
    id: '14',
    src: '/assets/gallery/p14.jpg',
    alt: 'Robótica Industrial',
    title: 'Robótica Industrial',
    description: 'Programación de robots e integración de sistemas',
    category: 'Automatización'
  },
  {
    id: '15',
    src: '/assets/gallery/p15.jpg',
    alt: 'Evaluación por Competencias',
    title: 'Evaluación por Competencias',
    description: 'Diseño de rúbricas y listas de cotejo',
    category: 'Formación'
  },
  {
    id: '16',
    src: '/assets/gallery/p16.jpg',
    alt: 'Tecnología Educativa',
    title: 'Tecnología Educativa',
    description: 'Plataformas LMS y herramientas de colaboración',
    category: 'Formación'
  },
  {
    id: '17',
    src: '/assets/gallery/p17.jpg',
    alt: 'Mantenimiento Industrial',
    title: 'Mantenimiento Industrial',
    description: 'Protocolos de mantenimiento correctivo',
    category: 'Mecánica'
  },
  {
    id: '18',
    src: '/assets/gallery/p18.jpg',
    alt: 'Proyectos Finales',
    title: 'Proyectos Finales',
    description: 'Aplicación de técnicas aprendidas en proyectos reales',
    category: 'General'
  }
];

// Imágenes de fondo para secciones de cursos
export const COURSE_BACKGROUND_IMAGES = {
  'Eléctrica': [
    '/assets/gallery/p1.jpg',
    '/assets/gallery/p2.jpg',
    '/assets/gallery/p3.jpg',
    '/assets/gallery/p8.jpg',
    '/assets/gallery/p11.jpg',
    '/assets/gallery/p12.jpg'
  ],
  'Mecánica': [
    '/assets/gallery/p9.jpg',
    '/assets/gallery/p10.jpg',
    '/assets/gallery/p17.jpg'
  ],
  'Formación': [
    '/assets/gallery/p5.jpg',
    '/assets/gallery/p6.jpg',
    '/assets/gallery/p7.jpg',
    '/assets/gallery/p15.jpg',
    '/assets/gallery/p16.jpg'
  ],
  'Automatización': [
    '/assets/gallery/p4.jpg',
    '/assets/gallery/p13.jpg',
    '/assets/gallery/p14.jpg'
  ]
};

export const COMPANY_INFO = {
  name: "TECNIFORMACIÓN S.A.S",
  slogan: "Formamos habilidades, certificamos tu futuro.",
  about: "En TECNIFORMACIÓN S.A.S, somos una empresa ecuatoriana ubicada en la ciudad de Cuenca, comprometida con la formación técnica de personas profesionales y no profesionales. Nacimos con el propósito de ofrecer oportunidades reales de capacitación teórico-práctica en áreas estratégicas como la electricidad, la mecánica y la formación general, asegurando el respaldo de certificaciones avaladas por instituciones competentes.",
  mission: "Brindar formación técnica y práctica de calidad a personas profesionales y no profesionales, fortaleciendo sus competencias en las áreas eléctrica, mecánica y de formación, a través de programas certificados con el aval de instituciones competentes, contribuyendo así al desarrollo laboral y personal en el país.",
  vision: "Ser reconocida a nivel nacional como una institución líder en formación técnica y certificación profesional, comprometida con la excelencia, la inclusión y el impacto social, promoviendo el crecimiento continuo de nuestros estudiantes y del sector productivo.",
  values: [
    { name: 'Compromiso', description: 'Nos dedicamos con responsabilidad a la formación de cada persona que confía en nosotros.', },
    { name: 'Calidad', description: 'Garantizamos procesos formativos alineados con estándares técnicos y pedagógicos actuales.', },
    { name: 'Inclusión', description: 'Abrimos oportunidades de formación a todas las personas, sin importar su nivel previo.', },
    { name: 'Ética', description: 'Actuamos con integridad, transparencia y respeto en cada proceso.', },
    { name: 'Innovación', description: 'Buscamos constantemente nuevas herramientas y métodos para enseñar mejor.', },
    { name: 'Orientación al resultado', description: 'Formamos para que nuestros estudiantes puedan aplicar, certificar y crecer.', }
  ],
  whyUs: [
    { title: 'Docentes Expertos', description: 'Docentes con experiencia profesional y docente comprobada.' },
    { title: 'Enfoque Práctico', description: 'Enfoque teórico-práctico con simulación y laboratorio.' },
    { title: 'Certificación con Respaldo', description: 'Certificación con respaldo institucional.' },
    { title: 'Programas Flexibles', description: 'Programas flexibles y enfocados al mercado laboral.' },
  ],
  contact: {
    address: "Cuenca, Ecuador",
    email: "tecniformacion.ec@gmail.com",
    phone: "(+593) 0 960 6510 38",
    whatsapp: "+593960651038",
    social: {
      facebook: "https://www.facebook.com/profile.php?id=61578419601592",
      tiktok: "https://www.tiktok.com/@tecniformacion",
      instagram: "https://www.instagram.com/tecniformacion/",
    }
  }
};
