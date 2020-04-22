<template>
  <div class="home">
    <div class="bg-dark-blue w-full py-32">
      <div class="container">
        <div class="px-5">
          <h1 class="text-5xl font-bold text-white">Design Assets For Your Project</h1>
          <p class="text-gray-400 mt-3 max-w-lg">
            All of the assets is free to use for any personal or commercial
            purposes. Go crazy on your designs.
          </p>
        </div>
      </div>
    </div>

    <div class="container" v-if="loading">Loading ...</div>
    <div v-else class="container px-4 py-4">
      <div class="flex flex-wrap">
        <masonry :cols="{default: 7, 1000: 3, 700: 2, 400: 1}" :gutter="8">
          <div
            class="mb-2 w-full relative bg-white img"
            v-for="(img, index) in images"
            :key="index"
          >
            <img class="h-auto w-full" :src="img.url" :alt="img.displayName" />
            <div class="cursor-pointer btn-download">
              <img @click="download(img)" src="../../public/img/icons/download.svg" />
            </div>
          </div>
        </masonry>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
import axios from "axios";

export default {
  name: "home",

  data() {
    return {
      images: [],
      loading: true
    };
  },
  methods: {
    download(img) {
      axios({
        url: img.url,
        method: "GET",
        responseType: "blob"
      }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${img.displayName}.svg`);
        document.body.appendChild(link);
        link.click();
      });
    }
  },
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
.img:hover .btn-download {
  display: flex;
}

.btn-download {
  display: none;
  background-color: #f93466;
  height: 32px;
  width: 32px;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  border-radius: 4px;
  align-items: center;
  &:hover {
    background-color: #e42555;
  }
  img {
    width: 18px;
    margin-left: 7px;
    margin-right: 7px;
  }
}
</style>
