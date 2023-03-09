import { defineStore } from "pinia";

export const useLoadingStore = defineStore({
  id: "loading",
  state: () => ({
    axios: false, // Состояние заргузки axios
    route: false, // Состояние загрузки роутера
    loadersCounter: 0, // Количество выполняющихся запросов к API
  }),
  getters: {
    /**
     * Getter для получения текущего состояния загрузки страницы
     * @returns true - загружается, false - загружено.
     */
    loading(state): boolean {
      return state.axios || state.route || state.loadersCounter > 0;
    },
  },
  actions: {
    /**
     * Функция для переключения состояния загрузки
     * @param {boolean} isLoading - состояние, которое нужно установить.
     * @param {"axios" | "route"} type - кем производится загрузка.
     */
    toggle(isLoading: boolean, type: "axios" | "route") {
      if (isLoading) {
        this.loadersCounter++;
        this[type] = true;
      } else {
        this.loadersCounter > 0
          ? this.loadersCounter--
          : (this.loadersCounter = 0);
        this[type] = false;
      }
    },
  },
});
