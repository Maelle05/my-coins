<template>
  <div class="home">
    <h1>Connexion</h1>
    <form @submit.prevent="login" ref="loginForm">
      <label for="email">Mail</label>
      <input type="email" placeholder="name@domain.com" id="email" />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" />
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