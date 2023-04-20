<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/role';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';
</script>

<script lang="ts">
export default {
    data() {
        return {
            roles: []
        }
    },
    methods: {
        backToMainChat() {
            this.$router.push('/chat/' + this.$ls.get('projectId'));
        },
    },
    mounted() {
        findAllByProjectId(this.$ls.get('projectId'), (json) => {
            this.roles.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <div class="role-list">
        <template v-for="role in roles">
            <div>
                <h3>{{ role.name }}</h3>
                <p>{{ role.description }}</p>
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