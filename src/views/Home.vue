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
    <div class="NewsContainer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainButton from "@/components/ui/MainButton.vue";
import { mapGetters } from "vuex";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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
  mounted() {
    firebase
      .firestore()
      .collection("News")
      .get()
      .then((snapshot) => {
        let html = "";
        snapshot.docs.forEach((doc) => {
          const news = doc.data();
          const containerNews = `
          <div class='oneNewsContainer'>
            <div class='newsHeader'>
              <h3> ${news.title} </h3>
              <span> ${news.date} </span>
            </div>
            <div class='newsContent'>
              <p> ${news.content} </p>
            </div>
          </div>`;
          html += containerNews;
        });
        document.querySelector(".NewsContainer").innerHTML = html;
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
}

.NewsContainer .oneNewsContainer {
  background-color: var(--color-white);
  margin: 10px 0 0 0;
  padding: 15px 15px;
  border-radius: 20px;
  position: relative;
}

.NewsContainer .oneNewsContainer span {
  color: var(--color-blue);
  font-size: 14px;
  position: absolute;
  top: 18px;
  right: 15px;
}
</style>
