<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { findById, update } from '@/composables/board';

import BoardForm from '@/components/board/BoardForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            board: {},
            projectId: getProjectId(),
            boardId: parseInt(this.$route.params.id as string)
        }
    },
    mounted() {
        findById(this.boardId, (json) => {
            this.board = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoards() {
            this.$router.push('/boards');
        },
        updateBoard(board) {
            update(board.id, board, (json) => {
                this.showBoards();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <BoardForm 
        :board="board"
        :action="updateBoard" 
        :projectId="projectId"
        submitText="Update" 
    />

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="showBoards">Cancel</Button>
    </StickyElement>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  