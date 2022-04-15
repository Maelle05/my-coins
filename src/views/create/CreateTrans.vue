<template>
  <div class="CreateTrans">
    <h1>Nouvelle transaction</h1>
    <form @submit.prevent="createTrans" ref="createTransForm">
      <input-num label="Valeur"  name="valeur"/>
      <div class="flex">
        <v-input-comptes />
        <input-date label="Date" />
      </div>
      <v-input-cat :spend="$route.params.spend"/>
      <input-aera-text label="Description" name="description"/>
      <div class="BtContainer">
        <Button label="Annuler" url="/transactions" />
        <Submit label="Sauvegarder" small/>
      </div>
    </form>
  </div>
</template>

<script>
import InputNum from '../../components/form/InputNum.vue'
import InputDate from '../../components/form/InputDate.vue'
import Button from '../../components/ui/Button.vue'
import Submit from '../../components/form/Submit.vue'
import InputAeraText from '../../components/form/InputAeraText.vue'
import VInputComptes from '../../components/VInputComptes.vue'
import VInputCat from '../../components/VInputCat.vue'


import { setAlert } from '../../utils'
import { v4} from 'uuid';

export default {
  name: 'CreateTrans',
  components: {
    InputNum,
    InputDate,
    VInputComptes,
    VInputCat,
    InputAeraText,
    Button,
    Submit
  },
  methods: {
    createTrans(){
      const valeur = parseFloat(this.$refs.createTransForm['valeur'].value)
      if (valeur) {
        const date = this.$refs.createTransForm['date'].value
        const compte = this.$refs.createTransForm['comptes-select'].value
        const categorie = this.$refs.createTransForm['cat-select'].value
        const desc = this.$refs.createTransForm['description'].value
        const id = v4()
        console.log(this.$route.params);
        console.log({
          valeur: valeur,
          date: date,
          compte: compte,
          categorie: categorie,
          description: desc,
          id: id,
          revenu: this.$route.params.spend === "1" ? false : true
        });
        setAlert("Cette feature n'est pas encore disponible", false, false);
      }else{
        setAlert("Une transaction doit avoir un montent", true, false);
      }
    }
  }
}
</script>

<style scoped>
.CreateTrans{
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
  margin-top: 50px;
}

.flex{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}

.InputDate{
  margin-right: 12px;
}

.BtContainer{
  margin-top: 22px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>