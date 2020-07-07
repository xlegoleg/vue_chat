import * as firebase from "firebase";

/**
 * firebase auth module
 * @type {firebase.auth.Auth}
 */
const auth = firebase.auth();

const AuthModule = {
    state: {
        isAuthorized: false,
        userEmail: null,
    },
    getters: {
        isAuthorized(state){
            return state.isAuthorized;
        }
    },
    mutations: {
        LOGIN(state,payload) {
            state.userEmail = payload;
            state.isAuthorized = true;
        }
    },
    actions: {
        CREATE_NEW_USER({commit},payload) {
            auth.createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                    commit("LOGIN");
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}

export default AuthModule;