<template>
    <div class="text-center">
        <v-dialog
                v-model="loading"
                hide-overlay
                persistent
                width="300"
        >
            <v-card
                    :color="mainColor"
                    dark
            >
                <v-card-text>
                    <div class="text-center">{{loaderMessage}}</div>
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

    import {mapState} from "vuex";

    export default {
        name: 'Preload',

        props: ['loaderMessage'],

        data() {
            return {

            }
        },

        computed: {
            ...mapState({
                mainColor: state => state.mainColor,
                loading: state => state.loading,
            }),
        }
    }

</script>