<template>
  <div class="register">
    <h1>Inscription</h1>
    <form @submit.prevent="register" ref="registerForm">
      <label for="name">Prénom</label>
      <input type="text" placeholder="Your name" id="name" />
      <label for="dateBirth">Date de naissance</label>
      <input type="date" id="dateBirth" />
      <label for="tel">Téléphone</label>
      <input type="tel" id="tel" />
      <label for="email">Mail</label>
      <input type="email" placeholder="name@domain.com" id="email" />
      <label for="password">Mot de passe</label>
      <input type="password" id="password" />
      <button type="submit">Ok</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  methods: {
    register() {
      const email = this.$refs.registerForm["email"].value;
      const password = this.$refs.registerForm["password"].value;
      const name = this.$refs.registerForm["name"].value;
      // const dateBirth = this.$refs.registerForm["dateBirth"].value;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              alert("Successfully registered! Please login.");
              this.$router.push("/");
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
