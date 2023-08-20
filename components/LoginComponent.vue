<template>
  <div class="mt-12 flex flex-col">
    <label>
        <span class="block">Username</span>
              <InputText id="username" v-model="username" />      
    </label>
              <label for="password"><span class="block">Password</span>
              <Password id="password" v-model="password" class="w-full" />
            </label>
            <Button>Log In</Button>
      </div>

</template>

<script setup lang="ts">
const m = import.meta.env.VITE_API_URL
const username = ref('')
const password = ref('')
</script>