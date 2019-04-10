<template>
  <div id="echarts">
    <div id="heatMap"></div>
  </div>
</template>
<script type="text/javascript">
  import Slider from '@@/components/Slider.vue'
  import HeatMap from 'heatmap.js'
  import Vue from 'vue'

  export default {
    name: 'Echarts',
    props: [
      'dataH', 'startHour', 'endHour','mode'
    ],
    components:{
      Slider
    },
    data () {
      return {
      }
    },
    computed:{
      /*sliderStart (){return this.$store.state.sliderStart},
      sliderEnd() {return this.$store.state.sliderEnd},
      dataHeat(){return this.$store.state.heatData}*/
    },
      methods: {
      heatmapjs(dataH, startHour, endHour, mode) {
        let endHourEdit
        if(endHour==0)
            endHourEdit=24
        else
          endHourEdit=endHour
        console.log('dataH',dataH)
        console.log('start-end hour:', startHour, endHour)
        //console.log('data',this.sliderStart, this.sliderEnd)
        var points = [];
        var max = 0;
        let x =[],
          y=[],
          value=[]
        if(mode == 'day')
        {
          for (let i=startHour;i<endHourEdit;i++)
          {
            for (let j=0;j<(dataH.x[i]).length;j++)
            {
              x.push(parseInt(dataH.x[i][j]))
              y.push(parseInt(dataH.y[i][j]))
              value.push(parseInt(dataH.value[i][j]))
            }

          }
        }else
        {
          x=dataH.x
          y=dataH.y
          value=dataH.value
        }

        for (let i=0;i<x.length;i++) {
          max = Math.max(max, value[i]);
          var point = {
            x: parseInt(x[i]),
            y: parseInt(y[i]),
            value: value[i]
          };
          points.push(point);
        }
        console.log('points',points)
        // minimal heatmap instance configuration
        var heatmapInstance = HeatMap.create({
          // only container is required, the res```t will be defaults
          container: document.getElementById('heatMap')
        });
// now generate some random data


// heatmap data format
        var data = {
          max: max,
          data:points
        };
// if you have a set of datapoints always use setData instead of addData
// for data initialization
        heatmapInstance.setData(data);
      },
    },
    mounted () {
      console.log('mounted')
      this.$nextTick(function () {
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
        this.heatmapjs(this.dataH, this.startHour, this.endHour, this.mode)
      })
    }
  }
</script>

<style scoped lang="less">
  #echarts
  {
  }
  #heatMap{
    width: 600px;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
    float: left;
  }
</style>
---------------------
