<script setup lang="ts">

import Button from '@/components/utilities/Button.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Flex from '@/components/utilities/Flex.vue';
import Relative from '../utilities/Relative.vue';

import AlertOutput from '@/components/alert/AlertOutput.vue';
import type IAlert from '@/components/alert/IAlert.ts';

</script>

<script lang="ts">

    export default {
        props: {
            projectId: {
                type: Number,
                default: ''
            },
            alerts: {
                type: Array<IAlert>,
                default: []
            },
            visible: {
                type: Boolean,
                default: false
            },
            toggleVisiblity: {
                type: Function ,
                default: () => {}
            }
        },
        methods: {
            manageProject() {
                this.$router.push(`/project/${this.projectId}/manage`);
            },
            changeProject() {
                this.$router.push('/projects');
            },
            showEvents() {
                this.$router.push(`/events`);
            },
            showMembers() {
                this.$router.push(`/members`);
            },
            showRoles() {
                this.$router.push(`/roles`);
            },
            showBoards() {
                this.$router.push(`/boards`);
            },
        }
    }
</script>

<template>
    <div class="project-info" :attr-visible="visible">
        <Relative>
            <AlertOutput 
                :alerts="alerts" 
            />
            
            <StickyElement 
                top="auto" 
                left="auto" 
                right="0" 
                width="250px" 
                padding="1rem 1rem 1rem 1rem" 
                bg="var(--color-background)"
                class="actions">

                <Flex gap="10px" class="spacing">
                    <Button 
                        display="block" 
                        @click="showEvents">Events</Button>

                    <Button 
                        display="block" 
                        @click="showBoards">Boards</Button>
                </Flex>
                <Flex gap="10px" class="spacing">
                    <Button 
                        display="block" 
                        @click="showMembers">Members</Button>
                    <Button 
                        display="block" 
                        @click="showRoles">Roles</Button>
                </Flex>
                
                <Button 
                    display="block" 
                    margin="0 0 .5rem 0"
                    @click="manageProject">Manage project</Button>
                <Button 
                    display="block" 
                    margin="0 0 .5rem 0"
                    @click="changeProject">Change project</Button>
                <Button 
                    display="block" 
                    @click="toggleVisiblity">Close</Button>
            </StickyElement>
        </Relative>
    </div>
</template>

<style scoped>

.project-info {
    position: fixed;
    top: 0;
    left: auto;
    right: 0;
    bottom: 0;
    width: 250px;
    z-index: 1001;
    background: var(--color-background);
    padding: 1rem;
    box-shadow: -2px 0 10px var(--color-shadow);
    transition: right .5s ease;
}

.spacing {
    margin-bottom: .5rem;
}

.project-info,
.project-info .actions {
    transition: right .5s ease;
}

.project-info[attr-visible="false"],
.project-info[attr-visible="false"] .actions {
    right: -250px !important;
}

</style>