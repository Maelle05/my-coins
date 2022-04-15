<template>
  <div class="InputDate">
    <label ref="label" for="date" class="out">{{label}}</label>
    <input ref="input" type="date" id="date" :value="value ? value : getCurentDate()" >
  </div>
</template>

<script>
export default {
  name: "InputDate",
  props: {
    label: String,
    value: String
  },
  mounted(){
    this.$refs.input.max = new Date().toLocaleDateString('en-ca')
  },
  methods:{
    getCurentDate(){
      const today = new Date();
      const date = today.getFullYear() + '-' + this.padTo2Digits(today.getMonth()+1) + '-' + this.padTo2Digits(today.getDate());
      return date
    },
    padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.InputDate{
  position: relative;
  margin-top: 20px;
}

label {
  display: block;
  position: absolute;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  transform: translateY(11px);

  transition-duration: .3s;
}

label.out {
  font-size: 12px;
  transform: translateY(-10px);
}

input {
  /* all: unset; */
  border: none;
  background-color: var(--color-white);
  font-family: 'Roboto';
  font-weight: 700;
  border-bottom: 4px solid var(--color-orange) !important;
  color: var(--color-black) !important;
  padding: 12px 0 9px 0;
  font-size: 16px;
  width: 100%;
}

input:focus{
  outline: none;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--color-black);
  opacity: 1; /* Firefox */
}
</style>