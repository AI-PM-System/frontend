<script setup lang="ts">
import Alert from '@/components/alert/Alert.vue';
import IAlert from '@/components/alert/IAlert.ts';
</script>

<script lang="ts" >
    
export default {
    props: {
        title: {
            type: String,
            default: 'Notifications'
        },
        alerts: {
            type: Array<IAlert>,
            default: []
        }
    },
}
</script>

<template>
    
    <div class="alerts">
        <h2>{{ title }}</h2>
        
        <template v-for="alert in alerts">
            <Alert :type="alert.type">
                <p>{{ alert.msg }}</p>
            </Alert>
        </template>
    </div>
</template>

<style scoped>

.alerts h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0.5rem;
}
</style>