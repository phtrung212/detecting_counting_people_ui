<template>
  <div class="camera-card">
    <div>
        <b-card
          id = "card"
          :title="name"
          href="/reports"
          img-src="https://bitly.vn/1s50"
          img-alt="Image"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
          img-top>
          <b-button :href="'/reports/'+this.name" variant="primary">View report</b-button>
        </b-card>
    </div>

  </div>

</template>

<script>
    export default {
        name: "Camera.vue",
      props:[
        'name', 'imgUrl'
      ]
    }
</script>

<style scoped>
.camera-card{
  margin-bottom: 25px;
}
</style>
