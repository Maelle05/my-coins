<template>
  <div class="Header">
    <div v-if="user.loggedIn" class="burger" v-on:click="handleBurger">
      <span></span>
      <span></span>
      <span></span>
      <div ref="menu" class="menu">
        <div class="content">
          <p>Menu</p>
          <router-link class="first" to="/dashboard" >Vue d’ensemble</router-link>
          <router-link to="/profil"> Profil </router-link>
        </div>
      </div>
    </div>
    <div v-else-if="url.loginOrRegister">
      <router-link to="/">
        <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 2L4 16.2133L19 28" stroke="#09152D" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </router-link>
    </div>
    <div v-else ></div>
    <img src="@/assets/svg/logo.svg" alt="" srcset="">
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Header",
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      url: "url"
    }),
  },
  methods: {
    handleBurger(){
      this.$refs.menu.classList.toggle('active')
    }
  }
};
</script>

<style scoped>
.Header{
  position: relative;
  top: 0;
  left: 0;
  width: 80vw;
  padding: 34px 0 0 0;
  margin: 0 10vw 0 10vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.burger span{
  display: block;
  width: 24px;
  height: 3.3px;
  border-radius: 50px;
  background-color: var(--color-orange);
  margin-top: 5px;
}

.menu{
  position: absolute;
  top: 0;
  left: -10vw;
  height: 100vh;
  width: 100vw;
  
  transform: translateX(-102vw);
  z-index: 1000;
  transition-duration: .3s;
}

.menu .content {
  height: 100%;
  width: 50vw;
  padding: 34px 10vw;
  color: var(--color-white);
  background-color: var(--color-black);
}

.menu p{
  font-family: 'graphik-semibold';
  font-size: 22px;
}

.menu a{
  display: block;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
  text-decoration: none;
  color: var(--color-white);
  margin-top: 19px;
}

.menu .content .first{
  margin-top: 41px;
}

.menu.active{
  transform: translateX(0vw);
}

</style>
