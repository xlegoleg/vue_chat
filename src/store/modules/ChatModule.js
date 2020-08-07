import * as firebase  from "firebase";

const ChatModule = {
    state: {
        allChats: null
    },

    getters: {
        getAllChats(state){
            return state.allChats;
        }
    },

    mutations: {
        SET_ALL_CHATS(state,payload){
            state.allChats = payload;
        }
    },

    actions: {
        CREATE_CHAT({getters,commit,dispatch}, payload){
            commit('SET_LOADING', true);
            let newChatKey = firebase.database().ref().child('chats').push().key,
                updates = {},
                created = new Date().valueOf();

            updates['/chats/'+newChatKey] = {name: payload, created: created};
            updates['/members/'+newChatKey] = {user: getters.userInfo.id};
            updates['users/'+getters.userInfo.id +'/chats/'+newChatKey] = {name: payload, created: created};

            firebase.database().ref().update(updates)
                .then(async () => {
                    commit('SET_LOADING', false);
                    commit('SET_NOTIFY_MESSAGE','Chat created');
                    await dispatch('SHOW_NOTIFY');
                    await dispatch('LOAD_ALL_CHATS');
                })
                .catch(async (error) => {
                    console.log(error);
                    commit('SET_LOADING', false);
                    commit('SET_ERROR_MESSAGE',error);
                    await dispatch('SHOW_ERROR');
                })
        },
        LOAD_ALL_CHATS({commit}) {
            commit('SET_LOADING', true);
            firebase.database().ref('chats').orderByKey().once('value')
                .then((data) => {
                    console.log(data.val());
                    commit('SET_ALL_CHATS', data.val());
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