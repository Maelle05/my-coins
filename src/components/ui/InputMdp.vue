<template>
  <div class="InputMdp">
    <span>{{name}}</span>
    <br />
    <input type="password" name :id="id" />
  </div>
</template>

<script>
export default {
  name: "InputMdp",
  props: {
    name: String,
    id: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>