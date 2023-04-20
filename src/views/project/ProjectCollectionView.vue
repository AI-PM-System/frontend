<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findAll } from '@/composables/project';

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
    },
    computed: {
        emptyState() {
            return this.projects.length === 0;
        }
    }
}
</script>


<template>
    <div class="project-list">
        <template v-for="project in projects">
            <ProjectItem :project="project" />
        </template>

        <div class="empty-state" v-if="emptyState">
            <h2>You have no projects.</h2>
        </div>
    </div>

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
.project-list {
    margin-bottom: 5rem;
}

.project-list .empty-state {
    text-align: center;
}
</style>