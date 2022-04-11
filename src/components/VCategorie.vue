<template>
  <div class="VCategorie">
    <img :src="icons[getIconId(icon)]" alt="" srcset="" >
    <p>{{label}}</p>
    <div class="cta" ref="cta" @click='handleClickCta'>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="menuCat" ref="menuCat">
      <div class="bg" ref="bg" @click='handleClickCta' ></div>
      <div class="links">
        <router-link :to="'/categories/update/'+idCat">Modifier</router-link>
        <span ref="suprBt" @click="handleClickSup()">Supprimer</span>
      </div>
      <div class="areYouSure" ref="areYouSure">
        <h2>Etes-vous sûr de vouloir supprimer cette catégorie ?</h2>
        <p>Toutes les transactions lier seront insérées dans la catégorie "Autre"</p>
        <button @click="handleClickCta">Annuler</button>
        <button @click="suprCat">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { setAlert } from '../utils'
import firebase from "firebase/compat/app";
export default {
  name: "VCategorie",
  props: {
    label: String,
    icon: String,
    idCat: Number
  },
  data(){
    return {
      total_icons_cat: require.context('../assets/categories/', false, /\.(svg)$/).keys().length,
      icons: require.context('../assets/categories/', false, /\.svg$/).keys().map(require.context('../assets/categories/', false, /\.svg$/)),
    }
  },
  mounted(){
  },
  computed: {
    ...mapGetters({
      user: "user",
      categories: "categories"
    }),
  },
  methods: {
    handleClickCta(){
      this.$refs.menuCat.classList.toggle('active')
      this.$refs.areYouSure.classList.remove('active')
    },
    handleClickSup(){
      this.$refs.areYouSure.classList.add('active')
    },
    getIconId(key){
      return key.match(/\d+/g)[0]
    },
    suprCat(){
      this.$store.dispatch("deleteOneCategorie", this.idCat);
      this.handleClickCta()
      firebase
        .firestore()
        .collection("categories")
        .doc(this.user.data.id)
        .set({
          categories: this.categories
        })
        .then(() => {
          setAlert("La categorie a bien été supprimer", false, true);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    }
  }
}
</script>

<style scoped>
.VCategorie{
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  margin-top: 12px;
  border-bottom: 1px var(--color-black) solid ;
}

img{
  width: 37px;
  margin: 0 10px;
}

p{
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
}

.cta {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span.dot {
  display: block;
  width: 5px;
  height: 5px;
  background-color: var(--color-black);
  margin: 2px;
  transform: translateY(-4px);
}

.menuCat{
  opacity: 0%;
  pointer-events: none;
  z-index: 20;
  transition-duration: .3s;
}

.menuCat .links{
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

.menuCat .links a{
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
}

.menuCat .links span{
  margin-top: 20px;
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
}

.menuCat .bg{
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

.menuCat.active{
  opacity: 1 !important;
  pointer-events: all !important;
}

.areYouSure{
  display: none;
  position: absolute;
  width: 75vw;
  top: 0;
  left: 0;
  padding: 2.5vw;
  background-color: var(--color-white);
  transform: translateY(-40px);
  border-radius: 13px;
  filter: drop-shadow(3px 4px 20px rgba(0, 0, 0, 0.19));
  text-align: center;
}

.areYouSure h2{
  color: var(--color-black);
  font-family: 'Roboto';
  font-weight: 700;
  font-size: 20px;
  margin-top: 10px;
}

.areYouSure p{
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
  margin-top: 5px;
}

.areYouSure button{
  all: unset;
  background-color: var(--color-black);
  width: 100px;
  height: 30px;
  border-radius: 8px;
  color: var(--color-white);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  margin: 15px;
}

.areYouSure.active{
  display: block;
}
</style>