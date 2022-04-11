import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {
        id: '',
        email: '',
        name: '',
        birth: '',
        phone: '',
        language: '',
        currency: ''
      }
    },
    url: {
      loginOrRegister: false,
    },
    categories: []
  },
  getters: {
    user(state) {
      return state.user
    },
    url(state) {
      return state.url
    },
    categories(state){
      return state.categories
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_USER_EMAIL(state, email) {
      state.user.data.email = email;
    },
    SET_URL_LOGIN_OR_REGISTER(state, value) {
      state.url.loginOrRegister = value
    },
    ADD_NEW_CAT(state, value){
      state.categories.push(value)
    },
    SET_CATEGORIES(state, data){
      state.categories = data.categories
    },
    UPDATE_CATEGORIE(state, data){
      state.categories[data.catID] = {
        label: data.label,
        revenu: data.revenu,
        icon: data.icon,
        id: data.id
      }
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        const auth = getAuth().currentUser;
        firebase
          .firestore()
          .collection("users")
          .doc(auth.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            commit("SET_USER", {
              id: auth.uid,
              email: auth.email,
              name: data.displayName,
              birth: data.dateOfBirth,
              phone: data.phoneNumber,
              language: data.language,
              currency: data.currency
            });
          });
        firebase
          .firestore()
          .collection("categories")
          .doc(auth.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            commit("SET_CATEGORIES", data);
          });
      } else {
        commit("SET_USER", null);
        commit("SET_CATEGORIES", []);
      }
    },
    updateUser({ commit }, userInfo) {
      commit("SET_USER", {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        birth: userInfo.birth,
        phone: userInfo.phone,
        language: userInfo.language,
        currency: userInfo.currency
      });
    },
    updateMail({ commit }, email) {
      commit("SET_USER_EMAIL", email);
    },
    updateUrl({ commit }, url) {
      if ( url === '/login' || url === '/register') {
        commit("SET_URL_LOGIN_OR_REGISTER", true);
      }else{
        commit("SET_URL_LOGIN_OR_REGISTER", false);
      }
    },
    addNewCategories({ commit }, data) {
      commit("ADD_NEW_CAT", data)
    },
    updateCategories({ commit }, data){
      commit("SET_CATEGORIES", data);
    },
    updateOneCategorie({ commit }, data){
      commit("UPDATE_CATEGORIE", data);
    }
  },
  modules: {
  }
})
