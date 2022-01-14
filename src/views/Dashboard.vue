<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Bienvenue sur ton dashboard {{user.data.email}}</p>
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