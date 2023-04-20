
<script lang="ts">
    export default {
        props: {
            top: {
                type: String,
                default: '0'
            },
            left: {
                type: String,
                default: '0'
            },
            right: {
                type: String,
                default: '0'
            },
            bottom: {
                type: String,
                default: '0'
            },
            padding: {
                type: String,
                default: '0'
            },
            width: {
                type: String,
                default: 'auto'
            },
            bg: {
                type: String,
                default: 'white'
            }
        }
    }
</script>

<template>
    <div class="sticky-element" 
         :style=" { top, left, right, bottom, padding, width: width, backgroundColor: bg }">
        <slot></slot>
    </div>
</template>

<style scoped>

    .sticky-element {
        position: fixed;
    }
</style>