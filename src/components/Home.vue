<template>
    <v-container
            class="d-flex home"
    >
        <v-layout
                row
                align-center
                justify-center
                class="my-auto"
        >
            <v-flex xs10 sm8 md6 class="text-center">
                <v-card
                        class="home-panel"
                >
                    <v-card-title
                            class="deep-purple accent-4 white--text"
                    >
                        Actions
                    </v-card-title>
                    <v-card-text>
                        <v-row
                                align-content="center"
                        >
                            <v-col
                                    v-for="(item, index) in items"
                                    :key="index"
                                    cols="12"
                                    sm="6"
                            >
                                <v-card
                                        :ripple="{center: true, class: 'purple--text text--darken-4'}"
                                        class="home-card d-flex flex-column align-center justify-center"
                                        @click="clickHandler($event,    item.callback)"
                                >
                                    <div
                                            class="home-card__round d-flex align-center justify-center"
                                    >
                                        <v-icon>{{item.icon}}</v-icon>
                                    </div>
                                    <h3>{{item.title}}</h3>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>

        <ChatModal
                :modal="modal"
                :cChat="cChat"
                :jChat="jChat"
                v-on:update:modal="modal = $event"
        >


        </ChatModal>

        <Preload :loaderMessage="'Loading resources'"></Preload>

        <SuccessNotify></SuccessNotify>
    </v-container>
</template>

<script>

import ChatModal from '@/components/common/ChatModal';
import Preload from '@/components/common/Preload';
import SuccessNotify from "@/components/common/SuccessNotify";
import {mapGetters,mapActions} from 'vuex';

export default {

    name: 'Home',

    components: {
        ChatModal,
        Preload,
        SuccessNotify
    },

    data() {
        return {
            modal: false,
            cChat: false,
            jChat: false,
            items: [
                {title: 'Create new chat', icon: 'mdi-chat-plus-outline',callback: this.createChat},
                {title: 'Join existing chat', icon: 'mdi-chat-processing-outline',callback: this.joinChat}
            ]
        }
    },

    mounted() {
      this.loadAllChats();
    },

    computed: {
        ...mapGetters([
            'getAllChats'
        ])
    },

    methods: {

        ...mapActions({
            loadAllChats: 'LOAD_ALL_CHATS'
        }),
        /**
         * Card click handler
         * @param e {Object}
         * @param callback {function}
         */
        clickHandler(e, callback) {
            callback();
            this.modal = true;
        },

        createChat() {
            this.cChat = true;
            this.jChat = false;
        },

        joinChat() {
            this.cChat = false;
            this.jChat = true;
        }
    }

}
</script>

<style lang="scss">

    .home{
        margin-top: 50px;
        &-card{
            height: 180px;
            transition: all 0.2s ease-in;
            opacity: 0.6;
            &__round{
                background-color: $main-color;
                width: 130px;
                height: 130px;
                border-radius: 50% !important;
                i{
                    font-size: 50px !important;
                    color: #ffffff !important;
                }
            }
            h3{
                color: $main-color;
            }
            &:hover{
                opacity: 1;
                cursor: pointer;
            }
        }
    }

</style>