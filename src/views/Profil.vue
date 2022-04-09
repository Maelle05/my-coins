<template>
  <div class="Profil">
    <img src="@/assets/svg/profil.svg" alt="">
    <p class="first">Prénom : <span>{{user.data.name}}</span> </p>
    <p>Date de naissance : <span>{{user.data.birth}}</span> </p>
    <p>Téléphone : <span>{{user.data.phone}}</span></p>
    <p>Mail : <span>{{user.data.email}}</span> </p>
    <p>Langue : <span>{{user.data.language}}</span> </p>
    <p>Devise : <span>{{user.data.currency}}</span> </p>
    <!-- <router-link to="/profile/update">Modifier le profil</router-link> -->
    <br />
    <span class="link" @click="logout">Logout</span>
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
.Profil{
  width: 80vw;
  margin: 32px auto 0 auto;
}
img{
  width: 100%;
}

p{
  font-family: 'Inter';
  font-weight: 500;
  font-size: 19px;
  margin-top: 15px;
}

p span{
  font-weight: 200;
}

p.first{
  margin-top: 24px;
}

span.link{
  display: block;
  margin-top: 24px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  text-decoration: underline;
}
</style>