<template>
    <Navbar />
    <div class="bg-dashboard">
        <div class="container">
            <div class="row d-flex w-100 mx-auto justify-content-center align-items-center">
                <h1 class="text-white fw-bold text-center">Dashboard</h1>

                <!-- Tabs navs -->
                <ul class="nav nav-tabs my-3">
                    <li class="nav-item" v-for="(tab, i) in tabNames" :key="tab" style="cursor:pointer;">
                        <a class="nav-link" @click="showContent(tab, i)" :class="{ 'active': activeTabName === tab }">
                            {{ tab }}
                        </a>
                    </li>
                </ul>
                <!-- Tabs navs -->

                <!-- Tabs content -->
                <div class="tab-content" id="ex1-content">
                    <div class="tab-pane fade show active">
                        <Component :is="currentTab" />
                    </div>
                </div>
                <!-- Tabs content -->

            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import StackTecnologicosVue from './Dashboard/StackTecnologicos.vue';
import ProyectosVue from './Dashboard/Proyectos.vue';
import MensajesVue from './Dashboard/Mensajes.vue';
import InformationVue from './Dashboard/Information.vue';

export default {
    name: "Dashboard",
    components: {
        Navbar,
        StackTecnologicosVue,
        ProyectosVue,
        MensajesVue,
        InformationVue
    },
    data() {
        return {
            'currentTab': null,
            'activeTabName': null,
            'tabNames': [
                'Stack Tecnologicos',
                'Proyectos',
                'Mensajes',
                'Informacion'
            ],
        }
    },
    methods: {
        showContent(tab, index) {

            this.activeTabName = tab;

            switch (index) {
                case 0:
                    this.currentTab = StackTecnologicosVue
                    break;
                case 1:
                    this.currentTab = ProyectosVue
                    break;
                case 2:
                    this.currentTab = MensajesVue
                    break;
                case 3:
                    this.currentTab = InformationVue
                    break;
            }

        }
    }

}
</script>

<style scoped>
.bg-dashboard {
    padding-top: 90px;
    background-color: #262525;
    height: 1400px;
}

h1 {
    color: #007eb3;
}

.btn-primary {
    border-color: #007eb3;
    color: #007eb3;
}

.nav-link {
    color: rgb(191, 191, 191);
}

.nav-link:hover {
    color: antiquewhite;
}
</style>