<template>
  <div id="app">
    <AlertBox />
    <Header />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/VHeader.vue";
import AlertBox from "./components/ui/AlertBox.vue";
export default {
  components: { AlertBox, Header },
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
 @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"); /* Inter */
@font-face { font-family: "graphik-regular"; src: url("/fonts/graphik-regular.woff") format("woff") }
@font-face { font-family: "graphik-bold"; src: url("/fonts/graphik-bold.woff") format("woff") }
@font-face { font-family: "graphik-medium"; src: url("/fonts/graphik-medium.woff") format("woff") }
@font-face { font-family: "graphik-semibold"; src: url("/fonts/graphik-semibold.woff") format("woff") }

* {
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #fff;
  --color-white: #fff;
  --color-black: #051129;
  --color-gray: #C4C4C4;
  --color-orange: #F25C2E;
  --color-dark-orange: #CA4D27;
  --color-blue: #B8DFE2;
  --color-dark-blue: #94BBBE;
}
</style>
