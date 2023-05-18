import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import './style/style.css'
import { init as initHttp } from "./api/request";
import App from './App.vue'
import router from "./router";

import './style/main.css'

async function main() {
  initHttp({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    withCredentials: true,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },

    transformRequest: [
      (data, headers) => {
        const saltedData = {
          ...data,
        };

        if (headers?.["Content-Type"] === "application/x-www-form-urlencoded") {
          const newData = new URLSearchParams(saltedData);
          return newData;
        }

        if (headers?.["Content-Type"] === "application/form-data") {
          const formData = new FormData();

          Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
          });

          return formData;
        }

        if (headers?.["Content-Type"] === "application/json") {
          const newData = JSON.stringify(data);
          return newData;
        }

        return saltedData;
      },
    ],
  });

  const app = createApp(App)

  app.use(ElementPlus)
  app.use(router)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.mount('#app')
}

main();
