<template>
  <div class="progress-container">
    <progress :value="percentage" max="100">{{percentage}}%</progress>
    <p v-if="uploaded">Image upladed</p>
    <input type="file" name="file" id="file" @change="upload($event.target.files[0])" />
    <label id="choose-file" for="file">Choose a file</label>
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
      uploaded: false
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
                url: url
              })
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
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
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}

progress[value]::-webkit-progress-value {
  background-color: #05cc47;
  border-radius: 2px;
}

#file {
  position: absolute;
  top: 50%;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

#choose-file {
  position: absolute;
  color: white;
  background-color: #df474b;
  top: 50%;
  font-weight: 700;
  font-size: 1.25em;
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 5px;
}

#choose-file:hover {
  background-color: #c9393e;
}
</style>
