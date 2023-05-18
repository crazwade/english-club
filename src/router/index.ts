import { createRouter, createWebHistory } from "vue-router";
import Layout from '../layout/LayoutView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/HomePage",
      component: Layout,
      name: "Main",
      children: [
        {
          path: "/HomePage",
          name: "HomePage",
          component: () => import("@/views/homePage/HomePage.vue"),
        },
        {
          path: "/ThemePage",
          name: "ThemePage",
          component: () => import("@/views/themePage/ThemePage.vue"),
        },
        {
          path: "/EditPage",
          name: "EditPage",
          component: () => import("@/views/editPage/EditPage.vue"),
        },
        {
          path: "/personPage",
          name: "PersonPage",
          component: () => import("@/views/personPage/PersonPage.vue"),
        },
      ],
    },
  ],
});

export default router;
