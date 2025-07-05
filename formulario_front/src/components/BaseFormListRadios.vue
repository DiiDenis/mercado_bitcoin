<template>
  <div class="form">
    <label class="form_label">
      <span>{{ label }}</span>
    </label>
    <div class="form_container">
      <div v-for="(opcao, index) in opcoes" :key="index" class="form_group">
        <input
          :id="name + index"
          :name="name"
          v-bind="$attrs"
          type="radio"
          class="form_radio-input"
          :value="opcao"
          v-model="valorInterno"
          @change="updateValor(opcao)"
        />
        <label :for="name + index" class="form_radio-custom"></label>
        <label :for="name + index" class="form_label-item">
          {{ opcao.texto }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

defineOptions({ name: "BaseFormListRadios", inheritAttrs: false });

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  opcoes: {
    type: Array,
    default: () => [],
  },
  retorno: {
    type: String,
    default: "texto",
  },
  emLinha: {
    type: Boolean,
    default: false,
  },

  value: {
    type: [String, Object],
    default: null,
  },
  information: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["input"]);

const valorInterno = ref(props.value);

watch(
  () => props.value,
  (newVal) => {
    valorInterno.value = newVal;
  }
);

const updateValor = (valorSelecionado) => {
  emit("input", valorSelecionado);
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 1rem;

  &_group {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.65rem;
  }

  &_label {
    font-size: 12px;
    color: $text;
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;

    *:last-child {
      margin-left: 2px;
      position: relative;
      top: -1px;
    }

    &-item {
      display: block;
      font-size: 14px;
      color: $text;
      font-weight: 400;
    }
  }

  &_container {
    display: flex;
    gap: 2rem;
  }

  &_column {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  &_radio {
    &-input {
      display: none;
    }

    &-custom {
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: transparent;
      border: 2px solid $primary;
      border-radius: 50%;
      position: relative;
      cursor: pointer;

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background-color: $primary;
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
  }
}

.form_radio-input:checked + .form_radio-custom:before {
  opacity: 1;
}
</style>
