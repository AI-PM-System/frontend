<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { getAnyIncomplete, cancel, proceed, create } from '@/composables/project_generator';

import ChatOutput from '@/components/chat/ChatOutput.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue'

import Flex from '@/components/utilities/Flex.vue'
import StickyElement from '@/components/utilities/StickyElement.vue';
import InputControl from '@/components/utilities/InputControl.vue'
import Button from '@/components/utilities/Button.vue';

import IconCheck from '@/components/icons/IconCheck.vue'
import IconTrash from '@/components/icons/IconTrash.vue';
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
                        We want to use Github for version control."
            }
        }
    },
    methods: {
        saveLocalMessage(content: string) {
            const __message = {
                content: this.content,
                user: {
                    username: this.$ls.get('username'),
                }
            } as any;

            this.messages.push(__message);
        },
        sendMessage(e: any) {
            if (e.code != 'Enter' && e.code != 'NumpadEnter') {
                return;
            }

            const content = this.content;
            const generatorId = this.generatorId;

            this.saveLocalMessage(content);

            if (this.generatorId == 0) {
                create({ content }, (json: any) => {
                    this.generatorId = json.id;
                    this.messages.push(...json.messages);
                    this.content = '';
                }, (err: any) => {
                    console.log(err);
                });
            } else {
                proceed({ content, generatorId }, (json: any) => {
                    this.messages.push(...json.messages);
                    this.content = '';
                    if (json.completed) {
                        this.$router.push('/chat/' + json.mainChatId);
                    }
                }, (err: any) => {
                    console.log(err);
                });
            }
        },
        tryComplete() {
            if (this.generatorId == 0) {
                this.sendMessage({ code: 'Enter'});
                return;
            }

            proceed({ content: '#complete', generatorId: this.generatorId }, (json: any) => {
                this.messages.push(...json.messages);
                this.content = '';
                if (json.completed) {
                    this.$router.push('/chat/' + json.mainChatId);
                }
            }, (err: any) => {
                console.log(err);
            });
        },
        tryCancel() {
            cancel(this.generatorId, (json: any) => {
                this.$router.push('/projects');
            }, (err: any) => {
                console.log(err);
            });
        }
    },
    mounted() {
        getAnyIncomplete((json: any) => {
            this.generatorId = json.id;
            this.messages.push(...json.messages);
        }, (err: any) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
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

    <StickyElement top="auto" padding="1rem 1rem 0 1rem" bg="var(--color-background)">

        <InputControl>
            <Flex alignItems="center" gap="10px">

                <input v-model="content" placeholder="Enter message ..." @keydown="sendMessage" />

                <Button class="complete-button" bg="var(--color-success)" color="#000" @click="tryComplete">
                    <IconCheck />
                </Button>

                <Button class="complete-button" bg="var(--color-danger)" color="#000" @click="tryCancel">
                    <IconTrash />
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