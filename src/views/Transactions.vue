<template>
  <div class="Transactions">
    <h1>Transactions</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Transactions",
  computed: {
    ...mapGetters({
      transactions: "transactions",
    }),
  },
  mounted(){
    console.log(this.transactions);
  }
}
</script>

<style scoped>
.Transactions{
  width: 80vw;
  margin: auto;
  margin-top: 40px ;
}

h1 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  color: var(--color-black);
}

</style>