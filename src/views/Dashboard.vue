<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>
      Bienvenue sur ton dashboard
      <strong v-if="user.data.name">{{user.data.name}}</strong>
    </p>
    <div class="MainDashboard">
      <p>
        <strong>Mes livrets</strong>
      </p>
      <div class="navAccounts">
        <div v-for="account of accounts" :key="account.id" class="navAccount">
          <p>{{account.name}}</p>
        </div>
        <div @click="addAccount">
          <AddButton></AddButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddButton from "../components/ui/AddButton.vue";
import { setAlert } from "../utils";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default {
  name: "Dashboard",
  components: {
    AddButton,
  },
  data() {
    return {
      accounts: [],
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
  mounted() {
    firebase
      .firestore()
      .collection("wallets")
      .doc(this.user.data.id)
      .onSnapshot((snapshot) => {
        this.accounts = snapshot.data().accounts;
      });
  },
  methods: {
    addAccount() {
      this.accounts.push({ name: "New Account", solde: 0 });
      firebase
        .firestore()
        .collection("wallets")
        .doc(this.user.data.id)
        .set({
          accounts: this.accounts,
        })
        .then(() => {
          setAlert("Successfully add Account", false, true);
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
  },
};
</script>

<style scoped>
/* .dashboard {
  background-color: var(--color-white);
} */

/* .MainDashboard {
  background-color: var(--color-bg);
} */

.navAccounts {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  overflow-y: hidden;
  align-items: center;
}

.navAccount {
  height: 35px;
  border-radius: 20px;
  display: flex;
  margin: 0 5px 0 5px;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  background-color: var(--color-white);
}
.navAccount p {
  font-size: 14px;
  white-space: nowrap;
  margin: 0;
  padding: 0 10px 0 10px;
  color: var(--color-gray-text);
  text-align: center;
}
</style>