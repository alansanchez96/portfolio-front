<template>
  <main class="portfolio-page">
    <MouseTrail />
    <ThemeToggle />
    <Navbar cta-href="#contact" cta-label="Hablemos" :links="portfolioData.navLinks" />
    <Header :hero="portfolioData.hero" :stats="portfolioData.heroStats" />
    <About :about="portfolioData.about" />
    <Experience :experience="portfolioData.experience" />
    <Conocimientos
      :capabilities="portfolioData.capabilities"
      :stack-groups="portfolioData.stackGroups"
    />
    <Projects :projects="portfolioData.projects" />
    <Profile :profile="portfolioData.profile" />
    <Contact :contact="portfolioData.contact" />
    <Footer :footer="portfolioData.footer" />
  </main>
</template>

<script setup>
import About from '@/components/About.vue';
import Conocimientos from '@/components/Conocimientos.vue';
import Contact from '@/components/Contact.vue';
import Experience from '@/components/Experience.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import MouseTrail from '@/components/MouseTrail.vue';
import Navbar from '@/components/Navbar.vue';
import Profile from '@/components/Profile.vue';
import Projects from '@/components/Projects.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { portfolioData } from '@/data/portfolio';
</script>
