<template>
  <div class="profile">
    <h1>Mon Profil</h1>
    <p>Prénom : {{user.data.name}}</p>
    <p>Date de naissance : {{user.data.birth}}</p>
    <p>Téléphone : {{user.data.phone}}</p>
    <p>Mail : {{user.data.email}}</p>
    <p>Langue : {{user.data.language}}</p>
    <p>Devise : {{user.data.currency}}</p>
    <router-link to="/profile/update">Modifier le profil</router-link>
    <br />
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
  margin: 10px 0 0 0;
  border: none;
  background-color: var(--color-bg);
  text-decoration: underline;
}
a {
  margin: 35px 0 0 0;
  font-size: 14px;
  color: var(--color-black);
  display: block;
}
</style>