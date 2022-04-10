<template>
  <div class="UpdateProfil">
    <h1>Modifier mon profil </h1>
    <form @submit.prevent="updateInfo" ref="updateProfileForm">
      <InputText label="Prénom" name="name" :value="user.data.name"/>
      <InputTel label="Téléphone" :value="user.data.phone"/>
      <!-- <InputMail label="E-mail" :value="user.data.email"/> -->
      <InputDate label="Date de naissance" :value="user.data.birth"/>
      
      <Submit label="Enregistrer" />
    </form>
    <!-- <h2>Modifier mon mot de passe</h2>
    <form @submit.prevent="" ref="Form" id="MdpForm">
      <label for="password">Mon nouveau Mot de passe</label>
      <input type="password" id="password" />
      <button type="submit">Ok</button>
    </form> -->
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getAuth, updateEmail, updatePassword } from "firebase/auth";
// import { getAuth, updateEmail } from "firebase/auth";
import { setAlert } from "../../utils";
import { mapGetters } from "vuex";
import store from "../../store";

import InputText from "../../components/form/InputText.vue"
// import InputMail from "../../components/form/InputMail.vue"
import InputDate from "../../components/form/InputDate.vue"
import InputTel from "../../components/form/InputTel.vue"
import Submit from "../../components/form/Submit.vue"

export default {
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  components: {
    InputText,
    // InputMail,
    InputDate,
    InputTel,
    Submit
  },
  methods: {
    updateInfo() {
      // const email = this.$refs.updateProfileForm["email"].value;
      const name = this.$refs.updateProfileForm["name"].value;
      const dateBirth = this.$refs.updateProfileForm["date"].value;
      const tel = this.$refs.updateProfileForm["tel"].value;

      // if (this.user.data.email != email) {
      //   const auth = getAuth();
      //   updateEmail(auth.currentUser, email)
      //     .then(() => {
      //       setAlert("Ton mail à été modifier avec succès ! ", false, true);
      //       store.dispatch("updateMail", email);
      //       this.$router.push("/profile");
      //     })
      //     .catch((error) => {
      //       setAlert(error.message, true, false);
      //     });
      // }

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
              email: this.user.data.mail,
              name: name,
              birth: dateBirth,
              phone: tel,
              language: "fr",
              currency: "€",
            };
            store.dispatch("updateUser", userInfo);
            this.$router.push("/profil");
          })
          .catch((error) => {
            setAlert(error.message, true, false);
          });
      } else {
        setAlert("Tu n'as fait aucune modification ...", true, false);
      }
    },
    // () {
    //   const newPassword = this.$refs.Form["password"].value;

    //   const auth = getAuth();
    //   const user = auth.currentUser;

    //   updatePassword(user, newPassword)
    //     .then(() => {
    //       setAlert(
    //         "Ton Mot de passe à été modifier avec succès ! ",
    //         false,
    //         true
    //       );
    //       this.$router.push("/profile");
    //     })
    //     .catch((error) => {
    //       setAlert(error.message, true, false);
    //       console.log(error.message);
    //     });
    // },
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
  margin-top: 57px ;
}

h1 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  color: var(--color-black);
}
</style>
