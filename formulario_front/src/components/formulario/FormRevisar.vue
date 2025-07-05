<template>
  <div class="container">
    <EtapaIndicador :etapa-atual="4" :total-etapas="4" />
    <BaseFormInputNative
      v-model="localForm.email"
      type="email"
      label="Email"
      placeholder="Digite seu email"
      :required="true"
      :error="!emailValido && localForm.email.length > 0"
    />
    <BaseFormInputNative
      v-if="form.tipo.id === 'pf'"
      v-model="localForm.nome"
      type="text"
      label="Nome Completo"
      placeholder="Digite seu nome completo"
      :required="true"
      :error="!nomeValido && localForm.nome.length > 0"
    />

    <BaseFormInputNative
      v-if="form.tipo.id === 'pf'"
      v-model="localForm.cpf"
      type="text"
      label="CPF"
      placeholder="Digite seu CPF"
      :required="true"
      :error="!cpfValido && localForm.cpf.length > 0"
    />

    <BaseFormInputNative
      v-if="form.tipo.id === 'pf'"
      v-model="localForm.dataNascimento"
      type="text"
      label="Data de Nascimento"
      placeholder="Formato: dd/mm/aaaa"
      :required="true"
      :error="!dataNascimentoValida && localForm.dataNascimento.length > 0"
      :mensagem-erros="dataNascimentoMensagem"
    />
    <BaseFormInputNative
      v-if="form.tipo.id === 'pj'"
      v-model="localForm.razaoSocial"
      type="text"
      label="Razão Social"
      placeholder="Digite a razão social"
      :required="true"
      :error="!razaoSocialValida && localForm.razaoSocial.length > 0"
    />
    <BaseFormInputNative
      v-if="form.tipo.id === 'pj'"
      v-model="localForm.cnpj"
      type="text"
      label="CNPJ"
      placeholder="Digite seu CNPJ"
      :required="true"
      :error="!cnpjValido && localForm.cnpj.length > 0"
    />
    <BaseFormInputNative
      v-if="form.tipo.id === 'pj'"
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
  validarEmail,
  validarTelefone,
  validarNome,
  validarDataNascimento,
  validarCPF,
  validarCNPJ,
  validarRazaoSocial,
  validarDataAbertura,
  validarSenha,
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

const emailValido = computed(() => validarEmail(localForm.email));
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
const cnpjValido = computed(() => validarCNPJ(localForm.cnpj));
const razaoSocialValida = computed(() =>
  validarRazaoSocial(localForm.razaoSocial)
);
const senhaValida = computed(() => validarSenha(localForm.senha));
const dataAberturaValida = computed(() =>
  validarDataAbertura(localForm.dataAbertura)
);

const disabled = computed(() => {
  if (props.form.tipo.id === "pf") {
    return (
      !emailValido.value ||
      !nomeValido.value ||
      !cpfValido.value ||
      !dataNascimentoResultado.value.valido ||
      !telefoneValido.value ||
      !senhaValida.value
    );
  } else if (props.form.tipo.id === "pj") {
    return (
      !emailValido.value ||
      !razaoSocialValida.value ||
      !cnpjValido.value ||
      !dataAberturaValida.value ||
      !telefoneValido.value ||
      !senhaValida.value
    );
  }
});

const emit = defineEmits(["atualizarForm", "proximoPasso"]);
const avancar = () => {
  emit("atualizarForm", {
    email: localForm.email,
    nome: localForm.nome,
    cpf: localForm.cpf,
    dataNascimento: localForm.dataNascimento,
    telefone: localForm.telefone,
    senha: localForm.senha,
    razaoSocial: localForm.razaoSocial,
    cnpj: localForm.cnpj,
    dataAbertura: localForm.dataAbertura,
    senha: localForm.senha,
  });
  emit("proximoPasso", localForm);
};

onMounted(() => {
  localForm.email = props.form.email || "";
  localForm.tipo = props.form.tipo || { id: "", texto: "" };
  localForm.nome = props.form.nome || "";
  localForm.cpf = props.form.cpf || "";
  localForm.dataNascimento = props.form.dataNascimento || "";
  localForm.telefone = props.form.telefone || "";
  localForm.senha = props.form.senha || "";
  localForm.razaoSocial = props.form.razaoSocial || "";
  localForm.cnpj = props.form.cnpj || "";
  localForm.dataAbertura = props.form.dataAbertura || "";
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
