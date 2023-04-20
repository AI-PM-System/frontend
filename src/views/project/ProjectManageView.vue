<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';

import Button from '@/components/utilities/Button.vue';
import Flex from '@/components/utilities/Flex.vue';
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
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <div class="project-manage">

        <Button display="block" bg="#333" margin="0 0 .5rem 0">Edit details</Button>
        <Button display="block" bg="red">Delete project</Button>
    </div>

    <StickyElement top="auto" padding="1rem" bg="var(--color-background)">
        <Button display="block" bg="#333" @click="openProjects">Close</Button>
    </StickyElement>
</template>

<style scoped>
.project-manage {    
    margin: 1rem;
}

.project-manage button {
    margin: 1rem 0;
}
</style>