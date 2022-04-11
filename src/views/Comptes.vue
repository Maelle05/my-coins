<template>
  <div class="Comptes">
    <h1>Mes Comptes</h1>
    <div class="containerComptes">
      <div v-for="(compte, index) in comptes" v-bind:key="index">
        <p>{{compte.label}}</p>
        <span>{{compte.solde}} {{user.data.currency}}</span>
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
      comptes: "comptes",
      user: "user"
    }),
  },
  mounted(){
    console.log(this.comptes);
  }
}
</script>

<style scoped>
.Comptes{
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

.containerComptes{
  margin: 20px 0;
}

.containerComptes div{
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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