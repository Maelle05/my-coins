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
      data: null
    }
  },
  getters: {
    user(state) {
      return state.user
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
      } else {
        commit("SET_USER", null);
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
    }
  },
  modules: {
  }
})
