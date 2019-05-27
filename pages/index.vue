<template>
  <section class="container">
    <div>
      <GridView :cameraList="cameras" />
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
    return { cameras: data}
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
