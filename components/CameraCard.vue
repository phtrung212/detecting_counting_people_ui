<template>
  <div>
    <div>
        <b-card id = "card" title="Camera i" img-src="https://bit.ly/2uka5NW" img-alt="Image" img-top>
          <!--<b-card-text>-->
            <!--This is a wider card with supporting text below as a natural lead-in to additional content.-->
            <!--This content is a little bit longer.-->
          <!--</b-card-text>-->
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>
    </div>

  </div>
    
</template>

<script>
    export default {
        name: "Camera.vue"
    }
</script>

<style scoped>
  #card{
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .card-body{
    height: 30px;
  }
  .card-title{
    margin-top: -15px;
  }
  .text-muted{
    position: center;
  }

</style>
