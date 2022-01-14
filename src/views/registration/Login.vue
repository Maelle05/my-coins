<template>
  <div class="home">
    <h1>Login</h1>
    <form @submit.prevent="login" ref="loginForm">
      <!-- <input type="email" placeholder="Email address..." v-model="email" /> -->
      <!-- <input type="password" placeholder="password..." v-model="password" /> -->
      <input type="email" placeholder="Mail" id="email" />
      <input type="password" placeholder="Mot de passe" id="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    login() {
      const email = this.$refs.loginForm["email"].value;
      const password = this.$refs.loginForm["password"].value;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>