<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/register">Register</router-link>|
      <router-link to="/dashboard">Dashboard</router-link>|
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style>
</style>
