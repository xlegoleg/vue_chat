import * as firebase  from "firebase";

const ChatModule = {
    state: {

    },

    getters: {

    },

    mutations: {

    },

    actions: {
        CREATE_CHAT({getters,commit}, payload){
            commit('SET_LOADING', true);
            let newChatKey = firebase.database().ref().child('chats').push().key,
                updates = {},
                created = new Date().valueOf();

            updates['/chats/' + newChatKey] = {name: payload, created: created};
            updates['users/' + getters.userInfo.id + '/chats/' + newChatKey] = {name: payload, created: created};

            firebase.database().ref().update(updates)
                .then(() => {
                    commit('SET_LOADING', false);
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_LOADING', false);
                })
        }
    }
}

export default ChatModule