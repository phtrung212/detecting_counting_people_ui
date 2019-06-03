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
            </b-form-group>
          </div>
          <div class="time_selection">
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
        </div>
      </div>
    </div>

    <div class="report_selection col-9">
      <b-tabs content-class="mt-3">
        <b-tab title="Heat map" active>
          <Slider
            style="margin-bottom: 32px"
            v-if="sort == 'day' && this.dataHeatMap != null"
          />

          <div v-if="dateCal && !this.dataHeatMap" class="loading">
            <div id="text">
              <Loading></Loading>
              <p>Loading</p>
            </div>
          </div>
          <p class="noti" v-if="!dateCal">Please select date to view report</p>

          <HeatMap
            :mode="sort"
            v-if="this.dataHeatMap != null"
            :dataH="this.dataHeatMap"
            :key="componentKey && (sliderStart || sliderEnd)"
            :start-hour="sliderStart"
            :end-hour="sliderEnd"
          />
        </b-tab>
        <b-tab title="Line chart">
          <p class="noti" v-if="!dateCal">Please select date to view report</p>
          <p class="noti" v-if="isEmptyDataLinechart && dateCal">
            This day has not processed yet
          </p>
          <LineChart
            v-if="this.dataLineChart && !this.isEmptyDataLinechart"
            :dataReport="this.dataLineChart"
            :day="dateCal"
            :sort="sort"
            :key="componentKey"
          />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<style>
  .left
  {

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
#text {
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
  components: { HeatMap, LineChart, Datepicker, Slider, Loading },
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
  async mounted() {
    // let user = await new Promise((resolve, reject) => {
    //   firebase.auth().onAuthStateChanged((user) => resolve(user))
    // })
    // this.setUser(user) // setUser is mapped action from vuex
  },
  data: function() {
    return {
      selected: "day",
      dateSelected: null,
      sort: null,
      dateCal: null,
      componentKey: 0,
      dataLineChart: null,
      dataHeatMap: null,
      isEmptyDataLinechart: true
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
    sliderStart() {
      return this.$store.state.sliderStart;
    },
    sliderEnd() {
      return this.$store.state.sliderEnd;
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
    }
  },
  methods: {
    async onCal() {
      this.dataHeatMap = null;
      this.dataLineChart = null;
      this.sort = this.selected;
      this.dateCal = this.customFormatter(this.dateSelected);
      console.log("date", this.dateSelected.getDate());
      this.componentKey += 1;
      let dataGot = await this.fetchData();
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
    },
    customFormatter(date) {
      return moment(date).format("YYYY-MM-DD[T]hh:mm:ss[Z]");
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
