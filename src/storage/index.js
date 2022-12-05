import { createStore } from 'vuex';
import router from '../router';
import VuexPersistence from 'vuex-persist';

const storage = createStore({
    state() {
        return {
            isAuth: false,
        }
    },
    mutations: {
        setAuthenticated(state, value) {
            state.isAuth = value;
        },
        logout(state) {
            state.isAuth = false;
            localStorage.removeItem('access_token');
            router.push('/');
        }
    },
    plugins: [
        new VuexPersistence({
            storage: window.localStorage
        }).plugin
    ]
});

export default storage;