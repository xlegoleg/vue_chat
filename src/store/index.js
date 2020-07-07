import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import AuthModule from './modules/AuthModule';

const store = new Vuex.Store({
    modules: {
        auth: AuthModule,
    },
    state: {
        mainColor: "deep-purple accent-4"
    },
    getters: {
        mainColor: (state) => {
            return state.mainColor;
        }
    },
    mutations: {
    },
    actions: {
    },
});


export default store;