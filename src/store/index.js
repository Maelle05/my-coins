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
              phone: data.phoneNumber
            });
          });
      } else {
        commit("SET_USER", null);
      }
    }
  },
  modules: {
  }
})
