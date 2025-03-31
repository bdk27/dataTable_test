import * as echarts from "echarts/core";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  TitleComponent, // 註冊標題組件
  TooltipComponent, // 註冊提示工具組件
  LegendComponent, // 註冊圖例組件
  PieChart, // 註冊餅圖
  CanvasRenderer, // 註冊 Canvas 渲染器
  LabelLayout, // 註冊標籤自動布局功能
]);

function usePie(el) {
  const pieChart = echarts.init(el);

  function setOption(data) {
    const option = {
      // 圖表標題配置
      title: {
        text: "測試A",
        subtext: "統計A",
        left: "center",
      },
      // 提示工具配置，當滑鼠懸停到圖形上時會顯示提示
      tooltip: {
        trigger: "item",
      },
      // 圖例配置，用於說明各數據項的含義
      legend: {
        origin: "vertical",
        left: "left",
      },
      // 數據系列配置
      series: [
        {
          name: "比例A",
          type: "pie",
          radius: "50%",
          data: data,
        },
      ],
    };
    return pieChart.setOption(option);
  }

  function resize() {
    return pieChart.resize();
  }

  return { setOption, resize };
}

export default usePie;
