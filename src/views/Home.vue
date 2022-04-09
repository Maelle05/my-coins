<template>
  <div class="home">
    <img src="@/assets/svg/home.svg" alt="" srcset="">

    <div v-if="user.loggedIn" class="DashboardContainer">
      <MainButton label="Dashboard" url="/dashboard" bg />
    </div>

    <div v-else class="LoginContainer">
      <MainButton label="Connexion" url="/login" bg />
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

<style scoped>
.home{
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

img{
  width: 80vw;
}

.LoginContainer{
  margin-top: 45px;
}

.DashboardContainer{
  margin-top: 45px;
}

</style>
