import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./components/Login"),
    },
    {
      path: "/Mac",
      alias: "/Mac",
      name: "Mac",
      component: () => import("./components/MacList"),
    },
    {
      path: "/Mac/:id",
      name: "tutorial-details",
      component: () => import("./components/Mac"),
      props: true,
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddMac"),
    },
  ],
});
