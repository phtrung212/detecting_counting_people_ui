<template>
  <div class="row">
    <div class="col-3 left">
      <div class="head">
        <div class="infor">
          <div v-if="cameraSelected">
            <span class="label">Camera report: </span> {{ cameraList }}
          </div>
          <div v-else>
            <span class="label">Camera report: </span>
            {{ $route.params.cameraName }}
          </div>
        </div>
        <div class="time">
          <div class="time_options">
            <b-form-group label="Choose type of report below">
              <b-form-radio
                value="day"
                v-model="selected"
                name="some-radios"
                inline
                >Day</b-form-radio
              >
              <b-form-radio
                value="month"
                v-model="selected"
                name="some-radios"
                inline
                >Month</b-form-radio
              >
              <b-form-radio
                value="year"
                v-model="selected"
                name="some-radios"
                inline
                >Year</b-form-radio
              >
              <b-form-radio
                value="range"
                v-model="selected"
                name="some-radios"
                inline
              >Range of day</b-form-radio
              >
            </b-form-group>
          </div>
          <div v-if="selected!='range'" class="time_selection">

            <div>
              <Datepicker
                v-model="dateSelected"
                :minimumView="this.selected"
                :highlighted="highlighted"
                placeholder="Select Date"
              ></Datepicker>
            </div>

            <div class="button">
              <b-button size="sm" @click="onCal" variant="primary"
                >View</b-button
              >
            </div>
          </div>
          <div v-if="selected=='range'" class="rangeOfDay">
            <div class="time_selection_range">
              <div>
                <p class="mr-1 font-weight-bold">From</p>
              </div>

              <div>
                <Datepicker
                  v-model="dateSelected"
                  :minimumView="this.selected"
                  :highlighted="highlighted"
                  placeholder="Select Date"
                ></Datepicker>
              </div>
            </div>
            <div class="time_selection_range">
              <div>
                <p class="mr-1 font-weight-bold">To</p>
              </div>
              <div>
                <Datepicker
                  v-model="dateSelectedTo"
                  minimumView="day"
                  :highlighted="highlighted"
                  placeholder="Select Date"
                ></Datepicker>
              </div>
            </div>
            <p class="co-red" v-if="isInvalidDate">Date is INVALID</p>
            <div class="button">
              <b-button size="sm" @click="onCal" variant="primary"
              >View</b-button
              >
            </div>
          </div>
          <p class="co-red" v-if="isInvalidDate && this.selected!=='range'">Date is INVALID</p>
        </div>
      </div>
    </div>

    <div class="report_selection col-9">
      <b-tabs content-class="mt-3">

          <b-tab v-if="!this.cameraSelected" title="Heat map" active>
            <Slider
              style="margin-bottom: 32px"
              v-if="sort === 'day' && this.dataHeatMap != null"
            />
            <CustomSlider :value-min="1" :value-max="30" v-bind:value-large-step="2" :value-small-step="1" style="margin-bottom: 32px"
                           v-if="sort === 'month' && this.dataHeatMap != null" :mode="this.sort"></CustomSlider>
            <CustomSlider :value-min="1" :value-max="12" v-bind:value-large-step="1" :value-small-step="1" style="margin-bottom: 32px"
                          v-if="sort === 'year' && this.dataHeatMap != null" :mode="this.sort"></CustomSlider>
            <CustomSlider :value-min="this.dateSelected.getDate()" :value-max="this.dateSelectedTo.getDate()" v-bind:value-large-step="1" :value-small-step="1" style="margin-bottom: 32px"
                          v-if="sort === 'range' && this.dataHeatMap != null" :mode="this.sort"></CustomSlider>
            <div v-if="dateCal && !this.dataHeatMap && !isInvalidDate" class="loading">
              <div class="text">
                <Loading></Loading>
                <p>Loading</p>
              </div>
            </div>
            <p class="noti" v-if="!dateCal">Please select date to view report</p>

            <HeatMap
              :mode="sort"
              v-if="this.dataHeatMap != null"
              :dataH="this.dataHeatMap"
              :key="componentKey +sliderStartPoint+sliderEndPoint"
              :start-hour="sliderStartPoint"
              :end-hour="sliderEndPoint"
            />
          </b-tab>


        <b-tab title="Line chart">
          <p class="noti" v-if="!dateCal">Please select date to view report</p>
          <p class="noti" v-if="isEmptyDataLinechart && dateCal && dataLineChart">
            This day has not processed yet
          </p>
          <div v-if="dateCal && !this.dataLineChart  && !isInvalidDate" class="loading">
            <div class="text">
              <Loading></Loading>
              <p>Loading</p>
            </div>
          </div>
          <LineChart
            v-if="this.dataLineChart && !this.isEmptyDataLinechart"
            :dataReport="this.dataLineChart"
            :sort="sort"
            :key="componentKey"
            :range="range"
          />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<style>
  .co-red
  {
    color: red;
    font-weight: bold;
  }
