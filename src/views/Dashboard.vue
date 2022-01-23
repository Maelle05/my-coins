<template>
  <div class="dashboard">
    <div class="MainDashboard">
      <h1>Dashboard</h1>
      <p>
        Bienvenue sur ton dashboard
        <strong v-if="user.data.name">{{user.data.name}}</strong>
      </p>
      <div class="navAccounts">
        <div v-for="account of accounts" :key="account.id" class="navAccount">
          <p>{{account.name}}</p>
        </div>
        <div @click="popUpAccount">
          <AddButton></AddButton>
        </div>
      </div>
    </div>
    <div class="PopUps">
      <div class="NewAccount container active">
        <h3>Ajout d'un nouveau livret</h3>
        <form @submit.prevent="addAccount" ref="addAccountForm">
          <label for="name">Nom du livret</label>
          <input type="text" placeholder="new" id="name" required />
          <label for="solde">Solde du livret</label>
          <div class="flex alignCenter">
            <input type="number" id="solde" required />
            <span>{{user.data.currency}}</span>
          </div>
          <button type="submit">Ok</button>
        </form>
      </div>
      <div class="NewTrans container">
        <p>Je suis le form pour les transactions</p>
        <form action></form>
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
    initPopUp() {
      const popUpsContainer = document.querySelector(".PopUps");
      popUpsContainer.style.opacity = 1;
      popUpsContainer.style.pointerEvents = "auto";
      const mainContainer = document.querySelector(".MainDashboard");
      mainContainer.style.filter = "blur(4px)";
    },
    endPopUp() {
      const popUpsContainer = document.querySelector(".PopUps");
      popUpsContainer.style.opacity = 0;
      popUpsContainer.style.pointerEvents = "none";
      const mainContainer = document.querySelector(".MainDashboard");
      mainContainer.style.filter = "blur(0)";
    },
    popUpAccount() {
      this.initPopUp();
    },
    addAccount() {
      const name = this.$refs.addAccountForm["name"].value;
      const solde = this.$refs.addAccountForm["solde"].value;
      this.accounts.push({ name: name, solde: solde });
      firebase
        .firestore()
        .collection("wallets")
        .doc(this.user.data.id)
        .set({
          accounts: this.accounts,
        })
        .then(() => {
          setAlert("Successfully add Account", false, true);
          this.endPopUp();
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
  },
};
</script>

<style scoped>
.dashboard {
  position: relative;
}

.navAccounts {
  margin-top: 10px;
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

.PopUps {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #33c9ff4b;
  transform: translateX(-20px) translateY(-20px);
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  filter: blur(0);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
}

.PopUps > .container {
  position: absolute;
  top: 10vh;
  width: 80%;
  margin: 0 5% 0 5%;
  padding: 20px;
  background-color: var(--color-white);
  border-radius: 20px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}

.PopUps h3 {
  text-align: center;
}

.PopUps > .NewAccount {
  display: none;
}

.PopUps > .NewTrans {
  display: none;
}

.PopUps > .active {
  display: block;
}
</style>