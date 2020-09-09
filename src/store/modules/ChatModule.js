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
            //TODO add to members/chatKey/ array of users
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
        async JOIN_CHAT({commit,dispatch,getters},payload) {
            commit('SET_LOADING', true);
            const chatlist = getters.getAllChats;
            let currentChat = '',
                updates = {},
                created = new Date().valueOf();

            Object.entries(chatlist).forEach(([key,val]) => {
                if (payload === val.name) {
                    currentChat = key;
                }
            });

            if (currentChat) {
                updates['/members/' + currentChat] = {user: getters.userInfo.id};
                updates['users/' + getters.userInfo.id + '/chats/' + currentChat] = {name: payload, created: created};
                firebase.database().ref().update(updates)
                    .then(async () => {
                        commit('SET_LOADING', false);
                        commit('SET_NOTIFY_MESSAGE',`You added to ${payload} chat`);
                        await dispatch('SHOW_NOTIFY');
                        await dispatch('LOAD_ALL_CHATS');
                    })
                    .catch(async (error) => {
                        console.log(error);
                        commit('SET_LOADING', false);
                        commit('SET_ERROR_MESSAGE',error);
                        await dispatch('SHOW_ERROR');
                    });
            }
             else {
                commit('SET_LOADING', false);
                commit('SET_ERROR_MESSAGE','Chat is not exist');
                await dispatch('SHOW_ERROR');
            }
            console.log(payload);
        },
        LOAD_ALL_CHATS({commit}) {
            commit('SET_LOADING', true);
            firebase.database().ref('chats').orderByKey().once('value')
                .then((data) => {
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