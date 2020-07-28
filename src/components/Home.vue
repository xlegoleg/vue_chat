<template>
    <v-container
            class="d-flex home"
    >
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
                        class="home-card d-flex flex-column align-center justify-center"
                >
                    <div
                            class="home-card__round d-flex align-center justify-center"
                    >
                        <v-icon>{{item.icon}}</v-icon>
                    </div>
                    <h2>{{item.title}}</h2>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

// import Chat from '@/components/chat/Chat'

export default {

    name: 'Home',

    components: {
        // Chat
    },

    data() {
        return {
            items: [
                {title: 'Create new chat', icon: 'mdi-chat-plus-outline'},
                {title: 'Join existing chat', icon: 'mdi-chat-processing-outline'}
            ]
        }
    }

}
</script>

<style lang="scss">

    .home{
        min-height: 100%;
        &-card{
            height: 230px;
            &__round{
                background-color: $main-grey;
                width: 180px;
                height: 180px;
                border-radius: 50% !important;
                i{
                    font-size: 70px !important;
                }
            }
            h2{
                color: $main-light;
            }
        }
    }

</style>