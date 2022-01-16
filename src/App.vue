<template>
  <div id="app">
    <div id="AppContainer">
      <router-view />
    </div>
    <alert-box />
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="user.loggedIn" to="/dashboard">Dashboard</router-link>
      <router-link v-if="user.loggedIn" to="/profile">Profil</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlertBox from "./components/ui/AlertBox.vue";
export default {
  components: { AlertBox },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  methods: {},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #fafafa;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-gray: #dddddd;
  --color-gray-text: #bfc0c4;
  --color-pink: #f23279;
  --color-blue: #33c9ff;
  --color-green: #41e94b;
  --color-red: #f05454;
}

#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

body {
  background-color: var(--color-bg);
}

#AppContainer {
  padding: 0 20px;
}

h1 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  margin: 20px 0 0 0;
}
h1 > span {
  color: var(--color-pink);
  font-weight: 700;
}
h2,
h3 {
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
}
p {
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  margin: 10px 0 0 0;
}
span {
  font-family: "Montserrat", sans-serif;
  font-weight: 100;
}

form {
  margin: 20px 0;
}

form label {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: block;
  color: var(--color-gray-text);
  font-size: 12px;
  margin: 20px 0 0 0;
}

form input {
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  display: block;
  color: var(--color-gray);
  font-size: 20px;
  border: none;
  background-color: var(--color-bg);
  margin-top: 5px;
  width: 100%;
  padding: 0 0 5px 0;
  border-bottom: 2px solid;
}

form input::placeholder {
  color: var(--color-gray);
  opacity: 1;
}

form button {
  width: 40%;
  height: 40px;
  border-radius: 10px;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  color: var(--color-white);
  background-color: var(--color-pink);
  border: none;
  margin: 30px 0 0 0;
}
</style>
