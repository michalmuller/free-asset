<template>
  <div class="home">
    <div v-if="loading">Loading ...</div>
    <div else class="images">
      <img v-for="(img, index) in images" :key="index" :src="img.url" :alt="img.name" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";

export default {
  name: "home",

  data() {
    return {
      images: [],
      loading: true
    };
  },
  methods: {},
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  mounted() {
    db.collection("icons")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          var id = { id: doc.id };
          var image = { ...id, ...doc.data() };
          this.images.push(image);
        });
      })
      .then(() => {
        this.loading = false;
      });
  }
};
</script>
<style lang="scss" scoped>
$grey: #ddd;

.images {
  display: flex;
}
img {
  padding: 10px;
  margin: 5px;
  border: 1px solid $grey;
  width: 200px;
  height: 200px;
  object-fit: cover;
}
</style>
