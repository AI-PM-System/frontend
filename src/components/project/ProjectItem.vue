<script setup lang="ts">
    import Badge from '@/components/Badge.vue'
    import Button from '@/components/Button.vue'
    import Flex from '@/components/Flex.vue'
</script>

<script lang="ts">
    export default {
        props: {
            project: {
                type: Object,
                default: {}
            },
            title: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            humanCount: {
                type: String,
                default: '0'
            },
            aiCount: {
                type: String,
                default: '0'
            }
        }
    }
</script>


<template>
    <div class="project-item">
        <div class="project-item__header">
            <Flex gap="10px" align-items="center" justifyContent="space-between">
                <h3>{{ title }}</h3>
                <div>
                    <Flex gap="10px" align-items="center" justifyContent="flex-end">
                        <Badge>Human: {{ humanCount }}</Badge>
                        <Badge>AI: {{ aiCount }}</Badge>
                        <Badge>{{ status }}</Badge>
                    </Flex>
                </div>
            </Flex>

            <div class="project-item__description">
                {{ description }}
            </div>

            <div class="project-item__actions">
                <Button bg="var(--color-primary)" display="block">Open</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.project-item {
    border: 1px solid var(--color-text);
    border-radius: 5px;
    padding: 1rem;
    margin: 1rem;
}

.project-item__description {
    margin: 1rem 0;
}

</style>