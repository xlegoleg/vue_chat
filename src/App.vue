<template>
    <v-app>
        <v-navigation-drawer
                app
                absolute temporary
                v-model="drawer"
        >
                <BaseDrawer :color="mainColor" v-if="!isAuthorized"></BaseDrawer>
                <LoginDrawer :color="mainColor" v-else></LoginDrawer>
        </v-navigation-drawer>

        <v-app-bar
                app
                :color="mainColor"
                dense
                dark
        >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
            <v-toolbar-title>Custom messenger</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-divider
                    vertical
            ></v-divider>
            <template v-for="item in menuItems">
                <v-toolbar-items v-if="item.state === isAuthorized" v-bind:key="item.route">
                    <v-btn
                            :to="item.route"
                            text
                            @click="toolbarHandler($event,item.state)"
                    >
                        <v-icon left>{{item.icon}}</v-icon>
                        <div class="hidden-xs-only">{{ item.title }}</div>
                    </v-btn>
                    <v-divider
                            vertical
                    ></v-divider>
                </v-toolbar-items>
            </template>
        </v-app-bar>


        <v-content
                app
        >
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </v-content>

<!--        <v-footer app>-->

<!--        </v-footer>-->
    </v-app>
</template>

<script>

import {mapState, mapMutations} from 'vuex';
import BaseDrawer from "@/components/drawer/BaseDrawer";
import LoginDrawer from "@/components/drawer/LoginDrawer";

export default {
    name: 'App',

    components: {
        BaseDrawer,
        LoginDrawer
    },

    data () {
        return {
            drawer: false
        }
    },

    computed: {
        ...mapState({
            mainColor: state => state.mainColor,
            isAuthorized: state => state.auth.isAuthorized
        }),

        menuItems() {
            const items = [
                {title: 'Login', icon: 'mdi-account-arrow-right', route:'/login', state: false},
                {title: 'Register', icon: 'mdi-account-multiple-plus', route: '/register', state: false},
                {title: 'Logout', icon: 'mdi-account-arrow-left', route: '/login', state: true}
          ]
          return items;
        }
    },

    methods: {
        ...mapMutations({
            logOut: 'LOGOUT'
        }),

        toolbarHandler($event, state) {
            if (state) {
                this.logOut();
            }
        }
    }
};
</script>

<style lang="scss">
    .v-toolbar__content{
        padding-right: 0 !important;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
</style>