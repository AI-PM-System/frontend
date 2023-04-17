<script setup lang="ts">
import { useFetch } from '@/composables/fetch'

import Flex from '@/components/Flex.vue'
import InputControl from '@/components/InputControl.vue'
import Button from '@/components/Button.vue'
import ChatMessage from '@/components/chat/ChatMessage.vue'

import IconGear from '@/components/icons/IconGear.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            message: ''
        };
    },
    props: {
        joinInfo: {
            type: String,
            default: ''
        }
    },
};

const handleLogin = () => {
    const { data, error } = useFetch("http://localhost:8080/api/v1/public/authenticate");
    console.log(data, error);
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
            - {{ joinInfo }} -
        </div>
        <ChatMessage sender="me" handle="Nicolai" role="Developer Team" sent="22/22/2222 15:15">
            Hey!
        </ChatMessage>
        <ChatMessage sender="other" handle="ChatGPT" role="SCRUM Master" sent="22/22/2222 15:15">
            Yo!
        </ChatMessage>    
        <ChatMessage sender="other" handle="ChatGPT" role="SCRUM Master" sent="22/22/2222 15:15">
            <p>Opened a new event: <strong>Sprint review</strong></p>            
            <p>Attendees: <strong>Nicolai, ChatGPT, John Doe</strong></p>
            <Button display="block" bg="#333">Join</Button>
        </ChatMessage>
        <div class="chat-output-info">
            - Joined event (Sprint review) -
        </div>
        <ChatMessage sender="other" handle="ChatGPT" role="SCRUM Master" sent="22/22/2222 15:15">
            Todays agenda are ...
        </ChatMessage>    
    </div>

    <!--
        Chat Input:
        This is where the user can enter a message.
        The message is displayed using the InputControl component.
    -->
    <div class="chat-input">
        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="message" placeholder="Enter message ..." />
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