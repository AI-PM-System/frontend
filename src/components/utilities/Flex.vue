<script lang="ts">
    export default {
        props: {
            justifyContent: {
                type: String,
                default: 'flex-start'
            },
            alignItems: {
                type: String,
                default: 'flex-start'
            },
            gap: {
                type: String,
                default: '0px'
            },
            width: {
                type: String,
                default: '100%'
            }
        }
    }
</script>

<template>
    <div class="flex" 
        :style="{ justifyContent, alignItems, gap, width }">
        <slot></slot>
    </div>
</template>

<style scoped>
    .flex {
        display: flex;
    }
</style>