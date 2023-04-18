<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'
import ChatOutput from '@/components/chat/ChatOutput.vue';

import Flex from '@/components/Flex.vue'
import StickyElement from '@/components/StickyElement.vue';
import InputControl from '@/components/InputControl.vue'

import IconGear from '@/components/icons/IconGear.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            content: '',
            chat: {} as any,
            messages: []
        }
    },
    computed: {
        joinInfo() {
            return this.chat ? this.chat.name : '';
        },
    },
    methods: {
        sendMessage(e : any) {
            if (e.code != 'Enter' && e.code != 'NumpadEnter') {
                return;
            }

            useFetchAuth(`http://localhost:8080/api/v1/user/messages`,
                this.$ls.get('jwt'),
                {
                    method: 'POST',
                    body: JSON.stringify({
                        content: this.content,
                        chatId: this.chat.id,
                        memberId: this.$ls.get('memberId'),
                        username: this.$ls.get('username')
                    })
                }, (json: any) => {
                    this.messages.push(json);
                    this.content = '';
                }
            );
        }
    },
    mounted() {
        useFetchAuth(`http://localhost:8080/api/v1/user/chats/${this.$route.params.id}`,
            this.$ls.get('jwt'),
            {
                method: 'GET'
            }, (json: any) => {
                this.chat = json;
            }
        );
        useFetchAuth(`http://localhost:8080/api/v1/user/messages/chat/${this.$route.params.id}`,
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
    <ChatOutput :joinInfo="joinInfo" :messages="messages">
        <template #emptyState>
            Seems like you're the first one here. Say hi to start the conversation!
        </template>
    </ChatOutput>
    <StickyElement top="auto" padding="1rem 1rem 0 1rem" class="output">
        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="content" placeholder="Enter message ..." @keydown="sendMessage" />
                <div class="icon">
                    <IconGear />
                </div>
            </Flex>
        </InputControl>
    </StickyElement>
</template>

<style scoped>
.output {
    background: var(--color-background);
}
</style>
