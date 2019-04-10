<template>
  <div>
    <div class="bv-example-row">
      <b-form-group>
        <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2" @change="handleChange">
          <div class="cell" v-for="camera in cameraList" :key="camera.id">
            <b-form-checkbox :value="camera.name"></b-form-checkbox>
            <Camera :name="camera.name" :imgUrl="camera.image"/>

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
        selected: []
      }
    },
    methods: {
      handleChange(checked) {
        if (checked.length > 0)
          this.$store.commit('setSelectedCamera', true)
        this.$cookies.set('cameras', checked, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
      }
    },
    props: [
      'cameraList'
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

  .cell {
    margin-left: 10px;
  }
</style>
