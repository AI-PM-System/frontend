<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/role';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import RoleItem from '@/components/role/RoleItem.vue';
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
            this.$router.push('/chat/' + getProjectId());
        },
        newRole() {
            this.$router.push('/role/new');
        }
    },
    mounted() {
        findAllByProjectId(getProjectId(), (json) => {
            this.roles.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <Container>
        <template v-for="role in roles">
            <RoleItem :role="role" />
        </template>

        <EmptyState v-if="roles.length === 0">
            <h2>No roles found.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="newRole" margin="0 0 .5rem 0">New role</Button>
        <Button display="block" @click="backToMainChat">Close</Button>
    </StickyElement>
</template>
