<template>
  <div class="InputTel">
    <label ref="label" for="tel" class="">{{label}}</label>
    <input ref="input" type="tel" id="tel" :value="value ? value : ''" />
  </div>
</template>

<script>
export default {
  name: "InputTel",
  props: {
    label: String,
    value: String
  },
  mounted(){
    if (this.value) {
      this.$refs.label.classList.add('out')
    }
    this.$refs.input.addEventListener('focus', () => {
      this.$refs.label.classList.add('out')
    });
    this.$refs.input.addEventListener('focusout', () => {
      if (this.$refs.input.value) {
        this.$refs.label.classList.add('out')
      }else{
        this.$refs.label.classList.remove('out')
      }
      
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.InputTel{
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
  pointer-events: none;

  transition-duration: .3s;
}

label.out {
  font-size: 12px;
  transform: translateY(-10px);
}

input {
  all: unset;
  font-family: 'Roboto';
  font-weight: 700;
  border-bottom: 4px solid var(--color-orange);
  color: var(--color-black);
  padding: 12px 0 9px 0;
  font-size: 16px;
  width: 100%;
}
</style>