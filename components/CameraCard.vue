<template>
  <div class="camera-card">
    <div>
      <b-card
        id="card"
        :title="name"
        href="/reports"
        :img-src="url"
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
  import axios from 'axios'
  const api="https://datncountingapi.mybluemix.net/"
export default {
  name: "Camera.vue",
  props: ["name", "multiCam", "cameras"],
  data () {
    return {
      url:''
    }
  },
  async mounted (){
    let res = await axios.get(`${api}get-file?filename=${this.name}.png`)
    if (res.data.url)
      this.url=res.data.url
    else
      this.url='/no-img.jpg'
  },
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
