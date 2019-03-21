<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
        <div class="w-100" />
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
        <div class="w-100" />
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
        <b-col><Camera/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import Camera from '@@/components/CameraCard.vue'
    export default {
        name: "GridViewCamera",
      components: {Camera},
    }
</script>

<style scoped>

</style>
