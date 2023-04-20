<script setup lang="ts">
import Flex from '../utilities/Flex.vue';
import Badge from '../utilities/Badge.vue';
import Button from '../utilities/Button.vue';
</script>

<script lang="ts">
export default {
    props: {
        task: {
            type: Object,
            default: {}
        },
        boardId: {
            type: Number,
            default: 0
        },
    },
    methods: {
        editTask() {
            this.$router.push({
                name: 'edit task',
                params: {
                    id: this.boardId,
                    listId: this.task.boardListId,
                    taskId: this.task.id
                }
            });
        }
    },
    computed: {
        assignedTo() {
            return this.task.member && this.task.member.user ?
                this.task.member.user.firstName + " " + this.task.member.user.lastName : 'none';
        }
    }
}
</script>

<template>
    <div class="task">
        <Flex gap="10px" align-items="center">
            <Badge>Assigned to {{ assignedTo }}</Badge>
            <Badge>Due date {{ task.dueDate }}</Badge>
        </Flex>
        <h2>{{ task.name }}</h2>
        <p>{{ task.description }}</p>
        <div class="task__actions">
            <Button bg="var(--color-primary)" display="block" @click="editTask" margin="0 0 .5rem 0">Edit</Button>
        </div>
    </div>
</template>

<style scoped>
.task {
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid var(--color-border);
}

.task small {
    color: var(--color-text-secondary);
    margin-bottom: .5rem;
    display: block;
}

.task h2 {
    margin-top: 0;
    margin-bottom: 0;
}
</style>