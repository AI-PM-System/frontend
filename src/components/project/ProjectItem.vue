<script setup lang="ts">
import { findMyMemberByProjectId } from '@/composables/member';
import { findByTypeAndProjectId } from '@/composables/chat';

import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue'
import Flex from '@/components/utilities/Flex.vue'
    
</script>

<script lang="ts">
    export default {
        props: {
            project: {
                type: Object,
                default: {}
            }
        },
        methods: {
            setupProject(callback: any) {
                const onLoadProjectMember = () => {
                    findByTypeAndProjectId('MAIN', this.project.id, (json) => {
                        this.$ls.set('mainChatId', json.id);                        
                        callback(json);
                    }, (error) => {
                        console.log(error);
                    });
                }

                findMyMemberByProjectId(this.project.id, (json) => {
                    this.$ls.set('memberId', json.id);
                    this.$ls.set('memberRoles', json.roles);
                    onLoadProjectMember();
                }, (error) => {
                    console.log(error);
                });
            },
            openProject() {
                this.setupProject((json: any) => {
                    this.$router.push(`/chat/${json.id}`);
                });
            },
            manageProject() {
                this.setupProject((json: any) => {
                    this.$router.push(`/project/${this.project.id}/manage`);
                });
            }
        }
    }
</script>


<template>
    <div class="project-item">
        <div class="project-item__header">
            <Flex gap="10px" align-items="center" justifyContent="space-between">
                <h3>#{{ project.id }} {{ project.name }}</h3>
                <div>
                    <Flex gap="10px" align-items="center" justifyContent="flex-end">
                        <Badge>Members: {{ project.members.length }}</Badge>
                        <Badge>Roles: {{ project.roles.length }}</Badge>
                        <Badge>Events: {{ project.events.length }}</Badge>
                    </Flex>
                </div>
            </Flex>

            <div class="project-item__description">
                {{ project.description }}
            </div>

            <div class="project-item__actions">
                <Button bg="var(--color-primary)"
                        display="block"
                        @click="manageProject">Manage</Button>
                <Button bg="var(--color-primary)" 
                        display="block"
                        @click="openProject">Open</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.project-item {
    border: 1px solid var(--color-text);
    border-radius: 5px;
    padding: 1rem;
}

.project-item__description {
    margin: 1rem 0;
}

.project-item__actions button {
    margin: 0.5rem 0 !important;
}

</style>