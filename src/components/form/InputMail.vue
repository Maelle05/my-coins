<template>
  <div class="InputMail">
    <label ref="label" for="email" class="">{{label}}</label>
    <input ref="input" type="email" id="email" />
  </div>
</template>

<script>
export default {
  name: "InputMail",
  props: {
    label: String,
  },
  mounted(){
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
.InputMail{
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
  all: unset;
  font-family: 'graphik-semibold';
  border-bottom: 4px solid var(--color-orange);
  color: var(--color-black);
  padding: 12px 0 9px 0;
  font-size: 16px;
  width: 100%;
}
</style>