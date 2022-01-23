<template>
  <div class="home">
    <h1>
      Bienvenue
      <br />sur
      <span>My Coins</span>
      👋
    </h1>
    <p>L'application la plus pratique pour gérer son argent</p>

    <div v-if="user.loggedIn" class="DashboardContainer">
      <MainButton label="Dashboard" url="/dashboard" bgPink />
    </div>

    <div v-else class="LoginContainer">
      <MainButton label="Connexion" url="/login" bgPink />
      <MainButton label="Inscription " url="/register" />
    </div>

    <h2 class="title">Les News 👇</h2>
    <div class="NewsContainer">
      <div v-for="element in news" :key="element.id">
        <VNews :title="element.title" :date="element.date" :content="element.content" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainButton from "@/components/ui/MainButton.vue";
import VNews from "@/components/VNews.vue";
import { mapGetters } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: "Home",
  components: {
    MainButton,
    VNews,
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  data() {
    return {
      news: [],
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("News")
      .onSnapshot((snapshot) => {
        this.news = [];
        snapshot.docs.forEach((newsEl) => {
          this.news.push(newsEl.data());
        });
      });
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

.DashboardContainer {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

h2.title {
  margin: 30px 0 0 0;
}

.NewsContainer {
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: column-reverse;
}
</style>
