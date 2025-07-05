<template>
  <div class="page">
    <div class="page_container">
      <Component
        :is="componentEtapa.component"
        v-bind="componentEtapa.props"
        v-on="componentEtapa.events"
      />
    </div>
  </div>
</template>
<script setup>
import BemVindo from "../components/formulario/BemVindo.vue";
import FormInicio from "../components/formulario/FormInicio.vue";
import FormPessoaFisica from "../components/formulario/FormPessoaFisica.vue";
import FormPessoaJuridica from "../components/formulario/FormPessoaJuridica.vue";
import FormSenha from "../components/formulario/FormSenha.vue";
import FormRevisar from "../components/formulario/FormRevisar.vue";
import Feedback from "../components/formulario/Feedback.vue";
import { post } from "../services/networkServices.js";
import { ref, computed, onMounted } from "vue";

const etapa = ref("bem-vindo");
const cadastroComSucesso = ref(false);
const form = ref({
  email: "",
  tipo: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  senha: "",
  razaoSocial: "",
  cnpj: "",
  dataAbertura: "",
});

const etapas = {
  "bem-vindo": {
    component: BemVindo,
    events: {
      proximoPasso: () => {
        etapa.value = "form-inicio";
      },
    },
  },
  "form-inicio": {
    component: FormInicio,
    props: {
      form: form.value,
    },
    events: {
      atualizarForm: (dados) => {
        form.value.email = dados.email;
        form.value.tipo = dados.tipo;
        localStorage.setItem("formulario", JSON.stringify(form.value));
      },
      passoAnterior: async () => {
        etapa.value = "bem-vindo";
      },
      proximoPasso: () => {
        etapa.value =
          form.value.tipo.id === "pf"
            ? "form-pessoa-fisica"
            : "form-pessoa-juridica";
      },
    },
  },
  "form-pessoa-fisica": {
    component: FormPessoaFisica,
    props: {
      form: form.value,
    },
    events: {
      atualizarForm: (dados) => {
        form.value.nome = dados.nome;
        form.value.cpf = dados.cpf;
        form.value.dataNascimento = dados.dataNascimento;
        form.value.telefone = dados.telefone;
        localStorage.setItem("formulario", JSON.stringify(form.value));
      },
      passoAnterior: async () => {
        etapa.value = "form-inicio";
      },
      proximoPasso: (passo) => {
        etapa.value = "form-senha";
      },
    },
  },
  "form-pessoa-juridica": {
    component: FormPessoaJuridica,
    props: {
      form: form.value,
    },
    events: {
      atualizarForm: (dados) => {
        form.value.razaoSocial = dados.razaoSocial;
        form.value.cnpj = dados.cnpj;
        form.value.dataAbertura = dados.dataAbertura;
        form.value.telefone = dados.telefone;
        localStorage.setItem("formulario", JSON.stringify(form.value));
      },
      passoAnterior: async (form) => {
        etapa.value = "form-inicio";
      },
      proximoPasso: (passo) => {
        etapa.value = "form-senha";
      },
    },
  },
  "form-senha": {
    component: FormSenha,
    props: {
      form: form.value,
    },
    events: {
      atualizarForm: (dados) => {
        form.value.senha = dados.senha;
      },
      passoAnterior: async () => {
        etapa.value =
          form.value.tipo.id === "pf"
            ? "form-pessoa-fisica"
            : "form-pessoa-juridica";
      },
      proximoPasso: () => {
        etapa.value = "form-revisar";
      },
    },
  },
  "form-revisar": {
    component: FormRevisar,
    props: {
      form: form.value,
    },
    events: {
      atualizarForm: (dados) => {
        form.value.email = dados.email;
        form.value.nome = dados.nome;
        form.value.cpf = dados.cpf;
        form.value.dataNascimento = dados.dataNascimento;
        form.value.telefone = dados.telefone;
        form.value.senha = dados.senha;
        form.value.razaoSocial = dados.razaoSocial;
        form.value.cnpj = dados.cnpj;
        form.value.dataAbertura = dados.dataAbertura;
      },
      passoAnterior: async () => {
        etapa.value = "form-senha";
      },
      proximoPasso: async () => {
        const response = await enviarFormulario();
        if (response.success) {
          localStorage.removeItem("formulario");
          Object.keys(form.value).forEach((key) => {
            form.value[key] = "";
          });
          cadastroComSucesso.value = true;
          etapa.value = "feedback";
        }
      },
    },
  },
  feedback: {
    component: Feedback,
    events: {
      reiniciarFormulario: () => {
        etapa.value = "bem-vindo";
        cadastroComSucesso.value = false;
      },
    },
  },
};

const componentEtapa = computed(() => {
  const etapaAtual = etapas[etapa.value];

  if (etapa.value === "feedback") {
    return {
      ...etapaAtual,
      props: {
        cadastroComSucesso: cadastroComSucesso.value,
      },
    };
  }

  return etapaAtual;
});

const recuperarFormulario = () => {
  const localStorageForm = localStorage.getItem("formulario");

  if (localStorageForm) {
    try {
      const parsedForm = JSON.parse(localStorageForm);
      Object.keys(parsedForm).forEach((key) => {
        form.value[key] = parsedForm[key];
      });
    } catch (error) {
      console.error("Erro ao carregar formulário do localStorage:", error);
    }
  }
};

const enviarFormulario = async () => {
  const formPreparado = {
    ...form.value,
    tipo: form.value.tipo.id,
  };

  try {
    const response = await post("/registration", formPreparado);
    return { success: true, data: response };
  } catch (err) {
    return { success: false, error: err };
  }
};

onMounted(() => {
  recuperarFormulario();
});
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
  background: $light;
  &_container {
    width: 100%;
    height: 100%;
    color: $text;
  }
}
</style>
