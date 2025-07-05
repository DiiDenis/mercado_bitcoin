<template>
  <div class="container">
    <EtapaIndicador :etapa-atual="1" :total-etapas="4" />
    <BaseFormInputNative
      v-model="localForm.email"
      type="email"
      label="Email"
      placeholder="Digite seu email"
      :required="true"
      :error="!emailValido && localForm.email.length > 0"
    />
    <BaseFormListRadios
      label="Tipo de Pessoa *"
      v-model="localForm.tipo"
      name="tipo"
      em-linha
      :value="localForm.tipo"
      :opcoes="listaTipos"
      @input="setTipo"
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
import BaseFormListRadios from "../BaseFormListRadios.vue";
import BaseButton from "../BaseButton.vue";
import EtapaIndicador from "../EtapaIndicador.vue";
import { validarEmail } from "../../validators/formValidators";
import { reactive, onMounted, computed, ref } from "vue";

const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

const localForm = reactive({
  email: "",
  tipo: "",
});

const listaTipos = [
  { texto: "Pessoa Física", id: "pf" },
  { texto: "Pessoa Jurídica", id: "pj" },
];

const setTipo = (tipo) => {
  localForm.tipo = tipo;
};

const emailValido = computed(() => validarEmail(localForm.email));

const disabled = computed(() => {
  return !emailValido.value || localForm.tipo === "";
});

const emit = defineEmits(["atualizarForm", "proximoPasso"]);
const avancar = () => {
  emit("atualizarForm", {
    email: localForm.email,
    tipo: localForm.tipo,
  });
  emit("proximoPasso", localForm);
};

onMounted(() => {
  localForm.email = props.form.email || "";
  localForm.tipo = props.form.tipo || "";
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
