<template>
  <div class="container">
    <div class="header">
      <p>Realtime Counting</p>
      <hr>
    </div>
    <div class="row" :key="this.in_num+this.out+this.listRealtimeCam">
      <div class="col-4" v-for="(camera,index) in listRealtimeCam" :key="index">
        <Camera :name="camera" :in="in_num[index]" :out="out[index]"/>
      </div>
    </div>


  </div>
</template>

<script>
import firebase from '../plugins/firebase'
import Camera from  '~/components/RealtimeCameraCard.vue'
  export default {
      name: "realtime",
    data ( context ) {
      // Called every time before loading the component
      return {in_num :[] , out : [], listRealtimeCam:[]}
    },
    components: {
     Camera
    },
    created : async function () {
        let me=this
      await firebase
        .database ()
        .ref ( '/')
        .on('value',function(snapshot){
          let list_cam=[]
          let x=snapshot.forEach(function(element) {
            //console.log(element.key);
            list_cam.push(element.key)
          })
          me.listRealtimeCam=list_cam
          let in_num=[]
          let out_num=[]
          me.listRealtimeCam.forEach(function (camera) {
            firebase
              .database ()
              .ref ( '/'+camera)
              .on('value',function(snapshot){
                let data=snapshot.val()
                in_num.push(data.in)
                out_num.push(data.out)
              })

          })
          me.in_num=in_num
          me.out=out_num
        })
      //console.log('in',me.in)
    },
  }
</script>

<style scoped>
  hr {
    display: block;
    margin-top: 0;
    border-width: 2px;
  }
  .listCam{
    display: flex;
    justify-content: space-between;
  }
  .header
  {
    margin-top: 20px;
    text-align: center;
    font-weight: bold;
  }
</style>
