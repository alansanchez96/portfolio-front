<template>
    <section class="page-section" id="contact">
        <div class="container px-4 px-lg-5">
            <div class="row gx-4 gx-lg-5 justify-content-center">
                <div class="col-lg-8 col-xl-6 text-center">
                    <h2 class="mt-0">¡Mantengamosnos en contacto!</h2>
                    <hr class="divider" />
                </div>
            </div>
            <div class="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div class="col-lg-6">

                    <form @submit.prevent="submitMessage">
                        <div class="form-floating mb-3">
                            <input class="form-control" id="name" type="text" placeholder="Enter your name..."
                                v-model="name" @keyup="validatedInput" />
                            <label for="name">Nombre Completo</label>
                            <div class="invalid-feedback">El nombre completo es requerido</div>
                        </div>

                        <div class="form-floating mb-3">
                            <input class="form-control" id="email" type="email" placeholder="name@example.com"
                                v-model="email" @keyup="validatedInput" />
                            <label for="email">Email</label>
                            <div class="invalid-feedback">El Email es requerido</div>
                            <div class="invalid-feedback">El Email ingresado no es válido</div>
                        </div>

                        <div class="form-floating mb-3">
                            <textarea class="form-control" id="textarea" type="text"
                                placeholder="Enter your message here..." style="height: 10rem" v-model="textarea"
                                @keyup="validatedInput"></textarea>
                            <label for="textarea">Mensaje</label>
                            <div class="invalid-feedback">El mensaje no puedeenviarse vacío</div>
                        </div>

                        <div v-show="!submited">
                            <div class="text-center mb-3">
                                <div class="fw-bolder">¡Tu mensaje fué enviado satisfactoriamente!</div>
                                <br />
                                <a href="https://github.com/alansanchez96/" target="_blank">Gracias por enviar un
                                    mensaje, puedes revisar mi perfil en GitHub :)</a>
                            </div>
                        </div>

                        <div class="d-none" id="submitErrorMessage">
                            <div class="text-center text-danger mb-3">Error sending message!</div>
                        </div>

                        <div v-show="submited">
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
            'submited': true
        }
    },
    methods: {
        async submitMessage() {
            const data = {
                'name': this.name,
                'email': this.email,
                'textarea': this.textarea,
            }

            await this.axios.post('/api/contact/message', data)
                .then(
                    response => {
                        console.log(response);
                        this.submited = false;
                    }
                )
                .catch(
                    error => {
                        console.log(error);
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

.btn-primary:hover {
    color: #fff;
}
</style>