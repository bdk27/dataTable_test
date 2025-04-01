<script setup>
import { ref, computed } from "vue";

// 設定頁數 = 1
let page = ref(1);
// 原始資料(假的)
const data = Array.from(Array(200).keys()).map((item) => {
  return { index: item, value: `this_${item}` };
});
// 一頁要幾筆資料
const perPage = 10;
// 每10筆原始資料成為一個paginatedData(動態)
const paginatedData = computed(() =>
  data.slice((page.value - 1) * perPage, page.value * perPage)
);
// 下一頁
function nextPage() {
  console.log(Math.ceil(data.length / perPage));

  if (page.value !== Math.ceil(data.length / perPage)) {
    page.value += 1;
  }
}
// 上一頁
function backPage() {
  if (page.value !== 1) {
    page.value -= 1;
  }
}
// 前往某一頁
function goToPage(numPage) {
  page.value = numPage;
}
// 起始頁
const start = computed(() => {
  // 設定條件：如果page.value+10會小於總頁數，那就讓start = page.value
  if (page.value + 10 <= Math.ceil(data.length / perPage)) {
    return page.value;
    // 如果會大於總頁數的話，那就讓start = 總頁數-9(從後面往前算10頁)
  } else if (
    page.value + 10 > Math.ceil(data.length / perPage) ||
    page.value === Math.ceil(data.length / perPage)
  ) {
    return Math.ceil(data.length / perPage) - 9;
  }
});
// 最終頁
const end = computed(() => {
  if (page.value + 10 <= Math.ceil(data.length / perPage)) {
    return page.value + 9;
  } else if (
    page.value + 10 > Math.ceil(data.length / perPage) ||
    page.value === Math.ceil(data.length / perPage)
  ) {
    return Math.ceil(data.length / perPage);
  }
});
</script>

<template>
  <div v-for="item in paginatedData" :key="item.index">{{ item.value }}</div>
  <div class="flex items-center">
    <button @click="backPage">上一頁</button>
    <ul class="flex items-center">
      <li
        v-for="(item, index) in Math.ceil(data.length / perPage)"
        :key="index"
        v-show="index >= start - 1 && index < end"
        @click="goToPage($event, item)"
      >
        <a class="page-link" :id="'page-' + item" href="#">{{ item }}</a>
      </li>
    </ul>
    <button @click="nextPage">下一頁</button>
  </div>
</template>

<style scoped></style>
