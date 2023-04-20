<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/member';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            members: []
        }
    },
    methods: {
        backToMainChat() {
            this.$router.push('/chat/' + this.$ls.get('projectId'));
        },
    },
    mounted() {
        findAllByProjectId(this.$ls.get('projectId'), (json) => {
            this.members.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <div class="role-list">
        <template v-for="member in members">
            <div>
                <p>{{ member }}</p>
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