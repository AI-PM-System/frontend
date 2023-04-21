<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { findById, update } from '@/composables/member';

import MemberForm from '@/components/member/MemberForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            member: {},
            projectId: getProjectId()
        }
    },
    mounted() {
        findById(this.$route.params.id, (json) => {
            this.member = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showMembers() {
            this.$router.push('/members');
        },
        updateMember(member) {
            update(member.id, member, (json) => {
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
        :member="member"
        :action="updateMember" 
        :projectId="projectId"
        submitText="Update" 
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
  