<template>
    <h2 class="text-white my-3">Stack Tecnologicos</h2>

    <button @click="openModal" class="btn btn-primary mb-3">
        Añadir nueva tecnologia
    </button>

    <table class="table table-dark">
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
                <td>{{ stack.name }}</td>
                <td>{{ stack.state }}</td>
                <td><img :src="(url + stack.image)" width="50" height="50" alt=""></td>
                <td>
                    <ul class="nav">
                        <li class="nav-item">
                            <a href="#" @click.prevent="openModal(stack.id, index, $event)">Editar</a>
                        </li>
                        <li class="nav-item px-2">
                            <a href="#" @click.prevent="destroyStack(stack.id)">Eliminar</a>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Modal -->
    <!-- d-none y d-block -->
    <div class="modal fade" :class="active" v-show="modalActive" @click.self="closeModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Añadir nueva tecnologia</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" @submit.prevent="createStack">
                        <div class="col-auto">
                            <p class="fw-bold mb-0 text-success">{{ messageSuccess }}</p>
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
                            <button type="button" class="btn btn-secondary" @click="closeModal">Cerrar</button>
                            <button type="submit" class="btn btn-success">
                                {{ (id === null ? 'Crear' : 'Actualizar') }}
                            </button>
                        </div>
                    </form>
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
            'modalActive': false,
            active: {
                'd-block': false,
                'show': false
            },
            'index': -1,
            'id': null,
            'stacks': [],
            'name': null,
            'state': null,
            'states': [
                'En proceso',
                'Dominado'
            ],
            'image': null,
            'url': 'https://api-portfolio-alansan.up.railway.app/',
            'imageMini': null,
            'messageSuccess': null,
            'messageError': null,
            'errorsName': [],
            'errorsState': [],
            'errorsImage': []
        }
    },
    async mounted() {
        await this.axios.get('/api/stacks-tecnologicos/')
            .then(
                response => {
                    this.stacks = response.data;
                }
            )
            .catch(
                error => console.log(error.response)
            )
    },
    methods: {
        openModal(id, index) {
            this.active['d-block'] = true;
            this.active.show = true;
            this.modalActive = true;

            if (index === 0) {
                const stack = this.stacks[index];
                this.index = index;
                this.id = stack.id;
                this.name = stack.name;
                this.state = stack.state;
            } else if (!index) {
                this.id = null;
                this.name = null;
                this.state = null;
            }
            else {
                const stack = this.stacks[index];
                this.index = index;
                this.id = stack.id;
                this.name = stack.name;
                this.state = stack.state;
            }
        },
        closeModal() {
            this.active['d-block'] = false;
            this.active.show = false;
            this.modalActive = false;
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
        async createStack() {
            const formData = new FormData();

            formData.append('name', this.name);
            formData.append('state', this.state);
            formData.append('image', this.image);

            if (this.id === null || 0) {
                await this.axios.post('/api/stacks-tecnologicos/', formData)
                    .then(
                        response => {
                            if (response.data.status === 1) {
                                this.messageSuccess = response.data.message;
                                setTimeout(() => {
                                    this.messageSuccess = null;
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
            } else {
                await this.axios.put('/api/stacks-tecnologicos/update/' + this.id, formData)
                    .then(
                        response => console.log(response)
                    )
                    .catch(
                        error => console.log(error.response)
                    )
            }

        },
        async destroyStack(id) {
            await this.axios.delete('/api/stacks-tecnologicos/delete/' + id)
                .then(
                    response => console.log(response)
                )
                .catch(
                    error => console.log(error.response)
                )
        }
    },
    computed: {
        getImage() {
            return this.imageMini;
        }
    }
}
</script>