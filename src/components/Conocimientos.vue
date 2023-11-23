<template>
    <section class="page-section" id="services">
        <div class="container px-4 px-lg-5">
            <h2 class="text-center mt-0">Mis conocimientos tecnológicos en desarrollo web</h2>
            <hr class="divider" />
            <div class="slider">
                <p class="text-danger text-center fw-bold mx-auto" v-show="serverError">
                    <span>Ocurrio un error con el servidor.</span><br>
                    <span class="text-primary">Ayudame a mantenerlo funcionando con una pequeña donacion a este Alias:</span><br><br>
                    <span class="text-success">OPENBANK.SNCHZ</span>
                </p>
                <div v-for="stack in stacks" :key="stack" v-show="showStacks">
                    <div class="card__conocimiento">
                        <div class="card__img">
                            <img :src="(url + stack.attributes.image)" alt="">
                        </div>
                        <div class="card__text" v-if="(stack.attributes.state == 0)">
                            <p class="mt-3 text-secondary fw-bold">En proceso</p>
                        </div>
                        <div class="card__text" v-else-if="(stack.attributes.state == 1)">
                            <p class="mt-3 text-success fw-bold">Dominado</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: 'Conocimientos',
    data() {
        return {
            'url': 'https://dev-alansan-netlify-app.preview-domain.com/',
            'stacks': [],
            'showStacks': true,
            'serverError': false,
        }
    },
    async mounted() {
        await this.axios.get('/api/stacks-tecnologicos')
            .then(response => this.stacks = response.data.data)
            .catch(() => {
                this.serverError = true;
                this.showStacks = false;
            })
    }
}
</script>