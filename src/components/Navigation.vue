<template>
  <nav class="flex items-center justify-between flex-wrap bg-blue-900 p-6">
    <router-link to="/">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Free Design Asset</span>
      </div>
    </router-link>
    <div class="block lg:hidden" @click="toggle = !toggle">
      <button
        class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-200 hover:text-white hover:border-white"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
      :class="{'hidden': toggle}"
    >
      <div class="text-sm lg:flex-grow">
        <router-link to="/upload">
          <p
            v-if="user"
            class="block mt-4 lg:inline-block lg:mt-0 text-blue-100 hover:text-white mr-4"
          >Upload</p>
        </router-link>
      </div>
      <div v-if="user" class="text-sm lg:flex-between">
        <p
          @click="logout"
          class="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-blue-100 hover:text-white mr-4"
        >Logout</p>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
export default {
  name: "Navigation",
  data() {
    return {
      toggle: true
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("user/LOGOUT_USER");
        })
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>

<style>
</style>
