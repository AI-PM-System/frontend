<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getMainChatId, getProjectId } from '@/composables/authentication';
import { findAllByProjectId } from '@/composables/member';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import MemberItem from '@/components/member/MemberItem.vue';
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
            this.$router.push('/chat/' + getMainChatId());
        },
        newMember() {
            this.$router.push('/member/new');
        }
    },
    mounted() {
        findAllByProjectId(getProjectId(), (json) => {
            this.members.push(... json);
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    }
};

</script>

<template>
    <Container>
        <template v-for="member in members">
            <MemberItem :member="member" />
        </template>

        <EmptyState v-if="members.length === 0">
            <h2>No members found.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="newMember" margin="0 0 .5rem 0">New member</Button>
        <Button display="block" @click="backToMainChat">Close</Button>
    </StickyElement>
</template>
