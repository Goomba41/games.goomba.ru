import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
// Needed for file saver
// import FileSaver from "file-saver";

import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import { useLoadingStore } from "@/stores/loading.store";

import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

// import toast from "./toast";

// import type { IUser } from "@/stores/auth.store";
// Needed for file saver
// import { v4 } from "uuid";

// Needed for file saver
// const filetypes: string[] = [
//   "application/pdf",
//   "application/vnd.oasis.opendocument.spreadsheet",
//   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// ];

// Интерсептор на запрос
// Подсовываем токен авторизации пользователя
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // const authStore = useAuthStore();
    const loadingStore = useLoadingStore();
    // * Deprecated
    // Проверим, есть ли токен в локальном хранилище браузера
    // const token = localStorage.getItem("token");
    // const isLoggedIn = !!token;

    // Если нет данных пользователя и пользователь залогинен -
    // восстановим данные из токена
    // if (!authStore.user && isLoggedIn)
    //   authStore.user = jwtParse(localStorage.getItem("token")) as IUser;

    // Если есть токен, подставляем в заголовок запроса
    // if (token) {
    //   config.headers!.Authorization = `Bearer ${token}`;
    //   // Нужно указать этот параметр, чтобы в интерсепторе ответа
    //   // парсить результат вручную (если файл - загрузить, если json - отдать)
    //   // чтобы можно было не указывать ожидаемый тип ответа в
    //   // остальном приложении
    //   config.responseType = "arraybuffer";

    //   // Посмотрим сервис-вокера, если есть и активен, то отправить ему
    //   // соообщение с токеном, чтобы он использовал его для последующей
    //   // авторизации на бэкенде
    //   // if (navigator.serviceWorker) {
    //   //   const sW = navigator.serviceWorker.controller;

    //   //   if (sW && sW.state === "activated") {
    //   //     navigator.serviceWorker.controller.postMessage({
    //   //       type: "authToken",
    //   //       token: token,
    //   //     });
    //   //   }
    //   // }
    // }

    loadingStore.toggle(true, "axios");

    return config;
  },
  (error: AxiosError) => {
    const loadingStore = useLoadingStore();
    loadingStore.toggle(false, "axios");

    const title: string = `${error.response!.status} - ${
      error.response!.statusText
    }`;
    // const body: string = error.message;

    toast.error(title);

    return Promise.reject(error);
  }
);

// Интерсептор на ответ
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Стопарнем блокиратор интерфейса
    const loadingStore = useLoadingStore();
    loadingStore.toggle(false, "axios");

    // Посмотрим тип ответа
    const responseType: string | undefined =
      response.headers["content-type"]?.split(";")[0];

    // Если есть тип и входит в файловые типы преобразуем в блоб
    // и сохраним
    // if (responseType && filetypes.includes(responseType)) {
    //   let filename: string = "";
    //   const disposition = response.headers["content-disposition"];

    //   if (disposition && disposition.indexOf("attachment") !== -1) {
    //     const filenameRegex =
    //       /(?:.*filename\*)=(?:([^'"]*)''|("))([^;]+)\2(?:[;`\n]|$)/gm;
    //     const matches = filenameRegex.exec(disposition);
    //     if (matches != null && matches[3]) {
    //       filename = decodeURI(matches[3].replace(/['"]/g, ""));
    //     }
    //   }

    // const file = new Blob([response.data], { type: responseType });

    // FileSaver(file, filename || `СПО ${v4()}`);
    //   return;
    // } else
    if (responseType && responseType === "application/json") {
      // Иначе преобразуем в JSON, если это ArrayBuffer и отдадим дальше
      if (response.data instanceof ArrayBuffer) {
        return JSON.parse(new TextDecoder().decode(response.data));
      }
      return response;
    }
  },
  (error: AxiosError) => {
    const authStore = useAuthStore();
    const loadingStore = useLoadingStore();

    const errResponse: any = error.response!.data;

    const title: string = `${errResponse!.statusCode} - ${
      errResponse!.message
    } (TraceId: ${errResponse!.traceId})`;

    const authErrorsCodes: number[] = [401, 403];

    if (error.response && authErrorsCodes.includes(error.response.status)) {
      authStore.signout().then((response: any) => {
        console.log(response);
        if (authErrorsCodes.includes(response.data.StatusCode)) {
          toast.error("Сессия истекла, необходимо войти заново!");
          router.push({ name: "login" });
        }
      });
    }

    toast.error(title);

    loadingStore.toggle(false, "axios");
    return Promise.reject(error);
  }
);

export default axios;
