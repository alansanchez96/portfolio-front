<template>
    <section class="page-section bg-dark text-white">

        <div class="container px-4 px-lg-5 text-center">
            <img src="https://i.ibb.co/mFCzyDRY/Whats-App-Image-2025-12-21-at-9-42-02-PM.jpg" alt="Alan Sanchez"
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
            'url_pdf': 'https://drive.google.com/file/d/1QRjhqs4O07rjaLMG3opj_CGTsHBnrJzk/view?usp=sharing',
        }
    }
}
</script>