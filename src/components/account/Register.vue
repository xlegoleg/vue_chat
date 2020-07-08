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
                        <v-form>
                            <v-text-field
                                    label="Your nickname"
                                    required
                                    :color="mainColor"
                            >
                            </v-text-field>
                            <v-text-field
                                    label="E-mail"
                                    required
                                    :color="mainColor"
                            >
                            </v-text-field>
                            <v-text-field
                                    label="Password"
                                    required
                                    :color="mainColor"
                                    v-model="pass"
                            >
                            </v-text-field>
                            <v-text-field
                                    label="Repeat password"
                                    required
                                    :color="mainColor"
                                    v-model="repeatedPass"
                                    @change="checkPass"
                            >
                            </v-text-field>
                            <v-btn
                                    block
                                    color="green"
                                    dark
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

    export  default {
        name: 'Register',

        data() {
            return {
                pass: null,
                repeatedPass: null
            }
        },

        computed: {
            mainColor() {
                return this.$store.getters.mainColor;
            }
        },

        methods: {
            checkPass(event) {
                this.pass === event ? console.log('yes') : console.log('no');
            }
        }
    }

</script>