<template>
    <section class="page-section bg-dark text-white">

        <div class="container px-4 px-lg-5 text-center">
            <img src="https://i.ibb.co/drSQ8KZ/809ceffe-caa1-4bad-9f0c-c339cfa36f84.jpg" alt="Alan Sanchez"
                class="mx-auto rounded-circle" style="width: 200px; height: 200px;">
            <br>
            <a class="btn btn-light btn-xl mt-5" :href="url_pdf" target="_blank">
                ¡Observa mi CV!
            </a>

        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            'url_pdf': '',
        }
    },
    async mounted() {
        await this.axios.get('/api/information/1')
            .then(r => this.url_pdf = r.data.data.attributes.url_pdf)
    }
}
</script>