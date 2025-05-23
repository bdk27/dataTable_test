import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

createApp(App).mount("#app");
