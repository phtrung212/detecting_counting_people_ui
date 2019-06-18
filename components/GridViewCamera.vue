<template>
  <div>
    <div class="head">
      <div class="sub-head">
        <p>CAMERA LIST</p>
        <hr>
        <div class="head-tool text-center margin-auto display-block">
          Selection mode:
          <b-button v-b-tooltip.hover title="Click here to change selection mode" v-if="mode==1" @click="changeMode" variant="primary">Single</b-button>
          <b-button v-b-tooltip.hover title="Click here to change selection mode" v-else @click="changeMode" variant="primary">Multiple</b-button>
        </div>
      </div>

    </div>
    <div class="bv-example-row">
      <b-form-group>
        <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2" @change="handleChange">
          <div class="col-4" v-for="(camera,index) in cameraList" :key="camera.id">
            <b-form-checkbox v-if="mode==2" :value="camera.name"></b-form-checkbox>
            <Camera :name="camera.name" :multi-cam="multiCam" :cameras="selected" :info="inforCameras[index]"/>

          </div>
        </b-form-checkbox-group>
      </b-form-group>
    </div>
  </div>
</template>

<script>
  import Camera from '@@/components/CameraCard.vue'

  export default {
    name: "GridViewCamera",
    data() {
      return {
        mode:1,
        selected: [],
        multiCam:false,
      }
    },
    computed: {
    },

    methods: {
      changeMode(){
          if (this.mode==1)
            this.mode=2
        else
          this.mode=1
      },
      handleChange(checked) {
        if (checked.length > 0)
        {
          this.$store.commit('setSelectedCamera', true)
          this.multiCam=true
          this.selected=checked
        }else {
          this.multiCam=false
        }

        this.$cookies.set('cameras', checked, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    },
    props: [
      'cameraList','inforCameras'
    ],
    components: {Camera},
  }
</script>

<style scoped>
  #checkbox-group-2 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
  }

  /*.cell:not(:nth-child(3n - 2)) {*/
    /*margin-left: 50px;*/
  /*}*/
  .head{
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 20px;
  }
  .sub-head{
    font-weight: bold;
    text-align: center;
    display: flex;
    flex-direction: column;
    width:100%;
  }
  .sub-head p {
    font-size: 20px;
  }
  .head-tool{
    align-self: flex-end;
  }
  hr {
    display: block;
    margin-top: 0;
    border-width: 2px;
  }
</style>
