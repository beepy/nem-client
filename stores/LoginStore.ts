import { defineStore } from 'pinia';

interface State {
  username?: string;
  token?: string; // auth token
}

export const useLoginStore = defineStore('LoginStore', {
  state: (): State => {
    return {
      username: localStorage.getItem('username') ?? undefined,
      token: localStorage.getItem('token') ?? undefined
    }
  },
});
