<template>
  <div id="app" class="text-gray font-body antialiased leading-tight">
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
</style>
