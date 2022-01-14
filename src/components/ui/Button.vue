<template>
  <div class="Button">
    <button>{{label}}</button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>