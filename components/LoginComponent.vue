<template>
  <div class="mt-12 flex flex-col">
    <label>
        <span class="block">Username</span>
              <input id="username" v-model="username" />      
    </label>
              <label for="password"><span class="block">Password</span>
              <input id="password" v-model="password" class="w-full" />
            </label>
            <button>Log In!</button>
      </div>

</template>

<script setup lang="ts">
const m = import.meta.env.VITE_API_URL
const username = ref('')
const password = ref('')
</script>