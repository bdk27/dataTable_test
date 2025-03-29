<script setup>
const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
});

const cellValue = props.params.value ? "tick-in-circle" : "cross-in-circle";
</script>

<template>
  <span class="flex items-center justify-center h-full">
    <img
      :alt="params.value"
      :src="`https://www.ag-grid.com/example-assets/icons/${cellValue}.png`"
      class="w-auto h-auto"
    />
  </span>
</template>

<style scoped></style>
