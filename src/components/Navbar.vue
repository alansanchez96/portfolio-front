<template>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div class="container px-4 px-lg-5">
            <a class="navbar-brand" href="/">Portafolio | <span>Alan Sanchez</span></a>
            <button v-if="$route.path == '/'" class="navbar-toggler navbar-toggler-right" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive"
                aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
            <div v-if="$route.path == '/'" class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ms-auto my-2 my-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">Sobre Mi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#services">Conocimientos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#portfolio">Portafolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contact">Contacto</a>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="!$store.state.isAuth" class="nav-link"
                            :to="{ name: 'Login' }">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link v-if="$store.state.isAuth" class="nav-link"
                            :to="{ name: 'Dashboard' }">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="#" v-if="$store.state.isAuth" class="nav-link"
                            @click="$store.commit('logout')">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style>

</style>