import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAC62dJag41V9opyfqdG9o7U4b_Ud_DcgQ",
  authDomain: "my-coins-pwa.firebaseapp.com",
  databaseURL: "https://my-coins-pwa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-coins-pwa",
  storageBucket: "my-coins-pwa.appspot.com",
  messagingSenderId: "542229369535",
  appId: "1:542229369535:web:36563eec8d47c0b0826c0a",
  measurementId: "G-DF69XH97MQ"
}


firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
