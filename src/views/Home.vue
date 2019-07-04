<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>
