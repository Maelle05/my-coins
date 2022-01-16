<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <p>Prénom : {{user.data.name}}</p>
    <p>Date de naissance : {{user.data.birth}}</p>
    <p>Téléphone : {{user.data.phone}}</p>
    <p>Mail : {{user.data.email}}</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { mapGetters } from "vuex";
import { setAlert } from "../utils";

export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setAlert("Successfully logged out", false, true);
          this.$router.push("/");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
          this.$router.push("/");
        });
    },
  },
};
</script>

<style scoped>
button {
  margin: 20px 0 0 0;
  border: none;
  background-color: var(--color-bg);
  text-decoration: underline;
}
</style>