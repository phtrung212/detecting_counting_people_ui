export const state = () => ({
  sliderStart:0,
  sliderEnd:0,
  heatData:null,
  selectedCamera:false
})
export const mutations = {
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
