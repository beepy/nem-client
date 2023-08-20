import { defineNuxtPlugin } from "#app";

import PrimeVue from "primevue/config";
import Tailwind from "primevue/passthrough/tailwind";

import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from 'primevue/password';

export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(PrimeVue, { unstyled: true, pt: Tailwind });
    nuxtApp.vueApp.component("Button", Button);
    nuxtApp.vueApp.component("InputText", InputText);
    nuxtApp.vueApp.component("Password", Password);
    //other components that you need
});
