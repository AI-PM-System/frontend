<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useFetch } from '@/composables/fetch'

// Components
import Container from '@/components/Container.vue'
import InputControl from '@/components/InputControl.vue'
import Button from '@/components/Button.vue'
import Flex from '@/components/Flex.vue'

// Icons
import IconAt from '@/components/icons/IconAt.vue'
import IconLock from '@/components/icons/IconLock.vue'
import IconUser from '@/components/icons/IconUser.vue'
import IconPhone from '@/components/icons/IconPhone.vue'
import IconAddressCard from '@/components/icons/IconAddressCard.vue'
</script>

<script lang="ts">
export default {
    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: ''
        };
    }
};

const handleSignup = () => {
    const { data, error } = useFetch("http://localhost:8080/api/v1/public/authenticate");
    console.log(data, error);
};


</script>

<template>
    <Container>

        <header>
            <h2>
                Join the Future of Our Community
            </h2>

            <p>
                Signup to get started with UniTaskPro.
            </p>
        </header>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="username" placeholder="Username" />
                <div class="icon">
                    <IconUser />
                </div>
            </Flex>
            <small>
                This is the username you'll use to log in and access
                all the amazing features. We appreciate your attention to
                detail in choosing a delightful and professional username
                that reflects your unique identity, but we recommend keeping
                the username secret for maximum security.
            </small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="password" placeholder="Password" type="password" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
            <small>
                Password must be at least 6 characters long,
                contain at least one number, one uppercase and
                one lowercase letter.
            </small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="confirmPassword" placeholder="Confirm Password" type="password" />
                <div class="icon">
                    <IconLock />
                </div>
            </Flex>
            <small>Confirm your password by typing it again.</small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="firstname" placeholder="Firstname" />
                <div class="icon">
                    <IconAddressCard />
                </div>
            </Flex>
            <small>
                Your firstname will be used to introduce you to your esteemed team members,
                allowing them to know you in a professional manner.
            </small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="lastname" placeholder="Lastname" />
                <div class="icon">
                    <IconAddressCard />
                </div>
            </Flex>
            <small>
                Your lastname will also be included in interactions with team members.
            </small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="email" placeholder="E-mail" />
                <div class="icon">
                    <IconAt />
                </div>
            </Flex>
            <small>
                Your e-mail will be used to ensure seamless
                communication and coordination within our professional team.
                We will never share your e-mail with anyone or any third party.
            </small>
        </InputControl>

        <InputControl>
            <Flex alignItems="center" gap="10px">
                <input v-model="phonenumber" placeholder="Phonenumber" />
                <div class="icon">
                    <IconPhone />
                </div>
            </Flex>
            <small>
                Your phonenumber will be used for verification purposes,
                and to ensure that you are always reachable by your team members.
            </small>
        </InputControl>

        <InputControl>
            <Button display="block" @click="handleSignup">Signup</Button>
        </InputControl>

        <Button display="block" bg="var(--color-primary)" @click="this.$router.push('/login')">Already have an account? Login</Button>
    </Container>
</template>
  
<style scoped>

header {
    text-align: center;
    margin-bottom: 2rem;
}

@media (min-width: 1024px) {}
</style>
  