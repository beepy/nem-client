<template>
  <form @submit.prevent="login" class="flex flex-col">
    <label>
        <span class="block">Username</span>
              <input v-model="email" class="w-full" />      
    </label>
              <label for="password"><span class="block">Password</span>
              <input id="password" v-model="password" class="w-full" />
            </label>
            <button type="submit">Log In!</button>
      </form>

</template>

<script setup lang="ts">
import axios from 'axios';

const m = import.meta.env.VITE_API_URL
const email = ref('')
const password = ref('')

function login() {
  axios.post(m + '/auth/login', {
    email: email.value,
    password: password.value
  })
}
</script>