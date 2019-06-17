<template>
  <div id="echarts">
    <div id="heatMap">
      <img v-if="isEmptyData == false" src="https://bitly.vn/1s50" />
      <p v-if="isEmptyData === true">This day has not processed yet</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import Slider from "@@/components/Slider.vue";
import HeatMap from "heatmap.js";
import Vue from "vue";

export default {
  name: "Echarts",
  props: ["dataH", "startHour", "endHour", "mode"],
  components: {
    Slider
  },
  data() {
    return {
      isEmptyData: true,
      isAllValueZero: true
    };
  },
  computed: {
    /*sliderStart (){return this.$store.state.sliderStart},
      sliderEnd() {return this.$store.state.sliderEnd},
      dataHeat(){return this.$store.state.heatData}*/
  },
  methods: {
    heatmapjs(dataH, startHour, endHour, mode) {
      let endHourEdit;
      if (endHour == 0) endHourEdit = 24;
      else endHourEdit = endHour;
      console.log("dataH", dataH);
      console.log("start-end hour:", startHour, endHour);
      //console.log('data',this.sliderStart, this.sliderEnd)
      var points = [];
      var max = 0;
      let x = [],
        y = [],
        value = [];
      if (mode == "day") {
        let index = 0;
        for (let k = 0; k < dataH.x.length; k++) {
          if (dataH.x[k].length !== 0) {
            index = k;
            break;
          }
        }
        for (let j = 0; j < dataH.x[index].length; j++) {
          x.push(parseInt(dataH.x[index][j]));
          y.push(parseInt(dataH.y[index][j]));
          value.push(parseInt(dataH.value[index][j]));
        }
        for (let i = startHour; i < endHourEdit; i++) {
          if (i !== index) {
            for (let j = 0; j < dataH.x[startHour].length; j++) {
              value[j] += parseInt(dataH.value[i][j]);
            }
          }
        }
      } else if (mode == "range") {
        if (startHour < 0 || endHour < 0) {
          startHour = 0;
          endHour = dataH.x.length - 1;
        }
        let index = 0;
        for (let k = 0; k < dataH.x.length; k++) {
          if (dataH.x[k].length !== 0) {
            index = k;
            break;
          }
        }
        for (let j = 0; j < dataH.x[index].length; j++) {
          x.push(parseInt(dataH.x[index][j]));
          y.push(parseInt(dataH.y[index][j]));
          value.push(parseInt(dataH.value[index][j]));
        }
        for (let i = startHour; i < endHour + 1; i++) {
          if(i!==index) {
            for (let j = 0; j < dataH.x[startHour].length; j++) {
              value[j] += parseInt(dataH.value[i][j]);
            }
          }
        }
      } else {
        if (startHour < 0 || endHour < 0) {
          startHour = 0;
          endHour = dataH.x.length - 1;
        }
        let index = 0;
        for (let k = 0; k < dataH.x.length; k++) {
          if (dataH.x[k].length !== 0) {
            index = k;
            break;
          }
        }
        for (let j = 0; j < dataH.x[index].length; j++) {
          x.push(parseInt(dataH.x[index][j]));
          y.push(parseInt(dataH.y[index][j]));
          value.push(parseInt(dataH.value[index][j]));
        }

        for (let i = 0; i < endHour + 1; i++) {
          if(i!==index) {
            for (let j = 0; j < dataH.x[startHour].length; j++) {
              if (dataH.value[i][j]) value[j] += parseInt(dataH.value[i][j]);
            }
          }
        }
        console.log("value", value);
      }

      for (let i = 0; i < x.length; i++) {
        if (x[i] !== 0 && this.isEmptyData === true) this.isEmptyData = false;
        if (value[i] !== 0 && this.isAllValueZero === true)
          this.isAllValueZero = false;
        max = Math.max(max, value[i]);
        var point = {
          x: parseInt(x[i]),
          y: parseInt(y[i]),
          value: value[i]
        };
        points.push(point);
      }
      if (this.isAllValueZero === true) max = 100;
      console.log("points", points);
      console.log("Maxxxxxxxxxx", max);
      console.log("IsEmpty", this.isEmptyData);
      // minimal heatmap instance configuration
      var heatmapInstance = HeatMap.create({
        // only container is required, the res```t will be defaults
        container: document.getElementById("heatMap")
      });
      // now generate some random data

      // heatmap data format
      var data = {
        max: max,
        data: points
      };
      // if you have a set of datapoints always use setData instead of addData
      // for data initialization
      heatmapInstance.setData(data);
    }
  },
  mounted() {
    console.log("mounted");
    this.$nextTick(function() {
      //let data=null
      /*if(this.dataHeat==null)
        {
          this.$store.commit('setHeatData', this.dataH)
          data=
        }
        else
        {
          data=this.dataHeat()
        }*/
      this.heatmapjs(this.dataH, this.startHour, this.endHour, this.mode);
    });
  }
};
</script>

<style scoped lang="less">
#echarts {
  display: flex;
  justify-content: center;
}
#heatMap {
  width: 928px;
  height: 576px;
  margin-left: auto;
  margin-right: auto;
  float: left;
}
p {
  width: 100%;
  text-align: center;
  font-size: 20px;
  color: #ff3b2b;
  font-weight: bold;
}
</style>
---------------------
