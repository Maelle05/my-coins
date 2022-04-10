<template>
  <button class="Submit" type="submit" :class="small ? 'small' : '' ">{{label}}</button>
</template>

<script>
export default {
  name: "Submit",
  props: {
    label: String,
    small: Boolean
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

.Submit.small{
  margin: 0;
  width: 130px;
  height: 43px;
  border-radius: 8px;
}
</style>