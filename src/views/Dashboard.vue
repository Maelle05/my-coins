<template>
  <div class="dashboard">
    <div class="MainDashboard">
      <h1>Dashboard</h1>
      <p>
        Bienvenue sur ton dashboard
        <strong v-if="user.data.name">{{user.data.name}}</strong>
      </p>
      <div class="navAccounts">
        <div
          v-for="(account, index) of accounts"
          :key="account.id"
          class="navAccount"
          @click="setNavAccountsActive(index)"
        >
          <p>{{account.name}}</p>
        </div>
        <div @click="popUpAccount">
          <AddButton></AddButton>
        </div>
      </div>
      <div class="currentAccountInfo">
        <div v-if="selected">
          <h2>{{accounts[currentAccount].name}}</h2>
          <p>Solde : {{accounts[currentAccount].solde}} {{user.data.currency}}</p>
        </div>
        <div v-else>
          <p>👆 Sélectionne ton livret</p>
        </div>
        <div v-if="selected" class="transactions">
          <p>Mes transactions</p>
          <div class="transList container">
            <div class="transItem" v-for="el in trans" :key="el.index">
              <span class="name">{{el.name}}</span>
              <span class="amount">{{el.amount}} {{user.data.currency}}</span>
              <span class="date">{{el.date}}</span>
            </div>
          </div>
          <div class="add">
            <div @click="popUpTrens">
              <AddButton></AddButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="PopUps">
      <div class="NewAccount container">
        <span class="back" v-on:click="endPopUp">X</span>
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
        <span class="back" v-on:click="endPopUp">X</span>
        <h3>Ajout d'une transactions</h3>
        <form @submit.prevent="addTrans" ref="addTransForm">
          <label for="name">Nom de la transaction</label>
          <input type="text" placeholder="courses ..." id="name" required />
          <label for="amount">Montant</label>
          <div class="flex alignCenter">
            <input type="number" id="amount" required />
            <span>{{user.data.currency}}</span>
          </div>
          <label for="date">Nom de la transaction</label>
          <input type="date" id="date" :value="currentDate()" required />
          <label for="cat">Categorie</label>
          <select name="cat" id="cat">
            <option value="1">test 1</option>
            <option value="2">test 2</option>
          </select>
          <label for="note">Note</label>
          <input type="text" placeholder="..." id="note" />
          <label for="status">Debité</label>
          <input type="checkbox" id="status" />
          <button type="submit">Ok</button>
        </form>
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
      trans: [],
      allTrans: [],
      currentAccount: 0,
      selected: false,
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
        snapshot.data()
          ? (this.accounts = snapshot.data().accounts)
          : (this.accounts = []);
      });
  },
  methods: {
    currentDate() {
      const date = new Date().toLocaleDateString("en-CA");
      return date;
    },
    setNavAccountsActive(index) {
      const navAccountItems = document.getElementsByClassName("navAccount");
      navAccountItems[index].classList.add("active");
      if (this.selected === false) {
        this.selected = true;
      }
      if (this.currentAccount != index) {
        navAccountItems[this.currentAccount].classList.remove("active");
      }
      this.currentAccount = index;
      this.getAllTransAccount();
    },
    initPopUp() {
      const popUpsContainer = document.querySelector(".PopUps");
      popUpsContainer.style.opacity = 1;
      popUpsContainer.style.pointerEvents = "auto";
      const mainContainer = document.querySelector(".MainDashboard");
      mainContainer.style.filter = "blur(4px)";
    },
    endPopUp() {
      document
        .querySelector(".PopUps > .NewAccount")
        .classList.remove("active");
      document.querySelector(".PopUps > .NewTrans").classList.remove("active");
      const popUpsContainer = document.querySelector(".PopUps");
      popUpsContainer.style.opacity = 0;
      popUpsContainer.style.pointerEvents = "none";
      const mainContainer = document.querySelector(".MainDashboard");
      mainContainer.style.filter = "blur(0)";
    },
    popUpAccount() {
      document.querySelector(".PopUps > .NewAccount").classList.add("active");
      this.initPopUp();
    },
    popUpTrens() {
      document.querySelector(".PopUps > .NewTrans").classList.add("active");
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
          this.$refs.addAccountForm["name"].value = "";
          this.$refs.addAccountForm["solde"].value = "";
          setAlert("Successfully add Account", false, true);
          this.endPopUp();
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
    addTrans() {
      const name = this.$refs.addTransForm["name"].value;
      const amount = this.$refs.addTransForm["amount"].value;
      const date = this.$refs.addTransForm["date"].value;
      const cat = this.$refs.addTransForm["cat"].value;
      const note = this.$refs.addTransForm["note"].value;
      const status = this.$refs.addTransForm["status"].checked;
      this.allTrans.push({
        name: name,
        amount: amount,
        date: date,
        cat: cat,
        note: note,
        status: status,
        account: this.currentAccount,
      });
      firebase
        .firestore()
        .collection("transactions")
        .doc(this.user.data.id)
        .set({
          transactions: this.allTrans,
        })
        .then(() => {
          const amount = this.$refs.addTransForm["amount"].value;
          this.$refs.addTransForm["name"].value = "";
          this.$refs.addTransForm["amount"].value = "";
          this.$refs.addTransForm["date"].value = "";
          this.$refs.addTransForm["cat"].value = "";
          this.$refs.addTransForm["note"].value = "";
          this.$refs.addTransForm["status"].checked = false;
          setAlert("Successfully add Account", false, true);
          this.endPopUp();
          this.getAllTransAccount();
          this.updateSoldeAccount(amount);
        })
        .catch((error) => {
          setAlert(error.message, true, false);
        });
    },
    getAllTransAccount() {
      this.trans = [];
      firebase
        .firestore()
        .collection("transactions")
        .doc(this.user.data.id)
        .onSnapshot((snapshot) => {
          this.allTrans = snapshot.data().transactions;
          this.allTrans.forEach((el) => {
            if (el.account === this.currentAccount) {
              this.trans.push(el);
            }
          });
        });
    },
    updateSoldeAccount(amount) {
      const amountFloat = parseFloat(amount);
      const solde = parseFloat(this.accounts[this.currentAccount].solde);
      const result = solde + amountFloat;
      this.accounts[this.currentAccount].solde = result;
      firebase
        .firestore()
        .collection("wallets")
        .doc(this.user.data.id)
        .set({
          accounts: this.accounts,
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

.navAccount.active {
  background-color: var(--color-pink);
}

.navAccount.active p {
  color: var(--color-white);
}

.currentAccountInfo h2 {
  margin-top: 15px;
}

.transactions {
  width: 100%;
  margin-top: 20px;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  border-radius: 20px;
  background-color: var(--color-white);
  max-height: 250px;
}

.transactions .container {
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
  max-height: 150px;
  margin: 0 20px 0 20px;
}

.transactions p {
  margin: 20px;
  padding: 20px 0 0 0;
}

.transactions div.add {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.transItem {
  padding: 20px 0 20px 0;
  position: relative;
  border-bottom: solid 1px var(--color-gray);
}

.transItem:first-child {
  padding: 20px 0 20px 0;
  position: relative;
  border-bottom: none;
}

.transItem .name {
  font-weight: bold;
}

.transItem .date {
  position: absolute;
  top: 5px;
  right: 0;
  font-size: 10px;
  color: var(--color-blue);
}

.transItem .amount {
  position: absolute;
  right: 0;
}

.PopUps {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #dddddd4b;
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

.PopUps span.back {
  font-size: 20px;
  font-weight: 600;
  padding: 3px;
  color: var(--color--gray-text);
  opacity: 0.5;
}

.PopUps h3 {
  text-align: center;
  margin-top: 10px;
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