import { createRouter, createWebHistory } from "vue-router";

const HomeView = () => import("@/views/HomeView.vue");
const AllCategories = () => import("@/views/AllCategories.vue");
const AllTags = () => import("@/views/AllTags.vue");
const AboutView = () => import("@/views/AboutView.vue");
const PostView = () => import("@/views/PostView.vue");

const PostsByTag = () => import("@/components/PostsByTag.vue");
const PostsByCategory = () => import("@/components/PostsByCategory.vue");
const BlogView = () => import("@/views/BlogView.vue");
const SignIn = () => import("@/components/SignIn.vue");
const SignUp = () => import("@/components/SignUp.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/blog",
    name: "Blog",
    component: BlogView,
  },
  {
    path: "/post/:slug",
    name: "Post",
    component: PostView,
  },
  {
    path: "/category/:category",
    name: "Category",
    component: PostsByCategory,
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: PostsByTag,
  },
  {
    path: "/categories",
    name: "Categories",
    component: AllCategories,
  },
  {
    path: "/tags",
    name: "Tags",
    component: AllTags,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: SignIn,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // short for `routes: routes`
});

export default router;
