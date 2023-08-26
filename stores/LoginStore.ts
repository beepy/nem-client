import { defineStore } from 'pinia';
import axios from 'axios';

import { LoginResponse } from '@/types/Api';

const API = import.meta.env.VITE_API_URL;

let refreshAccessTokenTimerId: ReturnType<typeof setTimeout> | undefined;

interface State {
  email: string | null;
  name: string | null;
  role: string | null;
  accessToken: string | null;
  accessTokenExpiresString: string | null;
  accessTokenExpiresDate: Date;
  refreshToken: string | null;
  refreshTokenExpiresString: string | null;
  refreshTokenExpiresDate: Date;
  redirectToRoute: null | string;
}

export const useLoginStore = defineStore('LoginStore', {
  state: (): State => {
    return {
      email: null,
      name: null,
      role: null,
      accessToken: null,
      accessTokenExpiresString: null,
      accessTokenExpiresDate: new Date(),
      refreshToken: null,
      refreshTokenExpiresString: null,
      refreshTokenExpiresDate: new Date(),
      redirectToRoute: null,
    };
  },
  getters: {
    // ms until refresh token expires, minus 30 seconds
    msToRefresh: (state) => {
      return (
        state.accessTokenExpiresDate.getTime() - new Date().getTime() - 30000
      );
    },
    refreshTokenExpired: (state) => {
      return (
        !state.refreshToken ||
        new Date().getTime() > state.refreshTokenExpiresDate.getTime()
      );
    },
  },
  actions: {
    // 2 things can happen on startup:
    // 1. user has no local storage token or has expired local store refresh
    //    token. Should redirect to login page.
    // 2. user has local storage token and has unexpired local store refresh
    //    token. Should refresh the auth token, and only redirect if that fails

    startup() {
      const route = useRoute();

      this.redirectToRoute = route.fullPath;
      if (this.redirectToRoute === '/login') {
        this.redirectToRoute = '/';
      }
      const accessExpiresString = localStorage.getItem(
        'accessTokenExpiresString'
      );
      const refreshExpiresString = localStorage.getItem(
        'refreshTokenExpiresString'
      );
      this.email = localStorage.getItem('email');
      this.name = localStorage.getItem('name');
      this.role = localStorage.getItem('role');
      this.accessToken = localStorage.getItem('accessToken');
      this.accessTokenExpiresString = accessExpiresString;
      this.accessTokenExpiresDate = accessExpiresString
        ? new Date(accessExpiresString)
        : new Date();
      this.refreshToken = localStorage.getItem('accessToken');
      this.refreshTokenExpiresString = refreshExpiresString;
      this.refreshTokenExpiresDate = refreshExpiresString
        ? new Date(refreshExpiresString)
        : new Date();
      if (!this.refreshTokenExpired) {
        return this.startRefreshTimer();
      } else {
        return Promise.reject(new Error('refresh token expired'));
      }
    },
    login(email: string, password: string) {
      return axios
        .post(API + '/auth/login', {
          email,
          password,
        })
        .then((response) => {
          const d: LoginResponse = response.data;
          this.storeLoginResponse(d);
        });
    },
    logout() {
      this.cancelRefreshTimer();
    },
    storeLoginResponse(d: LoginResponse) {
      this.email = d.user.email;
      this.name = d.user.name;
      this.role = d.user.role;
      this.accessToken = d.tokens.access.token;
      this.accessTokenExpiresString = d.tokens.access.expires;
      this.accessTokenExpiresDate = new Date(d.tokens.access.expires);
      this.refreshToken = d.tokens.refresh.token;
      this.refreshTokenExpiresString = d.tokens.refresh.expires;
      this.refreshTokenExpiresDate = new Date(d.tokens.refresh.expires);
      localStorage.setItem('email', this.email);
      localStorage.setItem('name', this.name);
      localStorage.setItem('role', this.role);
      localStorage.setItem('accessToken', this.accessToken);
      localStorage.setItem(
        'accessTokenExpiresString',
        this.accessTokenExpiresString
      );
      localStorage.setItem('refreshToken', this.refreshToken);
      localStorage.setItem(
        'refreshTokenExpiresString',
        this.refreshTokenExpiresString
      );
      this.cancelRefreshTimer();
      this.startRefreshTimer();
    },
    refreshAccessToken() {
      return axios
        .post(API + '/auth/refresh-tokens', {
          refreshToken: this.refreshToken,
        })
        .then((response) => {
          const d: LoginResponse = response.data;

          this.storeLoginResponse(d);
        });
    },
    startRefreshTimer() {
      if (this.refreshToken) {
        if (this.msToRefresh <= 0) {
          return this.refreshAccessToken();
        } else {
          refreshAccessTokenTimerId = setTimeout(() => {
            console.log('fire refresh timer');
            return this.refreshAccessToken();
          }, this.msToRefresh);
          return Promise.resolve();
        }
      } else {
        return Promise.reject(new Error('no refresh token'));
      }
    },
    cancelRefreshTimer() {
      if (refreshAccessTokenTimerId) {
        clearInterval(refreshAccessTokenTimerId);
        refreshAccessTokenTimerId = undefined;
      }
    },
  },
});
