<template>
  <div class="etapa">
    <div class="etapa_descricao">
      Etapa
      <span class="etapa_descricao--destaque">{{ etapaAtual }}</span>
      de {{ totalEtapas }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  etapaAtual: {
    type: Number,
    required: true,
  },
  totalEtapas: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.etapa {
  margin-bottom: 1.5rem;
  margin-top: 4rem;

  &_descricao {
    font-size: 2rem;
    font-weight: bold;
    color: $text;
    &--destaque {
      color: $primary;
    }
  }
}
</style>
