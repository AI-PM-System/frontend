<script setup lang="ts">
import ChatMessage from '@/components/chat/ChatMessage.vue'
</script>

<script lang="ts">
export default {
    computed: {
        showEmptyState() {
            return this.messages.length === 0;
        },
    },
    props: {
        messages: {
            type: Array<Object>,
            default: []
        },
        joinInfo: {
            type: String,
            default: null
        }
    }
};
</script>

<template>
    <div class="chat-output">
        <div class="chat-output-info">
            --- Joined {{ joinInfo }} ---
        </div>
        
        <template v-if="showEmptyState">
            <p>
                <slot name="emptyState"></slot>
            </p>
        </template>

        <template v-for="__message in messages">
            <ChatMessage :message="__message" />
        </template>

        <slot name="additionalMessages"></slot>
    </div>
</template>

<style scoped>

.chat-output {
    margin-bottom: 6rem;
}

.chat-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1rem 0 1rem;
    background-color: var(--color-background);
}

.chat-output p {
    margin-bottom: .5rem;
}

.chat-output strong {
    font-weight: 600;
}

.chat-output .chat-output-info {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--color-text-secondary);
    font-size: .8rem;
}

</style>