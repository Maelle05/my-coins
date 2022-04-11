<template>
  <div class="UpdateCat">
    <h1>Modifier Categorie {{catID}}</h1>
  </div>
</template>

<script>
export default {
  name: 'UpdateCat',
  data(){
    return {
      catID: this.$route.params.id
    }
  },
  mounted(){

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
</style>