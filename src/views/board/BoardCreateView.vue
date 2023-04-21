<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { create } from '@/composables/board';

import BoardForm from '@/components/board/BoardForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            projectId: getProjectId()
        }
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoards() {
            this.$router.push('/boards');
        },
        createBoard(board) {
            create(board, (json) => {
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
        :action="createBoard" 
        :projectId="projectId"
        submitText="Create" 
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
  