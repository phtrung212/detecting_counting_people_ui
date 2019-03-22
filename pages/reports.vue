<template>
  <div>
    <div class="title">
      Report for CAM-XX
    </div>
    <div class="time_options">
      <b-form-group label="Choose type of time below"  >
        <b-form-radio value="day" v-model="selected" name="some-radios" inline>Day</b-form-radio>
        <b-form-radio value="month" v-model="selected" name="some-radios" inline>Month</b-form-radio>
        <b-form-radio value="year" v-model="selected" name="some-radios" inline>Year</b-form-radio>
      </b-form-group>
    </div>
    <div class="time_selection">
      <div> <Datepicker  :minimumView="this.selected" placeholder="Select Date"></Datepicker></div>

      <div class="button"><b-button variant="outline-primary">Cal</b-button></div>
    </div>
    <div class="report_selection">
      <b-tabs content-class="mt-3">
        <b-tab title="Heat map" active><HeatMap/></b-tab>
        <b-tab title="Line chart"><LineChart/></b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<style>
  .button
  {
    margin-left: 10px;
  }
  .time_selection
  {
    clear: both;
    float: right;
    display: flex;
    justify-content:right;
    margin-right: 50px;
  }
  .time_options
  {
    float: right;
    margin-right: 50px;
  }
  .report_selection
  {
    margin-top: 120px;

  }
  .title
  {
    font-size: 30px;
    text-align: center;
  }
</style>

<script>
  import LineChart from "../components/lineChart";
  import HeatMap from "../components/heatMap";
  import Datepicker from 'vuejs-datepicker';
  export default {
    name: "reports",
    components: {HeatMap, LineChart, Datepicker},
    data:function () {
      return {
        selected:'day'
      }
    }
  }
</script>

<style scoped>

</style>
