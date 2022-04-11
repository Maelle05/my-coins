<template>
  <div class="Comptes">
    <h1>Mes Comptes</h1>
    <div>
      <div v-for="(compte, index) in comptes" v-bind:key="index">
        <p>{{compte.label}}</p>
        <span>{{compte.solde}}</span>
      </div>
    </div>
    <div>
      <div class="containerLink"><router-link to="/comptes/create">ajouter un nouveau compte</router-link></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'Comptes',
  computed: {
    ...mapGetters({
      comptes: "comptes"
    }),
  },
  mounted(){
    console.log(this.comptes);
  }
}
</script>

<style scoped>
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