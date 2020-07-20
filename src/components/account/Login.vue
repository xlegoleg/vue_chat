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
                        <v-form
                                v-model="valid"
                                @submit.prevent="submitForm"
                        >
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
                            <v-btn
                                    type="submit"
                                    block
                                    color="green"
                                    class="mt-6 white--text"
                                    :disabled="!valid"
                            >
                                confirm registration
                            </v-btn>
                        </v-form>

                        <Preload :loaderMessage="'Waiting for login'"></Preload>

                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import {mapState,mapActions} from 'vuex';
import Preload from '@/components/common/Preload'

export default {

    name: 'Login',

    components: {
        Preload
    },

    data() {
        return {
            valid: false,
            email: '',
            pass: ''
        }
    },

    computed: {
        ...mapState({
            mainColor: state => state.mainColor,
            passRules : state => state.auth.passRules,
            emailRules : state => state.auth.emailRules,
            isAuthorized: state => state.auth.isAuthorized
        }),
    },

    watch: {
        isAuthorized (value) {
            if (value !== false) {
                this.$router.push('/');
            }
        }
    },

    methods: {
        ...mapActions({
            authorizeUser: 'AUTHORIZE_USER'
        }),

        submitForm() {

            const user = {
                email: this.email,
                password: this.pass
            };

            this.authorizeUser(user);
        }
    }
}
</script>