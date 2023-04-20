<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { isAuthenticated, logout } from '@/composables/authentication';

import Flex from '@/components/utilities/Flex.vue'

import IconLogout from '@/components/icons/IconLogout.vue';
import IconDiagram from '@/components/icons/IconDiagram.vue';
import IconLogin from '@/components/icons/IconLogin.vue';
import IconHome from '@/components/icons/IconHome.vue';
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
            logout();
            this.$router.push('/login');
        },
    },
    //watch: {
        //$route(to, from) {
        //  this.setAuthenticated();
        //}
    //}
};
</script>

<template>
  <header>
    <Flex justifyContent="space-between" alignItems="center">
      <RouterLink to="/" class="brand">UniTaskPro</RouterLink>

      <Flex alignItems="center" gap="10px" width="auto">
        <RouterLink to="/" v-if="!isAuthenticated">
          <IconHome />
        </RouterLink>

        <RouterLink to="/login" v-if="!isAuthenticated">
          <IconLogin />
        </RouterLink>

        <RouterLink to="/projects" v-if="isAuthenticated">
          <IconDiagram />
        </RouterLink>  

        <button v-if="isAuthenticated" @click="handleLogout">
          <IconLogout />
        </button>
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
  box-shadow: 0 2px 10px var(--color-shadow);
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



button {
  background: none;
  border: none;
  color: var(--color-success);
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0 0 .16rem 0;
}

button,
a {
  padding-left: .5rem;
  padding-right: .5rem;
}

button:hover,
a:hover {
  background: none;
  color: var(--color-success-hover);
}
</style>
