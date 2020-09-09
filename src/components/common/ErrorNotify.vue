<template>
    <v-snackbar
            bottom
            right
            color="error"
            v-model="error"
            :timeout="timeout"
    >
        <div class="text-center" style="width: 100%">{{ errorMessage || errMsg || 'Error' }}</div>

    </v-snackbar>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        name: 'ErrorNotify',

        props: ['errorMessage'],

        data() {
            return {

            }
        },

        computed: {
            ...mapState({
                error: state => state.error,
                errMsg: state => state.errorMessage,
                timeout: state => state.notifyTimeout
            })
        }
    }

</script>

<style lang="scss">

    .v-snack__wrapper{
        min-width: 200px !important;
    }

</style>