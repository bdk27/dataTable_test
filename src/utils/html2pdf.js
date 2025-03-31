import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
/**
 * htmlToPDF
 * 將指定 DOM 元素轉成 PDF 檔案，使用 html2canvas 捕捉內容後利用 jsPDF 生成 PDF。
 *
 * @param {string} htmlId - 目標 DOM 元素的 ID
 * @param {string} title - PDF 標題（同時作為檔案名稱）
 * @param {string} bgColor - 背景色（建議使用傳統顏色表示法，如 "#fff"）
 */
export const htmlToPDF = async (htmlId, title = "報表", bgColor = "#fff") => {
  // 取得目標元素
  const pdfDom = document.getElementById(htmlId);
  if (!pdfDom) {
    console.error(`Element with id "${htmlId}" not found.`);
    return;
  }

  // 設定 padding，使用 setProperty 可加入 "important"
  pdfDom.style.setProperty("padding", "0 10px", "important");

  // 定義 A4 紙尺寸（單位：pt）
  const A4Width = 595.28;
  const A4Height = 841.89;

  let canvas;
  try {
    // 使用 html2canvas 捕捉 DOM 內容並生成 canvas
    canvas = await html2canvas(pdfDom, {
      scale: 2, // 放大比例，可提升解析度，但也會增加運算量
      useCORS: true, // 允許跨來源資源共享，適用於載入外部圖片
      backgroundColor: bgColor, // 設定背景色，避免透明問題
    });
  } catch (error) {
    console.error("Error generating canvas:", error);
    return;
  }

  // 計算每頁在 PDF 中應有的高度
  const pageHeight = (canvas.width / A4Width) * A4Height;
  let leftHeight = canvas.height;
  let position = 0;
  const imgWidth = A4Width;
  const imgHeight = (A4Width / canvas.width) * canvas.height;

  // 將 canvas 轉換成 JPEG 圖片資料
  const pageData = canvas.toDataURL("image/jpeg", 1.0);

  // 建立 jsPDF 實例，直向 (p)，單位為 pt，A4 尺寸
  const PDF = new jsPDF("p", "pt", "a4");

  // 根據畫布高度與頁面高度，分頁處理 PDF
  if (leftHeight < pageHeight) {
    // 如果內容高度小於一頁，直接添加圖片
    PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
  } else {
    // 否則循環添加每一頁
    while (leftHeight > 0) {
      PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
      leftHeight -= pageHeight;
      position -= A4Height;
      if (leftHeight > 0) PDF.addPage();
    }
  }

  // 儲存 PDF 檔案，檔案名稱為 title.pdf
  PDF.save(title + ".pdf");
};
