<template>
  <Layout>
    <Title title="制定促销策略"></Title>
    <div class="promotionStrategy">

      <div>
        <el-button
          class="search"
          type="primary"
          @click="getData()"
        >
          方案一：客户促销
        </el-button>
      </div>
      <div>
        <el-button
          class="search"
          type="primary"
          @click="getData()"
        >
          方案二：特价促销
        </el-button>
      </div>
      <div>
        <el-button
          class="search"
          type="primary"
          @click="getData()"
        >
          方案三：总价促销
        </el-button>
      </div>
      <div class="select-time-range">
        <span>请选择一个时间段： </span>
      </div>

      <div>
        <el-date-picker
          class="select-time-range"
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          unlink-panels
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '00:00:00']">
        </el-date-picker>
      </div>

      <div>
        <el-button
          class="search"
          type="primary"
          @click="getData()"
        >
          确定
        </el-button>
      </div>

    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";

import {
  getMaxAmountCustomerOfSalesmanByTime
} from "@/network/sale";

import {
  findAllSalesMan
} from "@/network/user"

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: '',
      allSalesMan: [],
      salesman: '',
      totalFinalAmount: '',
      customerInfo: [],
      // datetimepicker shortcuts
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }

    }
  },
  async mounted() {
    this.getAllSalesMan()
  },
  computed: {
    beginDate: function () {
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function () {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods: {
    getAllSalesMan() {
      findAllSalesMan().then(_res => {
        for (let i = 0; i < _res.result.length; i++) {
          this.allSalesMan.push({value: i, label: _res.result[i]})
        }
      });
    },
    getData() {
      this.customerInfo = []
      this.totalFinalAmount = ''
      if (this.salesman === '' || this.beginDate === '' || this.endDate === '') {
        this.$message.error('缺少查询条件！')
        return
      }
      const config = {
        params: {
          salesman: this.salesman,
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      getMaxAmountCustomerOfSalesmanByTime(config).then(_res => {
        this.getContent = _res.result;
        console.log(_res)
        console.log(_res.result)
        if (this.getContent === null) {
          this.$message.error('该时间段内销售人员无销售记录！')
        } else {
          this.$message.success('查询成功!')
          this.totalFinalAmount = this.getContent.totalFinalAmount
          this.customerInfo = this.customerInfo.concat(this.getContent.customerVO)
          console.log(this.customerInfo)
        }
      })

    },
    filterTag(value, row) {
      return row.type === value;
    },

    formatDate
  }
};
</script>

<style scoped lang="scss">
.select-sale-man, .select-time-range, .search, .customer-table, .max-amount {
  margin: 1rem 1rem 1rem 1rem;
}
</style>
