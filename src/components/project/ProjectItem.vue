<script setup lang="ts">
    import { useFetchAuth } from '@/composables/fetch'

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
            }
        },
        computed: {
            fetchMemberUrl() {
                return `http://localhost:8080/api/v1/user/members/project/${this.project.id}/user/${this.$ls.get('username')}`;
            },
            openUrl() {
                return `/chat/${this.project.mainChat.id}`;
            },
            manageUrl() {
                return `/projects/${this.project.id}/manage`;
            }
        },
        methods: {
            openProject() {
                useFetchAuth(this.fetchMemberUrl, 
                    this.$ls.get('jwt'),
                    { 
                        method: 'GET' 
                    }, (json : any) => {
                        this.$ls.set('memberId', json.id);
                        this.$ls.set('memberRoles', json.roles);
                    }
                );
                this.$router.push(this.openUrl);
            },
            manageProject() {
                this.$router.push(this.manageUrl);
            }
        }
    }
</script>


<template>
    <div class="project-item">
        <div class="project-item__header">
            <Flex gap="10px" align-items="center" justifyContent="space-between">
                <h3>#{{ project.id }} {{ project.name }}</h3>
                <div>
                    <Flex gap="10px" align-items="center" justifyContent="flex-end">
                        <Badge>Members: {{ project.members.length }}</Badge>
                        <Badge>Roles: {{ project.roles.length }}</Badge>
                        <Badge>Events: {{ project.events.length }}</Badge>
                    </Flex>
                </div>
            </Flex>

            <div class="project-item__description">
                {{ project.description }}
            </div>

            <div class="project-item__actions">
                <Button bg="var(--color-primary)"
                        display="block"
                        @click="manageProject">Manage</Button>
                <Button bg="var(--color-primary)" 
                        display="block"
                        @click="openProject">Open</Button>
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

.project-item__actions button {
    margin: 0.5rem 0;
}

</style>