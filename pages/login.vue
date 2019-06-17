<template>
  <div class="container">

    <div class="form">
      <div class="head">
      <h2>Login</h2>
    </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">

          <input type="text" v-model="username" name="username" class="form-control" placeholder="Email" :class="{ 'is-invalid': submitted && !username }" />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">

          <input type="password" v-model="password" name="password" class="form-control" placeholder="password" :class="{ 'is-invalid': submitted && !password }" />
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <p class="co-red" v-if="this.err">{{this.err}}</p>
        <div id="button" class="form-group">
          <button class="btn btn-primary" @keyup.enter.native="handleSubmit">Login</button>
        </div>

      </form>
    </div>
  </div>
</template>

<<script>
  import { mapActions,mapMutations } from 'vuex'
  import firebase from '../plugins/firebase'

  export default {
    async mounted () {
      /*let user = await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => resolve(user))
      })
      this.setUser(user) // setUser is mapped action from vuex
      if (user) {
        this.$router.push('/') // if non-null user given, go to root page.
      }*/
    },
    data () {
      return {
        username: '',
        password: '',
        submitted: false,
        err:null,
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      ...mapMutations([
        'setUser'
      ]),
      loginGoogle () {
        this.login()
          .then(() => {
              location.reload()
          })
          .catch((err) => console.log(err))
      },
      handleSubmit (e) {
        this.submitted = true;
        const { username, password } = this;
        console.log(username,password)
        if (username && password) {
          this.$store
            .dispatch("login", {
              email: this.username,
              password: this.password
            })
            .then((res,err) => {
              if(err)
                console.log('login error',err)
              this.$cookies.set('isAuth', true, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
              })
              this.$router.back()
             /* if (process.client) {
                window.location.reload();
              }*/
            })
            .catch((err) => {console.log('loginerr',err.message)
            this.err='Email or password is invalid'})
        }
      }
    }
  }
</script>

<style scoped>
  .co-red{
    color: red;
  }
.form{
  align-self: center;
  width: 50%;
}
  .container
  {
    margin-top: 50px;
    width: 50%;
    min-height: 50vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #e8ecf5;
    border-radius:5px;
    align-items: center;
    align-content: center;
  }
  .head
  {
    text-align: center;
  }
  #button
  {
    text-align: center;

  }
  button
  {
    width:30%;
  }
  h2{
    margin-bottom: 20px;
  }
</style>
