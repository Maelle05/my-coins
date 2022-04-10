<template>
  <div class="VCategorie">
    <img :src="icons[getIconId(icon)]" alt="" srcset="" >
    <p>{{label}}</p>
    
  </div>
</template>

<script>
export default {
  name: "VCategorie",
  props: {
    label: String,
    icon: String,
    indexCat: Number
  },
  data(){
    return {
      total_icons_cat: require.context('../assets/categories/', false, /\.(svg)$/).keys().length,
      icons: require.context('../assets/categories/', false, /\.svg$/).keys().map(require.context('../assets/categories/', false, /\.svg$/)),
    }
  },
  methods: {
    getIconId(key){
      return key.match(/\d+/g)[0]
    }
  }
}
</script>

<style scoped>
.VCategorie{
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
</style>