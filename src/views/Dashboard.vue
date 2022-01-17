<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>
      Bienvenue sur ton dashboard
      <strong v-if="user.data.name">{{user.data.name}}</strong>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>