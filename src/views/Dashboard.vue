<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>
      Bienvenue sur ton dashboard
      <strong>{{user.data.displayName}}</strong>
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