<script setup lang="ts">
import { findById } from '@/composables/board';
import { findAllByBoardId } from '@/composables/boardList';
import { findAllByProjectId } from '@/composables/member';

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
            description: '',
            dueDate: '',
            memberId: 0,
            boardListId: 0,

            members: [],
            boardLists: []
        };
    },
    props: {
        boardId: {
            type: Number,
            requried: true
        },
        listId: {
            type: Number,
            requried: true
        },
        task: {
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
        task: {
            handler(newVal, oldVal) {
                if (newVal) {
                    this.id = newVal.id;
                    this.name = newVal.name;
                    this.description = newVal.description;
                    this.dueDate = newVal.dueDate;
                    this.memberId = newVal.member? newVal.member.id : 0;
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

            if (this.description === '') {
                alert('Description is required');
                return;
            }
            this.action({
                id: this.id,
                boardListId: this.boardListId,
                name: this.name,
                description: this.description,
                dueDate: this.dueDate ? `${this.dueDate}:00`.replace(" ", "T") : '',
                memberId: this.memberId == undefined ? 0 : this.memberId
            });
        },
        isMemberSelected(memberId: number): boolean {
            return this.memberId == memberId;
        },
        memberName(member: any): string {
            return member.user ? member.user.firstName + ' ' + member.user.lastName : 'No name';
        },
        isBoardListSelected(boardListId: number): boolean {
            return this.boardListId == boardListId;
        },
    },
    mounted() {
        this.boardListId = this.listId;

        findAllByBoardId(this.boardId, (json) => {
            this.boardLists = json;
        }, (error) => {
            console.log(error);
        });

        findById(this.boardId, (json) => {
            findAllByProjectId(json.projectId, (json) => {
                this.members = json;
            }, (error) => {
                console.log(error);
            });
        }, (error) => {
            console.log(error);
        });
    }
};

</script>

<template>
    <Container>
        <header>
            <h2>{{ submitText }} task</h2>
            <p>Enter task information below.</p>
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
                <input v-model="description" placeholder="Description" type="text" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="dueDate" placeholder="Select due date" type="datetime-local" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <select v-model="memberId">
                    <option value="0">No member</option>
                    <option v-for="member in members" :value="member.id" :selected="isMemberSelected(member.id)">#{{ member.id }} - {{ memberName(member) }}</option>
                </select>
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <select v-model="boardListId">
                    <option v-for="boardList in boardLists" :value="boardList.id" :selected="isBoardListSelected(boardList.id)">#{{ boardList.id }} - {{ boardList.name }}</option>
                </select>
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
  