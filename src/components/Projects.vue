<template>
    <div id="portfolio">
        <div class="container-fluid bg-dark p-0">
            <div class="row g-0">
                <p class="text-danger fw-bold text-center mt-5" v-show="errorServer">Ocurrio un error con el servidor
                </p>
                <div class="col-lg-4 col-sm-6 p-3 d-flex align-items-center justify-content-center"
                    v-for="(project, index) in projects" :key="project" v-show="showProjects">
                    <a class="portfolio-box" href="#" @click.prevent="openModal(index)" :title="project.attributes.title">
                        <img class="img-fluid" :src="(urlAPI + project.attributes.image)" alt="" />
                        <div class="portfolio-box-caption">
                            <div class="project-category text-white-50">Click para ver más detalles</div>
                            <div class="project-name">{{ project.attributes.title }}</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" :class="activeModal" v-show="viewModal" @click.self="closeModal" style="margin-top: 50px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <img :src="(urlAPI + image)" alt="">
                </div>
                <div class="modal-body">
                    <h5 class="modal-title fw-bold text-primary">{{ title }}</h5>
                </div>
                <div class="modal-footer">
                    <p class="d-block w-100">{{ description }}</p>
                    <a :href="url" target="_blank" class="btn btn-primary mt-3 btn-xl">Ir al sitio web</a>
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
            'urlAPI': 'https://sea-turtle-app-3dk33.ondigitalocean.app/',
            'projects': [],
            'viewModal': false,
            activeModal: {
                'd-block': false,
                'show': false
            },
            'index': -1,
            'id': null,
            'title': '',
            'description': '',
            'image': '',
            'url': '',
            'showProjects': true,
            'errorServer': false
        }
    },
    async mounted() {
        await this.axios.get('/api/projects')
            .then(response => this.projects = response.data.data)
            .catch(() => {
                this.showProjects = false;
                this.errorServer = true;
            });
    },
    methods: {
        openModal(index) {
            this.activeModal['d-block'] = true;
            this.activeModal.show = true;
            this.viewModal = true;

            const body = document.querySelector('body');
            body.classList.add('overflow-hidden');

            const project = this.projects[index];
            this.index = index;
            this.id = project.id;
            this.title = project.attributes.title;
            this.description = project.attributes.description;
            this.image = project.attributes.image;
            this.url = project.attributes.url;
        },
        closeModal() {
            this.activeModal['d-block'] = false;
            this.activeModal.show = false;
            this.viewModal = false;

            const body = document.querySelector('body');
            body.classList.remove('overflow-hidden');

            this.index = -1;
            this.id = null;
            this.title = null;
            this.description = null;
            this.image = null;
            this.url = null;
        }
    }
}
</script>

<style scoped>
.btn-primary {
    border-color: #007eb3;
    color: #007eb3;
}

.btn-xl {
    padding: 10px 15px;
    text-transform: none;
}

.modal .modal-dialog {
    max-width: 65%;
    overflow: auto;
}

.modal-header {
    background-color: rgb(33, 37, 41);
}

.modal-header img {
    width: 100%;
    border-radius: 10px;
    padding: 25px 15px;
}

.modal-body,
.modal-footer {
    background-color: #e6e6e6;
}

.modal-footer {
    justify-content: flex-start;
    padding: 0 15px 25px;
}
</style>