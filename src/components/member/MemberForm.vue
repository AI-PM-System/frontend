<script setup lang="ts">
import { findAllByProjectId } from '@/composables/role';
import { getProjectId } from '@/composables/authentication';

// Components
import Container from '@/components/utilities/Container.vue';
import InputControl from '@/components/utilities/InputControl.vue';
import Button from '@/components/utilities/Button.vue';
import Flex from '@/components/utilities/Flex.vue';

// Icons
import IconUser from '@/components/icons/IconUser.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            id: 0,
            roleIds: [],
            username: '',
            admin: false,

            roles: []
        };
    },
    props: {
        projectId: {
            type: Number,
            requried: true
        },
        member: {
            type: Object,
            default: null
        },
        action: {
            type: Function,
            default: () => {
                return () => { };
            }
        },
        submitText: {
            type: String,
            default: 'Create'
        }
    },
    watch: {
        member: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.id = newVal.id;
                    if (newVal.roles)
                        this.roleIds = newVal.roles.map((role: any) => role.id);
                    if (newVal.user)
                        this.username = newVal.user.username;
                    this.admin = newVal.admin;
                }
            },
            deep: true
        }
    },
    methods: {
        handleCreate(): any {
            this.action({
                id: this.id,
                projectId: this.projectId,
                roleIds: this.roleIds,
                username: this.username,
                admin: this.admin
            });
        },
        isRoleSelected(roleId: number): boolean {
            if (!this.roleIds)
                return false;
            return this.roleIds.includes(roleId);
        },
        isAdmin(): boolean {
            return this.admin;
        }
    },
    mounted() {
        findAllByProjectId(getProjectId(), (json) => {
            this.roles = json;
        }, (error) => {
            console.log(error);
        });
    }
};

</script>

<template>
    <Container>
        <header>
            <h2>{{ submitText }} member</h2>
            <p>Enter member information below.</p>
        </header>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="username" placeholder="Enter username that should be assigned to member" type="text" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <select v-model="roleIds" multiple>
                    <option v-for="role in roles" :value="role.id" :selected="isRoleSelected(role.id)">{{ role.name }}</option>
                </select>
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <label>Is Admin?</label>
                <input v-model="admin" type="checkbox" :checked="isAdmin" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Button 
                display="block" 
                @click="handleCreate">{{ submitText }}</Button>
        </InputControl>
    </Container>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  