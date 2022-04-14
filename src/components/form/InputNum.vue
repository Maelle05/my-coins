<template>
  <div class="InputNum">
    <label ref="label" :for="name" class="" :class="{ disabled: disabled, 'out': value }">{{label}}</label>
    <input ref="input" type="number" :id="name" :value="value ? value : ''" :disabled="disabled" :class="disabled ? 'disabled' : '' " />
    <span :class="disabled ? 'disabled' : '' " >{{user.data.currency}}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "InputNum",
  props: {
    label: String,
    name: String,
    value: String,
    disabled: Boolean
  },
  computed: {
    ...mapGetters({
      user: "user"
    }),
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
.InputNum{
  position: relative;
  margin-top: 20px;
}

label {
  pointer-events: none;
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

label.disabled {
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
  width: 60%;
}

input.disabled {
  border-bottom: 4px solid var(--color-gray);
  color: var(--color-gray);
}

span{
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
  display: inline-block;
  margin: 0 0 0 8px;
  transform: translateY(5px);
}

span.disabled{
  color: var(--color-gray);
}
</style>