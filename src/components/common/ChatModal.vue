<template>
    <v-dialog
            v-model="modalOpen"
            max-width="400"
    >
     <v-card>
         <v-card-title>{{title}}</v-card-title>
         <v-card-text class="pb-1">
             <v-text-field
                     v-model="chatName"
                     label="Enter chat name"
                     single-line
                     outlined
                     hide-details
                     :color="mainColor"
             >

             </v-text-field>
         </v-card-text>
         <v-card-actions class="text-center px-6 pb-4">
             <v-btn
                     v-if="cChat"
                     @click="createHandler"
                     type="submit"
                     block
                     color="green"
                     class="white--text"
             >
                 Create chat
             </v-btn>
             <v-btn
                     v-if="jChat"
                     @click="joinHandler"
                     type="submit"
                     block
                     color="green"
                     class="white--text"
             >
                 Join chat
             </v-btn>
         </v-card-actions>
     </v-card>
    </v-dialog>
</template>

<script>
    import {mapState,mapActions} from 'vuex';

    export default {
        name: 'ChatModal',

        props: ['modal', 'cChat', 'jChat'],

        data() {
            return {
                title: 'Enter chat name:',
                chatName: '',
                open: false
            }
        },

        mounted() {
            this.open = this.modal;
        },

        computed: {
            ...mapState({
                mainColor: state => state.mainColor
            }),

            modalOpen: {
                get() {return this.modal},
                set (value) { this.$emit('update:modal', value) },
            }
        },

        methods: {
            ...mapActions({
                createChat: 'CREATE_CHAT'
            }),

            async createHandler() {
                let chatName = this.chatName;
                this.chatName = '';
                await this.createChat(chatName);
                this.modalOpen = false;
            },

            joinHandler() {

            }
        }
    }

</script>