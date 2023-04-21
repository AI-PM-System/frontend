<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { create } from '@/composables/role';

import RoleForm from '@/components/role/RoleForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            projectId: getProjectId()
        }
    },
    mounted() {
        routeLoginIfNotAuthenticated();
    },
    methods: {
        showRoles() {
            this.$router.push('/roles');
        },
        createRole(role) {
            create(role, (json) => {
                this.showRoles();
            }, (err) => {
                console.log(err);
            });
        }
    }
};

</script>

<template>
    <RoleForm 
        :action="createRole" 
        :projectId="projectId"
        submitText="Create" 
    />

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="showRoles">Cancel</Button>
    </StickyElement>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  