<template>
  <div class="home container">
    <div v-if="loading">Loading ...</div>
    <div v-else class="flex flex-wrap mt-4">
      <div v-for="(img, index) in images" :key="index" class="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/6">
        <div class="m-2 p-1 rounded shadow-md bg-white">
          <div class="img-container">
            <div class="img-square">
              <img class="p-2" :src="img.url" alt />
            </div>
          </div>
          <div class="img-actions p-2">...</div>
        </div>
      </div>
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
      })
      .catch(err => {
        console.log(err);
        this.loading = false;
      });
  }
};
</script>
<style lang="scss" scoped>
.img-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background-color: #fcfcfc;
  .img-square {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 100%;
      width: 100%;
      border: 1px solid #dedede;
      border-radius: 2px;
    }
  }
}
.img-actions {
}
</style>
