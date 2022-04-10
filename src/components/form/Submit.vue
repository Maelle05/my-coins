<template>
  <button class="Submit" type="submit">{{label}}</button>
</template>

<script>
export default {
  name: "Submit",
  props: {
    label: String,
  }
};
</script>

<style scoped>
.Submit{
  all: unset;
  margin: 40px auto 0 auto;
  width: 222px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  font-weight: 700;
  background-color: var(--color-black);
  color: var(--color-white);
  border-radius: 13px;
}
</style>