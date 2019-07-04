<template>
  <div class="login">
    <h3>Login</h3>
    <form @submit.prevent="login">
      <input type="text" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          var user = {
            displayName: res.user.displayName,
            uid: res.user.uid,
            email: res.user.email,
            photoUrl: res.user.photoURL,
            phoneNumber: res.user.phoneNumber
          };
          this.$store.commit("user/AUTH_USER", user);
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style >
p a {
  text-decoration: none;
  color: black;
}
</style>