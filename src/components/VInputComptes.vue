<template>
  <div class="InputComptes custom-select" ref="InputComptes">
    <label for="comptes-select">Comptes</label>
    <div v-if="comptes.length > 0">
      <select name="comptesSelect" id="comptes-select">
        <option v-for="compte in comptes" :key="compte.id" :value="compte.id">{{compte.label}}</option>
      </select>
      <div ref="selectSelected" class="select-selected">{{comptes[0].label}}</div>
      <div ref="canSelectDiv" class="select-items select-hide">
        <div v-for="compte in comptes" :key="compte.id" :value="compte.id">{{compte.label}}</div>
      </div>
    </div>
    <div v-else >
      <router-link to="/comptes/create">Créé des comptes</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'InputComptes',
  computed: {
    ...mapGetters({
      comptes: "comptes",
    }),
  },
  mounted(){
    if (this.comptes.length > 0) {
      this.init()
    }

  },
  methods: {
    init(){
      const selectedDiv = this.$refs.selectSelected
      const canSelectDiv = this.$refs.canSelectDiv

      for (let i = 0; i < canSelectDiv.children.length; i++) {
        canSelectDiv.children[i].addEventListener("click",
          function() {
            /* When an item is clicked, update the original select box,
            and the selected item: */
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                yl = y.length;
                for (k = 0; k < yl; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
          }
        )
      }

      selectedDiv.addEventListener("click", function(e) {
        e.stopPropagation();
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
      });

      function closeAllSelect(elmnt) {
        /* A function that will close all select boxes in the document,
        except the current select box: */
        var x, y, i, xl, yl, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        xl = x.length;
        yl = y.length;
        for (i = 0; i < yl; i++) {
          if (elmnt == y[i]) {
            arrNo.push(i)
          } else {
            y[i].classList.remove("select-arrow-active");
          }
        }
        for (i = 0; i < xl; i++) {
          if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide");
          }
        }
      }

      /* If the user clicks anywhere outside the select box,
      then close all select boxes: */
      document.addEventListener("click", closeAllSelect);
    }
  }

}
</script>

<style scoped>
.InputComptes{
  width: 40vw;
  padding: 10px 0 9px 0;
}

label{
  font-family: 'Inter';
  font-weight: 500;
  font-size: 12px;
  margin: 0 0 10px 0;
  display: block;
}

/* The container must be positioned relative: */
.custom-select {
  position: relative;
  font-family: 'Inter';
  font-weight: 700;
  font-size: 14px;
}

.custom-select select {
  display: none; /*hide original SELECT element: */
}

.select-selected {
  background-color: var(--color-blue);
  border-radius: 10000px;
  position: relative;
}

/* Style the arrow inside the select element: */
.select-selected:after {
  position: absolute;
  content: "";
  top: 11px;
  right: 10px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-color: #fff transparent transparent transparent;
}

/* Point the arrow upwards when the select box is open (active): */
.select-selected.select-arrow-active:after {
  border-color: transparent transparent #fff transparent;
  top: 5px;
}

/* style the items (options), including the selected item: */
.select-items div,.select-selected {
  color: #ffffff;
  padding: 6px 13px;
  border: 1px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* Style items (options): */
.select-items {
  position: absolute;
  background-color: var(--color-blue);
  border-radius: 12px;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 99;
}

/* Hide the items when the select box is closed: */
.select-hide {
  display: none;
}

.select-items div:hover, .same-as-selected {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

a{
  color: var(--color-black)
}
</style>