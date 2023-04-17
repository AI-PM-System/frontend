<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'
import Chat from '@/components/chat/Chat.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            chat: {},
            example: {
                member: {
                    user: {
                        firstName: 'Example',
                        lastName: 'Message'
                    },
                },
                content: "I want to build a website for my business.\
                        My deadline is at the end of the month.\
                        We are a small team of 5 people. I'm the project manager.\
                        Two are designers and the two last are developers.\
                        We have a budget of $10,000. We need a website that is\
                        responsive and has a blog. We want to use a CMS like Wordpress.\
                        We want to use Github for version control.\
                        The project should follow the Scrum methodology,\
                        and you should be the Scrum Master."
            }
        }
    },
    methods: {
        handleSendMessage: (message: string, chatId: Number, memberId: Number, username: string, jwt: string, callback: Function) => {
            useFetchAuth(`http://localhost:8080/api/v1/user/chats/generator`,
                jwt,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        content: message,
                        chatId: 0,
                        memberId,
                        username
                    })
                }, (json: any) => {
                    callback(json);
                }
            );
        }
    },
}
</script>

<template>
    <Chat additionalJoinInfo="Project Generator" :handleSendMessage="handleSendMessage">
        <template #emptyState>
            <div class="empty-state">
                <p>Tell ChatGPT about your project to get started.</p>
                <ChatMessage :message="example" class="example-message" />
            </div>
        </template>
    </Chat>
</template>

<style scoped>
.empty-state {
    padding: 1rem;
}

.empty-state p {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0.5rem;
}

.empty-state strong {
    font-weight: 600;
}

.empty-state .example-message {
    text-align: left;
}
</style>