.head {
  margin-top: 20px;
  margin-left: 10px;
}
.label {
  font-size: 20px;
  font-weight: bold;
  color: black;
}
.infor {
  color: blue;
  font-weight: bold;
}
.text {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  color: blue;
}

.noti {
  text-align: center;
  font-size: 20px;
  color: #ff3b2b;
  font-weight: bold;
}

.button {
  margin-left: 10px;
}
button {
  width: 60px;
}
.time_selection {
  clear: both;
  display: flex;
  justify-content: right;
  margin-right: 50px;

}
  .time_selection_range {
    margin-top: 10px;
    clear: both;
    display: flex;
    margin-right: 50px;
    justify-content: space-between;
  }
.time_options {
  font-weight: bold;
}

.title {
  font-size: 30px;
  text-align: center;
}
</style>

<script>
import LineChart from "../../components/chart-line";
import HeatMap from "../../components/heatMap";
import Slider from "../../components/Slider";
import CustomSlider from "../../components/CustomSlider";

import Datepicker from "vuejs-datepicker";
import Loading from "../../components/loading";
import moment from "moment";
import axios from "axios";
import { mapActions, mapMutations } from "vuex";
import firebase from "../../plugins/firebase";
const api = "https://datncountingapi.mybluemix.net/api/";
const _api = "http://localhost:3001/api/";
export default {
  name: "reports",
  pageTitle: "Report",
  components: { HeatMap, LineChart, Datepicker, Slider, Loading, CustomSlider },
  async asyncData(context) {
    console.log("cookie", context.app.$cookies.get("cameras"));
    let cameras = context.app.$cookies.get("cameras")
      ? context.app.$cookies.get("cameras")
      : context.params.cameraName;
    let dateList = await axios.get(
      `${api}LineCharts/check-day-processed?cameras=${cameras}`
    );

    return {
      cameraName: context.params.cameraName,
      days: dateList.data
    };
  },
  data: function() {
    return {
      selected: "day",
      dateSelected: null,
      dateSelectedTo: null,
      sort: null,
      dateCal: null,
      componentKey: 0,
      dataLineChart: null,
      dataHeatMap: null,
      isEmptyDataLinechart: true,
      range:[],
      errorMess:null,
    };
  },
  computed: {
    highlighted() {
      return {
        dates: this.days.data.map(
          item =>
            new Date(
              parseInt(item.substr(0, 4)),
              parseInt(item.substr(5, 2)) - 1,
              parseInt(item.substr(8, 2))
            )
        )
      };
    },
    sliderStartPoint() {
      if(this.sort==='day')
        return this.sliderStart;
      else if(this.sort==='month')
        return this.sliderStartMonth;
      else if(this.sort==='year')
        return this.sliderStartYear;
      else if(this.sort==='range')
        return this.sliderStartRange;
    },
    sliderEndPoint() {
      if(this.sort==='day')
        return this.sliderEnd;
      else if(this.sort==='month')
        return this.sliderEndMonth;
      else if(this.sort==='year')
        return this.sliderEndYear;
      else if(this.sort==='range')
        return this.sliderEndRange;
    },
    sliderStart() {
        return this.$store.state.sliderStart;
    },
    sliderStartMonth() {
      return this.$store.state.sliderStartMonth-1;
    },
    sliderStartYear() {
      return this.$store.state.sliderStartYear-1;
    },
    sliderStartRange() {
        return this.$store.state.sliderStartRange-this.dateSelected.getDate();
    },
    sliderEnd() {
      return this.$store.state.sliderEnd;
    },
    sliderEndMonth() {
      return this.$store.state.sliderEndMonth-1;
    },
    sliderEndYear() {
      return this.$store.state.sliderEndYear-1;
    },
    sliderEndRange() {
      if(this.dateSelectedTo)
        return this.$store.state.sliderEndRange-this.dateSelected.getDate();
      else return 0;
    },
    cameraSelected() {
      let cameras = this.$cookies.get("cameras");
      return cameras;
    },
    cameraList() {
      let cameraArray = JSON.parse(this.cameraSelected);
      let cameraList = "";
      for (let i = 0; i < cameraArray.length - 1; i++) {
        cameraList += cameraArray[i] + "|";
      }
      cameraList += cameraArray[cameraArray.length - 1];
      return cameraList;
    },
    isInvalidDate(){
      if((!this.dateSelected || !this.dateSelectedTo) && this.componentKey!==0)
      {
        if (this.selected==='range')
        {
            return (!this.dateSelectedTo || !this.dateSelected)
        }else{
            return !this.dateSelected
        }
      }else
        return false
    },
  },
  methods: {
    async onCal() {

        this.componentKey += 1;
        if(this.dateSelected){
          this.isEmptyDataLinechart=true;
          this.isEmptyDataHeatmap=true;
          this.dataHeatMap = null;
          this.dataLineChart = null;
          this.range=[]
          this.sort = this.selected;
          this.dateCal = this.customFormatter(this.dateSelected);
          let dataGot = await this.fetchData();

          console.log('dateTo',this.dateSelectedTo)
          if(this.dateSelectedTo)
          {
            for (let i= 0;i<this.dateSelectedTo.getDate()-this.dateSelected.getDate()+1;i++)
            {
              let month=this.dateSelected.getMonth()+1
              let temp=this.dateSelected.getDate()+i+'-'+month+'-'+this.dateSelected.getFullYear()
              this.range.push(temp)
            }
            console.log('range',this.range[this.range.length-1])
          }

          this.dataLineChart = dataGot.dataLine.data.listReport;
          this.dataHeatMap = dataGot.dataHeatMap.data.listReport;
          for (let x = 0; x < this.dataLineChart.total.length; x++) {
            if (this.dataLineChart.total[x] !== 0) {
              this.isEmptyDataLinechart = false;
              break;
            }
          }
          console.log("is empty data line chart", this.isEmptyDataLinechart);
          console.log("dataLine", this.dataLineChart);
          console.log("dataHeatMap", this.dataHeatMap);
        }



    },
    customFormatter(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    ...mapMutations(["setUser"]),
    async fetchData() {
      if (this.sort == "day") {
        let cameraList = null;
        if (this.cameraSelected) cameraList = this.cameraSelected;
        else cameraList = this.cameraName;
        let [dataLine, dataHeatMap] = await Promise.all([
          axios.get(
            `${api}LineCharts/get-reports-day?day=${this.dateSelected.getDate()}&month=${this.dateSelected.getMonth() +
              1}&year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          ),
          axios.get(
            `${api}heatMaps/get-reports-day?day=${this.dateSelected.getDate()}&month=${this.dateSelected.getMonth() +
              1}&year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          )
        ]);
        return { dataLine, dataHeatMap };
      } else if (this.sort == "month") {
        let cameraList = null;
        if (this.cameraSelected) cameraList = this.cameraSelected;
        else cameraList = this.cameraName;
        let [dataLine, dataHeatMap] = await Promise.all([
          axios.get(
            `${api}LineCharts/get-reports-month?month=${this.dateSelected.getMonth() +
              1}&year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          ),
          axios.get(
            `${api}heatMaps/get-reports-month?month=${this.dateSelected.getMonth() +
              1}&year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          )
        ]);
        return { dataLine, dataHeatMap };
      } else if (this.sort == "year") {
        let cameraList = null;
        if (this.cameraSelected) cameraList = this.cameraSelected;
        else cameraList = this.cameraName;
        let [dataLine,dataHeatMap] = await Promise.all([
          axios.get(
            `${api}LineCharts/get-reports-year?year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          ),
          axios.get(
            `${api}heatMaps/get-reports-year?year=${this.dateSelected.getFullYear()}&cameras=${cameraList}`
          )
        ]);
        return { dataLine, dataHeatMap };
      }else if(this.sort=='range')
      {
        let cameraList = null;
        if (this.cameraSelected) cameraList = this.cameraSelected;
        else cameraList = this.cameraName;
        let [dataLine, dataHeatMap] = await Promise.all([
          axios.get(
            `${api}LineCharts/get-reports-range-of-day?day=${this.dateSelected.getDate()}&month=${this.dateSelected.getMonth() +
            1}&year=${this.dateSelected.getFullYear()}&dayTo=${this.dateSelectedTo.getDate()}&monthTo=${this.dateSelectedTo.getMonth() +
            1}&yearTo=${this.dateSelectedTo.getFullYear()}&cameras=${cameraList}`
          ),
          axios.get(
            `${api}heatMaps/get-reports-range-of-day?day=${this.dateSelected.getDate()}&month=${this.dateSelected.getMonth() +
            1}&year=${this.dateSelected.getFullYear()}&dayTo=${this.dateSelectedTo.getDate()}&monthTo=${this.dateSelectedTo.getMonth() +
            1}&yearTo=${this.dateSelectedTo.getFullYear()}&cameras=${cameraList}`
          )
        ]);
        return { dataLine, dataHeatMap };
      }
    }
  }
};
</script>

<style scoped>
  .time_options
  {
    margin-top: 20px;
  }
</style>
