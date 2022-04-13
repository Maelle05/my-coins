<template>
  <div class="Comptes">
    <h1>Mes Comptes</h1>
    <div class="containerComptes">
      <div ref="Comptes" v-for="(compte, index) in comptes" v-bind:key="index" class="Compte">
        <img :src="bg_comptes[getIndexBG(index)]" alt="" srcset="">
        <div class="cta" ref="cta" @click='handleClickCompte(index)'>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="content">
          <p>{{compte.label}}</p>
          <span class="solde">{{compte.solde}} {{user.data.currency}}</span>
          <span class="bankSolde">{{compte.bankSolde}} {{user.data.currency}}</span>
          <span class="bank">banque</span>
        </div>
        <div class="CompteMenu" ref="CompteMenu">
          <div class="bg" ref="bg" @click='handleClickCompte(index)' ></div>
          <div class="links">
            <router-link :to="'/comptes/update/'+compte.id">Modifier</router-link>
            <span ref="suprBt" @click="handleClickSup(index)">Supprimer</span>
          </div>
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
import { setAlert } from '../utils'

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
    },

    handleClickCompte(i){
      this.$refs.CompteMenu[i].classList.toggle('active')
      
      if (this.$refs.CompteMenu[i].classList.value.includes('active')) {
        for (let y = 0; y < this.$refs.Comptes.length; y++) {
          if (i != y) {
            this.$refs.Comptes[y].style.pointerEvents = 'none'
          }
        }
      } else {
        for (let y = 0; y < this.$refs.Comptes.length; y++) {
          this.$refs.Comptes[y].style.pointerEvents = 'auto'
        }
      }
    },

    handleClickSup(i){
      setAlert('Cette feature n\'est pas encore disponible')
      this.handleClickCompte(i)
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

.cta {
  position: absolute;
  top: 0;
  right: 0;
  height: 56px;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cta span.dot {
  display: block;
  width: 5px;
  height: 5px;
  background-color: var(--color-black);
  margin: 2px;
  transform: translateY(-4px);
}

.containerComptes{
  margin: 20px 0;
  position: relative;
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

.CompteMenu{
  opacity: 0%;
  pointer-events: none;
  z-index: 20;
  transition-duration: .3s;
}

.CompteMenu .links{
  position: absolute;
  background-color: var(--color-blue);
  width: 186px;
  height: 88px;
  border-radius: 14px;
  right: 0;
  top: -30px;
  filter: drop-shadow(3px 4px 20px rgba(0, 0, 0, 0.19));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.CompteMenu .links a{
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  margin-top: 0;
}

.CompteMenu .links span{
  margin-top: 20px;
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
}

.CompteMenu .bg{
  content: '';
  position: absolute;
  background-color: var(--color-black);
  opacity: 0;
  width: 100vw;
  height: 200vh;
  top: -100vh;
  left: -10vw;
  border-radius: 0;
}

.CompteMenu.active{
  opacity: 1 !important;
  pointer-events: all !important;
}

</style>