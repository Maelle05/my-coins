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
import { setAlert } from "../../utils";

export default {
  methods: {
    register() {
      const email = this.$refs.registerForm["email"].value;
      const password = this.$refs.registerForm["password"].value;
      const name = this.$refs.registerForm["name"].value;
      const dateBirth = this.$refs.registerForm["dateBirth"].value;
      const tel = this.$refs.registerForm["tel"].value;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          firebase
            .firestore()
            .collection("users")
            .doc(cred.user.uid)
            .set({
              displayName: name,
              dateOfBirth: dateBirth,
              phoneNumber: tel,
            })
            .then(() => {
              setAlert("Successfully registered! Please login.", false, true);
              this.$router.push("/");
            });
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
  },
};
</script>
