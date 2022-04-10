<template>
  <router-link class="MainButton" v-bind:class="{'bg': bg }" :to="url">
    <div>{{label}}</div>
  </router-link>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    label: String,
    url: String,
    bg: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.MainButton{
  text-decoration: none;
}

.MainButton div{
  width: 222px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-weight: 700;
  color: var(--color-black);
}

.MainButton.bg div{
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 13px;
}
</style>
