<script setup lang="ts">
import Task from '@/components/task/Task.vue';
</script>

<script lang="ts">
export default {
    props: {
        task: {
            type: Object,
            default: {
                id: 1,
                title: 'Finish Index',
                timeLeft: "2 hours"
            }
        }
    }
}
</script>

<template>
    <div class="task-inspecter relative">
        <h2>#1 Finish Index</h2>
        <small>Time left: 2 hours</small>

        <StickyElement top="auto" left="auto" right="0" width="250px" padding="1rem 1rem 1rem 1rem" class="output">
            <Button display="block">Close</Button>
        </StickyElement>
    </div>
</template>