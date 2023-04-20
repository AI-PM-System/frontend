<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findById } from '@/composables/chat';
import { findAllByChatId, create } from '@/composables/message';

import ChatOutput from '@/components/chat/ChatOutput.vue';

import Flex from '@/components/utilities/Flex.vue'
import StickyElement from '@/components/utilities/StickyElement.vue';
import InputControl from '@/components/utilities/InputControl.vue'
import Button from '@/components/utilities/Button.vue';

import ProjectInfo from '@/components/project/ProjectInfo.vue';

import IconBar from '@/components/icons/IconBar.vue';

import ITask from '@/components/task/ITask.ts';
import IAlert from '@/components/alert/IAlert.ts';
</script>

<script lang="ts">
export default {
    data() {
        return {
            content: '',
            chat: {} as any,
            messages: [] as any[],
            alerts: [] as IAlert[],
            projectId: 0 as Number,
            visible: false as Boolean
        }
    },
    computed: {
        joinInfo() {
            return this.chat ? this.chat.name : '';
        },
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
            create({
                content: this.content,
                chatId: this.chat.id,
                memberId: this.$ls.get('memberId'),
                username: this.$ls.get('username')
            }, (json: any) => {
                this.messages.push(json);
                this.content = '';
            }, (err: any) => {
                console.log(err);
            });

        },
        toggleProjectInfo() {
            this.visible = !this.visible;
        }
    },
    mounted() {
        findById(this.$route.params.id, (json) => {
            this.chat = json;
            this.projectId = json.projectId;
            this.$ls.set('projectId', json.projectId);
        }, (err) => {
            console.log(err);
        });
        
        findAllByChatId(this.$route.params.id, (json) => {
            this.messages = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <ProjectInfo 
        :projectId="projectId" 
        :alerts="alerts" 
        :visible="visible" 
        :toggleVisiblity="toggleProjectInfo" 
    />
    
    <ChatOutput 
        :joinInfo="joinInfo" 
        :messages="messages">
        <template #emptyState>
            Seems like you're the first one here. 
            Say hi to start the conversation!
        </template>
    </ChatOutput>
    
    <StickyElement 
        top="auto" 
        padding="1rem 1rem 0 1rem" 
        bg="var(--color-background)">

        <InputControl>
            <Flex 
                alignItems="center" 
                gap="10px">

                <input 
                    v-model="content" 
                    placeholder="Enter message ..." 
                    @keydown="sendMessage" 
                />

                <Button 
                    class="icon" 
                    @click="toggleProjectInfo">
                    <IconBar />
                </Button>
            </Flex>
        </InputControl>
    </StickyElement>
</template>

