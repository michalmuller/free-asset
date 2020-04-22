<template>
  <div
    id="app"
    class="font-body flex flex-col text-dark-blue antialiased leading-tight relative min-h-screen"
  >
    <div id="site" class="flex-1">
      <navigation></navigation>
      <router-view />
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation";
import AppFooter from "@/components/AppFooter";
export default {
  name: "App",
  components: { Navigation, AppFooter },

  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>

<style lang="scss">
@import "../node_modules/tailwindcss/base.css";
@import "../node_modules/tailwindcss/components.css";
@import "../node_modules/tailwindcss/utilities.css";
@import url("https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&display=swap");

html {
  margin: 0 !important;
}
body {
  background-color: white;
  font-family: "Hind", sans-serif;
  margin: 0 !important;
}
</style>
