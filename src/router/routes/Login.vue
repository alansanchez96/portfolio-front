<template>
    <div class="masthead">

        <Navbar />
        <section class="d-flex justify-content-between align-items-center">
            <div class="container bg-login">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            class="img-fluid" alt="Sample image">
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form @submit.prevent="login">

                            <div class="divider d-flex align-items-center my-4">
                                <h4 class="text-center fw-bold mx-3 mb-0 text-white">Sing Up</h4>
                            </div>
                            <div class="divider d-flex align-items-center my-4">
                                <p class="fw-bold mx-3 mb-0 text-danger">{{ message }}</p>
                            </div>
                            <div class="divider my-4" v-for="(error) in errors">
                                <p class="fw-bold mx-3 mb-0 text-danger">{{ error[0] }}</p>
                                <p class="fw-bold mx-3 mb-0 text-danger">{{ error[1] }}</p>
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <input type="email" v-model="email" id="email"
                                    class="form-control text-white form-control-lg"
                                    placeholder="Enter a valid email address" />
                                <label class="form-label text-white" for="email">Email address</label>
                            </div>

                            <!-- Password input -->
                            <div class="form-outline mb-3">
                                <input type="password" v-model="password" id="password"
                                    class="form-control text-white form-control-lg" placeholder="Enter password" />
                                <label class="form-label text-white" for="password">Password</label>
                            </div>

                            <div class="d-flex justify-content-between align-items-center">
                                <!-- Checkbox -->
                                <div class="form-check mb-0">
                                    <input class="form-check-input me-2" type="checkbox" value="" id="remember" />
                                    <label class="form-check-label text-white" for="remember">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div v-show="!isLoading" class="text-center text-lg-start mt-4 pt-2">
                                <button class="btn btn-primary d-block mx-auto w-100 btn-lg">Login</button>
                            </div>

                            <div class="spinner" v-show="isLoading"></div>

                        </form>
                    </div>
                </div>
            </div>

        </section>

    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: "Login",
    components: {
        Navbar
    },
    data() {
        return {
            'email': '',
            'password': '',
            'message': '',
            'errors': {},
            'isLoading': false
        }
    },
    methods: {
        async login() {
            this.isLoading = true;
            const data = {
                email: this.email,
                password: this.password
            }
            await this.axios.post('/api/user/login', data)
                .then(
                    response => {
                        if (response.data.status === 0) {
                            this.message = response.data.message;

                            setTimeout(() => {
                                this.message = '';
                            }, 3000);
                            return;
                        }

                        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;

                        localStorage.setItem('access_token', response.data.access_token);
                        this.$store.commit('setAuthenticated', true);

                        this.$router.push('/');

                    }
                )
                .catch(
                    error => {
                        this.errors = error.response.data.errors
                        setTimeout(() => {
                            this.errors = [];
                        }, 3000);
                    }
                );
            this.isLoading = false;
        }
    }
}
</script>

<style scoped>
.bg-login {
    padding: 60px;
    margin-top: 100px;
    position: relative;
    background-color: #27272793;
}

@media (min-width: 992px) {

    .masthead {
        height: 100vh;
        padding-top: 0;
        overflow-y: hidden;
    }
}
</style>