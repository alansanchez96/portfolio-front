<template>
    <h2 class="text-white my-3">Información</h2>

    <div class="col-auto">
        <p class="fw-bold my-4 text-success">{{ messageSuccess }}</p>
    </div>

    <button @click="openModalForm(null)" class="btn btn-primary mb-3" v-show="showInformation">
        Añadir nueva información
    </button>

    <p class="fw-bold my-4 text-danger" v-show="errorServer">Ocurrio un error con el servidor</p>

    <table class="table table-striped table-dark" v-show="showInformation">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Url</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(information, index) in informations" :key="information">
                <th scope="row">{{ information.id }}</th>
                <td>{{ information.attributes.url_pdf }}</td>
                <td>
                    <ul class="nav">
                        <li class="nav-item my-1 mx-1">
                            <button type="button" class="btn btn-warning"
                                @click.prevent="openModalForm(index, information.id)">Editar</button>
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
                    <h5 class="modal-title" id="exampleModalLabel">Añadir nueva información</h5>
                    <button type="button" class="btn-close" @click="closeModalForm"></button>
                </div>
                <div class="modal-body">
                    <form enctype="multipart/form-data" @submit.prevent="submitInformation">
                        <!-- Errors -->
                        <div class="col-auto">
                            <p class="fw-bold mb-0 text-danger">{{ messageError }}</p>
                        </div>
                        <div class="col-auto" v-for="errorUrl in errorsUrl" :key="errorUrl">
                            <p class="fw-bold mb-0 text-danger">{{ errorUrl }}</p>
                        </div>

                        <!-- Inputs -->
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="url" class="col-form-label">URL</label>
                            </div>
                            <div class="col-auto">
                                <input type="text" id="url" class="form-control" v-model="url_pdf">
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

</template>

<script>
export default {
    name: 'Information',
    data() {
        return {
            'informations': [],
            'modalActiveForm': false,
            activeForm: {
                'd-block': false,
                'show': false
            },
            'index': -1,
            'id': null,
            'url_pdf': '',
            'messageSuccess': null,
            'messageError': null,
            'errorsUrl': [],
            'errorServer': false,
            'showInformation': true,
        }
    },
    async mounted() {
        await this.axios.get('/api/information')
            .then(response => this.informations = response.data.data)
            .catch(() => {
                this.showInformation = false;
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
                this.url_pdf = '';
            } else {
                const information = this.informations[index];
                this.id = id;
                this.url_pdf = information.attributes.url_pdf;
            }
        },
        closeModalForm() {
            this.activeForm['d-block'] = false;
            this.activeForm.show = false;
            this.modalActiveForm = false;

            this.id = null;
            this.url_pdf = '';
        },
        async submitInformation() {
            const formData = new FormData();

            formData.append('url_pdf', this.url_pdf);

            if (this.id === null || 0) {
                await this.axios.post('/api/information/create', formData)
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
                            this.errorsUrl = error.response.data.errors.url_pdf;
                            setTimeout(() => {
                                this.errorsUrl = [];
                            }, 3500);
                        }
                    )
            } else {
                await this.axios.post('/api/information/update/' + this.id, formData)
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
                            this.errorsUrl = error.response.data.errors.url_pdf;
                            setTimeout(() => {
                                this.errorsUrl = [];
                            }, 3500);
                        }
                    )
            }

            this.axios.get('/api/information')
                .then(response => this.informations = response.data.data)
                .catch(() => {
                    this.showInformation = false;
                    this.errorServer = true;
                });
        },
    }
}
</script>