<template>
  <div class="CreateTrans">
    <h1>Nouvelle transaction</h1>
    <p>Spend : {{$route.params.spend}}</p>

  </div>
</template>

<script>
export default {

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

</style>