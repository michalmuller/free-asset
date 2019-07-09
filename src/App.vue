<template>
  <div id="app" class="font-body text-dark-blue antialiased leading-tight">
    <navigation></navigation>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navigation from "@/components/Navigation";
export default {
  name: "App",
  components: { Navigation },

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

@import url("https://fonts.googleapis.com/css?family=Raleway:400,500,600,700&display=swap");

body {
  background-image: url("../public/img/Group 50.png");
  background-color: #f7f7f7;
  font-family: "Raleway", sans-serif;
}
</style>
