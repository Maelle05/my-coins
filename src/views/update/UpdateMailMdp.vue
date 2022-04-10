<template>
  <div class="UpdateProfil">
    <h1>Modifier mes informations de connexion </h1>

    <div v-if="isAuth">
      <h2 class="isAuth">Modifier mon E-mail</h2>
      <form @submit.prevent="updateMail" ref="MailForm" id="MailForm">
        <InputMail label="Nouveau Email" :value="user.data.email"/>
        <button type="submit">Ok</button>
      </form>
      <h2 class="isAuth" >Modifier mon mot de passe</h2>
      <form @submit.prevent="updateMdp" ref="MdpForm" id="MdpForm">
        <InputMDP label="Nouveau Mot de passe"/>
        <button type="submit">Ok</button>
      </form>
    </div>
    <div v-else >
      <h2>Pour pouvoir modifier ses informations il nous faut vérifier votre identité</h2>
      <form @submit.prevent="checkAuth" ref="authProfileForm">
      <InputMail label="E-mail" :value="user.data.email"/>
      <InputMDP label="Mot de passe" />
      <Submit label="Suivant" />
    </form>
    </div>
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

import InputMail from "../../components/form/InputMail.vue"
import InputMDP from "../../components/form/InputMDP.vue"
import Submit from "../../components/form/Submit.vue"

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  data(){
    return {
      isAuth: false,
    }
  },
  components: {
    InputMail,
    InputMDP,
    Submit
  },
  methods: {
    updateMail() {
      const email = this.$refs.MailForm["email"].value;

      if (this.user.data.email != email) {
        const auth = getAuth();
        updateEmail(auth.currentUser, email)
          .then(() => {
            setAlert("Ton mail à été modifier avec succès ! ", false, true);
            store.dispatch("updateMail", email);
            this.$router.push("/profil");
          })
          .catch((error) => {
            setAlert(error.message, true, false);
          });
      } else {
        setAlert("Tu n'as fait aucune modification ...", true, false);
      }
    },
    updateMdp() {
      const newPassword = this.$refs.MdpForm["password"].value;

      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!newPassword === '') {
        updatePassword(user, newPassword)
        .then(() => {
          setAlert(
            "Ton Mot de passe à été modifier avec succès ! ",
            false,
            true
          );
          this.$router.push("/profil");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
          console.log(error.message);
        });
      } else {
        setAlert(
            "Le champ est vide ... ",
            true,
            false
          );
      }

      
    },
    checkAuth() {
      const email = this.$refs.authProfileForm["email"].value;
      const password = this.$refs.authProfileForm["password"].value;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setAlert("Successfully logged in", false, true);
          this.isAuth = true
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    }
  },
};
</script>

<style scoped>
.UpdateProfil{
  width: 80vw;
  margin: auto;
  margin-top: 40px;
}
form{
  width: 100%;
  margin-top: 47px ;
}

#MailForm{
  margin-top: 25px;
}

#MdpForm{
  margin-top: 25px;
}

h1 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  color: var(--color-black);
}

h2 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 15px;
  margin-top: 15px;
  color: var(--color-black);
}

h2.isAuth{
  margin-top: 50px;
}

button{
  all: unset;
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 8px ;
}
</style>
