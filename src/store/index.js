import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import AuthModule from './modules/AuthModule';
import ChatModule from './modules/ChatModule';

const store = new Vuex.Store({
    modules: {
        auth: AuthModule,
        chat: ChatModule
    },
    state: {
        mainColor: "deep-purple accent-4",
        loading: false,
        notify: false,
        error: false,
        errorMessage: '',
        notifyMessage: '',
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
         * Set notify state
         * @param state {Object}
         * @param payload {bool}
         */
        SET_NOTIFY(state, payload){
            state.notify = payload
        },

        /**
         * Set notify message
         * @param state {Object}
         * @param payload {string}
         * @constructor
         */
        SET_NOTIFY_MESSAGE(state,payload){
            state.notifyMessage = payload;
        },

        /**
         * Set error state
         * @param state {Object}
         * @param payload {bool}
         */
        SET_ERROR(state, payload){
            state.error = payload
        },

        /**
         * Set error message
         * @param state {Object}
         * @param payload {string}
         * @constructor
         */
        SET_ERROR_MESSAGE(state,payload){
            state.errorMessage = payload;
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
        },

        SHOW_ERROR({commit,state}) {
            commit('SET_ERROR', true);
            return new Promise((resolve) => {
                setTimeout(() => {
                    commit('SET_ERROR', false);
                    resolve();
                }, state.notifyTimeout);
            });
        }
    },
});


export default store;