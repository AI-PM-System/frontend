<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getMainChatId, getProjectId } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/event';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import EventItem from '@/components/event/EventItem.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            events: []
        }
    },
    methods: {
        backToMainChat() {
            this.$router.push('/chat/' + getMainChatId());
        },
        newEvent() {
            this.$router.push('/event/new');
        }
    },
    mounted() {
        findAllByProjectId(getProjectId(), (json) => {
            this.events.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <Container>
        <template v-for="event in events">
            <EventItem :event="event" />            
        </template>

        <EmptyState v-if="events.length === 0">
            <h2>No events found.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="newEvent" margin="0 0 .5rem 0">New event</Button>
        <Button display="block" @click="backToMainChat">Close</Button>
    </StickyElement>
</template>
