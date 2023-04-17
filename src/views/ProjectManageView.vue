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
    }
};

</script>

<template>
    <div class="project-manage">

        <div class="project-grid">
            <Button display="block" bg="#333">Edit details</Button>
            <Button display="block" bg="#333">Members</Button>
            <Button display="block" bg="#333">Roles</Button>
            <Button display="block" bg="#333">Events</Button>        
        </div>
        
        <Button display="block" bg="red">Delete project</Button>
    </div>

    <StickyElement top="auto" padding="1rem">
        <Button display="block" bg="#333">Close</Button>
    </StickyElement>
</template>

<style scoped>
.project-manage {    
    margin: 1rem;
}

.project-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 1rem;
    margin-bottom: 1rem;
}
</style>