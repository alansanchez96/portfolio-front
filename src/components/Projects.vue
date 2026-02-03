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
                            <div class="project-name">{{ project.attributes.title }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal-overlay" v-if="viewModal" @click.self="closeModal">
        <div class="modal-card">
            <div class="description-panel" :class="{ open: showDescription }" @click.stop>
                <button class="desc-close" @click="showDescription = false">×</button>

                <h3 class="desc-title">
                    {{ currentProject.title }}
                </h3>

                <div class="desc-content">
                    {{ currentProject.description }}
                </div>
            </div>

            <!-- ZONA CLICK CIERRE (30%) -->
            <div v-if="showDescription" class="description-backdrop" @click="showDescription = false"></div>

            <!-- HEADER / GALERÍA -->
            <div class="modal-media">
                <button class="nav-btn left" @click="prevImage">‹</button>

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

                <button class="nav-btn right" @click="nextImage">›</button>

                <button class="close-btn" @click="closeModal">×</button>
            </div>

            <!-- CONTENIDO -->
            <div class="modal-content-body bg-dark">
                <div class="modal-footer-bar">
                    <!-- Izquierda -->
                    <button class="btn btn-outline-light btn-sm" @click="showDescription = true">
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
                    description: 'Aplicacion de monitoreo y control de Empleados con fichajes digitales vía WhatsApp con GPS/OTP Control de Ausencias y Vacaciones Aplicacion de Servicios o Puestos de servicios Pasarelas de Pagos Manejo de multiples Zonas Horarias Multi Tenant Generacion de Informes por Excel y PDF Transferencias de Datos vía JWT',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://cronomanager.com',
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
                    description: 'Red Social con múltiples búsquedas de planes con algoritmo segun tus preferencias, ubicación, clima actual y seguidores. Creación de Planes con la IA según videos de tiktok promocionando lugares: Parques, restaurantes, bares, discotecas, etc... Extrayendo imágenes claves, información auditiva y textual, ubicaciones de los lugares de los propios vídeos Creación de BOTs con avatares de distintas APIs Envio de Notificaciones',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://dev-alansan.netlify.app/#projects',
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
                    description: 'Landing Page desarrollada con PHP Laravel Livewire Javascript y SCSS Su principal funcion es el cambio de divisa. ARS a USD Oficial en la República Argentina. Ésta landing puede cambiar su color desde el panel administrativo, por defecto está en color violeta.',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
                    url: 'https://webcoin.com',
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
                    description: 'Landing Page desarrollada con PHP Laravel Livewire Javascript y SCSS Su principal funcion es el cambio de divisa. ARS a USD Oficial en la República Argentina. Ésta landing puede cambiar su color desde el panel administrativo, por defecto está en color violeta.',
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
                    description: 'Pagina Web completa de una concesionaria Utilizando una maquetacion hecha en Figma por una Diseñadora Web Hecha con PHP, Mailer y Javascript',
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
                    description: 'Aplicacion Web - Hecho con Laravel 9 sin paquetes y Autenticación de Usuarios, utilizando Tailwindcss y Livewire, AlpineJS. Motor de plantillas Blade. Arquitectura DDD | Credenciales: admin@admin.com, password: admin',
                    typeButton: 'sitio', // 'sitio' | 'enlace'
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
                    description: 'Sistema con un gestor de descuentos proveniente de un challenge. Datatable de los descuentos con livewire puro y exportacion.',
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
                    description: 'Sistema con un gestor de descuentos proveniente de un challenge. Datatable de los descuentos con livewire puro y exportacion.',
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
            this.currentProject = {
                ...project.attributes,
                images: this.getProjectImages(project.attributes),
                id: project.id
            }

            this.currentImageIndex = 0
            this.viewModal = true

            // 🔁 restaurar estado previo
            this.showDescription = this.descriptionStateByProject[project.id] ?? false

            document.body.classList.add('overflow-hidden')

            this.preloadImage(0)
            this.preloadImage(1)
        },
        closeModal() {
            if (this.currentProject?.id) {
                this.descriptionStateByProject[this.currentProject.id] = this.showDescription
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
        }
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
    mounted() {
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
    max-height: 90vh;
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
    margin: 0;
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
    /* el contenedor manda */
    background: #d1d1d1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    /* 🔴 clave: nada se sale */
    padding: 16px;
}

.modal-image {
    max-width: 100%;
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
    background: #111;
    color: #e6e6e6;
    z-index: 20;
    transform: translateX(-100%);
    transition: transform 0.35s ease;
    display: flex;
    flex-direction: column;
    padding: 24px;
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
}

/* BOTÓN CIERRE */
.desc-close {
    position: absolute;
    top: 14px;
    right: 16px;
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
    width: 30%;
    height: 100%;
    backdrop-filter: blur(5px);
    background: rgba(0, 0, 0, 0.2);
    z-index: 15;
}
</style>