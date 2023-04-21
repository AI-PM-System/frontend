<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { findById, update } from '@/composables/event';

import EventForm from '@/components/event/EventForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            event: {},
            projectId: getProjectId(),
            eventId: parseInt(this.$route.params.id as string)
        }
    },
    mounted() {
        findById(this.eventId, (json) => {
            this.event = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showEvents() {
            this.$router.push('/events');
        },
        updateEvent(event) {
            update(event.id, event, (json) => {
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
        :event="event" 
        :action="updateEvent" 
        :projectId="projectId"
        submitText="Update"
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
  