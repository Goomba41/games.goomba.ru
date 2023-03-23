import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "@/stores/auth.store";
import { useLoadingStore } from "@/stores/loading.store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "mainLayout",
      component: () => import("../layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../pages/HomePage.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "home" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const auth = useAuthStore();

  const openPages = ["/login"];
  const authRequiredPage = !openPages.includes(to.path);

  // Если страница не логин и пользователь не авторизован, то
  // попытаемся синхронизироваться с серверной сессией
  // где проверим статус аутентификации, если есть, то пропишем
  // пользователя в хранилище, иначе редиректим на логин
  if (auth.user === undefined || !auth.authenticated) await auth.sync();

  // Если страница логина и пользователь уже авторизован -
  // перенаправить откуда пришел
  if (to.path === "/login" && auth.user !== undefined && auth.authenticated) {
    return from.fullPath;
  }

  // Если страница требует авторизации и пользователь не авторизован -
  // перенаправить на страницу логина
  if (authRequiredPage && (auth.user === undefined || !auth.authenticated)) {
    return "/login";
  }
});

// Перед загрузкой страницы отметить старт загрузки маршрута
router.beforeResolve((to, from, next) => {
  if (to.name) {
    useLoadingStore().toggle(true, "route");
  }
  next();
});

// После загрузки отметить завершение загрузки маршрута
router.afterEach(() => {
  useLoadingStore().toggle(false, "route");
});

export default router;
