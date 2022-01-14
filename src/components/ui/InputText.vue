<template>
  <div class="InputText">
    <span>{{name}}</span>
    <br />
    <input type="text" name :placeholder="placeholder" :id="id" />
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    name: String,
    placeholder: String,
    id: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
