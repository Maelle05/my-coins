<template>
  <div class="Comptes">
    <h1>Mes Comptes</h1>
    <div class="containerComptes">
      <div v-for="(compte, index) in comptes" v-bind:key="index" class="Compte">
        <img :src="bg_comptes[getIndexBG(index)]" alt="" srcset="">
        <div class="content">
          <p>{{compte.label}}</p>
          <span class="solde">{{compte.solde}} {{user.data.currency}}</span>
          <span class="bankSolde">{{compte.bankSolde}} {{user.data.currency}}</span>
          <span class="bank">banque</span>
        </div>
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
  data(){
    return{
      total_bg_comptes: require.context('../assets/comptes/', false, /\.(svg)$/).keys().length,
      bg_comptes: require.context('../assets/comptes/', false, /\.svg$/).keys().map(require.context('../assets/comptes/', false, /\.svg$/)),
    }
  },
  mounted(){
    
  },
  methods:{
    getIndexBG(index){
      return index % this.total_bg_comptes 
    }
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

.containerComptes .Compte{
  margin: 10px 0;
  position: relative;
  filter: drop-shadow(3px 4px 20px rgba(0, 0, 0, 0.10));
  width: 100%;
  height: 100%;
}

.containerComptes .Compte .content{
  margin: 15px 20px;
  width: calc(100% - 40px);
  height: calc(100% - 30px);
  position: absolute;
  top: 0;
  left: 0;
}

.containerComptes .Compte .content p{
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
}

.containerComptes .Compte .content span.solde{
  display: block;
  text-align: right;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 30px;
  margin-top: 17px;
}

.containerComptes .Compte .content span.bankSolde{
  font-family: 'Inter';
  display: block;
  font-weight: 500;
  text-align: right;
  font-size: 12px;
  margin-top: 12px;
}

.containerComptes .Compte .content span.bank{
  font-family: 'Inter';
  display: block;
  font-weight: 500;
  text-align: right;
  font-size: 8px;
}


div.containerLink{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
}

a{
  margin-top: 30px;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  color: var(--color-black);
}
</style>