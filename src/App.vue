<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Flex from '@/components/Flex.vue'
import { authenticated, isAuthenticated } from '@/composables/auth';

</script>

<script lang="ts">
export default {    
    computed: {
      authenticated() {
            return isAuthenticated();
        }
    },
    methods: {
        handleLogout() {
            this.$ls.remove('jwt');
            authenticated.value = false;
            this.$router.push('/login');
        },
        setAuthenticated() {
            authenticated.value = this.$ls.get('jwt') !== null;
        }
    },
    mounted() {
      this.setAuthenticated();
    },
    watch: {
        $route(to, from) {
          this.setAuthenticated();
        }
    }
};
</script>

<template>
  <header>
    <Flex justifyContent="space-between" alignItems="center">
      <RouterLink to="/" class="brand">UniTaskPro</RouterLink>

      <Flex alignItems="center" gap="10px" width="auto">
        <RouterLink to="/" v-if="!authenticated">Home</RouterLink>
        <RouterLink to="/login" v-if="!authenticated">Login</RouterLink>
        <RouterLink to="/projects" v-if="authenticated">Projects</RouterLink>  

        <a v-if="authenticated" @click="handleLogout">Logout</a>  
      </Flex>
    </Flex>
  </header>

  <div class="router-view">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  width: 100%;
  padding: 1rem;
  line-height: 1.5;
  background: #333;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.brand:hover {
  background: none !important;
}

.router-view {
  padding-top: 5rem;
}

@media (min-width: 1024px) {
  
}
</style>
