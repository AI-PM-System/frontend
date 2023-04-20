<script lang="ts">

    export default {
        props: {
            type: {
                type: String,
                default: 'primary'
            }
        }
    }
</script>

<template>
    <div class="badge" :class="type">
        <slot></slot>
    </div>
</template>

<style scoped>
.badge {
    display: inline-block;
    padding: 0.2rem 0.4rem;
    border-radius: 0.2rem;
    background-color: var(--color-primary);
    color: var(--color-text);
    font-size: 0.6rem;
    font-weight: 500;
}

.badge.primary {
    background-color: #333;
}
</style>