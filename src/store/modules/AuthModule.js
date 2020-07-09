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
            v => /.+@.+/.test(v) || 'E-mail must be valid',
        ],
        repeatedPassRules: [
            v => !!v || 'Required field',
            v => v === this.pass || "Password mismatch"
        ]
    },
    getters: {
        isAuthorized(state){
            return state.isAuthorized;
        }
    },
    mutations: {
        LOGIN(state,payload) {
            state.isAuthorized = true;
            state.userName = payload.name;
            state.userEmail = payload.email;
            state.userId = payload.id;
        }
    },
    actions: {
        CREATE_NEW_USER({commit},payload) {
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
        }
    }
}

export default AuthModule;