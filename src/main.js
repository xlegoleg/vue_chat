import Vue from 'vue';
import * as firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyB6OAOZ8meiEp0jExNU89KZnvz5gQu3wVU",
      authDomain: "my-vue-chat-8e3fe.firebaseapp.com",
      databaseURL: "https://my-vue-chat-8e3fe.firebaseio.com",
      projectId: "my-vue-chat-8e3fe",
      storageBucket: "my-vue-chat-8e3fe.appspot.com",
      messagingSenderId: "538481694263",
      appId: "1:538481694263:web:266a240eb8c8edebab11b2"
    })
  }
}).$mount('#app')
