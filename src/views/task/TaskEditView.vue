<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findById, update } from '@/composables/task';

import TaskForm from '@/components/task/TaskForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            task: {},
            boardId: parseInt(this.$route.params.id),
            listId: parseInt(this.$route.params.listId),
            taskId: parseInt(this.$route.params.taskId)
        }
    },
    mounted() {
        findById(this.taskId, (json) => {
            this.task = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showBoard() {
            this.$router.push(`/board/${this.boardId}`);
        },
        updateTask(task) {
            update(task.id, task, (json) => {
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
        :task="task"
        :action="updateTask" 
        :boardId="boardId"
        :listId="listId"
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
  