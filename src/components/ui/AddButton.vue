<template>
  <div class="AddButton">
    <div class="container">
      <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55">
        <g id="Groupe_1" data-name="Groupe 1" transform="translate(-168 -415)" opacity="0.296">
          <rect
            id="Rectangle_2"
            data-name="Rectangle 2"
            width="9"
            height="55"
            rx="4.5"
            transform="translate(191 415)"
            fill="#f23279"
          />
          <rect
            id="Rectangle_3"
            data-name="Rectangle 3"
            width="9"
            height="55"
            rx="4.5"
            transform="translate(223 438) rotate(90)"
            fill="#f23279"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddButton",
};
</script>

<style scoped>
.AddButton .container {
  width: 45px;
  height: 35px;
  border-radius: 20px;
  display: flex;
  margin: 0 5px 0 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  background-color: var(--color-white);
}
.AddButton .container svg {
  width: 20px;
}
</style>