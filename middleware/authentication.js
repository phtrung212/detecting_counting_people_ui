import firebase from '../plugins/firebase'
export default async function ({ store, route, redirect,app }) {
  let user=await firebase.auth().onAuthStateChanged((user) => {
    store.commit('setUser', user)
    if(user)
    {
      console.log('user not null')
      app.$cookies.remove('isAuth')
      app.$cookies.set('isAuth', true, {
        maxAge: 60 * 60 * 24 * 7
      })
    }else {

      console.log('user null')
      app.$cookies.remove('isAuth')
      app.$cookies.set('isAuth', false)
      if (route.name !== 'login') {
        console.log('redirect')
        redirect('/login')
      }
    }

  })
  /*if (!user && route.name !== 'login') {
    console.log('redirect')
    redirect('/login')
  }*/
  /*if (!store.state.user && route.name !== 'login') {
    redirect('/login')
  }*/
  /*if (store.getters.isAuthenticatestod && route.name === 'login') {
    redirect('/')
  }*/
}
