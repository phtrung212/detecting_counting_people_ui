<template>
  <div class="camera-card">
    <div>
      <b-card
        id="card"
        :title="name"
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
  const api = "https://datncountingapi.mybluemix.net/"
  export default {
    name: "Camera.vue",
    props: ["name", "in", "out"],

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
