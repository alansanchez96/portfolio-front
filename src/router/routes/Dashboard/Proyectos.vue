<template>
    <h2 class="text-white my-3">Proyectos</h2>

    <div class="col-auto">
        <p class="fw-bold my-4 text-success">{{ messageSuccess }}</p>
    </div>

    <button @click="openModalForm(null)" class="btn btn-primary mb-3" v-show="showProjects">
        Añadir nuevo proyecto
    </button>

    <p class="fw-bold my-4 text-danger" v-show="errorServer">Ocurrio un error con el servidor</p>

    <table class="table table-striped table-dark" v-show="showProjects">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Url</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(project, index) in projects" :key="project">
                <th scope="row">{{ project.id }}</th>
                <td>{{ project.attributes.title }}</td>
                <td>{{ project.attributes.description }}</td>
                <td><img :src="(urlAPI + project.attributes.image)" width="50" height="50" alt=""></td>
                <td>{{ project.attributes.url }}</td>
                <td>
                    <ul class="nav">
                        <li class="nav-item my-1 mx-1">
                            <button type="button" class="btn btn-warning"
                                @click.prevent="openModalForm(index, project.id)">Editar</button>
                        </li>
                        <li class="nav-item my-1 mx-1">
                            <button type="button" class="btn btn-danger"
                                @click="openModalDelete(project.id)">Eliminar</button>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="modal fade" :class="activeForm" v-show="modalActiveForm" @click.self="closeModalForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Añadir nuevo proyecto</h5>
                    <button type="button" class="btn-close" @click="closeModalForm"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" @submit.prevent="submitProject">
                        <!-- Errors -->
                        <div class="col-auto">
                            <p class="fw-bold mb-0 text-danger">{{ messageError }}</p>
                        </div>
                        <div class="col-auto" v-for="errorTitle in errorsTitle" :key="errorTitle">
                            <p class="fw-bold mb-0 text-danger">{{ errorTitle }}</p>
                        </div>
                        <div class="col-auto" v-for="errorDescription in errorsDescription" :key="errorDescription">
                            <p class="fw-bold mb-0 text-danger">{{ errorDescription }}</p>
                        </div>
                        <div class="col-auto" v-for="errorImage in errorsImage" :key="errorImage">
                            <p class="fw-bold mb-0 text-danger">{{ errorImage }}</p>
                        </div>
                        <div class="col-auto" v-for="errorUrl in errorsUrl" :key="errorUrl">
                            <p class="fw-bold mb-0 text-danger">{{ errorUrl }}</p>
                        </div>

                        <!-- Inputs -->
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="title" class="col-form-label">Titulo del proyecto</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="title" class="form-control" v-model="title">
                            </div>
                        </div>
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="description" class="col-form-label">Descripcion</label>
                            </div>
                            <div class="col-auto">
                                <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="file" class="col-form-label">Imagen</label>
                            </div>
                            <div class="col-auto">
                                <input type="file" id="file" @change="fetchImage($event)" accept="image/*">
                            </div>
                            <div class="col-auto" v-if="imageMini">
                                <figure>
                                    <img :src="getImage" width="50" height="50">
                                </figure>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="url" class="col-form-label">URL</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="url" class="form-control" v-model="url">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModalForm">Cerrar</button>
                            <button type="submit" class="btn btn-success">
                                {{ (id === null ? 'Crear' : 'Actualizar') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" :class="activeDelete" v-show="modalActiveDelete" @click.self="closeModalDelete"
        style="margin-top: 50px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">¿Desea eliminar el proyecto seleccionado?</h5>
                    <button type="button" class="btn-close" @click="closeModalDelete"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModalDelete">Cerrar</button>
                    <button type="button" class="btn btn-danger" @click.prevent="destroyProject(id)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Proyectos',
    data() {
        return {
            'projects': [],
            'modalActiveForm': false,
            activeForm: {
                'd-block': false,
                'show': false
            },
            'modalActiveDelete': false,
            activeDelete: {
                'd-block': false,
                'show': false
            },
            'index': -1,
            'id': null,
            'title': '',
            'description': '',
            'image': '',
            'url': '',
            'imageMini': null,
            'messageSuccess': null,
            'messageError': null,
            'errorsTitle': [],
            'errorsDescription': [],
            'errorsImage': [],
            'errorsUrl': [],
            'urlAPI': 'https://dev-alansan-netlify-app.preview-domain.com/',
            'errorServer': false,
            'showProjects': true,
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
        openModalForm(index = null, id = null) {
            this.activeForm['d-block'] = true;
            this.activeForm.show = true;
            this.modalActiveForm = true;

            if (index === null) {
                this.id = null;
                this.title = '';
                this.description = '';
                this.image = '';
                this.url = '';
            } else {
                const project = this.projects[index];
                this.id = id;
                this.title = project.attributes.title;
                this.description = project.attributes.description;
                this.image = project.attributes.image;
                this.url = project.attributes.url;
            }
        },
        openModalDelete(id) {
            this.activeDelete['d-block'] = true;
            this.activeDelete.show = true;
            this.modalActiveDelete = true;

            this.id = id;
        },
        closeModalForm() {
            this.activeForm['d-block'] = false;
            this.activeForm.show = false;
            this.modalActiveForm = false;

            this.id = null;
            this.title = '';
            this.description = '';
            this.image = '';
            this.url = '';
            this.imageMini = '';
        },
        closeModalDelete() {
            this.activeDelete['d-block'] = false;
            this.activeDelete.show = false;
            this.modalActiveDelete = false;

            this.id = null;
        },
        fetchImage(e) {
            this.image = e.target.files[0];
            this.uploadImage(this.image);
        },
        uploadImage(file) {
            const reader = new FileReader();

            reader.onload = e => {
                this.imageMini = e.target.result;
            }

            reader.readAsDataURL(file);
        },
        async submitProject() {
            const formData = new FormData();

            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('image', this.image);
            formData.append('url', this.url);

            if (this.id === null || 0) {
                await this.axios.post('/api/projects/create', formData)
                    .then(
                        response => {
                            if (response.data.status === 1) {
                                this.closeModalForm();
                                this.messageSuccess = response.data.message;
                                setTimeout(() => {
                                    this.messageSuccess = '';
                                }, 3500);
                            } else {
                                this.messageError = response.data.message;
                                setTimeout(() => {
                                    this.messageError = '';
                                }, 3500);
                            }
                        }
                    )
                    .catch(
                        error => {
                            this.errorsTitle = error.response.data.errors.title;
                            this.errorsDescription = error.response.data.errors.description;
                            this.errorsImage = error.response.data.errors.image;
                            this.errorsUrl = error.response.data.errors.url;
                            setTimeout(() => {
                                this.errorsTitle = [];
                                this.errorsDescription = [];
                                this.errorsImage = [];
                                this.errorsUrl = [];
                            }, 3500);
                        }
                    )
            } else {
                await this.axios.post('/api/projects/update/' + this.id, formData)
                    .then(
                        response => {
                            if (response.data.status === 1) {
                                this.closeModalForm();
                                this.messageSuccess = response.data.message;
                                setTimeout(() => {
                                    this.messageSuccess = '';
                                }, 3500);
                            } else {
                                this.messageError = response.data.message;
                                setTimeout(() => {
                                    this.messageError = '';
                                }, 3500);
                            }
                        }
                    )
                    .catch(
                        error => {
                            this.errorsTitle = error.response.data.errors.title;
                            this.errorsDescription = error.response.data.errors.description;
                            this.errorsImage = error.response.data.errors.image;
                            this.errorsUrl = error.response.data.errors.url;
                            setTimeout(() => {
                                this.errorsTitle = [];
                                this.errorsDescription = [];
                                this.errorsImage = [];
                                this.errorsUrl = [];
                            }, 3500);
                        }
                    )
            }

            this.axios.get('/api/projects')
                .then(response => this.projects = response.data.data)
                .catch(() => {
                    this.showProjects = false;
                    this.errorServer = true;
                });
        },
        async destroyProject(id) {
            await this.axios.delete('/api/projects/delete/' + id)
                .then(() => this.id = null)
                .catch(() => console.log('Ocurrio un error'));

            this.activeDelete['d-block'] = false;
            this.activeDelete.show = false;
            this.modalActiveDelete = false;

            this.axios.get('/api/projects')
                .then(response => this.projects = response.data.data)
                .catch(() => {
                    this.showProjects = false;
                    this.errorServer = true;
                });
        }

    },
    computed: {
        getImage() {
            return this.imageMini;
        }
    }
}
</script>