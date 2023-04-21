<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { getAnyIncomplete, cancel, complete, proceed, create } from '@/composables/project_generator';
import { findMe } from '@/composables/user';
import { findAll as findAllActors } from '@/composables/project_generator_actor';
import { findAll as findAllTones } from '@/composables/project_generator_tone';

import ChatOutput from '@/components/chat/ChatOutput.vue';
import ChatMessage from '@/components/chat/ChatMessage.vue'

import Flex from '@/components/utilities/Flex.vue'
import StickyElement from '@/components/utilities/StickyElement.vue';
import InputControl from '@/components/utilities/InputControl.vue'
import Button from '@/components/utilities/Button.vue';

import IconGear from '@/components/icons/IconGear.vue'

</script>

<script lang="ts">
export default {
    data() {
        return {
            content: '',
            messages: [] as any[],
            actors: [] as any[],
            tones: [] as any[],
            actorId: 1,
            toneId: 1,
            generatorId: 0,
            credits: 0,
            settingsVisible: false,
            example: {
                user: {
                    firstName: 'Example',
                    lastName: 'Message'
                },
                content: "Hey there! I'm thrilled to share that we're planning to create\
                a website for our business, and we've set a deadline at the end of the month.\
                We're a small team of five, and I'm the project manager leading the way. We have\
                two talented designers and two skilled developers on board, and we're all eager to\
                get started! We've allocated a budget of $10,000 for the project, and we're hoping to\
                create a website that's responsive and includes a blog. To achieve our goals, we've\
                decided to use a popular CMS like Wordpress and Github for version control.\
                With the deadline approaching, we're all working hard to ensure that we deliver\
                a top-notch website on time. We're confident that we can create a website that meets\
                our needs and exceeds our expectations."
            },
            outOfCredit: {
                user: {
                    firstName: 'System',
                    lastName: 'Message'
                },
                content: "Hello there! It seems that you have run out of credit to\
                        continue using ChatGPT's services 😢. Don't worry, it happens\
                        to the best of us! But fear not, you can always come back and\
                        continue our conversation once you've topped up your credit.\
                        We'll be eagerly waiting to assist you with any questions or\
                        curiosities you may have. Until then, take care and we'll see you soon! 👋"
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
                create({ content, actorId: this.actorId, toneId: this.toneId }, (json: any) => {
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

            complete(this.generatorId, (json: any) => {
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
        },
        toggleSettings() {
            this.settingsVisible = !this.settingsVisible;
        }
    },
    mounted() {
        getAnyIncomplete((json: any) => {
            this.generatorId = json.id;
            this.messages.push(...json.messages);
        }, (err: any) => {
            console.log(err);
        });

        findMe((json: any) => {
            this.credits = json.credits;
        }, (err: any) => {
            console.log(err);
        });

        findAllActors((json: any) => {
            this.actors = json;
        }, (err: any) => {
            console.log(err);
        });

        findAllTones((json: any) => {
            this.tones = json;
        }, (err: any) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    computed: {
        createBgColor() {
            return this.generatorId == 0 ? 'var(--color-background)' : 'var(--color-success-hover)';
        },
        resetBgColor() {
            return this.generatorId == 0 ? 'var(--color-background)' : 'var(--color-danger-hover)';
        },
        createBtnDisabled() {
            return this.generatorId == 0;
        },
        resetBtnDisabled() {
            return this.generatorId == 0;
        },
        hasNoCredit() {
            return this.credits <= 0;
        },
        hasNoGenerator() {
            return this.generatorId == 0;
        },
        isSettingsVisible() {
            return this.settingsVisible && this.generatorId == 0;
        }
    }
}
</script>

<template>
    <template v-if="hasNoGenerator">
        <div class="generator-settings" :attr-visible="isSettingsVisible">
            <h2>AI Settings</h2>
            <InputControl>
                <label>Actor:</label>
                <select v-model="actorId">
                    <option v-for="actor in actors" :value="actor.id">{{ actor.name }}</option>
                </select>
            </InputControl>
            <InputControl>
                <label>Tone:</label>
                <select v-model="toneId">
                    <option v-for="tone in tones" :value="tone.id">{{ tone.tone }}</option>
                </select>
            </InputControl>

            <StickyElement top="auto" left="auto" width="250px" padding="1rem 1rem 0 1rem" bg="var(--color-background)">
                <InputControl>
                    <Button bg="var(--color-background)" 
                            display="block"
                            @click="toggleSettings">Close</Button>
                </InputControl>
            </StickyElement>
        </div>
    </template>
    <ChatOutput joinInfo="Project Generator" :messages="messages">
        <template #emptyState v-if="!hasNoCredit">
            <div class="empty-state">
                <p class="empty-state-desc">Tell ChatGPT about your project to get started.</p>
                <ChatMessage :message="example" class="example-message" />
            </div>
        </template>

        <template #additionalMessages v-if="hasNoCredit">
            <ChatMessage :message="outOfCredit" class="example-message" />
        </template>
    </ChatOutput>

    <StickyElement top="auto" padding="1rem 1rem 0 1rem" bg="var(--color-background)">

        <InputControl>
            <Flex alignItems="center" gap="10px">

                <input v-model="content" placeholder="Enter message ..." @keydown="sendMessage" />

                <Button 
                    class="complete-button" 
                    :bg="createBgColor" 
                    color="#fff" 
                    :disabled="createBtnDisabled"
                    @click="tryComplete">CREATE</Button>

                <Button 
                    class="complete-button" 
                    :bg="resetBgColor"
                    color="#fff" 
                    :disabled="resetBtnDisabled"
                    @click="tryCancel">RESET</Button>

                <Button 
                    class="complete-button" 
                    bg="var(--color-background)"
                    color="#fff" 
                    v-if="hasNoGenerator"
                    @click="toggleSettings"><IconGear /></Button>

                <div class="credits">
                    <p>Credits: <strong>{{ credits }}</strong></p>
                </div>

            </Flex>
        </InputControl>
    </StickyElement>
</template>

<style scoped>

.credits {
    margin-left: auto;
    margin-right: 0;
    font-size: 0.8rem;
    text-align: center;
}

.credits strong {
    font-weight: 600;
}

.empty-state p {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
}

.empty-state strong {
    font-weight: 600;
}

.empty-state .message-output {
    text-align: left;
}

.output {
    background: var(--color-background);
}

.complete-button {
    padding: 0.72rem 0.75rem;
    width: fit-content;
    height: 50px;
    font-weight: 600;
}

.generator-settings {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 250px;
    background: var(--color-background);
    z-index: 9999;
    padding: 1rem;
    box-shadow: -2px 0 5px var(--color-shadow);
}

.generator-settings,
.generator-settings .sticky-element {
    transition: right 0.3s ease;
}

.generator-settings[attr-visible="false"],
.generator-settings[attr-visible="false"] .sticky-element {
    right: -250px !important;
}

.generator-settings label {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    display: block;
}

.generator-settings select {
    width: 100%;
    height: 50px;
    padding: 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color-text);
    background: var(--color-background);
}

.generator-settings h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    text-align: center;
}
</style>