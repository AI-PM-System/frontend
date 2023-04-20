<script setup lang="ts">
import TaskItem from '@/components/task/TaskItem.vue';
import EmptyState from '../utilities/EmptyState.vue';
import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue';
import Flex from '../utilities/Flex.vue';
</script>

<script lang="ts">
export default {
    props: {
        boardList: {
            type: Object,
            default: {}
        }
    },
    methods: {
        editBoardList(): void {
            this.$router.push({
                name: 'edit board list',
                params: {
                    id: this.boardList.boardId,
                    listId: this.boardList.id
                }
            });
        },
        addTask(): void {
            this.$router.push({
                name: 'create task',
                params: {
                    id: this.boardList.boardId,
                    listId: this.boardList.id
                }
            });
        }
    }
}
</script>

<template>
    <div class="board-list">
        <Flex gap="10px" align-items="center" justifyContent="space-between">
            <h3>{{ boardList.name }}</h3>
        </Flex>
        <div class="board-list__actions">
            <Button bg="var(--color-primary)" display="block" @click="editBoardList" margin="0 0 .5rem 0">Edit</Button>
            <Button bg="var(--color-primary)" display="block" @click="addTask">Add task</Button>
        </div>
        <div>
            <template v-for="task in boardList.tasks">
                <TaskItem :task="task" :boardId="this.boardList.boardId" />
            </template>

            <EmptyState v-if="boardList.tasks.length === 0">
                <p>The list is empty</p>
            </EmptyState>
        </div>
    </div>
</template>

<style scoped>
.board-list {
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: 1px solid var(--color-border);
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
}

.board-list .board-list__actions {
    margin-top: .5rem;
    margin-bottom: .5rem;
    padding-bottom: .5rem;
    border-bottom: 1px solid var(--color-border);
}
</style>