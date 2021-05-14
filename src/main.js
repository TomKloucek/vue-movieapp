import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "@/assets/styles/index.css";
import firebase from "firebase/app";
import "firebase/firestore";
require("dotenv").config();

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FBS_API,
  authDomain: process.env.VUE_APP_FBS_AUTH,
  projectId: process.env.VUE_APP_FBS_ID,
  storageBucket: process.env.VUE_APP_FBS_SB,
  messagingSenderId: process.env.VUE_APP_FBS_SID,
  appId: process.env.VUE_APP_FBS_AID,
};

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
