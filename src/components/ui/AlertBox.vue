<template>
  <div class="alertBox" id="alertBox">
    <p></p>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alertBox {
  position: absolute;
  top: 0;
  left: 0;
  background: var(--color-gray);
  z-index: 999999;
  width: 90%;
  margin: 5%;
  opacity: 0;
  color: var(--color-white);
  min-height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s;
  pointer-events: none;
  font-family: 'Inter';
  font-weight: 500;
  font-size: 16px;
}

.alertBox p {
  margin: 0;
}

.alertBox.red {
  background: var(--color-orange) !important;
}

.alertBox.green {
  background: var(--color-blue) !important;
}

.active {
  transition: opacity 0.3s;
  opacity: 1;
}
</style>
