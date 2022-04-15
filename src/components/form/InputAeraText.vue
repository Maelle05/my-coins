<template>
  <div class="InputAeraText">
    <label :for="name">{{label}}</label>
    <textarea :id="name" :name="name" :value="value? value : '' ">
    </textarea>
  </div>
</template>

<script scoped>
export default {
  name: "InputAeraText",
  props: {
    label: String,
    value: String,
    name: String
  }
}
</script>

<style scoped>
.InputAeraText{
  margin-top: 10px;
}

label{
  display: block;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  margin: 0 0 5px 0;
}

textarea{
  all: unset;
  width: calc(100%);
  min-height: 135px;
  resize: none;
  border: solid var(--color-orange) 3px;
  padding: 10px;
  box-sizing: border-box;
}

</style>