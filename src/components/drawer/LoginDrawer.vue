<template>
    <v-list class="pa-0"

    >
        <v-list-item
                class="pt-2 list-header"
        >
            <v-list-item-avatar>
                <v-icon :color="color" :size="34">{{icon}}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="grey--text">{{user.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <template
                v-for="(item,index) in items"
        >
            <v-divider :key="index"></v-divider>

            <v-list-item
                    :key="item.title"
                    :to="item.route"
                    :color="color"
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>
</template>

<script>

import {mapState} from 'vuex';

export default {
    name: 'LoginDrawer',

    props: ['color'],

    data() {
        return {
            icon: 'mdi-ghost',
            items: [
                {title: 'Home page', icon: 'mdi-home', route:'/'},
            ]
        }
    },

    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    }
}

</script>

<style lang="scss">

    .list-header{
        background-color: #f2f2f2;
    }

</style>