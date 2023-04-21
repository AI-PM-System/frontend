<script setup lang="ts">
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
            name: '',
        };
    },
    props: {
        boardId: {
            type: Number,
            requried: true
        },
        boardList: {
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
        boardList: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.id = newVal.id;
                    this.name = newVal.name;
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

            this.action({
                id: this.id,
                boardId: this.boardId,
                name: this.name
            });
        }
    }
};

</script>

<template>
    <Container>
        <header>
            <h2>{{ submitText }} board list</h2>
            <p>Enter board list information below.</p>
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
  