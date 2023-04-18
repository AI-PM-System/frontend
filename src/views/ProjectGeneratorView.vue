<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'

import ChatOutput from '@/components/chat/ChatOutput.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue'

import Flex from '@/components/Flex.vue'
import StickyElement from '@/components/StickyElement.vue';
import InputControl from '@/components/InputControl.vue'
import Button from '@/components/Button.vue';

import IconCheck from '@/components/icons/IconCheck.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            content: '',
            messages: [] as any[],
            generatorId: 0,
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
        sendMessage (e : any) {
            if (e.code != 'Enter' && e.code != 'NumpadEnter') {
                return;
            }

            const content = this.content;
            const generatorId = this.generatorId;
            console.log(content);
            console.log(generatorId);
            if (this.generatorId == 0) {
                useFetchAuth(`http://localhost:8080/api/v1/user/generate/project/new`,
                    this.$ls.get('jwt'),
                    {
                        method: 'POST',
                        body: JSON.stringify({content})
                    }, (json: any) => {
                        this.generatorId = json.id;
                        this.messages.push(... json.messages);
                        this.content = '';                
                    }
                );
            } else {
                useFetchAuth(`http://localhost:8080/api/v1/user/generate/project/proceed`,
                    this.$ls.get('jwt'),
                    {
                        method: 'POST',
                        body: JSON.stringify({content, generatorId})
                    }, (json: any) => {
                        this.messages.push(... json);
                        this.content = '';                
                    }
                );
            }
        }
    },
}
</script>

<template>

    <ChatOutput joinInfo="Project Generator" :messages="messages">
        <template #emptyState>
            <div class="empty-state">
                <p>Tell ChatGPT about your project to get started.</p>
                <ChatMessage :message="example" class="example-message" />
            </div>
        </template>
    </ChatOutput>

    <StickyElement top="auto" padding="1rem 1rem 0 1rem" class="output">
        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="content" placeholder="Enter message ..." @keydown="sendMessage" />
                <Button class="complete-button" bg="hsl(160deg 100% 57.13%)" color="#000">
                    <IconCheck />
                </Button>
            </Flex>
        </InputControl>
    </StickyElement>
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

.output {
    background: var(--color-background);
}

.complete-button {
    padding: 0.72rem 0.75rem;
    width: fit-content;
}
</style>