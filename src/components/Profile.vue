<template>
    <section class="page-section bg-dark text-white">

        <div class="container px-4 px-lg-5 text-center">
            <img src="https://i.ibb.co/b1g7fvy/Picsart-23-10-30-15-19-14-576.jpg" alt="Alan Sanchez"
                class="mx-auto rounded-circle" style="width: 200px; height: 200px;" border="0">
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