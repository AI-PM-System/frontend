<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { create } from '@/composables/task';

import TaskForm from '@/components/task/TaskForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            boardId: parseInt(this.$route.params.id),
            listId: parseInt(this.$route.params.listId),
        }
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoard() {
            this.$router.push(`/board/${this.boardId}`);
        },
        createTask(task) {
            create(task, (json) => {
                this.showBoard();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <TaskForm 
        :action="createTask" 
        :boardId="boardId"
        :listId="listId"
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
  