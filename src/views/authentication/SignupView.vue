<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { setJwt } from '@/composables/authentication';
import { create } from '@/composables/user';

// Components
import Container from '@/components/utilities/Container.vue'
import InputControl from '@/components/utilities/InputControl.vue'
import Button from '@/components/utilities/Button.vue'
import Flex from '@/components/utilities/Flex.vue'

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
    }, methods: {
        handleSignup() {
            if (this.password !== this.confirmPassword) {
                console.log('Passwords do not match');
                return;
            }

            create({
                username: this.username,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                phonenumber: this.phonenumber
            }, (json) => {
                const { jwt } = json;
                setJwt(jwt);
                this.$router.push('/projects');
            }, (error) => {
                console.log(error);
            });
        },
        showLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<template>
    <Container>

        <header>
            <h2>
                Join the Future of Our Community
            </h2>

            <p>
                Signup to get started with UniTaskPro
            </p>
            <small class="disabled">Signup disabled</small>
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

        <Button display="block" bg="var(--color-primary)" @click="showLogin">Already have an account? Login</Button>
    </Container>
</template>
  
<style scoped>

header {
    text-align: center;
    margin-bottom: 2rem;
}

.disabled {
    color: var(--color-danger);
}

@media (min-width: 1024px) {}
</style>
  