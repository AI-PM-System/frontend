<script setup lang="ts">
// Components
import Container from '@/components/utilities/Container.vue';
import InputControl from '@/components/utilities/InputControl.vue';
import Button from '@/components/utilities/Button.vue';
import Flex from '@/components/utilities/Flex.vue';

// Icons
import IconUser from '@/components/icons/IconUser.vue';
import IconLock from '@/components/icons/IconLock.vue';

</script>

<script lang="ts">
export default {
    data() {
        return {
            id: 0,
            name: '',
            startDateTime: '',
            endDateTime: '',
            location: '',
            agenda: ''
        };
    },
    props: {
        projectId: {
            type: Number,
            requried: true
        },
        event: {
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
        event: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.id = newVal.id;
                    this.name = newVal.name;
                    this.startDateTime = newVal.startDateTime;
                    this.endDateTime = newVal.endDateTime;
                    this.location = newVal.location;
                    this.agenda = newVal.agenda;
                }
            },
            deep: true
        }
    },
    methods: {
        handleCreate(): any {
            if (this.name === '') {
                alert('Name is required');
                return;
            }

            if (this.startDateTime === '') {
                alert('Start date and time is required');
                return;
            }

            if (this.endDateTime === '') {
                alert('End date and time is required');
                return;
            }

            if (this.agenda === '') {
                alert('Agenda is required');
                return;
            }

            this.action({
                id: this.id,
                projectId: this.projectId,
                name: this.name,
                startDateTime: this.startDateTime ? `${this.startDateTime}:00`.replace(" ", "T") : '',
                endDateTime: this.endDateTime ? `${this.endDateTime}:00`.replace(" ", "T") : '',
                location: this.location,
                agenda: this.agenda
            });
        }
    }
};

</script>

<template>
    <Container>
        <header>
            <h2>{{ submitText }} event</h2>
            <p>Enter event information below.</p>
        </header>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="name" placeholder="Name" type="text" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="startDateTime" placeholder="Select start date time" type="datetime-local" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="endDateTime" placeholder="Select end date time" type="datetime-local" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="location" placeholder="Location" type="text" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="flex-start" gap="10px">
                <textarea v-model="agenda" placeholder="Agenda" />
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
  