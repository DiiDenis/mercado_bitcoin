<template>
  <div class="page">
    <div class="page_container">
      <img class="page_logo" src="../../assets/images/logo.svg" alt="logo" />
      <div class="page_title">Seja bem vindo ao Mercado Bitcoin</div>
      <div class="page_subtitle">
        Inscreva-se para participar do nosso programa de afiliados
      </div>
      <div class="page_button">
        <BaseButton
          texto="Realizar Cadastro"
          tema="primary"
          preenchimento="filled"
          :full="true"
          @click="$emit('proximoPasso')"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from "../BaseButton.vue";
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;

  &_container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $text;
    flex-direction: column;
    padding-top: 150px;
  }

  &_logo {
    width: 180px;
    height: 180px;
  }

  &_title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 16px;
    font-size: 36px;
    font-weight: 700;
    margin-top: 20px;
  }

  &_subtitle {
    font-size: 16px;
    margin-top: 8px;
  }

  &_button {
    margin-top: 24px;
    width: 250px;
  }
}
</style>
