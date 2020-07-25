<template>
    <v-container
            class="pa-0 chat-wrapper"
    >
        <v-row>
            <v-col  class="chat-col pa-0"
                    lg="10"
                    offset-lg="2"
                    md="12"
            >
                <div class="chat-window"
                     style="background-color: #f2f2f2"
                >

                </div>
                <div class="chat-input">
                    <v-text-field
                            :placeholder="placeholder"
                            solo
                            hide-details
                            clearable
                    >

                    </v-text-field>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

    export default {
        name: 'Chat',

        data() {
            return {
                placeholder: 'Your message'
            }
        }
    }

</script>

<style lang="scss">
    .container{

    }
    .chat{
        &-col{
            padding-top: 0px;
        }
        &-wrapper{
            min-height: 100%;
        }
        &-window{
            height: calc(100vh - 102px);
        }
        &-input{
            background-color: #f2f2f2;
            padding: 0px 20px;
            padding-bottom: 6px;
        }
    }
</style>