<script setup lang="ts">
import { login, setJwt, routeHomeIfAuthenticated } from '@/composables/authentication';

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
            username: '',
            password: ''
        };
    },
    methods: {
        handleLogin(): any {
            login({
                username: this.username,
                password: this.password
            },
            (json) => {
                const { jwt } = json;
                setJwt(jwt);
                this.$router.push('/projects');
            },
            (error) => {
                console.log(error);
            });
        },
        showSignUp() {
            this.$router.push('/signup');
        }
    },
    mounted() {
        routeHomeIfAuthenticated();
    }
};

</script>

<template>
    <Container>
        <header>
            <h2>Unlock Your World</h2>
            <p>Login to your account to start building something amazing.</p>
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
            <Button 
                display="block" 
                @click="handleLogin">Login</Button>
        </InputControl>

        <Button 
            display="block" 
            bg="var(--color-primary)" 
            @click="showSignUp">Don't have an account? Signup</Button>
    </Container>
</template>
  
<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
  