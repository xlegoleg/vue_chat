<template>
    <v-snackbar
            bottom
            right
            color="success"
            v-model="notify"
            :timeout="timeout"
    >
        <div class="text-center" style="width: 100%">{{ notifyMessage || 'Success' }}</div>

    </v-snackbar>
</template>

<script>
    import {mapState} from 'vuex';

    export default {

        name: 'SuccessNotify',

        props: ['notifyMessage'],

        data() {
            return {

            }
        },

        computed: {
            ...mapState({
                notify: state => state.notify,
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