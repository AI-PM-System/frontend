<script setup lang="ts">
import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue';
import Flex from '../utilities/Flex.vue';
</script>

<script lang="ts">
export default {
    props: {
        member: {
            type: Object,
            default: {}
        }
    },
    computed: {
        name() {
            return this.member.user? 
                this.member.user.firstName + ' ' + this.member.user.lastName :
                'ChatGPT';
        },
        roles() {
            if (!this.member.roles || this.member.roles.length === 0) {
                return 'None';
            }
            return this.member.roles.map((role) => role.name).join(', ');
        },
    },
    methods: {
        editMember() {
            this.$router.push(`/member/${this.member.id}/edit`);
        },
    }
}
</script>

<template>
    <div class="member">
        <Flex gap="10px" align-items="center" justifyContent="space-between">
            <h3>#{{ member.id }} {{ name }}</h3>
            <div>
                <Flex gap="10px" align-items="center" justifyContent="flex-end">
                    <Badge>Admin: {{ member.admin }}</Badge>
                    <Badge>AI: {{ member.ai }}</Badge>
                    <Badge>{{ roles }}</Badge>
                </Flex>
            </div>
        </Flex>
        <div class="member__actions">
        <Button bg="var(--color-primary)"
                display="block"
                @click="editMember">Edit</Button>
        </div>
    </div>
</template>

<style scoped>
.member {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}

.member .member__actions {
    margin-top: .5rem;
}
</style>