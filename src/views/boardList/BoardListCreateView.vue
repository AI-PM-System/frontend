<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { create } from '@/composables/boardList';

import BoardListForm from '@/components/boardList/BoardListForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            boardId: parseInt(this.$route.params.id),
        }
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoard() {
            this.$router.push(`/board/${this.boardId}`);
        },
        createBoardList(boardList) {
            create(boardList, (json) => {
                this.showBoard();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <BoardListForm 
        :action="createBoardList" 
        :boardId="boardId"
        submitText="Create" 
    />

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="showBoard">Cancel</Button>
    </StickyElement>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  