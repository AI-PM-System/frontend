<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/event';
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
            this.$router.push('/chat/' + this.$ls.get('projectId'));
        },
    },
    mounted() {
        findAllByProjectId(this.$ls.get('projectId'), (json) => {
            this.events.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <div class="event-list">
        <template v-for="event in events">
            <div>
                <h3>{{ event.name }}</h3>
                <p>{{ event.agenda }}</p>
                <p>{{ event.location }}</p>
                <p>{{ event.startDateTime }}</p>
                <p>{{ event.endDateTime }}</p>
                <br><hr /><br>
            </div>
        </template>
    </div>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="backToMainChat">Close</Button>
    </StickyElement>
</template>