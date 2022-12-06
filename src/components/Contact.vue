<template>
    <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-lg-8 col-xl-6 text-center">
                    <h2 class="mt-0">¡Mantengamosnos en contacto!</h2>
                    <hr class="divider" />
                </div>
                <div class="divider" v-for="(errorName, i) in errorsName" v-bind:key="errorName">
                    <p class="fw-bold mx-3 mb-0 text-center text-danger">{{ errorName }}</p>
                </div>
                <div class="divider" v-for="(errorEmail, i) in errorsEmail" v-bind:key="errorEmail">
                    <p class="fw-bold mx-3 mb-0 text-center text-danger">{{ errorEmail }}</p>
                </div>
                <div class="divider" v-for="(errorMessage, i) in errorsMessage" v-bind:key="errorMessage">
                    <p class="fw-bold mx-3 mb-0 text-center text-danger">{{ errorMessage }}</p>
                </div>

            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div class="col-lg-6">

                    <form @submit.prevent="submitMessage">

                        <div class="form-floating mb-3">
                            <input class="form-control" id="name" type="text" placeholder="Enter your name..."
                                v-model="name" @keyup="validatedInput" />
                            <label for="name">Nombre Completo</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input class="form-control" id="email" type="email" placeholder="name@example.com"
                                v-model="email" @keyup="validatedInput" />
                            <label for="email">Email</label>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="textarea" type="text"
                                placeholder="Enter your message here..." style="height: 10rem" v-model="textarea"
                                @keyup="validatedInput"></textarea>
                            <label for="textarea">Mensaje</label>
                        </div>

                        <div v-show="!submited">
                            <div class="text-center mb-3">
                                <div class="fw-bolder">¡Tu mensaje fué enviado satisfactoriamente!</div>
                                <br />
                                <a href="https://github.com/alansanchez96/" target="_blank">Gracias por enviar un
                                    mensaje, puedes revisar mi perfil en GitHub :)</a>
                            </div>
                        </div>
                        <div class="spinner" v-show="isLoading"></div>

                        <div v-show="(submited && !isLoading)">
                            <button class="btn btn-primary btn-xl w-100" :class="{ disabled }">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row gx-4 mt-5 gx-lg-5 justify-content-center">
                <div class="col-lg-4 text-center mb-5 mb-lg-0 w-75">
                    <h3>Puedes encontarme en</h3>
                    <div class="mt-5 w-50 mx-auto d-flex flex-column flex-sm-row justify-content-around gap-4">
                        <a href="https://fb.com/alaansannchezz" target="_blank">
                            <i class='bx bxl-facebook bx-2'> </i>
                        </a>
                        <a href="https://linkedin.com/in/alansanchez96/" target="_blank">
                            <i class='bx bxl-linkedin bx-2'></i>
                        </a>
                        <a href="https://github.com/alansanchez96" target="_blank">
                            <i class='bx bxl-github bx-2'></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            'name': '',
            'email': '',
            'textarea': '',
            'disabled': true,
            'submited': true,
            'isLoading': false,
            'errorsName': [],
            'errorsEmail': [],
            'errorsMessage': [],
        }
    },
    methods: {
        async submitMessage() {
            const data = {
                'name': this.name,
                'email': this.email,
                'message': this.textarea,
            }

            await this.axios.post('/api/contact/message', data)
                .then(
                    response => {
                        console.log(response);

                        this.isLoading = true;

                        if (response.data.status === 1) {
                            this.submited = false;
                            this.isLoading = false;
                        }
                    }
                )
                .catch(
                    error => {
                        this.errorsName = error.response.data.errors.name;
                        this.errorsEmail = error.response.data.errors.email;
                        this.errorsMessage = error.response.data.errors.message;

                        setTimeout(() => {
                            this.errorsName = [];
                            this.errorsEmail = [];
                            this.errorsMessage = [];
                        }, 4500);
                    }
                )
        }
    },
    computed: {
        validatedInput() {
            if (
                this.name !== '' &&
                this.email !== '' &&
                this.textarea !== ''
            ) {
                this.disabled = false;
            } else {
                this.disabled = true;
            }
        }
    }
}
</script>

<style scoped>
.btn-primary {
    border-color: #007eb3;
    color: #007eb3;
}

.spinner:before {
    border-top-color: #007eb3;
}

.spinner:after {
    border-top-color: #003d58;
    animation-delay: 0.3s;
}

.btn-primary:hover {
    color: #fff;
}
</style>