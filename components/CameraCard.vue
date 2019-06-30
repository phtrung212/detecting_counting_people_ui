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
        :class="isActive"
        img-top
      >
        <div class="bodyCard">
          <div class="info">
            Last day processed:{{info.day}}<br/>
            in:{{info.in}}<br/>
            out:{{info.out}}<br/>
          </div>
          <b-button v-if="multiCam==false" :href="'/reports/'+this.name" variant="primary">View report</b-button>
          <b-button :disabled="isSelected" v-else href="/reports/multiCam" variant="primary">View report</b-button>
        </div>

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
    props: ["name", "multiCam", "cameras","info"],
    methods:{
      onClick (){
        alert('Ohhhhhhhhhh')
      },
    },
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
    computed: {
      isActive(){
        let selected = '';
        //console.log(this.cameras)
        if (this.cameras) {
          for (let i = 0; i < this.cameras.length; i++) {
            //console.log(cameras[i].toString())
            if (this.cameras[i] == this.name) {
              selected = 'active';
            }
          }
        }
        //console.log(selected)
        return selected
      },
      isSelected() {
        let selected = true;
        //console.log(this.cameras)
        if (this.cameras) {
          for (let i = 0; i < this.cameras.length; i++) {
            //console.log(cameras[i].toString())
            if (this.cameras[i] == this.name) {
              selected = false;
            }
          }
        }
        //console.log(selected)
        return selected
      }
    }
  };
</script>

<style scoped>
  .card-title {
    text-align: center;
  }
  #card{
    display: flex;
  }
  .camera-card {
    margin-bottom: 25px;
    cursor: pointer;
  }

  .camera-card:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  .bodyCard{
    display: flex;
    flex-flow: column;
  }
  .info{
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-weight: bold;
    color: #47494e;
  }
</style>
