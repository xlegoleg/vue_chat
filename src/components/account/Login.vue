<template>
    <v-container
        class="d-flex"
        style="min-height: 100%"
    > 
        <v-layout 
            row
            class="my-auto"
        >
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title>Login chat</v-card-title>
                    <v-container>
                        <v-form>
                            <v-text-field
                                label="E-mail"
                                v-model="email"
                                :rules ="emailRules"
                                required
                                :color="mainColor"
                            >
                            </v-text-field>
                            <v-text-field
                                label="Password"
                                v-model="pass"
                                :rules ="passRules"
                                required
                                :color="mainColor"
                            >
                            </v-text-field>
                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import {mapState,mapActions} from 'vuex'

export default {

    name: 'Login',

    data() {
        return {
            email: '',
            pass: ''
        }
    },

    computed: {
        ...mapState({
            mainColor: state => state.mainColor,
            passRules : state => state.auth.passRules,
            emailRules : state => state.auth.emailRules
        }),
    },

    methods: {
        ...mapActions({
            authorizeUser: 'AUTHORIZE_USER'
        })
    }
}
</script>