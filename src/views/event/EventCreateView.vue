<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { create } from '@/composables/event';

import EventForm from '@/components/event/EventForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            projectId: getProjectId()
        }
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showEvents() {
            this.$router.push('/events');
        },
        createEvent(event) {
            create(event, (json) => {
                this.showEvents();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <EventForm 
        :action="createEvent" 
        :projectId="projectId"
        submitText="Create" 
    />

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="showEvents">Cancel</Button>
    </StickyElement>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  