<template>
  <div>
    <div>
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav >
          <b-nav-item href="/">Home</b-nav-item>

        </b-navbar-nav>
        <b-navbar-nav v-if="getUser" class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>{{getUser}}</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item-button @click="doLogout" href="#">Sign Out</b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <nuxt />
  </div>
</template>
<script>
  import BNavbarNav from "bootstrap-vue/src/components/navbar/navbar-nav";
  import { mapActions } from 'vuex'
  export default {
    components: {BNavbarNav},
    computed: {
      title () {
        return this.$route.matched.map((r) => {
          return (r.components.default.options ? r.components.default.options.pageTitle : r.components.default.pageTitle)
        })[0]
      },
      getUser(){
        let user=""
        if(this.$store.state.user)
          user=this.$store.state.user.email
        return user
      },
    },
    methods:{
      ...mapActions([
        'logout'
      ]),
      doLogout () {
        console.log('logout')
        this.logout()
          .then(() => {
            this.$cookies.remove('isAuth')
            this.$router.push('/login')
          })
          .catch((err) => console.log(err))
      }
    }

  }
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
