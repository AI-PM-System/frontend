<script setup lang="ts">
import { getUsername, setProjectId, getMemberId } from '@/composables/authentication';
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

</script>

<script lang="ts">
export default {
    data() {
        return {
            content: '',
            chat: {} as any,
            messages: [] as any[],
            alerts: [] as any[],
            projectId: 0 as any,
            visible: false as any
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
                    username: getUsername(),
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
                memberId: getMemberId(),
                username: getUsername()
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
            setProjectId(json.projectId);
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
            <p class="empty-state-desc">Seems like you're the first one here. 
            Say hi to start the conversation!</p>
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

<style scoped>
.empty-state-desc {
    color: var(--color-text-secondary);
    font-size: 0.8rem;
    text-align: center;
}
</style>