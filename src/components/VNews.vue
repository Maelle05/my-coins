<template>
  <div class="News oneNewsContainer">
    <div class="newsHeader">
      <h3>{{title}}</h3>
      <span>{{date}}</span>
    </div>
    <div class="newsContent">
      <p>{{content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  props: {
    title: String,
    date: String,
    content: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.NewsContainer .oneNewsContainer {
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  background-color: var(--color-white);
  margin: 10px 0 0 0;
  padding: 15px 15px;
  border-radius: 20px;
  position: relative;
}

.NewsContainer .oneNewsContainer span {
  color: var(--color-blue);
  font-size: 14px;
  position: absolute;
  top: 18px;
  right: 15px;
}
</style>
