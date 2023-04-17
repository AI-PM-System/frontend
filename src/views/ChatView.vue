<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue';
</script>

<script lang="ts">
export default {
        
    computed: {
        joinInfo() {
            return `Joined chat (${this.$route.params.id})`;
        }
    }
};

</script>

<template>
    <Chat :joinInfo="joinInfo" />
</template>
