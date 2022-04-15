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
    categories: [],
    comptes: [],
    transactions: []
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
    },
    comptes(state){
      return state.comptes
    },
    transactions(state){
      return state.transactions
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
    },
    DELETE_CATEGORIE(state, index){
      state.categories.splice(index, 1)
    },
    SET_COMPTES(state, data){
      state.comptes = data.comptes
    },
    ADD_NEW_COMPTE(state, data){
      state.comptes.push(data)
    },
    UPDATE_COMPTE(state, data){
      state.comptes[data.compteIndex] = {
        label: data.label,
        id: data.id,
        bankSolde: data.bankSolde,
        isLinkTrans: data.isLinkTrans,
        solde: data.solde,
      }
    },
    SET_TRANSACTIONS(state, data){
      state.transactions.push(data)
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
        firebase
          .firestore()
          .collection("comptes")
          .doc(auth.uid)
          .get()
          .then((doc) => {
            const data = doc.data();
            commit("SET_COMPTES", data);
          });
        const currentDate = new Date();
        const lastMonth = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const lastMonthY = currentDate.getMonth() === 0 ? currentYear-1 : currentYear
        const lastResultDate = `${('0' + lastMonth).slice(-2)}-${lastMonthY}`
        const currentResultDate = `${('0' + currentMonth).slice(-2)}-${currentYear}`

        firebase
          .firestore()
          .collection("transactions")
          .doc(auth.uid)
          .collection(lastResultDate)
          .get()
          .then((transactions) => {
            const trans = []
            for (let i = 0; i < transactions.docs.length; i++) {
              trans.push({
                id: transactions.docs[i].id,
                data: transactions.docs[i].data()
              })
            }
            const result = {
              month: lastResultDate,
              trans: trans
            }
            commit("SET_TRANSACTIONS", result);
          });
        firebase
          .firestore()
          .collection("transactions")
          .doc(auth.uid)
          .collection(currentResultDate)
          .get()
          .then((transactions) => {
            const trans = []
            for (let i = 0; i < transactions.docs.length; i++) {
              trans.push({
                id: transactions.docs[i].id,
                data: transactions.docs[i].data()
              })
            }
            const result = {
              month: currentResultDate,
              trans: trans
            }
            commit("SET_TRANSACTIONS", result);
          });
      } else {
        commit("SET_USER", null);
        commit("SET_CATEGORIES", []);
        commit("SET_COMPTES", []);
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
    },
    deleteOneCategorie({ commit }, id){
      const index = this.getters.categories.findIndex((categorie) => categorie.id === id)
      commit("DELETE_CATEGORIE", index);
    },
    addNewCompte({ commit }, data){
      commit("ADD_NEW_COMPTE", data)
    },
    updateOneCompte({ commit }, data){
      commit("UPDATE_COMPTE", data)
    }
  },
  modules: {
  }
})
