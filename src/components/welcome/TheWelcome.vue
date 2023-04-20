<script setup lang="ts">
import WelcomeItem from '@/components/welcome/WelcomeItem.vue'
import { RouterLink } from 'vue-router';
</script>

<template>

<WelcomeItem>
  <template #heading>
    Embrace AI for Unleashing Productivity
  </template>

  <p>
    Experience a productivity revolution with UniTaskPro, the cutting-edge app powered by AI. Discover a whole new level of efficiency and innovation as you bid farewell to overwhelming to-do lists and embrace streamlined project management with endless possibilities.
  </p>
</WelcomeItem>

<WelcomeItem>
  <template #heading>
    Unlock the Future of Productivity with UniTaskPro's AI-Powered Innovation
  </template>
  <p>
    Collaborate seamlessly with AI and fellow users to design systems, manage tasks, and prioritize projects. Envision having ChatGPT as your team's dedicated SCRUM master, project manager, or even your personal assistant, guiding you to unparalleled success.
  </p>
</WelcomeItem>

<WelcomeItem>
  <template #heading>
    Experience the Next Generation of Productivity with UniTaskPro's AI-Powered System
  </template>
  
  <p>
    Embrace the power of AI and unlock a world of productivity with UniTaskPro. Join us on this exciting journey and discover just how advanced our system can be in helping you achieve your goals. Say hello to a brighter, more efficient way of working, powered by UniTaskPro's groundbreaking AI technology.
  </p>

  <hr class="hr" />

  <div class="call-to-action">    
    <RouterLink to="/signup" class="button">I'm ready to level up! – Signup</RouterLink>
  </div>
</WelcomeItem>

</template>

<style scoped>

  .hr {
    margin: 1rem 0;
    border: 1px solid var(--color-border);
  }

  .call-to-action {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
</style>