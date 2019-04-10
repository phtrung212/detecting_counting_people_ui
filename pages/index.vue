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
export default {
  pageTitle: 'Camera List',
  async asyncData () {
    let { data } = await axios.get("https://datncountingapi.mybluemix.net/api/cameras?filter[fields][id]=true&filter[fields][name]=true")
    return { cameras: data }
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
  mounted : function() {
    this.$cookies.removeAll()
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
