<template>
    <v-container
        class="d-flex pa-0"
        style="min-height: 100%"
    > 
        <v-layout
            row
            align-center
            justify-center
            class="my-auto"
        >
            <v-flex xs10 sm6 class="text-center">
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

                        <SuccessNotify :notifyMessage="'Login Successful'"></SuccessNotify>

                        <ErrorNotify :errorMessage="errorMessage"></ErrorNotify>

                    </v-container>
                </v-card>
            </v-flex>
        </v-layout >
    </v-container>
</template>

<script>

import {mapState,mapActions} from 'vuex';
import Preload from '@/components/common/Preload';
import SuccessNotify from "@/components/common/SuccessNotify";
import ErrorNotify from "@/components/common/ErrorNotify";

export default {

    name: 'Login',

    components: {
        Preload,
        SuccessNotify,
        ErrorNotify
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
            isAuthorized: state => state.auth.isAuthorized,
            errorMessage: state => state.errorMessage
        }),
    },

    watch: {
        isAuthorized (value) {
            if (value !== false) {
                this.goHome();
            }
        }
    },

    methods: {
        ...mapActions({
            authorizeUser: 'AUTHORIZE_USER',
            showNotify: 'SHOW_NOTIFY'
        }),

        submitForm() {

            const user = {
                email: this.email,
                password: this.pass
            };

            this.authorizeUser(user);
        },

        async goHome() {
            await this.showNotify();
            this.$router.push('/');
        }
    }
}
</script>