<template>
  <div class="register">
    <form @submit.prevent="register" ref="registerForm">
      <InputText label="Prénom" name="name"/>
      <InputDate label="Date de naissance" />
      <InputTel label="Téléphone" />
      <InputMail label="Mail" />
      <InputMDP label="Mot de passe"/>
      <Submit label="Inscription"/>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { setAlert } from "../../utils";
import InputText from "../../components/form/InputText.vue"
import InputMail from "../../components/form/InputMail.vue"
import InputMDP from "../../components/form/InputMDP.vue"
import InputDate from "../../components/form/InputDate.vue"
import InputTel from "../../components/form/InputTel.vue"
import Submit from "../../components/form/Submit.vue"

export default {
  methods: {
    register() {
      const email = this.$refs.registerForm["email"].value;
      const password = this.$refs.registerForm["password"].value;
      const name = this.$refs.registerForm["name"].value;
      const dateBirth = this.$refs.registerForm["date"].value;
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
              language: "fr",
              currency: "€",
            })
            .then(() => {
              setAlert("Successfully registered!", false, true);
              this.$router.push("/");
            });
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
  },
  components: {
    InputText,
    InputMail,
    InputMDP,
    InputDate,
    InputTel,
    Submit
  }
};
</script>

<style scoped>
form{
  margin: 30px auto 0 auto;
  width: 80vw;
}

</style>
