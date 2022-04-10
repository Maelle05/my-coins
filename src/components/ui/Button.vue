<template>
  <router-link class="Button" :to="url">
    <div>{{label}}</div>
  </router-link>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    label: String,
    url: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Button{
  text-decoration: none;
}

.Button div{
  width: 130px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-weight: 700;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 8px;
}
</style>