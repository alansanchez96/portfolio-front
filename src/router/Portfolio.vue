<template>
  <div id="page-top">
    <Navbar />
    <Header />
    <About />
    <Conocimientos />
    <Projects />
    <Profile />
    <Contact />
    <Footer />
  </div>
</template>

<script>
import About from '@/components/About.vue';
import Header from '@/components/Header.vue';
import Conocimientos from '@/components/Conocimientos.vue';
import Navbar from '@/components/Navbar.vue';
import Projects from '@/components/Projects.vue';
import Profile from '@/components/Profile.vue';
import Contact from '@/components/Contact.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Portfolio',
  components: {
    About,
    Header,
    Conocimientos,
    Navbar,
    Projects,
    Profile,
    Contact,
    Footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
