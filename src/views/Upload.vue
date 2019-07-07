<template>
  <div>
    <div class="progress-container">
      <progress :value="percentage" max="100">{{percentage}}%</progress>
    </div>

    <div class="container w-full max-w-xs mt-20 align-middle">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="text-gray-500 font-bold text-xl mb-5">Upload New Icon</h1>

        <input
          type="text"
          class="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 focus:outline-none"
          name="name"
          placeholder="Icon Display Name"
          v-model="displayName"
        />
        <div class="mt-2">
          <input type="file" name="file" id="file" @change="upload($event.target.files[0])" />

          <label
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            id="choose-file"
            for="file"
          >Choose a file</label>
        </div>
        <p class="mt-4" v-if="uploaded">Image upladed</p>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/firebaseInit";
export default {
  name: "Upload",
  data() {
    return {
      percentage: 0,
      uploaded: true,
      displayName: ""
    };
  },
  methods: {
    upload(file) {
      this.uploaded = false;
      var storageRef = firebase.storage().ref("icons/" + file.name);
      var task = storageRef.put(file);

      task.on(
        "state_changed",
        snapshot => {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percentage = percentage;
        },
        err => {
          console.log(err);
        },
        complete => {
          this.uploaded = true;
          this.percentage = 0;
          storageRef.getDownloadURL().then(url => {
            console.log(url);
            db.collection("icons")
              .add({
                url: url,
                displayName: this.displayName
              })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                this.displayName = "";
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
                this.displayName = "";
              });
          });
        }
      );
    }
  }
};
</script>

<style scoped>
.progress-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

progress {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  width: 100%;
}

progress[value]::-webkit-progress-bar {
  background-color: #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

progress[value]::-webkit-progress-value {
  background-color: #05cc47;
}

#file {
  position: absolute;
  top: 50%;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}
</style>
