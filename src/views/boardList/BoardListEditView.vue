<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findById, update } from '@/composables/boardList';

import BoardListForm from '@/components/boardList/BoardListForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            boardList: {},
            boardId: parseInt(this.$route.params.id)
        }
    },
    mounted() {
        findById(this.$route.params.listId, (json) => {
            this.boardList = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoard() {
            this.$router.push(`/board/${this.boardId}`);
        },
        updateBoardList(boardList) {
            update(boardList.id, boardList, (json) => {
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
        :boardList="boardList"
        :action="updateBoardList" 
        :boardId="boardId"
        submitText="Update" 
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
  