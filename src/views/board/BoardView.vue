<script setup lang="ts">
import { routeLoginIfNotAuthenticated } from '@/composables/authentication';
import { findById } from '@/composables/board';
import { findAllByBoardId } from '@/composables/boardList';

import BoardListItem from '@/components/boardList/BoardListItem.vue';

import EmptyState from '@/components/utilities/EmptyState.vue';
import Container from '@/components/utilities/Container.vue';
import BoardItem from '@/components/board/BoardItem.vue';
import StickyElement from '@/components/utilities/StickyElement.vue';
import Button from '@/components/utilities/Button.vue';
import Flex from '@/components/utilities/Flex.vue';
</script>

<script lang="ts">
    export default {
        data() {
            return {
                board: {},
                boardLists: [],
                excludeShow: true
            }
        },
        methods: {
            showBoards() {
                this.$router.push('/boards');
            },
            createBoardList() {
                this.$router.push(`/board/${this.$route.params.id}/list/new`);
            },
            newBoard() {
                this.$router.push('/board/new');
            }
        },
        mounted() {
            findById(this.$route.params.id, (json) => {
                this.board = json;
            }, (err) => {
                console.log(err);
            });

            findAllByBoardId(this.$route.params.id, (json) => {
                this.boardLists.push(... json);
            }, (err) => {
                console.log(err);
            });

            routeLoginIfNotAuthenticated();
        }
    }
</script>

<template>
    <Container>
        <BoardItem :board="board" :excludeShow="excludeShow" />

        <Flex alignItems="baseline" justifyContent="flex-start" gap="10px" class="boardList">
            <template v-for="boardList in boardLists">
                <BoardListItem :boardList="boardList" />
            </template>
        </Flex>

        <EmptyState v-if="boardLists.length === 0">
            <h2>No boardLists found.</h2>
        </EmptyState>
    </Container>

    <StickyElement 
        top="auto" 
        padding="1rem" 
        bg="var(--color-background)">

        <Button display="block" @click="createBoardList" margin="0 0 .5rem 0">Add list</Button>
        <Button display="block" @click="showBoards">Close</Button>
    </StickyElement>
</template>

<style scoped>
.boardList {
}
</style>