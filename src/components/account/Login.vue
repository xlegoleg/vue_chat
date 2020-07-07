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
                                required
                                :color="mainColor"
                            >
                            </v-text-field>
                            <v-text-field
                                label="Password"
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

export default {

    name: 'Login',

    data() {
        return {

        }
    },

    computed: {
        mainColor() {
            return this.$store.getters.mainColor;
        }
    }
}
</script>