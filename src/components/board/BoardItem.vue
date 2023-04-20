<script setup lang="ts">
import Badge from '@/components/utilities/Badge.vue'
import Button from '@/components/utilities/Button.vue';
import Flex from '../utilities/Flex.vue';
</script>

<script lang="ts">
export default {
    props: {
        board: {
            type: Object,
            default: {}
        },
        excludeShow: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showBoard() {
            this.$router.push(`/board/${this.board.id}`);
        },
        editBoard() {
            this.$router.push(`/board/${this.board.id}/edit`);
        },
    }
}
</script>

<template>
    <div class="board">
        <Flex gap="10px" align-items="center" justifyContent="space-between">
            <h3>#{{ board.id }} {{ board.name }}</h3>
        </Flex>
        <div>
            {{ board.description }}
        </div>
        <div class="board__actions">
            <template v-if="!excludeShow">
                <Button bg="var(--color-primary)"
                    display="block"
                    margin="0 0 .5rem 0"
                    @click="showBoard">Show</Button>
            </template>
            <Button bg="var(--color-primary)"
                    display="block"
                    @click="editBoard">Edit</Button>
        </div>
    </div>
</template>

<style scoped>
.board {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
}

.board .board__actions {
    margin-top: .5rem;
}
</style>