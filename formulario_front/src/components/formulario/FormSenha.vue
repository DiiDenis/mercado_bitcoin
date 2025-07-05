<template>
  <div class="container">
    <EtapaIndicador :etapa-atual="3" :total-etapas="4" />
    <BaseFormInputNative
      v-model="localForm.senha"
      type="password"
      label="Senha"
      placeholder="Digite sua senha (8 caracteres mínimo)"
      :required="true"
      :error="!senhaValida && localForm.senha.length > 0"
    />
    <div class="botoes">
      <BaseButton
        texto="Voltar"
        tema="primary"
        preenchimento="ghost"
        :full="true"
        @click="$emit('passoAnterior')"
      />
      <BaseButton
        texto="Continuar"
        tema="primary"
        preenchimento="filled"
        :full="true"
        :disabled="!senhaValida"
        @click="avancar"
      />
    </div>
  </div>
</template>
<script setup>
import BaseFormInputNative from "../BaseFormInputNative.vue";
import EtapaIndicador from "../EtapaIndicador.vue";
import BaseButton from "../BaseButton.vue";
import { validarSenha } from "../../validators/formValidators";
import { reactive, computed } from "vue";

const localForm = reactive({
  senha: "",
});

const senhaValida = computed(() => validarSenha(localForm.senha));

const emit = defineEmits(["atualizarForm", "proximoPasso"]);
const avancar = () => {
  emit("atualizarForm", localForm);
  emit("proximoPasso");
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  color: $text;
}

.botoes {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
