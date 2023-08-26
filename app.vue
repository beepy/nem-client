<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/stores/LoginStore';

const loginStore = useLoginStore();
const router = useRouter();

onMounted(() => {
  loginStore
    .startup()
    .then(() => {
      console.log('startup complete');
    })
    .catch(() => {
      console.error('should redirect to login');
      router.replace('/login');
    });
});
</script>
