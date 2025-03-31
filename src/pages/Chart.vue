<script setup>
import usePie from "@/composable/usePie";
import { onMounted, onUnmounted, ref } from "vue";

const container = ref(null);
onMounted(() => {
  const { setOption, resize } = usePie(container.value);
  setOption([
    { value: 100, name: "a", itemStyle: { color: "#46B3E6" } },
    { value: 200, name: "b", itemStyle: { color: "#2E279D" } },
    { value: 300, name: "c", itemStyle: { color: "#4D80E4" } },
  ]);
  window.addEventListener("resize", () => {
    resize();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize");
});
</script>

<template>
  <div ref="container" class="h-[500px]"></div>
</template>

<style scoped></style>
