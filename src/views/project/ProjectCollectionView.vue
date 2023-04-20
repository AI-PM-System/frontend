<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findAll } from '@/composables/project';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import ProjectItem from '@/components/project/ProjectItem.vue';
import Button from '@/components/utilities/Button.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            projects: []
        }
    },
    mounted() {
        findAll((json) => {
            this.projects.push(... json);
        }, (error) => {
            console.log(error);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showGenerateProject() {
            this.$router.push('/generate/project');
        }
    }
}
</script>


<template>
    <Container>
        <template v-for="project in projects">
            <ProjectItem :project="project" class="project-item" />
        </template>

        <EmptyState v-if="projects.length === 0">
            <h2>You have no projects.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button 
            bg="var(--color-primary)" 
            display="block" 
            @click="showGenerateProject">Create Project</Button>
    </StickyElement>
</template>

<style scoped>
.empty-state {
    text-align: center;
}

.project-item {
    margin-bottom: 1rem;
}
</style>