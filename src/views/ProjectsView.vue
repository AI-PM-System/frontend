<script setup lang="ts">
import { useFetchAuth } from '@/composables/fetch'
import ProjectItem from '@/components/project/ProjectItem.vue';
import Button from '@/components/Button.vue';
import StickyElement from '@/components/StickyElement.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            projects: []
        }
    },
    mounted() {
        useFetchAuth("http://localhost:8080/api/v1/user/projects", 
            this.$ls.get('jwt'),
            { 
                method: 'GET' 
            }, (json : any) => {
                this.projects = json;
            }
        );
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

    <StickyElement top="auto" padding="1rem">
        <Button bg="var(--color-primary)" display="block" @click="this.$router.push('/generate/project')">Create
            Project</Button>
    </StickyElement>
</template>

<style scoped>
.empty-state {
    text-align: center;
}
</style>