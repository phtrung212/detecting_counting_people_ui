<template>
  <div class="container">
    <div>
      <h2>Login</h2>
    </div>
    <div class="form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
        <div class="form-group">
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
      let user = await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => resolve(user))
      })
      this.setUser(user) // setUser is mapped action from vuex
      if (user) {
        this.$router.push('/') // if non-null user given, go to root page.
      }
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
              if (process.client) {
                window.location.reload();
              }
            })
            .catch((err) => console.log(err))
        }
      }
    }
  }
</script>

<style scoped>
.form{
  width: 50%;
}
</style>
