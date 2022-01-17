<template>
  <div class="register">
    <h1>Modifier mes informations ✍️</h1>
    <form @submit.prevent="updateInfo" ref="updateProfileForm">
      <label for="name">Prénom</label>
      <input type="text" placeholder="Your name" :value="user.data.name" id="name" />
      <label for="dateBirth">Date de naissance</label>
      <input type="date" id="dateBirth" :value="user.data.birth" />
      <label for="tel">Téléphone</label>
      <input type="tel" id="tel" :value="user.data.phone" />
      <label for="email">Mail</label>
      <input type="email" placeholder="name@domain.com" :value="user.data.email" id="email" />
      <button type="submit">Ok</button>
    </form>
    <h2>Modifier mon mot de passe</h2>
    <form @submit.prevent="updateMdp" ref="updateMdpForm" id="MdpForm">
      <label for="password">Mon nouveau Mot de passe</label>
      <input type="password" id="password" />
      <button type="submit">Ok</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { setAlert } from "../../utils";
import { mapGetters } from "vuex";
import store from "../../store";

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {
    updateInfo() {
      const email = this.$refs.updateProfileForm["email"].value;

      const name = this.$refs.updateProfileForm["name"].value;
      const dateBirth = this.$refs.updateProfileForm["dateBirth"].value;
      const tel = this.$refs.updateProfileForm["tel"].value;

      if (this.user.data.email != email) {
        const auth = getAuth();
        updateEmail(auth.currentUser, email)
          .then(() => {
            setAlert("Ton mail à été modifier avec succès ! ", false, true);
            store.dispatch("updateMail", email);
            this.$router.push("/profile");
          })
          .catch((error) => {
            setAlert(error.message, true, false);
          });
      }

      if (
        this.user.data.name != name ||
        this.user.data.birth != dateBirth ||
        this.user.data.phone != tel
      ) {
        firebase
          .firestore()
          .collection("users")
          .doc(this.user.data.id)
          .set({
            displayName: name,
            dateOfBirth: dateBirth,
            phoneNumber: tel,
            language: "fr",
            currency: "€",
          })
          .then(() => {
            setAlert("Ton Profil à été modifier avec succès ! ", false, true);
            const userInfo = {
              id: this.user.data.id,
              email: email,
              name: name,
              birth: dateBirth,
              phone: tel,
              language: "fr",
              currency: "€",
            };
            store.dispatch("updateUser", userInfo);
            this.$router.push("/profile");
          })
          .catch((error) => {
            setAlert(error.message, true, false);
          });
      } else if (this.user.data.email == email) {
        setAlert("Tu n'as fait aucune modification ...", true, false);
      }
    },
    updateMdp() {
      const newPassword = this.$refs.updateMdpForm["password"].value;

      const auth = getAuth();
      const user = auth.currentUser;

      updatePassword(user, newPassword)
        .then(() => {
          setAlert(
            "Ton Mot de passe à été modifier avec succès ! ",
            false,
            true
          );
          this.$router.push("/profile");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
          console.log(error.message);
        });
    },
  },
};
</script>

<style scoped>
form button {
  background-color: var(--color-gray-text) !important;
}

form#MdpForm {
  margin-bottom: 80px;
}

h2 {
  margin-top: 50px;
}
</style>
