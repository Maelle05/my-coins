<template>
  <div class="UpdateCompte">
    <h1>Modifier Compte </h1>
    <form @submit.prevent="updateCompte" ref="updateCompteForm">
      <input-text label="Label" name="label" :value="this.compte.label"/>
      <br>
      <div v-if="this.compte.isLinkTrans === true" >
        <input-num  label="Solde" name="solde" :value="this.compte.solde" disabled/>
        <p>Des transactions sont liées à ce compte, vous ne pouvez plus modifier son solde</p>
      </div>
      <input-num v-else label="Solde" name="solde" :value="this.compte.solde" />
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
import { mapGetters } from "vuex";

export default {
  name: 'UpdateCompte',
  components: {
    InputText,
    InputNum,
    Button,
    Submit
  },
  methods: {
    updateCompte(){
      console.log('coucou')
    }
  },
  computed: {
    ...mapGetters({
      comptes: "comptes",
    }),
  },
  data(){
    return {
      compteID: this.$route.params.id,
      compte: {
        label: ''
      }
    }
  },
  mounted(){
    const index = this.comptes.findIndex((compte) => compte.id == this.compteID)
    this.compte = this.comptes[index]
  }

}
</script>

<style scoped>
.UpdateCompte{
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

form p {
  font-family: 'Inter';
  font-size: 10px;
  margin-top: 5px;
}

.BtContainer{
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>