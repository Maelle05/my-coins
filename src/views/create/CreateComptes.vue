<template>
  <div class="CreateCompte">
    <h1>Nouveau compte</h1>
    <form @submit.prevent="createCompte" ref="createCompteForm">
      <input-text label="Label" name="label"/>
      <input-num label="Solde" name="solde" value="0"/>
      <div class="BtContainer">
        <Button label="Annuler" url="/comptes" />
        <Submit label="Sauvegarder" small/>
      </div>
    </form>
  </div>
</template>

<script>
import InputText from "../../components/form/InputText.vue"
import InputNum from "../../components/form/InputNum.vue"
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
    InputNum,
    Button,
    Submit
  },
  computed: {
    ...mapGetters({
      user: "user",
      comptes: "comptes"
    }),
  },
  mounted(){
  },
  methods: {
    createCompte(){
      const label = this.$refs.createCompteForm['label'].value
      const solde = this.$refs.createCompteForm['solde'].value
      if(label === ''){
        setAlert('Un compte à besoin d\'un label', true , false)
      }else if(solde == ''){
        setAlert('Un compte à besoin d\'un solde', true , false)
      }else{
        this.$store.dispatch("addNewCompte", { id: Date.now() , label: label, solde: solde, bankSolde: solde, isLinkTrans: false });
        firebase
          .firestore()
          .collection("comptes")
          .doc(this.user.data.id)
          .set({
            comptes: this.comptes
          })
          .then(() => {
            setAlert("Successfully add compte", false, true);
            this.$router.push("/comptes");
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

.CreateCompte{
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
  margin-top: 30px;
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