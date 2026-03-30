const createGallery = (folder, count, startIndex = 1) =>
  Array.from({ length: count }, (_, index) => `/img/projects/${folder}/${index + startIndex}.webp`);

export const portfolioData = {
  navLinks: [
    { label: 'Propuesta', href: '#about' },
    { label: 'Experiencia', href: '#experience' },
    { label: 'Stack', href: '#stack' },
    { label: 'Casos', href: '#portfolio' },
    { label: 'Contacto', href: '#contact' },
  ],
  hero: {
    eyebrow: 'Fullstack Developer con foco en Backend PHP y Laravel',
    title: 'Backend robusto, criterio de producto y experiencia visual que transmite valor.',
    description:
      'Soy desarrollador fullstack con 4 años de experiencia profesional construyendo, manteniendo y mejorando productos SaaS, fintech, software hotelero y sistemas de gestión. Mi fortaleza está en Laravel, la lógica de negocio compleja, el trabajo sobre legado y la capacidad de ordenar productos para que funcionen mejor y se perciban mejor.',
    primaryAction: {
      label: 'Ver casos reales',
      href: '#portfolio',
    },
    secondaryAction: {
      label: 'Recorrer mi experiencia',
      href: '#experience',
    },
    trustItems: [
      'Laravel + backend complejo',
      'Legacy, performance y despliegue',
      'UX/UI con criterio comercial',
    ],
    signalCards: [
      {
        title: 'Backend que soporta el negocio',
        description: 'Roles, pagos, automatizaciones, trazabilidad, módulos complejos y despliegues pensados para producción.',
      },
      {
        title: 'Frontend que reduce fricción',
        description: 'Interfaces claras, jerarquía visual, motion intencional y copy alineado con la decisión del usuario.',
      },
    ],
  },
  heroStats: [
    {
      value: '4+',
      label: 'años de experiencia',
      description: 'Trayectoria profesional en productos reales con presión de negocio y necesidades concretas.',
    },
    {
      value: '5',
      label: 'equipos y compañías',
      description: 'Experiencia remota y freelance en España y Argentina sobre contextos técnicos muy distintos.',
    },
    {
      value: 'SaaS + Fintech',
      label: 'sectores dominantes',
      description: 'También trabajé en hotelería, gestión empresarial, legacy y productos internos de evaluación.',
    },
  ],
  about: {
    kicker: 'Propuesta de valor',
    title: 'Construyo software que resuelve operaciones complejas sin volver frágil el crecimiento.',
    intro:
      'Cuando un sistema falla en arquitectura, claridad o rendimiento, el problema deja de ser técnico y se convierte en fricción para el negocio. Mi trabajo es anticipar eso y ordenar el producto desde la base.',
    paragraphs: [
      'Me especializo en backend con Laravel: lógica de negocio, permisos, multi-tenant, integraciones críticas, pagos, observabilidad, performance y mantenimiento de software heredado.',
      'También cuido la experiencia visual porque una interfaz clara, una narrativa bien enfocada y una mejor jerarquía visual aumentan confianza, reducen dudas y ayudan a vender mejor el producto y al profesional que está detrás.',
    ],
    pillars: [
      {
        title: 'Arquitectura con intención',
        description: 'Diseño soluciones que resisten el crecimiento, facilitan mantenimiento y no se rompen al primer cambio de negocio.',
      },
      {
        title: 'Lectura real del producto',
        description: 'Entiendo contexto, prioridades y fricción del usuario para tomar decisiones técnicas que tengan sentido comercial.',
      },
      {
        title: 'Ejecución sobre entornos complejos',
        description: 'Trabajo cómodo en sistemas legacy, refactors sensibles, integraciones y despliegues donde equivocarse cuesta caro.',
      },
    ],
  },
  experience: {
    kicker: 'Experiencia profesional',
    title: 'Trayectoria reciente en productos con backend exigente, mantenimiento real y foco en negocio.',
    intro:
      'Participé en compañías y equipos donde el valor no estaba solo en desarrollar features, sino en ordenar sistemas, sostener operación y entregar soluciones que realmente se usaran.',
    items: [
      {
        company: 'Grupo Dicromo S.L.',
        role: 'SSR Backend Developer',
        period: '08/24 - 02/26',
        location: 'Madrid, España · Remoto',
        summary:
          'Trabajé en CronoManager y Exparcity, dos productos con foco en SaaS, automatización, monetización y arquitectura backend orientada a escalabilidad.',
      },
      {
        company: 'Moebius DMC',
        role: 'JR Backend Developer',
        period: '09/23 - 08/24',
        location: 'Buenos Aires, Argentina · Remoto',
        summary:
          'Fui parte del mantenimiento y evolución de ZOCO, con fuerte peso en hotelería, performance, refactor técnico y trabajo sobre código heredado.',
      },
      {
        company: 'Enivel7',
        role: 'Backend Developer',
        period: '06/23 - 01/24',
        location: 'Buenos Aires, Argentina · Freelance',
        summary:
          'Participé en soluciones fintech y corporativas, destacando WebCoin y Ford Pinasco, combinando backend, frontend y criterio de conversión.',
      },
      {
        company: 'NoCountry',
        role: 'Backend Developer',
        period: '03/23 - 06/23',
        location: 'Buenos Aires, Argentina · Simulación de entorno laboral',
        summary:
          'Trabajé en productos colaborativos y paneles internos, aportando organización backend, modelado de dominio y endpoints para flujos de equipo.',
      },
      {
        company: 'ZedPlan',
        role: 'JR Backend Developer',
        period: '04/23 - 05/23',
        location: 'Buenos Aires, Argentina · Remoto',
        summary:
          'Mantenimiento y evolución de un sistema empresarial complejo con mezcla de PHP legacy, Laravel y lógica operativa sensible.',
      },
    ],
  },
  capabilities: [
    {
      title: 'Backend & arquitectura',
      description:
        'Laravel, modelado de dominio, lógica compleja, multi-tenant, permisos, modernización de sistemas heredados y estructuras sostenibles.',
    },
    {
      title: 'Integraciones críticas',
      description:
        'Stripe, WhatsApp Cloud API, TravelGate, OpenAI, Vision AI, webhooks, procesos asincrónicos y servicios externos donde la confiabilidad importa.',
    },
    {
      title: 'Performance & operación',
      description:
        'Optimización de consultas, despliegues, observabilidad, Docker, Linux, cloud y decisiones técnicas enfocadas en producción.',
    },
    {
      title: 'Frontend orientado a conversión',
      description:
        'Vue, Livewire, Blade, HTML/CSS/JS y criterio UX/UI para que la interfaz acompañe la propuesta de valor y no la debilite.',
    },
  ],
  stackGroups: [
    {
      title: 'Backend core',
      items: ['PHP', 'Laravel', 'Symfony', 'Node.js', 'OpenCore', 'JWT', 'PHPUnit'],
    },
    {
      title: 'Datos y performance',
      items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQL tuning', 'Caching', 'Reportes PDF/Excel'],
    },
    {
      title: 'Infra y despliegue',
      items: ['Docker', 'Nginx', 'LEMP', 'LAMP', 'Linux', 'WSL', 'Google Cloud', 'DigitalOcean'],
    },
    {
      title: 'Frontend y experiencia',
      items: ['Vue.js', 'Vue 3', 'Livewire', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 'Bootstrap', 'TailwindCSS', 'jQuery', 'Figma'],
    },
    {
      title: 'Herramientas y producto',
      items: ['Git', 'Postman', 'Insomnia', 'Jira', 'Sentry', 'Stripe', 'Mercado Pago', 'PayPal', 'Pusher'],
    },
  ],
  projects: [
    {
      slug: 'cronomanager',
      category: 'SaaS B2B',
      title: 'CronoManager',
      summary:
        'Plataforma SaaS multi-tenant para control horario, fichajes, ausencias, reportes y facturación, pensada para empresas con operación distribuida.',
      hook: 'Backend de alto impacto para operación diaria, automatización y cobro recurrente.',
      cover: '/img/projects/cronomanager/1.webp',
      gallery: createGallery('cronomanager', 20, 1),
      cta: {
        label: 'Visitar sitio',
        href: 'https://cronomanager.com/',
      },
      stack: ['Laravel', 'JWT', 'MongoDB', 'Google Cloud', 'Stripe', 'Docker', 'Sentry'],
      cardHighlights: [
        'Arquitectura tenant-per-database.',
        'Fichajes por WhatsApp, OTP y minisite.',
        'Automatizaciones, métricas y billing.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Centralizar fichajes, horarios, ausencias y reportes en una sola plataforma.',
            'Dar autonomía a empresas con equipos distribuidos y reglas operativas distintas.',
            'Reducir fricción para el empleado en el momento más sensible: registrar la jornada.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Diseño y desarrollo del backend sobre una arquitectura multi-tenant con aislamiento por cliente.',
            'Implementación de flujos de fichaje vía WhatsApp oficial, OTP, enlaces con JWT y minisite web.',
            'Integración de Stripe, almacenamiento en Google Cloud Storage y operación sobre Google Compute Engine.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Unificó operación, cumplimiento y monetización dentro de un mismo producto.',
            'Permitió escalar clientes sin mezclar datos ni comprometer configuraciones.',
            'Mejoró la experiencia diaria del usuario final con recorridos simples y contextuales.',
          ],
        },
      ],
    },
    {
      slug: 'exparcity',
      category: 'SaaS / Red social AI',
      title: 'Exparcity',
      summary:
        'Plataforma social de descubrimiento de experiencias locales, diseñada para escalar contenido, usuarios y monetización mediante personalización e IA.',
      hook: 'Arquitectura backend para personalización, contenido escalable y monetización.',
      cover: '/img/projects/exparcity/1.webp',
      gallery: createGallery('exparcity', 14, 1),
      cta: {
        label: 'Ver referencia',
        href: 'https://dev-alansan.netlify.app/#portfolio',
      },
      stack: ['Laravel', 'MongoDB', 'OpenAI', 'Vision AI', 'Stripe', 'Firebase', 'Pusher'],
      cardHighlights: [
        'Ranking social y personalización contextual.',
        'Pipelines automatizados con IA.',
        'Manejo de contenido, medios y CDN.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Descubrir planes según ciudad, clima, historial, afinidad y relaciones sociales.',
            'Escalar contenido y monetización sin depender únicamente de carga manual.',
            'Conectar usuarios, guías, negocios e influencers bajo una misma lógica de producto.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Diseño de la arquitectura backend para exploración, creación y reservas.',
            'Implementación de pipelines con OpenAI para generación de planes, descripciones y perfiles artificiales.',
            'Automatización de validación de imágenes con Vision AI y almacenamiento optimizado en cloud.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Permitió crear una base de contenido más grande con procesos automatizados.',
            'Mejoró relevancia percibida mediante ranking y señales contextuales.',
            'Preparó el producto para crecer sobre personalización y revenue.',
          ],
        },
      ],
    },
    {
      slug: 'zoco',
      category: 'Software hotelero',
      title: 'ZOCO',
      summary:
        'Plataforma de distribución turística donde trabajé el módulo hotelero, refactor técnico y optimización de un sistema heredado.',
      hook: 'Refactor, performance y arquitectura en un producto complejo con alto peso operativo.',
      cover: '/img/projects/zoco/1.webp',
      gallery: createGallery('zoco', 30, 1),
      cta: {
        label: 'Ver referencia',
        href: 'https://dev-alansan.netlify.app/#portfolio',
      },
      stack: ['Laravel 5.4 → 9', 'MySQL', 'Docker', 'TravelGate', 'JSON / XML', 'Postman'],
      cardHighlights: [
        'Refactor de Laravel legado.',
        'Optimización fuerte del buscador hotelero.',
        'Gestión avanzada de disponibilidad y tarifas.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Administrar hoteles, habitaciones, tarifas, políticas y disponibilidad en un ecosistema turístico complejo.',
            'Exponer resultados a terceros e integrar información de proveedores externos.',
            'Sostener un módulo crítico sobre una base heredada en mal estado.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Desarrollo y mantenimiento integral del módulo de hotelería con lógica avanzada de negocio.',
            'Actualización técnica del proyecto desde Laravel 5.4 hasta Laravel 9 y dockerización del entorno.',
            'Optimización del buscador y de consultas MySQL, junto con mejoras de arquitectura general.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Reducción del tiempo de respuesta del buscador de alrededor de 40 segundos a cerca de 3 segundos.',
            'Mayor mantenibilidad sobre una plataforma compleja y crítica para operación.',
            'Base más estable para seguir escalando reglas de negocio hoteleras.',
          ],
        },
      ],
    },
    {
      slug: 'webcoin',
      category: 'Fintech / SaaS',
      title: 'WebCoin',
      summary:
        'Sistema de cambio de moneda digital con foco en trazabilidad, estabilidad operativa y una interfaz rediseñada para comunicar mejor el producto.',
      hook: 'Solución financiera donde backend confiable y frontend claro tenían que trabajar juntos.',
      cover: '/img/projects/webcoin/1.webp',
      gallery: createGallery('webcoin', 4, 1),
      cta: {
        label: 'Visitar sitio',
        href: 'https://webcoin.com',
      },
      stack: ['Laravel 9', 'Livewire', 'MySQL', 'Docker', 'Tailwind', 'Figma'],
      cardHighlights: [
        'Corrección de bugs en flujos sensibles.',
        'Frontend implementado desde diseño nuevo.',
        'Panel para personalización visual dinámica.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Gestionar cambio de moneda digital con información sensible y trazabilidad operativa.',
            'Transmitir confianza en un producto financiero donde la claridad visual es determinante.',
            'Permitir ajustes visuales sin depender de nuevos despliegues.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Trabajo fullstack sobre Laravel 9 y Livewire, corrigiendo bugs preexistentes y estabilizando flujos.',
            'Implementación de logging y auditoría para eventos críticos y parámetros sensibles.',
            'Reestructuración del frontend a partir de un nuevo diseño en Figma y construcción de una nueva landing.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Producto más confiable para el usuario y el equipo operativo.',
            'Interfaz más moderna, clara y alineada con expectativas del segmento financiero.',
            'Mayor flexibilidad de marca desde administración.',
          ],
        },
      ],
    },
    {
      slug: 'ford-pinasco',
      category: 'Landing corporativa',
      title: 'Ford Pinasco',
      summary:
        'Landing corporativa pensada para presentar vehículos, captar leads y facilitar contacto directo desde una experiencia simple y eficiente.',
      hook: 'Proyecto end-to-end centrado en performance, claridad y conversión comercial.',
      cover: '/img/projects/ford_pinasco/1.webp',
      gallery: createGallery('ford_pinasco', 5, 1),
      cta: {
        label: 'Visitar sitio',
        href: 'https://www.maximopinasco.com.ar/',
      },
      stack: ['PHP', 'HTML', 'CSS', 'jQuery', 'PHPMailer', 'cPanel'],
      cardHighlights: [
        'Frontend completo en vanilla.',
        'Formularios y contacto integrados.',
        'Despliegue funcional en hosting tradicional.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Presentar el catálogo de la concesionaria con una propuesta digital clara.',
            'Facilitar consultas, cotizaciones y contacto comercial sin desvíos innecesarios.',
            'Mantener buena performance en un entorno técnico simple y efectivo.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Implementación completa del frontend con HTML, CSS y jQuery.',
            'Desarrollo backend en PHP con PHPMailer para el envío confiable de formularios.',
            'Configuración y despliegue en cPanel, incluyendo ajustes necesarios para email y estabilidad.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Landing más directa para captación de leads.',
            'Compatibilidad amplia y buena velocidad de carga.',
            'Capacidad de resolver de punta a punta incluso en stacks sin frameworks modernos.',
          ],
        },
      ],
    },
    {
      slug: 'posts-app',
      category: 'Arquitectura Laravel',
      title: 'PostsApp',
      summary:
        'Aplicación de blogging construida con Laravel 9 y DDD, orientada a demostrar dominio arquitectural, roles, permisos y gestión de contenido.',
      hook: 'Caso técnico donde la estructura del software es parte central del valor.',
      cover: '/img/projects/postsapp/1.webp',
      gallery: createGallery('postsapp', 13, 1),
      cta: {
        label: 'Ver repositorio',
        href: 'https://github.com/alansanchez96/PostsApp-Laravel',
      },
      stack: ['Laravel 9', 'DDD', 'Blade', 'TailwindCSS', 'Roles & permisos'],
      cardHighlights: [
        'Autenticación clásica implementada manualmente.',
        'Dominio bien separado y escalable.',
        'Dashboard de contenidos con texto enriquecido.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Gestionar publicaciones, categorías, etiquetas y permisos en un sistema de contenidos.',
            'Demostrar una arquitectura Laravel bien organizada y preparada para crecer.',
            'Mantener una experiencia de edición y lectura limpia.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Construcción del proyecto sobre una arquitectura DDD funcional.',
            'Desarrollo manual del flujo de autenticación y del sistema de roles y permisos.',
            'Implementación del frontend con Blade y TailwindCSS para una interfaz clara y responsive.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Proyecto que evidencia criterio arquitectural, no solo ejecución visual.',
            'Separación de responsabilidades que facilita mantenimiento y evolución.',
            'Buena base para ampliar funcionalidades de contenido.',
          ],
        },
      ],
    },
    {
      slug: 'gestor-descuentos',
      category: 'Business rules',
      title: 'Gestor de Descuentos',
      summary:
        'Sistema para administrar promociones y códigos de descuento dentro del flujo comercial de un negocio de rent a car.',
      hook: 'Solución concreta para una necesidad comercial con reglas claras y operación simple.',
      cover: '/img/projects/gestor_descuentos/1.webp',
      gallery: createGallery('gestor_descuentos', 2, 1),
      cta: {
        label: 'Ver repositorio',
        href: 'https://github.com/alansanchez96/challenge_gestor-descuentos',
      },
      stack: ['Laravel', 'ABM', 'Reglas promocionales', 'Administración'],
      cardHighlights: [
        'ABM completo de descuentos.',
        'Gestión reutilizable por distribuidora.',
        'Lógica comercial clara y práctica.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Crear y administrar descuentos aplicables a servicios de rent a car.',
            'Facilitar campañas promocionales con control centralizado.',
            'Mantener el proceso simple para el equipo administrativo.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Construcción del flujo completo de alta, baja y modificación de promociones.',
            'Modelado de reglas para aplicar descuentos sobre precios base.',
            'Separación clara entre administración y lógica comercial.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Herramienta útil para ejecutar campañas sin complejidad innecesaria.',
            'Mayor flexibilidad comercial para distintas distribuidoras.',
            'Implementación clara y fácil de mantener.',
          ],
        },
      ],
    },
    {
      slug: 'pharmacies-app',
      category: 'Challenge fullstack',
      title: 'PharmaciesApp',
      summary:
        'Challenge técnico con Vue 3 y Laravel 10 para gestionar farmacias geolocalizadas y encontrar las más cercanas según la ubicación del usuario.',
      hook: 'Demostración fullstack con buenas prácticas, geolocalización y arquitectura limpia.',
      cover: '/img/projects/pharmacy/1.webp',
      gallery: createGallery('pharmacy', 5, 0),
      cta: {
        label: 'Ver repositorio',
        href: 'https://github.com/alansanchez96/challenge_gestor-descuentos',
      },
      stack: ['Vue 3', 'Laravel 10', 'Geolocalización', 'Docker', 'Clean architecture'],
      cardHighlights: [
        'Búsqueda por proximidad.',
        'Setup manual o dockerizado.',
        'Separación de responsabilidades en frontend y backend.',
      ],
      storyBlocks: [
        {
          title: 'Qué resolvía',
          items: [
            'Administrar un listado de farmacias con ubicación geográfica precisa.',
            'Calcular cercanía respecto a la posición actual del usuario desde el navegador.',
            'Mostrar una solución fullstack ordenada y fácil de levantar.',
          ],
        },
        {
          title: 'Mi aporte',
          items: [
            'Desarrollo del frontend en Vue 3 y del backend en Laravel 10.',
            'Implementación del cálculo de proximidad y de la carga manual de coordenadas.',
            'Organización del proyecto con buenas prácticas y soporte para Docker.',
          ],
        },
        {
          title: 'Valor entregado',
          items: [
            'Challenge que demuestra criterio técnico en frontend y backend.',
            'Solución clara para una necesidad geolocalizada real.',
            'Código más comprensible y mantenible gracias a una estructura prolija.',
          ],
        },
      ],
    },
  ],
  profile: {
    image: 'https://i.ibb.co/mFCzyDRY/Whats-App-Image-2025-12-21-at-9-42-02-PM.jpg',
    title: 'Trabajo con foco en impacto, mantenibilidad y lectura real del producto.',
    lead:
      'Me siento especialmente cómodo en proyectos donde hay que tomar decisiones técnicas con criterio de negocio: productos SaaS, integraciones complejas, mejoras sobre legado, fintech y experiencias que necesitan verse tan sólidas como funcionan.',
    highlights: [
      'Puedo moverme entre arquitectura, implementación, refactor, despliegue y mejora visual del producto.',
      'Entiendo el backend como columna vertebral del sistema y la interfaz como la capa que construye confianza.',
      'Aporto seniority técnico orientado a negocio: orden, claridad, performance y entregas que generen valor real.',
    ],
    actions: [
      {
        label: 'Ver CV',
        href: 'https://drive.google.com/file/d/1kSZybbLHdshM--ZDI_9Ysy4DBKkjcQnV/view?usp=sharing',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/alansanchez96',
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/alansanchez96/',
      },
    ],
  },
  contact: {
    title: 'Si tu producto necesita backend serio y una experiencia más convincente, conversemos.',
    intro:
      'Hoy el portfolio queda enfocado en mostrar trabajo real y vías directas de contacto. Si quieres hablar de un proyecto, una mejora sobre legacy o una colaboración técnica, puedes contactarme por estos canales.',
    channels: [
      {
        title: 'LinkedIn',
        description: 'Ideal para una primera conversación profesional y contexto del proyecto.',
        href: 'https://linkedin.com/in/alansanchez96/',
        icon: 'bxl-linkedin-square',
      },
      {
        title: 'GitHub',
        description: 'Para revisar repositorios, challenges técnicos y estilo de implementación.',
        href: 'https://github.com/alansanchez96',
        icon: 'bxl-github',
      },
      {
        title: 'CV',
        description: 'Resumen rápido de experiencia, stack y tipo de proyectos donde más aporto.',
        href: 'https://drive.google.com/file/d/1kSZybbLHdshM--ZDI_9Ysy4DBKkjcQnV/view?usp=sharing',
        icon: 'bx-file',
      },
    ],
    availabilityTitle: 'Dónde más suelo aportar',
    availabilityItems: [
      'Construcción y evolución de backend con Laravel.',
      'Refactor y ordenamiento de sistemas legacy.',
      'Optimización de consultas, flujos críticos y despliegues.',
      'Interfaces más claras para productos que necesitan comunicar mejor su valor.',
    ],
  },
  footer: {
    title: 'Alan Sanchez',
    description: 'Fullstack Developer especializado en backend con PHP y Laravel.',
  },
};
