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
                    <v-card-title>Register chat account</v-card-title>
                    <v-container>
                        <v-form
                                v-model="valid"
                                @submit.prevent="submitForm"
                        >
                            <v-text-field
                                    v-model="name"
                                    label="Your nickname"
                                    :color="mainColor"
                                    :rules="baseRules"
                                    required
                            >
                            </v-text-field>
                            <v-text-field
                                    v-model="email"
                                    label="E-mail"
                                    :color="mainColor"
                                    :rules="emailRules"
                                    required
                            >
                            </v-text-field>
                            <v-text-field
                                    label="Password"
                                    :color="mainColor"
                                    v-model="pass"
                                    :rules ="baseRules"
                                    required
                            >
                            </v-text-field>
                            <v-text-field
                                    label="Repeat password"
                                    :color="mainColor"
                                    v-model="repeatedPass"
                                    :rules="repeatedPassRules"
                                    required
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
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState, mapActions} from "vuex"

    export  default {
        name: 'Register',

        data() {
            return {
                valid: false,
                name: '',
                email: '',
                pass: '',
                repeatedPass: '',
                baseRules: [
                    v => v !== '' || "Required field",
                    v => v.length >= 4 || "More 3 Symbols"
                ],
                emailRules: [
                    v => !!v || 'Required field',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                repeatedPassRules: [
                    v => !!v || 'Required field',
                    v => v === this.pass || "Password mismatch"
                ]
            }
        },

        computed: {
            ...mapState({
                mainColor: state => state.mainColor,
            }),

        },

        methods: {
            ...mapActions({
                createNewUser: 'CREATE_NEW_USER'
            }),

            submitForm() {
                const user = {
                    name: this.username,
                    email: this.email,
                    password: this.password
                };

                this.createNewUser(user);
                // this.$store.dispatch("CREATE_NEW_USER",user);
            }
        }
    }

</script>