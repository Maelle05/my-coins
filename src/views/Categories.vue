<template>
  <div class="Categories">
    <h1>Categories </h1>
    <div >
      <img v-for="index in total_icons_cat" v-bind:key="index" :src="getImgUrl(index-1)" alt="" srcset="" >
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      total_icons_cat: require.context('../assets/categories/', false, /\.(svg)$/).keys().length,
      icons: require.context('../assets/categories/', false, /\.svg$/).keys().map(require.context('../assets/categories/', false, /\.svg$/))
    }
  },
  mounted(){
  },
  methods: {
    getImgUrl(i) {
      return this.icons[i]
    }
  }
}
</script>

<style scoped>
img{
  width: 30px;
  height: 30px;
}
</style>