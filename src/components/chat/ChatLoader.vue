<script setup>
import IconDot from '@/components/icons/IconDot.vue';
</script>

<template>
    <div class="chat-loader">
        <IconDot />
        <IconDot />
        <IconDot />
    </div>
</template>

<style scoped>

.chat-loader {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: .7rem;
    padding: 1rem;
    margin: 0 1rem;
    border-radius: 1rem;
    border: 1px solid var(--vt-c-text-dark-2);
    background: var(--color-background);
    color: var(--color-success);
}

.chat-loader * {
    width: 1rem;
    height: 1rem;
}

.chat-loader *:nth-child(1) {
    animation: blink 1s infinite;
}

.chat-loader *:nth-child(2) {
    animation: blink 1s infinite 0.2s;
}

.chat-loader *:nth-child(3) {
    animation: blink 1s infinite 0.4s;
}
 
@keyframes blink {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

</style>