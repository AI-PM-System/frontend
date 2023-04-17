<script setup lang="ts">
    import Badge from '@/components/Badge.vue'
    import Flex from '@/components/Flex.vue'
</script>

<script lang="ts">
    export default {
        props: {
            sender: {
                type: String,
                default: 'me'
            },
            handle: {
                type: String,
                default: ''
            },
            role: {
                type: String,
                default: ''
            },
            sent: {
                type: String,
                default: ''
            }
        },
        computed: {
            justifyContentStyle() {
                return this.sender === 'me' ? 'flex-end' : 'flex-start';
            }
        }
    }
</script>

<template>
    <div class="chat-message-wrapper" :attr-sender="sender">
        <div class="chat-handle">
            <Flex gap="10px" align-items="center" :justifyContent="justifyContentStyle">
                <Badge>{{ handle }}</Badge>
                <Badge>{{ role }}</Badge>
                
            </Flex>
        </div>
        <div class="chat-message">
            <span class="message-output">
                <slot></slot>
            </span>            
        </div>
        <time>
            {{ sent }}
        </time>
    </div>
</template>

<style scoped>

.chat-message-wrapper {
    max-width: 50%;
    margin: 1rem;
}
.chat-message {
    border-radius: 1rem;
    background-color: #f1f0f0;
    padding: 1rem;
}

.chat-message .message-output {
    color: #000;
}

.chat-handle {
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 0.5rem;
}

.chat-message-wrapper time {
    font-size: 0.6rem;
    color: #999;
    margin-top: 0.5rem;
    display: block;
}

.chat-message-wrapper[attr-sender="me"] {
    margin-left: auto;
}

.chat-message-wrapper[attr-sender="me"] .chat-message {
    background-color: #dcf8c6;
}

.chat-message-wrapper[attr-sender="me"] .chat-handle {
    text-align: right;
    margin-right: .5rem;
}

.chat-message-wrapper[attr-sender="me"] time {
    text-align: right;
    margin-right: .5rem;
}

.chat-message-wrapper[attr-sender="other"] {
    margin-right: auto;
}

.chat-message-wrapper[attr-sender="other"] .chat-handle {
    margin-left: .5rem;
}

.chat-message-wrapper[attr-sender="other"] time {
    margin-left: .5rem;
}
</style>