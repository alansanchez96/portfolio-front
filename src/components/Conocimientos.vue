<template>
    <section class="page-section" id="services">
        <div class="container px-4 px-lg-5">
            <h2 class="text-center mt-0">Mis conocimientos tecnológicos en desarrollo web</h2>
            <hr class="divider" />
            <div class="slider">
                <div v-for="stack in stacks" :key="stack">
                    <div class="card__conocimiento">
                        <div class="card__img">
                            <img :src="(url + stack.image)" alt="">
                        </div>
                        <div class="card__text" v-if="(stack.state == 0)">
                            <p class="mt-3 text-secondary fw-bold">En proceso</p>
                        </div>
                        <div class="card__text" v-else-if="(stack.state == 1)">
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
            'url': 'https://api-portfolio-alansan.up.railway.app/',
            'stacks': [],
            'stateProceso': 'En Proceso',
            'stateDominado': 'Dominado',
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
                error => console.log('Ocurrio un error')
            )
    }
}
</script>