<template>
  <div class="camera-card">
    <div>
      <b-card
        id="card"
        :title="name"
        href="/reports"
        img-src="https://bitly.vn/1s50"
        img-alt="Image"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        img-top
      >
        <b-button v-if="multiCam==false" :href="'/reports/'+this.name" variant="primary">View report</b-button>
        <b-button :disabled="isSelected" v-else href="/reports/multiCam" variant="primary">View report</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Camera.vue",
  props: ["name", "imgUrl", "multiCam", "cameras"],
  computed: {
    isSelected() {
      let selected = true;
      console.log(this.cameras)
      if (this.cameras) {
        for (let i=0;i<this.cameras.length;i++)
        {
          //console.log(cameras[i].toString())
          if (this.cameras[i] == this.name) {
            selected = false;
          }
        }
      }
      console.log(selected)
      return selected
    }
  }
};
</script>

<style scoped>
.camera-card {
  margin-bottom: 25px;
}
</style>
