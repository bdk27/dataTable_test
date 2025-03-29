<script setup>
const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
});

const cellValue = props.params.value || "";
const cellValueLowerCase = cellValue.toLowerCase();
</script>

<template>
  <span class="flex items-center w-full h-full">
    <img
      :src="`https://www.ag-grid.com/example-assets/space-company-logos/${cellValueLowerCase}.png`"
      class="block w-[25px] h-auto max-h-[50%] mr-3 brightness-110"
    />
    <p class="truncate">
      {{ cellValue }}
    </p>
  </span>
</template>

<style scoped></style>
