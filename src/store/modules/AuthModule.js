import * as firebase from "firebase";

const AuthModule = {

    state: {
        isAuthorized: false,
        user: null,
        baseRules: [
            v => v !== '' || "Required field",
            v => v.length >= 4 || "More than 3 symbols",
            v => v.length <= 12 || "Less than or equal 12 symbols"
        ],
        emailRules: [
            v => !!v || 'Required field',
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        ],
        passRules: [
            v => v !== '' || "Required field",
            v => v.length >= 6 || "More than 5 symbols"
        ],

    },
    getters: {
        isAuthorized(state){
            return state.isAuthorized;
        },
        userInfo(state){
            return state.user;
        }
    },
    mutations: {
        LOGIN (state,payload) {
            state.isAuthorized = true;
            state.user = payload;

            const userListRef = firebase.database().ref('presence');
            const myUserRef = userListRef.push();

            firebase.database().ref('.info/connected')
                .on(
                    'value', function (snap) {
                        if (snap.val()) {
                            // if we lose network then remove this user from the list
                            myUserRef.onDisconnect()
                                .remove()
                            // set user's online status
                            let presenceObject = {user: payload, status: 'online'};
                            myUserRef.set(presenceObject);
                        } else {
                            // client has lost network
                            let presenceObject = {user: payload, status: 'offline'};
                            myUserRef.set(presenceObject);
                        }
                    }
                );
        },
        LOGOUT (state) {
            state.isAuthorized = false;
            state.user = null;

            firebase.auth().signOut()
                .then(() => {
                    console.log('logout')
                })
                .catch((error) => {
                    console.log(error)
                });
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
         * Authorize user
         * @param state {Object}
         * @param dispatch {function}
         * @param commit {function}
         * @param payload {Object}
         */
        AUTHORIZE_USER ({commit,dispatch,state}, payload) {
            commit("SET_LOADING", true);
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((authData) => {
                    firebase.database().ref('users').child(authData.user.uid).once('value')
                        .then((data) => {
                            const newUser = {
                                id: authData.user.uid,
                                name: data.val().name,
                                email: authData.user.email
                            }
                            commit("LOGIN", newUser);
                            commit("SET_LOADING", false);
                        })
                        .catch(async (error) => {
                            commit("SET_LOADING", false);
                            state.errorMessage = error.message;
                            await dispatch("SHOW_ERROR");
                        })
                })
                .catch(async (error) => {
                    commit("SET_LOADING", false);
                    commit("SET_ERROR_MESSAGE", error.message);
                    await dispatch("SHOW_ERROR");
                })
        }
    }
}

export default AuthModule;