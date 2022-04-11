<template>
  <div class="CreateCat">
    <h1>Nouvelle catégorie</h1>
    <form @submit.prevent="createCat" ref="createCatForm">
      <input-text label="Label" name="label"/>
      <div class="inputToggle">
        <span ref="depense" class="active" >Dépense</span>
        <span ref="revenu" >Revenu</span>
      </div>
      <p>Icones</p>
      <div class="iconsContainer" >
        <img v-for="index in total_icons_cat" v-bind:key="index" :src="icons[index-1]" :class="index === 1 ? 'active' : ''" :alt="`icon ${index-1}`" srcset="" >
      </div>
      <div class="BtContainer">
        <Button label="Annuler" url="/categories" />
        <Submit label="Sauvegarder" small/>
      </div>
    </form>
  </div>
</template>

<script>
import InputText from "../../components/form/InputText.vue"
import Submit from "../../components/form/Submit.vue"
import Button from "../../components/ui/Button.vue"
import { setAlert } from "../../utils";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { mapGetters } from "vuex";

export default {
  components: {
    InputText,
    Button,
    Submit
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      categories: "categories"
    }),
  },
  data(){
    return {
      total_icons_cat: require.context('../../assets/categories/', false, /\.(svg)$/).keys().length,
      icons: require.context('../../assets/categories/', false, /\.svg$/).keys().map(require.context('../../assets/categories/', false, /\.svg$/)),
      iconsElements: [],
    }
  },
  mounted(){
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
    createCat(){
      const label = this.$refs.createCatForm['label'].value
      if(label === ''){
        setAlert('Une catégorie à besoin d\'un label', true , false)
      }else{
        const revenu = this.$refs.revenu.classList.contains('active')
        const icon = this.$refs.createCatForm.querySelector('img.active').alt
        this.$store.dispatch("addNewCategories", { id: this.categories.length , label: label, revenu: revenu, icon: icon });
        firebase
          .firestore()
          .collection("categories")
          .doc(this.user.data.id)
          .set({
            categories: this.categories
          })
          .then(() => {
            setAlert("Successfully add categorie", false, true);
            this.$router.push("/categories");
          })
          .catch((error) => {
            setAlert(error.message, true, false);
          });
      }
      
    }
  }

}
</script>

<style scoped>

.CreateCat{
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