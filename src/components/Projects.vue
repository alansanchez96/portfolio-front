<template>
    <div id="portfolio">
        <div class="container-fluid bg-dark p-0">
            <div class="row g-0">
                <div class="col-lg-4 col-sm-6 p-3 d-flex align-items-center justify-content-center"
                    v-for="(project) in projects" :key="project">
                    <a class="portfolio-box" href="#" @click.prevent="openModal(project)"
                        :title="project.attributes.title">
                        <img class="img-fluid portfolio-img" :src="project.attributes.cover"
                            :alt="project.attributes.title" />
                        <div class="portfolio-box-caption">
                            <div class="project-category text-white-50">Click para ver más detalles</div>
                            <div class="project-name">— {{ project.attributes.title }} —</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-overlay" v-if="viewModal" @click.self="closeModal">
        <div class="modal-card">
            <div class="description-panel bg-dark" :class="{ open: showDescription }" @click.stop>
                <button class="desc-close" @click="showDescription = false">×</button>

                <h3 class="desc-title">
                    <strong>{{ currentProject.title }}</strong>
                </h3>

                <div class="desc-content" v-html="currentProject.description"></div>

            </div>

            <!-- ZONA CLICK CIERRE (30%) -->
            <div v-if="showDescription" class="description-backdrop" @click="showDescription = false"></div>

            <!-- HEADER / GALERÍA -->
            <div class="modal-media">
                <button class="nav-btn left" @click="prevImage">
                    <div class="nav-btn-text">‹</div>
                </button>

                <div class="image-wrapper">
                    <img v-if="currentProject" :src="currentProject.images[currentImageIndex]" class="modal-image"
                        :class="{ zoomed: isZoomed }" :style="imageStyle" @dblclick="toggleZoom" @mousedown="startDrag"
                        @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="stopDrag" />
                    <div class="image-indicator">
                        {{ currentImageIndex + 1 }} / {{ currentProject.images.length }}
                    </div>

                </div>
                <div class="thumbnails" ref="thumbnailsContainer">
                    <img v-for="(img, index) in currentProject?.images || []" :key="index" :src="img"
                        :ref="el => thumbnailRefs[index] = el" :class="{ active: index === currentImageIndex }"
                        @click="selectImage(index)" />
                </div>

                <button class="nav-btn right" @click="nextImage">
                    <div class="nav-btn-text">›</div>
                </button>

                <button class="close-btn" @click="closeModal">×</button>
            </div>

            <!-- CONTENIDO -->
            <div class="modal-content-body bg-dark">
                <div class="modal-footer-bar">
                    <!-- Izquierda -->
                    <button class="btn btn-primary btn-sm" @click="showDescription = true">
                        Ver descripción
                    </button>

                    <!-- Centro -->
                    <h3 class="modal-title-center">
                        {{ currentProject.title }}
                    </h3>

                    <!-- Derecha -->
                    <a :href="currentProject.url" target="_blank" class="btn btn-primary btn-sm">
                        {{ currentProject.typeButton === 'enlace'
                            ? 'Abrir enlace'
                            : 'Visitar sitio'
                        }}
                    </a>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    name: 'Projects',
    data() {
        return {
            viewModal: false,
            activeModal: {
                'd-block': false,
                show: false
            },

            currentProject: [],
            currentImageIndex: 0,
            isZoomed: false,
            thumbnailRefs: [],

            // drag
            isDragging: false,
            startX: 0,
            startY: 0,
            translateX: 0,
            translateY: 0,

            // swipe
            touchStartX: 0,

            // modal
            showDescription: false,
            descriptionStateByProject: {},
        }
    },
    created() {
        this.projects = [
            {
                id: 1,
                attributes: {
                    title: 'CronoManager',
                    description: '<strong>CronoManager</strong> es una plataforma <strong>SaaS multi-tenant</strong> orientada al <strong>control horario, gestión de fichajes y supervisión operativa en tiempo real</strong>, diseñada para empresas con equipos distribuidos y alta demanda de automatización.<br><br>Participé activamente en el <strong>diseño y desarrollo de la API backend</strong>, implementando una arquitectura <strong>tenant-per-database</strong> que garantiza aislamiento de datos, escalabilidad y configuraciones independientes por cliente. El sistema permite a los empleados registrar su jornada mediante <strong>WhatsApp (API oficial)</strong>, utilizando <strong>códigos OTP o enlaces seguros con tokens JWT</strong>, así como a través de un <strong>minisite web</strong> para iniciar, pausar y finalizar turnos sin fricción.<br><br>Desarrollé módulos de <strong>planificación avanzada de horarios</strong> mediante un calendario interactivo con soporte para <strong>múltiples turnos por día</strong>, patrones reutilizables, copiado masivo de horarios y gestión de ausencias y vacaciones con documentación adjunta. El sistema envía <strong>notificaciones automáticas y contextuales</strong> según reglas configurables (anticipación, tolerancias, bloqueos por intentos fallidos) y valida fichajes mediante <strong>geolocalización y radio por servicio</strong>.<br><br>La plataforma incluye <strong>dashboards analíticos</strong> para clientes con métricas de cumplimiento, fichajes fuera de horario, horas trabajadas y exportación de reportes en <strong>Excel y PDF</strong>. Los empleados acceden a su historial, firman reportes mensuales y gestionan solicitudes desde el minisite.<br><br>También participé en el <strong>despliegue y operación en Google Cloud Platform</strong>, utilizando <strong>Google Compute Engine</strong> para el backend y <strong>Google Cloud Storage (buckets)</strong> para el manejo de archivos y recursos. El sistema integra <strong>Stripe</strong> para suscripciones, facturación, upgrades por cantidad de empleados y gestión de métodos de pago, además de un panel administrativo global para onboarding, control de clientes y entornos.<br><br><strong>Stack principal:</strong> Laravel, WhatsApp Cloud API, JWT, MySQL (multi-DB), Google Cloud Platform (Compute Engine, Cloud Storage), Stripe, Docker.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://cronomanager.com/',
                    cover: '/img/projects/cronomanager/portada.webp',
                    folder: 'cronomanager',
                    imagesCount: 20,
                    startIndex: 1
                }
            },
            {
                id: 2,
                attributes: {
                    title: 'Exparcity',
                    description: '<strong>Exparcity</strong> es una plataforma social de descubrimiento de experiencias locales, diseñada para escalar contenido, usuarios y monetización mediante algoritmos avanzados de personalización y automatización con IA.<br><br>Participé en el diseño y desarrollo de la <strong>arquitectura backend</strong>, permitiendo a los usuarios explorar, crear y reservar planes según su <strong>ubicación, ciudad, preferencias, clima en tiempo real, historial de interacción y relaciones sociales (followers)</strong>. La plataforma contempla múltiples roles (usuarios, guías e influencers), sistema de reputación, reseñas, reservas y monetización para negocios a través de <strong>suscripciones y comisiones integradas con Stripe</strong>.<br><br>Implementé <strong>pipelines automatizados de generación de contenido con OpenAI</strong>, procesando grandes volúmenes de videos promocionales (TikTok) para crear planes artificiales, descripciones optimizadas y usuarios ficticios con personalidades únicas. El flujo incluye <strong>extracción, validación y curado de imágenes</strong> mediante <strong>Google Vision AI</strong>, control de contenido sensible y almacenamiento optimizado en <strong>Google Cloud Storage (CDN)</strong> con múltiples resoluciones para mejorar el rendimiento en frontend.<br><br>El sistema incorpora <strong>tracking de comportamiento de usuarios</strong> para optimización UX/UI, <strong>notificaciones push inteligentes basadas en contexto</strong> y un <strong>algoritmo de ranking similar a redes sociales</strong>, que prioriza planes según relevancia, interacción y afinidad del usuario.<br><br><strong>Stack principal:</strong> Laravel, MongoDB, Docker, Google Cloud Platform (Compute Engine, Cloud Storage, Vision AI), OpenAI APIs y Stripe.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://dev-alansan.netlify.app/#portfolio',
                    cover: '/img/projects/exparcity/portada.webp',
                    folder: 'exparcity',
                    imagesCount: 14,
                    startIndex: 1
                }
            },
            {
                id: 3,
                attributes: {
                    title: 'ZOCO',
                    description: '<strong>ZOCO</strong> es una plataforma de <strong>distribución y gestión de productos turísticos</strong> que centraliza la carga, búsqueda y disponibilidad de servicios como <strong>hoteles, tours, transporte, rent a car y cruceros</strong>. Mi participación estuvo enfocada exclusivamente en el <strong>módulo de hotelería</strong>, uno de los componentes más complejos del sistema.<br><br>Desarrollé y mantuve el flujo completo de <strong>gestión hotelera</strong>, permitiendo a operadores cargar información detallada del hotel (nombre, ubicación, contactos, descripciones, políticas y términos), así como la administración de <strong>habitaciones, tipos de camas, capacidad por adultos/niños/bebés</strong>, edades permitidas, cargos extra (mascotas, niños, servicios adicionales) y servicios incluidos como limpieza u otros beneficios.<br><br>Implementé la <strong>gestión avanzada de tarifas</strong>, contemplando precios diferenciados para <strong>mercado nacional y extranjero</strong>, temporadas especiales (ej. verano), rangos de fechas personalizados y <strong>políticas de cancelación configurables</strong> (gratuitas, con recargo fijo o porcentual). El sistema incluye un <strong>calendario interactivo</strong> que permite administrar disponibilidad, precios, bloqueos y reservas por rango de fechas en tiempo real.<br><br>Desarrollé la <strong>configuración global del sistema</strong>, incluyendo manejo de <strong>monedas y cotizaciones</strong>, markups, comisiones, tarifarios y un sistema avanzado de <strong>notificaciones por email</strong>, totalmente configurable por eventos, proveedores y hoteles específicos.<br><br>Participé en la implementación y mantenimiento del <strong>motor de búsqueda</strong> para reservas hoteleras, optimizado por cantidad de pasajeros y rangos de fechas, así como en la <strong>integración con TravelGate</strong>, realizando transformación de <strong>XML a JSON y viceversa</strong>. El sistema también expone un <strong>endpoint de búsqueda</strong> para que terceros puedan consumir los resultados y, a su vez, integra resultados provenientes de otros proveedores externos.<br><br>Uno de los mayores aportes fue la <strong>refactorización técnica del proyecto</strong>: actualicé la aplicación de <strong>Laravel 5.4 a Laravel 9</strong>, <strong>dockericé el entorno</strong>, reestructuré la base de datos, migraciones y seeders, y mejoré significativamente la arquitectura general. Además, optimicé consultas críticas del buscador, reduciendo tiempos de respuesta de <strong>~40 segundos a ~3 segundos</strong> mediante optimización en MySQL.<br><br>Fue un proyecto de alta complejidad técnica, heredado en muy mal estado, donde aporté valor principalmente en <strong>arquitectura, performance, mantenibilidad y escalabilidad</strong> del módulo de hotelería.<br><br><strong>Stack principal:</strong> Laravel (5.4 → 9), MySQL, Docker, APIs REST, TravelGate (XML/JSON), Arquitectura monolítica refactorizada.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://dev-alansan.netlify.app/#portfolio',
                    cover: '/img/projects/zoco/portada.webp',
                    folder: 'zoco',
                    imagesCount: 30,
                    startIndex: 1
                },
            },
            {
                id: 4,
                attributes: {
                    title: 'WEBCOIN',
                    description: '<strong>WebCoin</strong> es un sistema de <strong>cambio de moneda digital</strong> orientado al mercado argentino, que opera con <strong>cotización oficial de casas de cambio</strong>, permitiendo conversiones entre <strong>dólar oficial y pesos argentinos (ARS)</strong>, así como la gestión de <strong>cuentas bancarias de usuarios (CBU)</strong>.<br><br>Mi participación fue <strong>full-stack</strong>, utilizando <strong>Laravel 9 y Livewire</strong>, involucrándome tanto en la lógica de negocio como en la experiencia de usuario. Implementé un sistema de <strong>logging y auditoría</strong> para eventos críticos, incluyendo autenticaciones, cambios de parámetros sensibles y modificaciones en la configuración del sistema, garantizando trazabilidad y mayor seguridad operativa.<br><br>Realicé <strong>corrección de bugs preexistentes</strong> que afectaban la estabilidad y confiabilidad del sistema desde antes de mi incorporación, mejorando el comportamiento general de la aplicación y reduciendo errores en flujos críticos.<br><br>Lideré la <strong>reestructuración completa del frontend</strong>, trabajando sobre un <strong>nuevo diseño desarrollado en Figma</strong> por una diseñadora, implementando una <strong>nueva landing page</strong> moderna, más clara y alineada a estándares actuales de UX/UI.<br><br>Desarrollé un <strong>panel administrativo flexible</strong> que permite personalizar dinámicamente la apariencia visual de la plataforma, incluyendo <strong>cambio de paleta de colores</strong> (por ejemplo, modificar la vista principal de violeta a rojo u otros esquemas), sin necesidad de despliegues adicionales, mejorando la adaptabilidad de la marca.<br><br>El proyecto reforzó mis habilidades en <strong>aplicaciones financieras</strong>, manejo de datos sensibles, auditoría, personalización visual dinámica y desarrollo full-stack sobre arquitecturas modernas con Laravel.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://webcoin.com',
                    cover: '/img/projects/webcoin/portada.webp',
                    folder: 'webcoin',
                    imagesCount: 4,
                    startIndex: 1
                },
            },
            {
                id: 5,
                attributes: {
                    title: 'FORD Pinasco',
                    description: '<strong>Ford Pinasco</strong> es una <strong>landing page corporativa</strong> desarrollada para una concesionaria oficial, enfocada en presentar vehículos, captar leads y facilitar el contacto directo con potenciales clientes.<br><br>Mi participación fue <strong>end-to-end</strong>, realizando la <strong>implementación completa del frontend</strong> utilizando <strong>HTML, CSS y JavaScript Vanilla</strong>, priorizando rendimiento, compatibilidad y una experiencia de usuario clara y directa.<br><br>El backend fue desarrollado en <strong>PHP puro</strong>, integrando <strong>PHPMailer</strong> para el envío seguro y confiable de formularios de contacto, cotizaciones y consultas comerciales.<br><br>La solución fue desplegada y configurada en <strong>cPanel</strong>, gestionando la integración del correo saliente, validaciones del servidor y ajustes necesarios para asegurar la correcta entrega de emails y la estabilidad del sitio en producción.<br><br>Este proyecto demuestra mi capacidad para desarrollar <strong>landing pages corporativas optimizadas</strong>, trabajar con <strong>tecnologías base sin frameworks</strong>, integrar servicios de email y realizar despliegues funcionales en entornos tradicionales de hosting.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://www.maximopinasco.com.ar/',
                    cover: '/img/projects/ford_pinasco/portada.webp',
                    folder: 'ford_pinasco',
                    imagesCount: 5,
                    startIndex: 1
                },
            },
            {
                id: 6,
                attributes: {
                    title: 'POSTS App',
                    description: '<strong>PostsApp</strong> es una <strong>aplicación de blogging</strong> desarrollada con <strong>Laravel 9</strong>, orientada a la creación y gestión de contenido mediante una arquitectura <strong>DDD (Domain-Driven Design)</strong> completamente funcional y bien estructurada.<br><br>La aplicación permite a los usuarios registrarse y autenticarse mediante un sistema de <strong>autenticación clásica (email y contraseña)</strong> desarrollado de forma manual, priorizando control, seguridad y comprensión total del flujo de autenticación.<br><br>El proyecto cuenta con un <strong>sistema de roles y permisos</strong>, permitiendo diferenciar capacidades entre usuarios (creación, edición y gestión de contenido), así como la administración de <strong>categorías y etiquetas (tags)</strong> utilizadas para organizar y mostrar los posts en la página principal.<br><br>Desde el dashboard, los usuarios pueden crear publicaciones utilizando <strong>formatos avanzados de texto</strong> (como negritas, tamaños de fuente y estructura tipo markdown), además de <strong>subir imágenes directamente</strong> dentro del contenido del post mediante inputs integrados.<br><br>El frontend fue construido con <strong>Blade</strong> y <strong>TailwindCSS</strong>, logrando una interfaz limpia, responsive y enfocada en la experiencia de escritura y lectura.<br><br>Este proyecto refleja un fuerte dominio de <strong>Laravel a nivel arquitectural</strong>, buenas prácticas en diseño de base de datos, separación de responsabilidades y construcción de sistemas de contenido escalables.',
                    typeButton: 'enlace', // 'sitio' | 'enlace'
                    url: 'https://github.com/alansanchez96/PostsApp-Laravel',
                    cover: '/img/projects/postsapp/portada.webp',
                    folder: 'postsapp',
                    imagesCount: 13,
                    startIndex: 1
                },
            },
            {
                id: 7,
                attributes: {
                    title: 'Gestor de Descuentos',
                    description: '<strong>Gestor de Descuentos</strong> es un <strong>sistema de gestión de promociones</strong> orientado a la creación y administración de <strong>códigos de descuento</strong> aplicables a servicios de <strong>rent a car</strong> para distintas distribuidoras.<br><br>El proyecto permite realizar un <strong>ABM completo de descuentos</strong>, definiendo códigos promocionales que se aplican sobre precios base para ofrecer tarifas más accesibles a los usuarios finales, con control centralizado desde un formulario administrativo sencillo y eficiente.<br><br>Los descuentos pueden configurarse según las necesidades del negocio, permitiendo su reutilización y aplicación sobre distintos proveedores o distribuidoras, facilitando la gestión comercial y la flexibilidad en campañas promocionales.<br><br>Este proyecto destaca por su enfoque práctico, claridad funcional y correcta separación entre la lógica de negocio y la capa de administración, resolviendo una necesidad real dentro del flujo de ventas de un sistema de rent a car.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://github.com/alansanchez96/challenge_gestor-descuentos',
                    cover: '/img/projects/gestor_descuentos/portada.webp',
                    folder: 'gestor_descuentos',
                    imagesCount: 2,
                    startIndex: 1
                },
            },
            {
                id: 8,
                attributes: {
                    title: 'PharmaciesApp',
                    description: '<strong>PharmacyApp</strong> es un <strong>proyecto fullstack</strong> desarrollado como challenge técnico, construido con <strong>Vue 3</strong> en el frontend y <strong>Laravel 10</strong> en la API, con soporte tanto para <strong>ejecución manual</strong> como para <strong>entorno dockerizado</strong> mediante un <strong><code>script.sh</code></strong> para facilitar el setup.<br><br>La aplicación permite gestionar un <strong>listado de farmacias geolocalizadas</strong>, almacenando coordenadas (<strong>latitud y longitud</strong>) y calculando dinámicamente las <strong>farmacias más cercanas a la ubicación actual del usuario</strong>, obtenida desde el navegador, dentro de un <strong>radio configurable de 10 metros</strong>.<br><br>Incluye funcionalidades para <strong>crear y administrar farmacias</strong>, asignando manualmente su ubicación, y un sistema de búsqueda basado en proximidad que prioriza eficiencia y precisión geográfica.<br><br>A nivel técnico, el proyecto destaca por el uso de <strong>buenas prácticas en Vue 3</strong> (composición, separación de responsabilidades) y una <strong>API en Laravel 10</strong> diseñada aplicando <strong>patrones de diseño</strong>, arquitectura limpia y una correcta organización de la lógica de negocio, enfocada en escalabilidad y mantenibilidad.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://github.com/alansanchez96/challenge_gestor-descuentos',
                    cover: '/img/projects/pharmacy/portada.webp',
                    folder: 'pharmacy',
                    imagesCount: 5,
                    startIndex: 0
                }
            }
        ]
    },
    methods: {
        getProjectImages(project) {
            const images = []
            const extensions = ['webp']
            const start = project.startIndex ?? 0

            for (let i = start; i < start + project.imagesCount; i++) {
                for (const ext of extensions) {
                    images.push(`/img/projects/${project.folder}/${i}.${ext}`)
                    break
                }
            }

            return images
        },
        openModal(project) {
            const storedState = this.getDescriptionState(project.id)

            this.currentProject = {
                ...project.attributes,
                images: this.getProjectImages(project.attributes),
                id: project.id
            }

            this.currentImageIndex = 0
            this.viewModal = true

            this.showDescription =
                storedState !== null
                    ? storedState
                    : this.descriptionStateByProject[project.id] ?? false

            document.body.classList.add('overflow-hidden')

            this.preloadImage(0)
            this.preloadImage(1)
        },
        closeModal() {
            if (this.currentProject?.id) {
                this.descriptionStateByProject[this.currentProject.id] = this.showDescription
                this.saveDescriptionState(this.currentProject.id, this.showDescription)
            }

            this.viewModal = false
            document.body.classList.remove('overflow-hidden')
        },
        preloadImage(index) {
            if (!this.currentProject?.images[index]) return

            const img = new Image()
            img.src = this.currentProject.images[index]
        },
        prevImage() {
            this.currentImageIndex =
                (this.currentImageIndex - 1 + this.currentProject.images.length) %
                this.currentProject.images.length

            this.preloadImage(this.currentImageIndex - 1)
            this.resetTransform()
            this.scrollToActiveThumbnail()
        },
        nextImage() {
            this.currentImageIndex =
                (this.currentImageIndex + 1) % this.currentProject.images.length

            this.preloadImage(this.currentImageIndex + 1)
            this.resetTransform()
            this.scrollToActiveThumbnail()
        },
        selectImage(index) {
            this.currentImageIndex = index
            this.isZoomed = false
            this.resetTransform()
        },
        scrollToActiveThumbnail() {
            this.$nextTick(() => {
                const el = this.thumbnailRefs[this.currentImageIndex]
                if (!el) return

                el.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'nearest'
                })
            })
        },

        toggleZoom() {
            this.isZoomed = !this.isZoomed
            this.resetTransform()
        },

        startDrag(e) {
            if (!this.isZoomed) return

            e.preventDefault()

            this.isDragging = true
            this.startX = e.clientX - this.translateX
            this.startY = e.clientY - this.translateY

            window.addEventListener('mousemove', this.onDrag)
            window.addEventListener('mouseup', this.stopDrag)
        },

        onDrag(e) {
            // 🔒 si el mouse NO está presionado → cortar drag
            if (!this.isDragging || e.buttons !== 1) {
                this.stopDrag()
                return
            }

            this.translateX = e.clientX - this.startX
            this.translateY = e.clientY - this.startY
        },

        stopDrag() {
            this.isDragging = false

            window.removeEventListener('mousemove', this.onDrag)
            window.removeEventListener('mouseup', this.stopDrag)
        },

        onTouchStart(e) {
            if (this.isZoomed) {
                this.isDragging = true
                this.startX = e.touches[0].clientX - this.translateX
                this.startY = e.touches[0].clientY - this.translateY
            } else {
                this.touchStartX = e.touches[0].clientX
            }
        },

        onTouchMove(e) {
            if (!this.isDragging) return

            const touch = e.touches[0]
            this.translateX = touch.clientX - this.startX
            this.translateY = touch.clientY - this.startY
        },

        onTouchEnd(e) {
            if (this.isDragging) {
                this.isDragging = false
                return
            }

            const deltaX = e.changedTouches[0].clientX - this.touchStartX
            if (Math.abs(deltaX) < 50) return

            deltaX > 0 ? this.prevImage() : this.nextImage()
        },
        resetTransform() {
            this.translateX = 0
            this.translateY = 0
            this.isDragging = false
        },
        saveDescriptionState(projectId, value) {
            const payload = {
                value,
                expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24h
            }
            localStorage.setItem(
                `project_desc_${projectId}`,
                JSON.stringify(payload)
            )
        },

        getDescriptionState(projectId) {
            const raw = localStorage.getItem(`project_desc_${projectId}`)
            if (!raw) return null

            try {
                const parsed = JSON.parse(raw)
                if (Date.now() > parsed.expiresAt) {
                    localStorage.removeItem(`project_desc_${projectId}`)
                    return null
                }
                return parsed.value
            } catch {
                return null
            }
        },

        handleKeydown(e) {
            if (e.key !== 'Escape') return

            if (!this.viewModal) return

            if (this.showDescription) {
                this.showDescription = false
            } else {
                this.closeModal()
            }
        },
    },
    computed: {
        imageStyle() {
            return {
                transform: this.isZoomed
                    ? `scale(1.6) translate(${this.translateX / 1.6}px, ${this.translateY / 1.6}px)`
                    : 'scale(1)'
            }
        },
        primaryButtonText() {
            if (!this.currentProject?.typeButton) return 'Abrir enlace'

            return this.currentProject.typeButton === 'sitio'
                ? 'Visitar sitio'
                : 'Abrir enlace'
        }
    },
    watch: {
        showDescription(newVal) {
            if (this.currentProject?.id) {
                this.saveDescriptionState(this.currentProject.id, newVal)
            }
        }
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    },
    mounted() {
        this.projects.forEach(p => {
            const img = new Image()
            img.src = p.attributes.cover
        })

        window.addEventListener('keydown', this.handleKeydown)

        this.projects.forEach(p => {
            const img = new Image()
            img.src = p.attributes.cover
        })
    }
}
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-card {
    background: #111;
    border-radius: 16px;
    width: 90%;
    max-width: 1000px;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    animation: scaleIn 0.25s ease;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
}

