<template>
    <v-list class="pa-0">
        <v-list-item
                class="pt-2 list-header"
        >
            <v-list-item-avatar>
                <v-icon :color="color" :size="34">{{icon}}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="white--text">Not authorized</v-list-item-title>
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

    export default {
        name: 'BaseDrawer',

        props: ['color'],

        data() {
            return {
                subheader: 'Please authorize',
                icon: 'mdi-ghost-off',
                items: [
                    {title: 'Login chat', icon: 'mdi-account-arrow-right', route:'/login'},
                    {title: 'Create new account', icon: 'mdi-account-multiple-plus', route: '/register'}
                ]
            }
        }
    }

</script>