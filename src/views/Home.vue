<template>
  <div class="home">
    <h1>
      Bienvenue
      <br />sur
      <span>My Coins</span>
      👋
    </h1>
    <p>L'application la plus pratique pour gérer son argent</p>

    <div v-if="user.loggedIn">
      <MainButton label="Voir mon Dashboard" url="/dashboard" bgPink />
    </div>

    <div v-else class="LoginContainer">
      <MainButton label="Connexion" url="/login" bgPink />
      <MainButton label="Inscription " url="/register" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainButton from "@/components/ui/MainButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    MainButton,
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>

<style>
.LoginContainer {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
