<template>
  <div class="VCategorie">
    <img :src="icons[getIconId(icon)]" alt="" srcset="" >
    <p>{{label}}</p>
    <div class="cta" ref="cta" @click='handleClickCta'>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="menuCat" ref="menuCat">
      <div class="bg" ref="bg" @click='handleClickCta' ></div>
      <div class="links">
        <router-link :to="'/categories/update/'+indexCat">Modifier</router-link>
        <span ref="suprBt">Supprimer</span>
      </div>
    </div>
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
  mounted(){
    this.$refs.suprBt.addEventListener('click', ()=>{
      alert('Cette action n\'est pas encore disponible')
    })
  },
  methods: {
    handleClickCta(){
      this.$refs.menuCat.classList.toggle('active')
    },
    getIconId(key){
      return key.match(/\d+/g)[0]
    }
  }
}
</script>

<style scoped>
.VCategorie{
  position: relative;
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

.cta {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

span.dot {
  display: block;
  width: 5px;
  height: 5px;
  background-color: var(--color-black);
  margin: 2px;
  transform: translateY(-4px);
}

.menuCat{
  opacity: 0%;
  pointer-events: none;
  z-index: 20;
  transition-duration: .3s;
}

.menuCat .links{
  position: absolute;
  background-color: var(--color-blue);
  width: 186px;
  height: 88px;
  border-radius: 14px;
  right: 0;
  top: -30px;
  filter: drop-shadow(3px 4px 20px rgba(0, 0, 0, 0.19));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menuCat .links a{
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
}

.menuCat .links span{
  margin-top: 20px;
  color: var(--color-black);
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  text-decoration: underline;
}

.menuCat .bg{
  content: '';
  position: absolute;
  background-color: var(--color-black);
  opacity: 0%;
  width: 100vw;
  height: 200vh;
  top: -100vh;
  left: -10vw;
  border-radius: 0;
}

.menuCat.active{
  opacity: 100%;
  pointer-events: all;
}
</style>