<template>
  <div class="UpdateCat">
    <h1>Modifier Categorie </h1>
    <form @submit.prevent="updateCat" ref="createCatForm">
      <input-text label="Label" name="label" :value="categories[catID].label"/>
      <div class="inputToggle">
        <span ref="depense" :class="categories[catID].revenu ? '' : 'active' " >Dépense</span>
        <span ref="revenu" :class="categories[catID].revenu ? 'active' : '' " >Revenu</span>
      </div>
      <p>Icones</p>
      <div class="iconsContainer" >
        <img v-for="index in total_icons_cat" v-bind:key="index" :src="icons[index-1]" :class="index-1 == getIconId(categories[catID].icon) ? 'active' : ''" :alt="`icon ${index-1}`" srcset="" >
      </div>
      <div class="BtContainer">
        <Button label="Annuler" url="/categories" />
        <Submit label="Sauvegarder" small/>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InputText from "../../components/form/InputText.vue"
import Submit from "../../components/form/Submit.vue"
import Button from "../../components/ui/Button.vue"
import { setAlert } from "../../utils";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: 'UpdateCat',
  components: {
    InputText,
    Button,
    Submit
  },
  data(){
    return {
      catID: this.$route.params.id,
      total_icons_cat: require.context('../../assets/categories/', false, /\.(svg)$/).keys().length,
      icons: require.context('../../assets/categories/', false, /\.svg$/).keys().map(require.context('../../assets/categories/', false, /\.svg$/)),
      iconsElements: [],
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      categories: "categories"
    }),
  },
  mounted(){
    if (this.categories.lenght < this.catID) {
      this.$router.push("/categories");
    }

    this.$refs.revenu.addEventListener('click', ()=>{
      this.$refs.revenu.classList.add('active')
      this.$refs.depense.classList.remove('active')
    })
    this.$refs.depense.addEventListener('click', ()=>{
      this.$refs.depense.classList.add('active')
      this.$refs.revenu.classList.remove('active')
    })

    this.iconsElements = document.querySelectorAll('.iconsContainer img')
    this.iconsElements.forEach(iconEl => {
      iconEl.addEventListener('click', ()=>{
        this.iconsElements.forEach(icon => {
          icon.classList.remove('active')
        });
        iconEl.classList.add('active')
      })
    });
  },
  methods: {
    updateCat(){
      const label = this.$refs.createCatForm['label'].value
      const revenu = this.$refs.revenu.classList.contains('active')
      const icon = this.$refs.createCatForm.querySelector('img.active').alt
      this.$store.dispatch("updateOneCategorie", { label: label, revenu: revenu, icon: icon, catID: this.catID});
      firebase
        .firestore()
        .collection("categories")
        .doc(this.user.data.id)
        .set({
          categories: this.categories
        })
        .then(() => {
          setAlert("La categorie a bien été modifier", false, true);
          this.$router.push("/categories");
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
    getIconId(key){
      return key.match(/\d+/g)[0]
    }
  }
}
</script>

<style>
.UpdateCat{
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

form{
  width: 100%;
  margin-top: 40px;
}

.inputToggle{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
  font-family: 'Inter';
  font-weight: 500;
  color: var(--color-black) ;
  
}

.inputToggle span {
  display: block;
  padding: 3px 8px;
}

.inputToggle span.active {
  color: var(--color-white);
  background-color: var(--color-orange);
  border-radius: 8px;
}

form p{
  font-family: 'Inter';
  font-weight: 300;
  font-size: 16px;
  margin-top: 32px;
}

.iconsContainer{
  margin-top: 12px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.iconsContainer img{
  width: 39px;
  height: 39px;
  margin: 10px;
}

.iconsContainer img.active{
  border: solid 3px var(--color-black);
  border-radius: 999px;
  box-sizing: border-box;
}

.BtContainer{
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>