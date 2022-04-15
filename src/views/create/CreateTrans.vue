<template>
  <div class="CreateTrans">
    <h1>Nouvelle transaction</h1>
    <p>Spend : {{$route.params.spend}}</p>
    <form @submit.prevent="createTrans" ref="createTransForm">
      <input-num label="Valeur" />
      <input-date label="Date" />
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

export default {
  name: 'CreateTrans',
  components: {
    InputNum,
    InputDate,
    Button,
    Submit
  },
  methods: {
    createTrans(){
      console.log('coucou')
    }
  }
}
</script>

<style>
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

.BtContainer{
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

</style>