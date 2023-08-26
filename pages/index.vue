<template>
  <div>
    <p>Hello {{ name }}</p>
    <PatientComponent />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLoginStore } from '@/stores/LoginStore';

const { name } = storeToRefs(useLoginStore());
</script>
