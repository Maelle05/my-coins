<template>
  <div class="login">
    <img src="@/assets/svg/login.svg" alt="" srcset="">
    <form @submit.prevent="login" ref="loginForm">
      <input-mail label="E-mail"/>
      <InputMDP label="Mot de passe"/>
      <Submit label="Connexion"/>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { setAlert } from "../../utils";
import InputMail from "../../components/form/InputMail.vue"
import InputMDP from "../../components/form/InputMDP.vue"
import Submit from "../../components/form/Submit.vue"

export default {
  components: {
    InputMail,
    InputMDP,
    Submit
  },
  methods: {
    login() {
      const email = this.$refs.loginForm["email"].value;
      const password = this.$refs.loginForm["password"].value;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setAlert("Successfully logged in", false, true);
          this.$router.push("/");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
  },
};
</script>

<style scoped>
.login{
  width: 80vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

img{
  margin-top: 60px;
  width: 70vw;
}

form{
  margin-top: 30px;
  width: 70vw;
}
</style>