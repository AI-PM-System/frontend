<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'
import Chat from '@/components/chat/Chat.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            chat: {},
            messages: []
        }
    },
    computed: {
        joinInfo() {
            return `Joined chat (${this.$route.params.id})`;
        },
        emptyState() {
            return this.messages.length === 0;
        },
        fetchChatUrl() {
            return `http://localhost:8080/api/v1/user/chats/${this.$route.params.id}`;
        },
        fetchMessagesUrl() {
            return `http://localhost:8080/api/v1/user/messages/chat/${this.$route.params.id}`;
        }
    },
    methods: {
        handleSendMessage: (message: string, chatId: Number, memberId: Number, username: string, jwt: string, callback: Function) => {
            useFetchAuth(`http://localhost:8080/api/v1/user/messages`,
                jwt,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        content: message,
                        chatId: chatId,
                        memberId: memberId,
                        username
                    })
                }, (json: any) => {
                    callback(json)
                }
            );
        }
    },
    mounted() {
        useFetchAuth(this.fetchChatUrl,
            this.$ls.get('jwt'),
            {
                method: 'GET'
            }, (json: any) => {
                this.chat = json;
            }
        );
        useFetchAuth(this.fetchMessagesUrl,
            this.$ls.get('jwt'),
            {
                method: 'GET'
            }, (json: any) => {
                this.messages = json;
            }
        );
    }
};

</script>

<template>
    <Chat :chat="chat" :messages="messages" :handleSendMessage="handleSendMessage">
        <template #emptyState>
            Seems like you're the first one here. Say hi to start the conversation!
        </template>
    </Chat>
</template>
