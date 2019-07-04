<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link v-if="user" to="/upload">Upload</router-link>
      <a v-if="user" href="#" @click="logout">Logout</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
export default {
  name: "App",
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

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    padding: 0 10px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
