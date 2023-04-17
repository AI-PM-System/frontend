import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const authenticated = ref(false); // Reactive variable for authentication status

// Computed property to check if user is authenticated
export const isAuthenticated = () => {
    return authenticated.value !== null;
};

// Method to perform authentication check and redirect
export const checkAuthentication = () => {
    const router = useRouter();
    if (isAuthenticated()) {
        router.push('/projects');
    }
};
