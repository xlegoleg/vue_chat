import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import AuthModule from './modules/AuthModule';

const store = new Vuex.Store({
    modules: {
        auth: AuthModule,
    },
    state: {
        mainColor: "deep-purple accent-4",
        loading: false
    },
    getters: {
        mainColor: (state) => {
            return state.mainColor;
        }
    },
    mutations: {
        /**
         * Set loading state of app
         * @param state {Object}
         * @param payload {bool}
         */
        SET_LOADING(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
    },
});


export default store;