.modal-media {
    position: relative;
    background: #222;
    flex-shrink: 0;
}

.modal-footer-bar {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title-center {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    color: #4db6ff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.image-wrapper {
    width: 100%;
    height: 60vh;
    background: #005180;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 16px;
}

.modal-image {
    max-width: 85%;
    max-height: 100%;
    object-fit: contain;
    transition: transform 0.25s ease;
    cursor: zoom-in;
}

.modal-image.zoomed {
    cursor: grab;
}

.modal-image.zoomed:active {
    cursor: grabbing;
}

.modal-content-body {
    padding: 24px;
    color: #e6e6e6;
    overflow-y: auto;
    max-height: calc(90vh - 60vh);
}

.modal-title {
    color: #4db6ff;
    margin-bottom: 10px;
    font-weight: 700;
}

.modal-description {
    line-height: 1.6;
    margin-bottom: 20px;
}

/* BOTONES */
.close-btn {
    position: absolute;
    top: 12px;
    right: 14px;
    padding-bottom: 3px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: #fff;
    font-size: 28px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: #fff;
    font-size: 32px;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.nav-btn-text {
    padding-bottom: 5px;
}

.nav-btn.left {
    left: 14px;
}

.nav-btn.right {
    right: 14px;
}

/* TRANSICIONES */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
    position: sticky;
    bottom: 0;
    padding-top: 12px;
}

@keyframes scaleIn {
    from {
        transform: scale(0.96);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.thumbnails {
    display: flex;
    gap: 10px;
    padding: 10px;
    justify-content: flex-start;
    background: #111;
    overflow-x: auto;
    scroll-behavior: smooth;
}

.thumbnails::-webkit-scrollbar {
    height: 6px;
}

.thumbnails::-webkit-scrollbar-thumb {
    background: #4db6ff;
    border-radius: 4px;
}

.thumbnails img {
    width: 60px;
    height: 40px;
    object-fit: cover;
    opacity: 0.5;
    cursor: pointer;
    border-radius: 4px;
    transition: opacity 0.2s, transform 0.2s;
}

.thumbnails img.active {
    opacity: 1;
    transform: scale(1.05);
    border: 2px solid #4db6ff;
}

.image-indicator {
    position: absolute;
    bottom: 14px;
    right: 16px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 14px;
}

.portfolio-box {
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.portfolio-box:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
}

.portfolio-img {
    transition: transform 0.5s ease;
    max-height: 250px;
}

.portfolio-box:hover .portfolio-img {
    transform: scale(1.2);
    filter: blur(1.5px);

}

/* PANEL DESCRIPCIÓN */
.description-panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 70%;
    height: 100%;
    color: #e6e6e6;
    z-index: 20;
    transform: translateX(-100%);
    transition: transform 0.35s ease;
    display: flex;
    flex-direction: column;
    padding: 60px;
    border-radius: 0 16px 16px 0;
}

.description-panel.open {
    transform: translateX(0);
}

/* CONTENIDO */
.desc-title {
    margin-bottom: 16px;
    font-size: 1.6rem;
    color: #4db6ff;
}

.desc-content {
    overflow-y: auto;
    line-height: 1.7;
    padding-right: 10px;
    flex: 1;
    white-space: pre-line;
}

/* BOTÓN CIERRE */
.desc-close {
    position: absolute;
    top: 20px;
    right: 30px;
    background: none;
    border: none;
    font-size: 28px;
    color: #fff;
    cursor: pointer;
}

/* ZONA 30% VISIBLE */
.description-backdrop {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.2);
    z-index: 15;
}

@media (max-width: 768px) {
    .modal-footer-bar {
        grid-template-areas:
            "title title title"
            "left  .     right";
        row-gap: 12px;
    }

    /* Título arriba, centrado */
    .modal-title-center {
        grid-area: title;
        margin: 0;
        font-size: 1.2rem;
        white-space: normal;
        text-align: center;
        padding-bottom: 20px;
    }

    /* Botón izquierda */
    .modal-footer-bar>button {
        grid-area: left;
        justify-self: start;
    }

    /* Botón derecha */
    .modal-footer-bar>a {
        grid-area: right;
        justify-self: end;
    }

    .modal-image {
        max-width: 100%;
    }

    .nav-btn {
        top: 75%;
        width: 35px;
        height: 35px;
    }

    .description-panel {
        width: 100.1%;
    }
}
</style>