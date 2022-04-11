<template>
  <div class="Categories">
    <h1>Categories </h1>
    <div class="catNav">
      <span ref="btDepense" class="active"> Dépense </span>
      <span ref="btRevenu"> Revenu </span>
    </div>
    <div class="catsContainer depenceContainer active" ref="depenceContainer">
      
      <div v-for="(cat, index) in cat.depence" v-bind:key="'depence'+index">
        <VCategorie :label="cat.categorie.label" :icon="cat.categorie.icon" :idCat="cat.categorie.id"/>
      </div>
    </div>
    <div class="catsContainer revenuContainer" ref="revenuContainer">
      <div v-for="(cat, index) in cat.revenu" v-bind:key="'revenu'+index" >
        <VCategorie :label="cat.categorie.label" :icon="cat.categorie.icon" :idCat="cat.categorie.id"/>
      </div>
    </div>
    <div>
      <div class="containerLink"><router-link to="/categories/create">ajouter une nouvelle categorie</router-link></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VCategorie from "../components/VCategorie.vue"

export default {
  name: 'App',
  components: {
    VCategorie
  },
  data(){
    return {
      cat: {
        revenu: [],
        depence: []
      }
    }
  },
  computed: {
    ...mapGetters({
      categories: "categories"
    }),
  },
  mounted(){
    this.categories.forEach((categorie, index) => {
      if (categorie.revenu) {
        this.cat.revenu.push({categorie, index})
      }else{
        this.cat.depence.push({categorie, index})
      }
    });
    this.$refs.btDepense.addEventListener('click', ()=> {
      this.$refs.btDepense.classList.add('active')
      this.$refs.depenceContainer.classList.add('active')
      this.$refs.btRevenu.classList.remove('active')
      this.$refs.revenuContainer.classList.remove('active')
    })
    this.$refs.btRevenu.addEventListener('click', ()=> {
      this.$refs.btRevenu.classList.add('active')
      this.$refs.revenuContainer.classList.add('active')
      this.$refs.btDepense.classList.remove('active')
      this.$refs.depenceContainer.classList.remove('active')
    })
  },
}
</script>

<style scoped>
.Categories{
  width: 80vw;
  margin: auto;
  margin-top: 40px;
}

h1 {
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 18px;
  color: var(--color-black);
}

.catNav{
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.catNav span{
  font-family: 'Inter';
  font-weight: 400;
  font-size: 16px;
  color: var(--color-black);
}

.catNav span.active{
  text-decoration: underline var(--color-orange) 3px;
}

.catsContainer{
  margin-top: 25px;
  display: none;
}

.catsContainer.active{
  display: block;
}

img{
  width: 30px;
  height: 30px;
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