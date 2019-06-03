<template>
  <div class="container">
    <div class="head">
      <h2>Login</h2>
    </div>
    <div class="form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">

          <input type="text" v-model="username" name="username" class="form-control" placeholder="Email" :class="{ 'is-invalid': submitted && !username }" />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">

          <input type="password" v-model="password" name="password" class="form-control" placeholder="password" :class="{ 'is-invalid': submitted && !password }" />
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <div id="button" class="form-group">
          <button class="btn btn-primary" >Login</button>
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
        submitted: false
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
            .then(() => {
              this.$cookies.set('isAuth', true, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
              })
              this.$router.back()
             /* if (process.client) {
                window.location.reload();
              }*/
            })
            .catch((err) => console.log(err))
        }
      }
    }
  }
</script>

<style scoped>
.form{
  align-self: center;
  width: 50%;
}
  .container
  {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
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
</style>
