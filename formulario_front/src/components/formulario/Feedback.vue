<template>
  <div :class="feedbackClass">
    <div class="feedback_container">
      <img
        class="feedback_logo"
        src="../../assets/images/logo.svg"
        alt="logo"
      />
      <div class="feedback_title">{{ mensagemFeedback }}</div>
      <div class="feedback_subtitle">
        A maior plataforma de investimentos em ativos digitais da América Latina
        {{ props.cadastroComSucesso }}
      </div>
      <div class="feedback_button">
        <BaseButton
          texto="Voltar ao início"
          tema="primary"
          preenchimento="ghost"
          :full="true"
          @click="$emit('reiniciarFormulario')"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseButton from "../BaseButton.vue";
import { computed } from "vue";

const props = defineProps({
  cadastroComSucesso: {
    type: Boolean,
    required: true,
  },
});

const mensagemFeedback = computed(() =>
  props.cadastroComSucesso
    ? "Seu cadastro foi realizado com sucesso"
    : "Cadastro não realizado, teste mais tarde"
);

const feedbackClass = computed(
  () =>
    "feedback " +
    (props.cadastroComSucesso ? "feedback--success" : "feedback--error")
);
</script>

<style lang="scss" scoped>
.feedback {
  width: 100%;
  height: 100vh;
  &--success {
    background: rgba($success, 0.4);
  }
  &--error {
    background: rgba($error, 0.4);
  }

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
