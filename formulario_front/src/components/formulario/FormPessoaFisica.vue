<template>
  <div class="container">
    <EtapaIndicador :etapa-atual="2" :total-etapas="4" />
    <BaseFormInputNative
      v-model="localForm.nome"
      type="text"
      label="Nome Completo"
      placeholder="Digite seu nome completo"
      :required="true"
      :error="!nomeValido && localForm.nome.length > 0"
    />

    <BaseFormInputNative
      v-model="localForm.cpf"
      type="text"
      label="CPF"
      placeholder="Digite seu CPF"
      :required="true"
      :error="!cpfValido && localForm.cpf.length > 0"
    />

    <BaseFormInputNative
      v-model="localForm.dataNascimento"
      type="text"
      label="Data de Nascimento"
      placeholder="Formato: dd/mm/aaaa"
      :required="true"
      :error="!dataNascimentoValida && localForm.dataNascimento.length > 0"
      :mensagem-erros="dataNascimentoMensagem"
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
  validarCPF,
  validarTelefone,
  validarNome,
  validarDataNascimento,
} from "../../validators/formValidators";
import { reactive, onMounted, computed, ref } from "vue";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const localForm = reactive({
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
});

const nomeValido = computed(() => validarNome(localForm.nome));
const cpfValido = computed(() => validarCPF(localForm.cpf));
const dataNascimentoResultado = computed(() =>
  validarDataNascimento(localForm.dataNascimento)
);
const dataNascimentoValida = computed(
  () => dataNascimentoResultado.value.valido
);
const dataNascimentoMensagem = computed(
  () => dataNascimentoResultado.value.mensagem
);
const telefoneValido = computed(() => validarTelefone(localForm.telefone));

const disabled = computed(() => {
  return (
    !nomeValido.value ||
    !cpfValido.value ||
    !dataNascimentoResultado.value.valido ||
    !telefoneValido.value
  );
});

const emit = defineEmits(["atualizarForm", "proximoPasso"]);

const avancar = () => {
  emit("atualizarForm", {
    nome: localForm.nome,
    cpf: localForm.cpf,
    dataNascimento: localForm.dataNascimento,
    telefone: localForm.telefone,
  });
  emit("proximoPasso", localForm);
};
onMounted(() => {
  localForm.nome = props.form.nome || "";
  localForm.cpf = props.form.cpf || "";
  localForm.dataNascimento = props.form.dataNascimento || "";
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
