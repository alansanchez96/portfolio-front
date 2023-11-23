<template>
    <h2 class="text-white my-3">Stack Tecnologicos</h2>

    <div class="col-auto">
        <p class="fw-bold my-4 text-success">{{ messageSuccess }}</p>
    </div>

    <button @click="openModalForm(null)" class="btn btn-primary mb-3" v-show="showStacks">
        Añadir nueva tecnologia
    </button>

    <p class="fw-bold my-4 text-danger" v-show="errorServer">Ocurrio un error con el servidor</p>

    <table class="table table-striped table-dark" v-show="showStacks">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Estado</th>
                <th scope="col">Imagen</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(stack, index) in stacks" :key="stack">
                <th scope="row">{{ stack.id }}</th>
                <td>{{ stack.attributes.name }}</td>
                <td>{{ stack.attributes.state }}</td>
                <td><img :src="(url + stack.attributes.image)" width="50" height="50" alt=""></td>
                <td>
                    <ul class="nav">
                        <li class="nav-item my-1 mx-1">
                            <button type="button" class="btn btn-warning"
                                @click.prevent="openModalForm(index, stack.id)">Editar</button>
                        </li>
                        <li class="nav-item my-1 mx-1">
                            <button type="button" class="btn btn-danger"
                                @click="openModalDelete(stack.id)">Eliminar</button>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Modal Form -->
    <div class="modal fade" :class="activeForm" v-show="modalActiveForm" @click.self="closeModalForm">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Añadir nueva tecnologia</h5>
                    <button type="button" class="btn-close" @click="closeModalForm"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" @submit.prevent="submitStak">

                        <!-- Errors -->
                        <div class="col-auto">
                            <p class="fw-bold mb-0 text-danger">{{ messageError }}</p>
                        </div>
                        <div class="col-auto" v-for="errorName in errorsName" :key="errorName">
                            <p class="fw-bold mb-0 text-danger">{{ errorName }}</p>
                        </div>
                        <div class="col-auto" v-for="errorState in errorsState" :key="errorState">
                            <p class="fw-bold mb-0 text-danger">{{ errorState }}</p>
                        </div>
                        <div class="col-auto" v-for="errorImage in errorsImage" :key="errorImage">
                            <p class="fw-bold mb-0 text-danger">{{ errorImage }}</p>
                        </div>

                        <!-- Inputs -->
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="name" class="col-form-label">Nombre de Tecnologia</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="name" class="form-control" v-model="name">
                            </div>
                        </div>
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="state" class="col-form-label">Estado</label>
                            </div>
                            <div class="col-auto">
                                <select id="state" v-model="state">
                                    <option :value="index" v-for="(state, index) in states" :key="state">
                                        {{ state }}
                                    </option>
                                </select>
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

    <!-- Modal confirm delete -->
    <div class="modal fade" :class="activeDelete" v-show="modalActiveDelete" @click.self="closeModalDelete"
        style="margin-top: 50px;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">¿Desea eliminar el stack seleccionado?</h5>
                    <button type="button" class="btn-close" @click="closeModalDelete"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModalDelete">Cerrar</button>
                    <button type="button" class="btn btn-danger" @click.prevent="destroyStack(id)">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'StackTecnologicos',
    data() {
        return {
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
            'stacks': [],
            'name': '',
            'state': '',
            'states': [
                'En proceso',
                'Dominado'
            ],
            'image': '',
            'url': 'https://dev-alansan-netlify-app.preview-domain.com/',
            'imageMini': null,
            'messageSuccess': null,
            'messageError': null,
            'errorsName': [],
            'errorsState': [],
            'errorsImage': [],
            'showStacks': true,
            'errorServer': false
        }
    },
    async mounted() {
        await this.axios.get('/api/stacks-tecnologicos')
            .then(response => this.stacks = response.data.data)
            .catch(() => {
                this.showStacks = false;
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
                this.name = '';
                this.state = '';
                this.image = '';
            } else {
                const stack = this.stacks[index];
                this.id = id;
                this.name = stack.attributes.name;
                this.state = stack.attributes.state;
                this.image = stack.attributes.image;
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
            this.name = '';
            this.state = '';
            this.image = '';
            this.imageMini = null;
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
        async submitStak() {
            const formData = new FormData();

            formData.append('name', this.name);
            formData.append('state', this.state);
            formData.append('image', this.image);

            if (this.id === null || 0) {
                await this.axios.post('/api/stacks-tecnologicos/create', formData)
                    .then(
                        response => {
                            if (response.data.status === 1) {
                                this.messageSuccess = response.data.message;
                                this.closeModalForm();
                                setTimeout(() => {
                                    this.messageSuccess = '';
                                }, 3500);
                                setTimeout(() => {
                                }, 3600);
                            } else {
                                this.messageError = response.data.message;
                                setTimeout(() => {
                                    this.messageError = null;
                                }, 3500);
                            }
                        }
                    )
                    .catch(
                        error => {
                            this.errorsName = error.response.data.errors.name;
                            this.errorsState = error.response.data.errors.state;
                            this.errorsImage = error.response.data.errors.image;
                            setTimeout(() => {
                                this.errorsName = [];
                                this.errorsState = [];
                                this.errorsImage = [];
                            }, 3500);
                        }
                    )
            } else {
                await this.axios.post('/api/stacks-tecnologicos/update/' + this.id, formData)
                    .then(
                        response => {
                            if (response.data.status === 1) {
                                this.messageSuccess = response.data.message;
                                this.closeModalForm();
                                setTimeout(() => {
                                    this.messageSuccess = '';
                                }, 3500);
                            } else {
                                this.messageError = response.data.message;
                                setTimeout(() => {
                                    this.messageError = null;
                                }, 3500);
                            }
                        }
                    )
                    .catch(
                        error => {
                            this.errorsName = error.response.data.errors.name;
                            this.errorsState = error.response.data.errors.state;
                            this.errorsImage = error.response.data.errors.image;
                            setTimeout(() => {
                                this.errorsName = [];
                                this.errorsState = [];
                                this.errorsImage = [];
                            }, 3500);
                        }
                    )
                    
            }


            this.axios.get('/api/stacks-tecnologicos')
                .then(response => this.stacks = response.data.data)
                .catch(() => {
                    this.showStacks = false;
                    this.errorServer = true;
                });


        },
        async destroyStack(id) {
            await this.axios.delete('/api/stacks-tecnologicos/delete/' + id)
                .then(() => this.id = null)
                .catch(() => console.log('Ocurrio un error'));

            this.activeDelete['d-block'] = false;
            this.activeDelete.show = false;
            this.modalActiveDelete = false;

            this.axios.get('/api/stacks-tecnologicos')
                .then(response => this.stacks = response.data)
                .catch(() => {
                    this.showStacks = false;
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