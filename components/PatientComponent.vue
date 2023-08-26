<template>
  <div>
    <p>
      <button @click="test">Test Patient</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useLoginStore } from '@/stores/LoginStore';

const API = import.meta.env.VITE_API_URL;

function test() {
  console.log('test');
  // axios.post(API + '/patients', {
  //   name: 'Cosmo Lamont'
  // }, {
  //   headers: {
  //     'Authorization': 'Bearer ' + useLoginStore().accessToken
  //   }
  // }).then((d) => {
  //   console.log(d)
  // })
  axios
    .get(API + '/patients', {
      headers: {
        Authorization: 'Bearer ' + useLoginStore().accessToken,
      },
    })
    .then((d) => {
      console.log(d);
    });
}
</script>
