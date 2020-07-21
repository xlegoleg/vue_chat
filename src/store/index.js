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
        loading: false,
        notify: false,
        notifyTimeout: 1000
    },
    getters: {

    },
    mutations: {
        /**
         * Set loading state of app
         * @param state {Object}
         * @param payload {bool}
         */
        SET_LOADING(state, payload) {
            state.loading = payload;
        },

        /**
         *
         * @param state {Object}
         * @param payload {bool}
         */
        SET_NOTIFY(state, payload){
            state.notify = payload
        }
    },
    actions: {
         SHOW_NOTIFY({commit,state}) {
            commit('SET_NOTIFY', true);
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('SET_NOTIFY', false);
                    resolve();
                }, state.notifyTimeout);
            });
        }
    },
});


export default store;