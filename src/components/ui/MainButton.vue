<template>
  <router-link class="MainButton" v-bind:class="{'bgPink': bgPink }" :to="url">
    <div>{{label}}</div>
  </router-link>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    label: String,
    url: String,
    bgPink: Boolean,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  display: inline-block;

  width: 40%;
  height: 40px;

  border-radius: 10px;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
}
.MainButton {
  border: solid 2px #f23279;
  color: #f23279;
}
.MainButton.bgPink {
  color: #fcfcfc;
  background-color: #f23279;
}
a > div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
