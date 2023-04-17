<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'

import Flex from '@/components/Flex.vue'
import InputControl from '@/components/InputControl.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'

import IconGear from '@/components/icons/IconGear.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            message: '',
            newMessages: []
        };
    },
    computed: {
        emptyState() {
            return this.outputMessages.length === 0;
        },
        outputMessages() {
            return [...this.messages, ...this.newMessages];
        },
        joinInfo() {
            return this.chat.name ? this.chat.name : this.additionalJoinInfo;
        }
    },
    props: {
        chat: {
            type: Object,
            default: {}
        },
        messages: {
            type: Array,
            default: []
        },
        emptyStateMsg: {
            type: String,
            default: 'Seems like you\'re the first one here. Say hi to start the conversation!'
        },
        additionalJoinInfo: {
            type: String,
            default: ''
        },
        handleSendMessage: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        sendMessage(e) {
            if (e.code == 'Enter' || e.code == 'NumpadEnter') {
                this.handleSendMessage(
                    this.message,
                    this.chat.id,
                    this.$ls.get('memberId'),
                    this.$ls.get('username'),
                    this.$ls.get('jwt'),
                    (json: any) => {
                        this.newMessages.push(json);
                        this.message = '';
                    }
                );
            }
        }
    }
};

</script>

<template>
    <!--
        Chat Output:
        This is where the chat messages will be displayed.
        The messages are displayed using the ChatMessage component.
    -->
    <div class="chat-output">
        <div class="chat-output-info">
            --- Joined {{ joinInfo }} ---
        </div>

        <template v-if="emptyState">
            <p class="chat-output-info">
                <slot name="emptyState"></slot>
            </p>
        </template>
        
        <template v-for="__message in outputMessages">
            <ChatMessage :message="__message" />
        </template>
    </div>

    <!--
        Chat Input:
        This is where the user can enter a message.
        The message is displayed using the InputControl component.
    -->
    <div class="chat-input">
        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="message" placeholder="Enter message ..." @keydown="sendMessage" />
                <div class="icon">
                    <IconGear />
                </div>
            </Flex>
        </InputControl>
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