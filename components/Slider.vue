<template>
  <div id="app">
    <ejs-slider
      id="defaultTooltip"
      ref="defaultSlider"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      :tooltipChange="tooltipChangeHandler"
      :tooltip="tooltip"
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
    data() {
      return {
        ticks: {
        placement: "After",
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 6 * 3600000,
        smallStep: 3600000,
        showSmallTicks: true
      },
        tooltip: {
        placement: "Before",
          isVisible: true,
          cssClass: "e-tooltip-cutomization"
      },
      step: 3600000,
        min: 3600000*16,
        max: 3600000 * 40,
        value: [3600000*20, 3600000 * 25],
      };
    },
    methods: {
      renderingTicksHandler: function(args) {
        let totalMiliSeconds = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom = { hour: "2-digit", minute: "2-digit" };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString(
          "en-us",
          custom
        );
      },
      tooltipChangeHandler: function(args) {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom = { hour: "2-digit", minute: "2-digit" };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf("-") !== -1) {
          let totalMiliSeconds = args.text.split(" ");
          // First part is the first handle value
          let firstPart = totalMiliSeconds[0];
          // Second part is the second handle value
          let secondPart = totalMiliSeconds[2];

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
        } else {
          args.text =
            "Until " +
            new Date(Number(args.text)).toLocaleTimeString("en-us", custom);
        }
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
    position: absolute;
    top: 40%;
    width: 50%;
  }

  .sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
  }


</style>
