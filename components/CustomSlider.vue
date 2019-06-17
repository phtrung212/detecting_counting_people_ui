<template>
  <div id="app">
    <ejs-slider
      id="defaultTooltip"
      ref="defaultSlider"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :tooltip="tooltip"
      :tooltipChange="tooltipChangeHandler"
      :renderingTicks="renderingTicksHandler"
      :ticks="ticks"
      type="Range"
    ></ejs-slider>
  </div>
</template>
<script>
import Vue from "vue";
import { SliderPlugin } from "@syncfusion/ej2-vue-inputs";
Vue.use(SliderPlugin);

export default {
  name:"Slider",
  props:['valueMin','valueMax', 'valueLargeStep','valueSmallStep', 'mode'],
  data() {
    return {
      ticks: {
        placement: "After",
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep:this.valueLargeStep,
        smallStep: this.valueSmallStep,
        showSmallTicks: true
      },
      tooltip: {
        placement: "Before",
        isVisible: true,
        cssClass: "e-tooltip-cutomization"
      },
      step: 1,
      min: this.valueMin,
      max: this.valueMax,
      value: [this.valueMin, this.valueMax],
      startPoint:0,
      endPoint:23,
    };
  },
  methods: {
    renderingTicksHandler: function(args) {
      //console.log('renderTick',args)
      //let totalMiliSeconds = Number(args.value);
      /**
       * toLocaleTimeString is predefined javascript date function, which is used to
       * customize the date in different format
       */
      //let custom = { hour: "2-digit", minute: "2-digit" };
      // Assigning our custom text to the tick value.
      //args.text = new Date(totalMiliSeconds).toLocaleTimeString(
        //"en-us",
        //custom
      //);
    },
    tooltipChangeHandler: function(args) {
      if (args.text.indexOf("-") !== -1) {
        let range=args.text.split(" ");
        this.startPoint=range[0]
        this.endPoint= range[2]
        if(this.mode=='month')
        {
          this.$store.commit('setSliderStartMonth', this.startPoint)
          this.$store.commit('setSliderEndMonth', this.endPoint)
        }else if(this.mode=='year')
        {
          this.$store.commit('setSliderStartYear', this.startPoint)
          this.$store.commit('setSliderEndYear', this.endPoint)
        }else
        {
          this.$store.commit('setSliderStartRange', this.startPoint)
          this.$store.commit('setSliderEndRange', this.endPoint)
        }

        //console.log('rangeFromTooltip',range)
        //console.log(this.startPoint, this.endPoint)
      }

      /**
       * toLocaleTimeString is predefined javascript date function, which is used to
       * customize the date in different format
       */
      //console.log('tooltipChangeHandler')
      //console.log('args.text',args.text);

      //let custom = { hour: "2-digit", minute: "2-digit" };
      // Splitting the range values from the tooltip using space into an array.
      /*if (args.text.indexOf("-") !== -1) {
        let totalMiliSeconds = args.text.split(" ");
        // First part is the first handle value
        let firstPart = totalMiliSeconds[0];
        // Second part is the second handle value
        let secondPart = totalMiliSeconds[2];

        //get value to send to heatmap
        this.startPoint=new Date(Number(firstPart)).getHours()
        this.endPoint= new Date(Number(secondPart)).getHours()

        this.$store.commit('setSliderStart', this.startPoint)
        this.$store.commit('setSliderEnd', this.endPoint)
        firstPart = new Date(Number(firstPart)).toLocaleTimeString(
          "en-us",
          custom
        );
        secondPart = new Date(Number(secondPart)).toLocaleTimeString(
          "en-us",
          custom
        );
        // Assigning our custom text to the tooltip value.
        args.text = firstPart + " - " + secondPart;
        console.log(this.startPoint, this.endPoint)
      } else {
        args.text =
          "Until " +
          new Date(Number(args.text)).toLocaleTimeString("en-us", custom);
      }*/
    },
  },
}
</script>
<style>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
#app {
  color: #008cff;
  height: 40px;
  left: 30%;
  top: 40%;
  width: 90%;
  margin-left: 50px;
}

.sliderwrap label {
  padding-bottom: 26px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 15px;
}
</style>
