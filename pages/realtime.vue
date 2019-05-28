<template>
  <div class="container">
    <div class="counting">
      <b-card
        title="IN"


      >
        <b-button variant="danger">{{this.in}}</b-button>
      </b-card>

      <b-card
        title="OUT"


      >
        <b-button variant="success">{{this.out}}</b-button>
      </b-card>
    </div>


  </div>
</template>

<script>
import firebase from '../plugins/firebase'
  export default {
      name: "realtime",
    data ( context ) {
      // Called every time before loading the component
      return {in :0 , out : 0}
    },
    created :  function () {
        let me=this
      firebase
        .database ()
        .ref ( '/')
        .on('value',function(snapshot){
          let data=snapshot.val()
          me.in=data.in
          me.out=data.out
          console.log(data)
        })
    },
  }
</script>

<style scoped>
  .container{
    display: flex;
    justify-content: center;

  }
  .btn
  {
    width:100%;
    font-size: 500%;
  }
  .counting
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:0;
    padding: 30px;
    width: 100%;
  }
  .card
  {
    text-align: center;
    width: 30%;
    margin-right:50px;
  }
</style>
