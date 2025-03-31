<script setup>
import { onMounted, ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import CompanyLogoRenderer from "@/components/CompanyLogoRenderer.vue";
import MissionResultRenderer from "@/components/MissionResultRenderer.vue";
import Chart from "@/pages/Chart.vue";

onMounted(async () => {
  await fetchData();
});
async function fetchData() {
  try {
    const res = await fetch(
      "https://www.ag-grid.com/example-assets/space-mission-data.json"
    );
    const data = await res.json();
    rowData.value = data;
  } catch (err) {
    console.log(err);
  }
}
// 存放表格資料
const rowData = ref([]);
// 定義表格欄位設定
const colDefs = ref([
  { field: "mission", width: 150 },
  {
    field: "company",
    width: 130,
    cellRenderer: CompanyLogoRenderer,
  },
  { field: "location", width: 225 },
  { field: "date", valueFormatter: dateFormatter },
  {
    field: "price",
    valueFormatter: (params) => {
      return "NT$" + params.value.toLocaleString();
    },
  },
  { field: "successful", width: 120, cellRenderer: MissionResultRenderer },
  { field: "rocket" },
]);
// 定義欄位的預設屬性，這裡設定所有欄位均可編輯且具備篩選功能
const defaultColDef = ref({
  editable: true,
  filter: true,
});
// 定義列選取設定，這裡設定支援多選，且不顯示表頭核取方塊
const rowSelection = ref({
  mode: "multiRow",
  headerCheckbox: false,
});
// 當儲存格資料改變時的事件處理函式
function onCellValueChanged(event) {
  console.log(`New Cell Value: ${event.value}`);
}
function onSelectionChanged() {
  console.log("Row Selection Event!");
}
// 定義一個日期格式化函式，將日期轉換成指定的格式字串
function dateFormatter(params) {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<template>
  <div class="container mx-auto">
    <AgGridVue
      class="w-full h-[500px]"
      :rowData="rowData"
      :columnDefs="colDefs"
      :defaultColDef="defaultColDef"
      :pagination="true"
      :rowSelection="rowSelection"
      @cell-value-changed="onCellValueChanged"
      @selection-changed="onSelectionChanged"
    />
    <Chart />
  </div>
</template>

<style></style>
