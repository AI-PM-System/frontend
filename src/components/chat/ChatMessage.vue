<script setup lang="ts">
    import Badge from '@/components/Badge.vue'
    import Flex from '@/components/Flex.vue'
</script>

<script lang="ts">
    export default {
        props: {
            message: {
                type: Object,
                default: {}
            }
        },
        computed: {
            me() : boolean {
                return this.message.member?.id === this.$ls.get('memberId');
            },
            justifyContentStyle() : string {
                return this.me ? 'flex-end' : 'flex-start';
            },
            sender() : string {
                return this.me ? 'me' : 'other';
            },
            name() : string {
                return this.message.member?.ai ? 'ChatGPT' : this.message.member?.user?.firstName + ' ' + this.message.member?.user?.lastName;
            },
            roles() : any[] {
                return this.message.member?.roles;
            }
        }
    }
</script>

<template>
    <div class="chat-message-wrapper" :attr-sender="sender">
        <div class="chat-handle">
            <Flex gap="10px" align-items="center" :justifyContent="justifyContentStyle">
                <Badge>{{ name }}</Badge>
                <template v-for="role in roles">
                    <Badge>{{ role.name }}</Badge>
                </template>
            </Flex>
        </div>
        <div class="chat-message">
            <span class="message-output">
                {{ message.content }}
            </span>            
        </div>
        <time>
            {{ message.sent }}
        </time>
    </div>
</template>

<style scoped>

.chat-message-wrapper {
    max-width: 50%;
    margin: 1rem;
}
.chat-message {
    border-radius: 1rem;
    background-color: #f1f0f0;
    padding: 1rem;
}

.chat-message .message-output {
    color: #000;
    word-wrap: break-word;
}

.chat-handle {
    font-size: 0.8rem;
    color: #999;
    margin-bottom: 0.5rem;
}

.chat-message-wrapper time {
    font-size: 0.6rem;
    color: #999;
    margin-top: 0.5rem;
    display: block;
}

.chat-message-wrapper[attr-sender="me"] {
    margin-left: auto;
}

.chat-message-wrapper[attr-sender="me"] .chat-message {
    background-color: #dcf8c6;
}

.chat-message-wrapper[attr-sender="me"] .chat-handle {
    text-align: right;
    margin-right: .5rem;
}

.chat-message-wrapper[attr-sender="me"] time {
    text-align: right;
    margin-right: .5rem;
}

.chat-message-wrapper[attr-sender="other"] {
    margin-right: auto;
}

.chat-message-wrapper[attr-sender="other"] .chat-handle {
    margin-left: .5rem;
}

.chat-message-wrapper[attr-sender="other"] time {
    margin-left: .5rem;
}
</style>