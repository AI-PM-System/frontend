<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getMainChatId, getProjectId } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/board';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import BoardItem from '@/components/board/BoardItem.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            boards: []
        }
    },
    methods: {
        backToMainChat() {
            this.$router.push('/chat/' + getMainChatId());
        },
        newBoard() {
            this.$router.push('/board/new');
        }
    },
    mounted() {
        findAllByProjectId(getProjectId(), (json) => {
            this.boards.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <Container>
        <template v-for="board in boards">
            <BoardItem :board="board" />
        </template>

        <EmptyState v-if="boards.length === 0">
            <h2>No boards found.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="newBoard" margin="0 0 .5rem 0">New board</Button>
        <Button display="block" @click="backToMainChat">Close</Button>
    </StickyElement>
</template>

