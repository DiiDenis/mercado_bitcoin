<template>
  <div class="form">
    <label class="label">{{ label }}{{ required ? " *" : "" }}</label>
    <input
      :class="inputClass"
      :value="modelValue"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
      @keydown.enter="funcao"
      @focus="onFocus"
      @blur="onBlur"
    />
    <div class="form_message" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [Number, String],
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  error: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  mensagemErros: {
    type: String,
    default: "",
  },
});

const inputClass = computed(() => [
  "form_input",
  { "form_input--error": props.error },
  { "form_input--success": !props.error && props.modelValue },
]);

const errorMessage = computed(() => {
  if (!props.modelValue && isOpened.value && props.required) {
    return `${props.label} é um campo obrigatório`;
  }
  if (props.error) {
    return `${props.label} ${props.mensagemErros || "está inválido"}`;
  }
  return "";
});

const isFocused = ref(false);
const isOpened = ref(false);

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  isFocused.value = false;
  if (!isOpened.value) {
    isOpened.value = true;
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  margin-bottom: 24px;

  &_input {
    height: 52px;
    background: #fff;
    width: 100%;
    display: block;
    border: 1px solid #9e9e9e;
    border-radius: 4px;
    padding: 8px 8px;
    box-sizing: border-box;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
    color: #636466;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px rgba($primary, 0.5);
      outline: none;
    }

    &--error {
      &:focus {
        box-shadow: 0 0 0 2px $error;
      }
    }
    &--success {
      &:focus {
        box-shadow: 0 0 0 2px $success;
      }
    }
  }

  &_message {
    display: block;
    text-align: left;
    bottom: -20px;
    left: 0;
    font-size: 12px;
    color: $error;
    font-weight: 500;
    position: absolute;
  }
}

.label {
  font-size: 12px;
  color: $text;
  font-weight: 500;
  margin-bottom: 0.4rem;
  display: block;
  text-align: left;
}
</style>
