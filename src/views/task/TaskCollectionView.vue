<script setup lang="ts">
import Task from '@/components/task/Task.vue';
import ITask from '@/components/task/ITask.ts'
</script>

<script lang="ts">
export default {
    props: {
        tasks: {
            type: Array<ITask>,
            default: [{
                    id: 1,
                    title: 'Finish Index',
                    timeLeft: "2 hours"
                } as unknown,{
                    id: 1,
                    title: 'Finish Index',
                    timeLeft: "2 hours"
                } as unknown]
        }
    }
}
</script>

<template>
    <template v-for="task in tasks">
        <Task :id="task.id" :title="task.title" :timeLeft="task.timeLeft" />
    </template>
</template>