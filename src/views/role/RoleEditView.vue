<script setup lang="ts">
import { routeLoginIfNotAuthenticated, getProjectId } from '@/composables/authentication';
import { findById, update } from '@/composables/role';

import RoleForm from '@/components/role/RoleForm.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            role: {},
            projectId: getProjectId(),
            roleId: parseInt(this.$route.params.id as string)
        }
    },
    mounted() {
        findById(this.roleId, (json) => {
            this.role = json;
        }, (err) => {
            console.log(err);
        });

        routeLoginIfNotAuthenticated();
    },
    methods: {
        showRoles() {
            this.$router.push('/roles');
        },
        updateRole(role) {
            update(role.id, role, (json) => {
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
        :role="role"
        :action="updateRole" 
        :projectId="projectId"
        submitText="Update" 
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
  