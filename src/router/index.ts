import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         component: HomeView,
      },
      {
         path: "/pokemon/:id",
         name: "pokemon",
         component: () => import("../views/PokemonInfoView.vue"),
      },
      {
         path: "/:pathMatch(.*)*",
         name: "NotFound",
         component: () => import("../views/ErrorView.vue"),
      },
   ],
});

export default router;
