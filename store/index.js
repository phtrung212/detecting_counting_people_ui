import firebase from '../plugins/firebase'

export const state = () => ({
  sliderStart:0,
  sliderEnd:0,
  heatData:null,
  selectedCamera:false,
  user: null
})
export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setSliderStart: function(state, start) {
    state.sliderStart = start
  },
  setSliderEnd: function(state, end) {
    state.sliderEnd = end
  },
  setHeatData: function(state, data) {
    state.heatData = data
  },
  setSelectedCamera: function(state, data) {
    state.selectedCamera = data
  },
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  getSliderStart: state => {
    return state.sliderStartS
  },
  getSliderEnd: state => {
    return state.sliderEnd
  },
  getHeatData: state => {
    return state.heatData
  },
  getSelectedCamera: state => {
    return state.selectedCamera
  },
}
export const actions = {
  async login ({ commit },{email, password}) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          resolve()
        })
    })
  }
}
export const strict = false

