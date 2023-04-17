<script setup lang="ts">
import { useFetch } from '@/composables/fetch'

import Button from '@/components/Button.vue';
import Flex from '@/components/Flex.vue';
import StickyElement from '@/components/StickyElement.vue';
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
    }
};

</script>

<template>
    <div class="project-manage">

        <Button display="block" bg="#333">Edit details</Button>
        <Button display="block" bg="red">Delete project</Button>
    </div>

    <StickyElement top="auto" padding="1rem">
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