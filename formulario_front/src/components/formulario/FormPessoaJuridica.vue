<template>
  <div class="container">
    <EtapaIndicador :etapa-atual="2" :total-etapas="4" />

    <BaseFormInputNative
      v-model="localForm.razaoSocial"
      type="text"
      label="Razão Social"
      placeholder="Digite a razão social"
      :required="true"
      :error="!razaoSocialValida && localForm.razaoSocial.length > 0"
    />
    <BaseFormInputNative
      v-model="localForm.cnpj"
      type="text"
      label="CNPJ"
      placeholder="Digite seu CNPJ"
      :required="true"
      :error="!cnpjValido && localForm.cnpj.length > 0"
    />
    <BaseFormInputNative
      v-model="localForm.dataAbertura"
      type="text"
      label="Data de Abertura"
      placeholder="Formato: dd/mm/aaaa"
      :required="true"
      :error="!dataAberturaValida && localForm.dataAbertura.length > 0"
    />

    <BaseFormInputNative
      v-model="localForm.telefone"
      type="text"
      label="Telefone"
      placeholder="Digite seu telefone"
      :required="true"
      :error="!telefoneValido && localForm.telefone.length > 0"
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
        :disabled="disabled"
        @click="avancar"
      />
    </div>
  </div>
</template>
<script setup>
import BaseFormInputNative from "../BaseFormInputNative.vue";
import EtapaIndicador from "../EtapaIndicador.vue";
import BaseButton from "../BaseButton.vue";
import {
  validarCNPJ,
  validarRazaoSocial,
  validarTelefone,
  validarDataAbertura,
} from "../../validators/formValidators";
import { reactive, onMounted, computed, ref } from "vue";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const localForm = reactive({
  email: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  nome: "",
  razaoSocial: "",
  senha: "",
  cnpj: "",
  dataAbertura: "",
  tipo: "",
});

const cnpjValido = computed(() => validarCNPJ(localForm.cnpj));
const razaoSocialValida = computed(() =>
  validarRazaoSocial(localForm.razaoSocial)
);
const telefoneValido = computed(() => validarTelefone(localForm.telefone));
const dataAberturaValida = computed(() =>
  validarDataAbertura(localForm.dataAbertura)
);

const disabled = computed(() => {
  return (
    !razaoSocialValida.value ||
    !cnpjValido.value ||
    !dataAberturaValida.value ||
    !telefoneValido.value
  );
});

const emit = defineEmits(["atualizarForm", "proximoPasso"]);
const avancar = () => {
  emit("atualizarForm", {
    razaoSocial: localForm.razaoSocial,
    cnpj: localForm.cnpj,
    dataAbertura: localForm.dataAbertura,
    telefone: localForm.telefone,
  });
  emit("proximoPasso", localForm);
};

onMounted(() => {
  localForm.razaoSocial = props.form.razaoSocial || "";
  localForm.cnpj = props.form.cnpj || "";
  localForm.dataAbertura = props.form.dataAbertura || "";
  localForm.telefone = props.form.telefone || "";
});
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
