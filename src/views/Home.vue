<template>
  <div class="home container">
    <div v-if="loading">Loading ...</div>
    <div v-else class="flex flex-wrap mt-8">
      <div v-for="(img, index) in images" :key="index" class="w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/6">
        <div class="m-2 img-wrapper rounded shadow-md bg-white">
          <div class="img-container">
            <div class="img-square">
              <img class="p-4" :src="img.url" :alt="img.displayName" />
            </div>
            <div class="cursor-pointer btn-download">
              <img @click="download(img)" src="../../public/img/icons/download.svg" />
            </div>
          </div>
        </div>
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
.img-wrapper {
  padding: 0.35rem !important;
  &:hover .btn-download {
    display: flex;
  }
  .img-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background-color: #f6f7f8;
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
        border: 1px solid #e9e9e9;
      }
    }
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
}
</style>
