<script setup lang="ts">
import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue';
import Flex from '../utilities/Flex.vue';
</script>

<script lang="ts">
export default {
    props: {
        event: {
            type: Object,
            default: {}
        }
    },
    methods: {
        editEvent() {
            this.$router.push(`/event/${this.event.id}/edit`);
        },
    },
    computed: {
        starts: function() {
            return this.event.startDateTime ? this.event.startDateTime : 'N/A';
        },
        ends: function() {
            return this.event.endDateTime ? this.event.endDateTime : 'N/A';
        },
    }
}
</script>
<template>
    <div class="event">
        <Flex gap="10px" align-items="center" justifyContent="space-between">
            <h3>#{{ event.id }} {{ event.name }}</h3>
            <div>
                <Flex gap="10px" align-items="center" justifyContent="flex-end">
                    <Badge>Starts: {{ starts }}</Badge>
                    <Badge>Ends: {{ ends }}</Badge>
                    <Badge>Location: {{ event.location }}</Badge>
                </Flex>
            </div>
        </Flex>
        <div>
            {{ event.agenda }}
        </div>
        <div class="event__actions">
            <Button bg="var(--color-primary)"
                display="block"
                @click="editEvent">Edit</Button>
        </div>
    </div>
</template>

<style scoped>
.event {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}

.event .event__actions {
    margin-top: .5rem;
}
</style>

