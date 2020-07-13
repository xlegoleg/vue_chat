import * as firebase from "firebase";

const AuthModule = {

    state: {
        isAuthorized: false,
        userName: null,
        userId: null,
        userEmail: null,
        baseRules: [
            v => v !== '' || "Required field",
            v => v.length >= 4 || "More 3 Symbols"
        ],
        emailRules: [
            v => !!v || 'Required field',
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
        passRules: [
            v => v !== '' || "Required field",
            v => v.length >= 6 || "More 5 Symbols"
        ],

    },
    getters: {
        isAuthorized(state){
            return state.isAuthorized;
        }
    },
    mutations: {
        LOGIN (state,payload) {
            state.isAuthorized = true;
            state.userName = payload.name;
            state.userEmail = payload.email;
            state.userId = payload.id;
        }
    },
    actions: {
        /**
         * Create new user account and signed in
         * @param commit {function}
         * @param payload {Object}
         */
        CREATE_NEW_USER ({commit},payload) {
            commit("SET_LOADING", true);
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((authData) => {
                    firebase.database().ref('users').child(authData.user.uid).set({
                        name: payload.username
                    }).then(() => {
                        const newUser = {
                            id: authData.user.uid,
                            name: payload.username,
                            email: authData.user.email
                        }
                        commit("LOGIN", newUser);
                        commit("SET_LOADING", false);
                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        /**
         *
         * @param commit {function}
         * @param payload {Object}
         */
        AUTHORIZE_USER ({commit}, payload) {
            commit("SET_LOADING", true);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((authData) => {
                    firebase.database().ref('users').child(authData.users.uid).once('value')
                        .then((snapshot) => {
                            commit("SET_LOADING", false);
                            console.log(snapshot);
                        })
                        .catch((error) => {
                            commit("SET_LOADING", true);
                            console.log(error);
                        })
                })
                .catch((error) => {
                    commit("SET_LOADING", true);
                    console.log(error);
                })
        }
    }
}

export default AuthModule;