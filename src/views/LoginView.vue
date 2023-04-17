<script setup lang="ts">
import { useFetch } from '@/composables/fetch'

// Components
import Container from '@/components/Container.vue'
import InputControl from '@/components/InputControl.vue'
import Button from '@/components/Button.vue'
import Flex from '@/components/Flex.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconLock from '@/components/icons/IconLock.vue'

import { authenticated, checkAuthentication } from '@/composables/auth';

</script>

<script lang="ts">
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        handleLogin(): any {
            useFetch("http://localhost:8080/api/v1/public/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            }, (json) => {
                const { jwt } = json;
                this.$ls.set('jwt', jwt);
                this.$router.push('/projects');
            });
        }
    },
    mounted() {
        authenticated.value = this.$ls.get('jwt'); // Set initial value of authenticated status
        checkAuthentication(); // Call the checkAuthentication method
    }
};


</script>

<template>
    <Container>

        <header>
            <h2>
                Unlock Your World
            </h2>

            <p>
                Login to your account to start building something amazing.
            </p>
        </header>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="username" placeholder="Username" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="password" placeholder="Password" type="password" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
        </InputControl>

        <InputControl>
            <Button display="block" @click="handleLogin">Login</Button>
        </InputControl>

        <Button display="block" bg="var(--color-primary)" @click="this.$router.push('/signup')">Don't have an account?
            Signup</Button>
    </Container>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}

@media (min-width: 1024px) {
    .login {}
}
</style>
  