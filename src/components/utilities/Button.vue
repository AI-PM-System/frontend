<script lang="ts">
    export default {
        props: {
            bg: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            },
            display: {
                type: String,
                default: 'inline-block'
            },
            margin: {
                type: String,
                default: '0'
            },
        }
    }
</script>

<template>
    <button 
        class="button" 
        :attr-display="display" 
        :style=" { backgroundColor: bg, color, margin }">
        <slot></slot>
    </button>
</template>

<style scoped>

button {
    cursor: pointer;
}

button[attr-display="inline-block"] {
    display: inline-block;
}

button[attr-display="block"] {
    display: block;
    width: 100%;
}
</style>