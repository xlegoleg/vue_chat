<template>
    <div class="home">
        <Chat></Chat>
    </div>
</template>

<script>

import Chat from '@/components/chat/Chat'

export default {

    name: 'Home',

    components: {
        Chat
    },

    data() {
        return {

        }
    }

}
</script>

<style lang="scss">

    .home{
        min-height: 100%;
    }

</style>