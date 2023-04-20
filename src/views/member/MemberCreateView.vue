<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { create } from '@/composables/member';

import MemberForm from '@/components/member/MemberForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showMembers() {
            this.$router.push('/members');
        },
        createMember(member) {
            create(member, (json) => {
                this.showMembers();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <MemberForm 
        :action="createMember" 
        :projectId="this.$ls.get('projectId')"
        submitText="Create" 
    />

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="showMembers">Cancel</Button>
    </StickyElement>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  