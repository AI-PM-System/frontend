<script lang="ts">
    export default {
        props: {
            type: {
                type: String,
                default: 'success'
            }
        },
        computed: {
            alertClass() : string {
                return `alert alert-${this.type}`;
            }
        }
    }
</script>

<template>
    <div :class="alertClass">
        <slot></slot>
    </div>
</template>

<style scoped>
.alert {
    margin-bottom: .5rem;
    padding: 1rem;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
}

.alert-success {
    background: var(--color-success-hover);
    color: var(--color-success);
    border-color: var(--color-success);
}
</style>