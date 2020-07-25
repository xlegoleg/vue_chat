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
            <v-toolbar-title>Force messenger</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-divider
                    vertical
            ></v-divider>
            <v-toolbar-items v-for="item in menuItems" v-bind:key="item.route">
                <v-btn :to="item.route" text>
                    <v-icon left>{{item.icon}}</v-icon>
                    <div class="hidden-xs-only">{{ item.title }}</div>
                </v-btn>
                <v-divider
                        vertical
                ></v-divider>
            </v-toolbar-items>
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

import {mapState} from 'vuex';
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
                {title: 'Login', icon: 'mdi-account-arrow-right', route:'/login'},
                {title: 'Register', icon: 'mdi-account-multiple-plus', route: '/register'}
          ]
          return items;
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