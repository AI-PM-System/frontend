<script setup lang="ts">
import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue';
import Flex from '../utilities/Flex.vue';
</script>

<script lang="ts">
export default {
    props: {
        role: {
            type: Object,
            default: {}
        }
    },
    computed: {
        memberCount() : number {
            return this.role.members? this.role.members.length : 0;
        }
    },
    methods: {
        editRole() {
            this.$router.push(`/role/${this.role.id}/edit`);
        },
    }
}
</script>

<template>
    <div class="role">
        <Flex gap="10px" align-items="center" justifyContent="space-between">
            <h3>#{{ role.id }} {{ role.name }}</h3>
            <Flex gap="10px" align-items="center" justifyContent="flex-end">
                <Badge>Members: {{ memberCount }}</Badge>
            </Flex>
        </Flex>
        <div>
            {{ role.description }}
        </div>
        <div class="role__actions">
            <Button bg="var(--color-primary)" display="block" @click="editRole">Edit</Button>
        </div>
    </div>
</template>

<style scoped>
.role {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}

.role .role__actions {
    margin-top: .5rem;
}
</style>