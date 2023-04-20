<script setup lang="ts">
import Button from '@/components/utilities/Button.vue';
</script>

<script lang="ts">
    export default {
        props: {
            id: {

            },
            title: {
                type: String,
                default: ''
            },
            timeLeft: {
                type: String,
                default: ''
            },
        },
        computed: {
            alertClass() : string {
                return `alert alert-${this.type}`;
            }
        },
        methods: {
            inspect() {
                this.$router.push(`/task/${this.id}`);
            }
        }
    }
</script>

<template>
    <div class="task">
        <h2>{{ title }}</h2>
        <small>Time left: {{ timeLeft }}</small>
        <Button display="block" @click="inspect">Inspect</Button>
    </div>
</template>

<style scoped>
.task {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
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