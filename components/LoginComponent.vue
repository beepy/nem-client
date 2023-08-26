<template>
  <form class="flex flex-col" @submit.prevent="login">
    <p>{{ redirectToRoute }}</p>
    <label>
      <span class="block">Username</span>
      <input v-model="email" class="w-full" />
    </label>
    <label for="password"
      ><span class="block">Password</span>
      <input id="password" v-model="password" class="w-full" />
    </label>
    <button type="submit">Log In</button>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/stores/LoginStore';

const email = ref(import.meta.env.VITE_USER_EMAIL ?? '');
const password = ref(import.meta.env.VITE_USER_PASSWORD ?? '');
const loginStore = useLoginStore();
const { redirectToRoute } = storeToRefs(loginStore);
const router = useRouter();

function login() {
  // axios.post(m + '/auth/login', {
  //   email: email.value,
  //   password: password.value,
  // }).then((response) => {

  // });
  loginStore.login(email.value, password.value).then(() => {
    router.replace(redirectToRoute.value);
  });
}
</script>
