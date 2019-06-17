<template>
  <section class="container">
    <div>
      <GridView :cameraList="cameras" :inforCameras="info" />
    </div>

  </section>
</template>

<script>
  import axios from 'axios'
  import GridView from '~/components/GridViewCamera.vue'
  import Slider from '~/components/Slider.vue'
  import { mapActions,mapMutations } from 'vuex'
  import firebase from '../plugins/firebase'
  const api="https://datncountingapi.mybluemix.net/api/"
  const _api="http://localhost:3001/api/"

export default {
  pageTitle: 'Camera List',
  async asyncData () {
    let { data } = await axios.get(`${api}cameras?filter[fields][id]=true&filter[fields][name]=true`)
    let camNames=[]
    for (let i=0;i<data.length;i++)
    {
      camNames.push('%22'+data[i].name+'%22')
    }
    let infors= await  axios.get(`${api}LineCharts/getLastDayProcessed?cameras=[${camNames}]`);
    console.log('infor',infors.data.data)
    let inforSentToComp=[]
    for (let j=0;j<infors.data.data.length;j++)
    {
      if(infors.data.data[j].length!==0)
      {

        let day=infors.data.data[j].day+'/'+infors.data.data[j].month+'/'+infors.data.data[j].year;
        inforSentToComp.push({day:day,in:infors.data.data[j].in,out:infors.data.data[j].out})
      }else
      {
        let day='Empty data';
        inforSentToComp.push({day:day,in:0,out:0})
      }

    }
    console.log('infor send to component',inforSentToComp)
    return { cameras: data, info:inforSentToComp}
  },
  data: function () {
    return {
      isClient:process.browser
    }
  },
  components: {
  Slider,
  GridView
  },
  mounted : async function() {
    /*let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => resolve(user))
    })
    this.setUser(user) // setUser is mapped action from vuex*/
    this.$cookies.remove('cameras')
  },
  methods:{
    ...mapMutations([
      'setUser'
    ]),
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  margin-top: 10px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
