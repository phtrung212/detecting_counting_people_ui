<template>
  <div class="camera-card">
    <div>
      <b-card
        id="card"
        :title="name"
        :img-src="url"
        img-alt="Image"
        tag="article"
        style="max-width: 20rem;"
        img-top
      >
        <b-button class="btn_in">IN | {{this.in}}</b-button>
        <b-button class="btn_out">OUT | {{this.out}}</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  const api = "https://datncountingapi.mybluemix.net/"
  const _api = "http://localhost:3001/"
  export default {
    name: "Camera.vue",
    props: ["name", "in", "out"],
  data() {
    return {
      url: ''
    }
  },
  async mounted() {
    let res = await axios.get(`${api}get-file?filename=${this.name}.png`)
    if (res.data.url)
      this.url = res.data.url
    else
      this.url = '/no-img.jpg'
  },
  };
</script>

<style scoped>

  .btn_in{
    background-color: #dc3545;
  }
  .btn_out{
    background-color: #28a745;
  }
  .camera-card {
    margin-bottom: 25px;
    cursor: pointer;
    text-align: center;
  }




</style>
