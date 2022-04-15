<template>
  <div class="Transactions">
    <h1>Transactions</h1>
    <div class="containerLink"><router-link to="/transactions/create/1">ajouter une depense</router-link></div>
    <div class="containerLink"><router-link to="/transactions/create/0">ajouter un revenu</router-link></div>
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

div.containerLink{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

a{
  margin-top: 30px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  color: var(--color-black);
}

</style>