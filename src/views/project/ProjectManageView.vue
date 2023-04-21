<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';

import Button from '@/components/utilities/Button.vue';
import Container from '@/components/utilities/Container.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
</script>

<script lang="ts">
export default {

    computed: {
        joinInfo() {
            return `Joined chat (${this.$route.params.id})`;
        }
    },
    methods: {
        openProjects() {
            this.$router.push('/projects');
        },
        editProject() {
            this.$router.push(`/projects/${this.$route.params.id}/edit`);
        },
        showEvents() {
            this.$router.push(`/events`);
        },
        showMembers() {
            this.$router.push(`/members`);
        },
        showRoles() {
            this.$router.push(`/roles`);
        },
        showBoards() {
            this.$router.push(`/boards`);
        },
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <Container>
        <Button display="block" bg="var(--color-background)" @click="editProject">Edit details</Button>
        <Button display="block" bg="var(--color-background)" @click="showRoles">Roles</Button>
        <Button display="block" bg="var(--color-background)" @click="showEvents">Events</Button>
        <Button display="block" bg="var(--color-background)" @click="showMembers">Members</Button>
        <Button display="block" bg="var(--color-background)" @click="showBoards">Boards</Button>
        <Button display="block" bg="var(--color-danger)" color="var(--color-background)">Delete project</Button>
    </Container>

    <StickyElement top="auto" padding="1rem" bg="var(--color-background)">
        <Button display="block" bg="var(--color-background)" @click="openProjects">Close</Button>
    </StickyElement>
</template>

<style scoped>
button {
    margin: 0 0 .5rem 0 !important;
}
</style>