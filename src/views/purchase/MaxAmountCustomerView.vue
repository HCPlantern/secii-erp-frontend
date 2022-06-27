<template>
  <Layout>
    <Title title="消费最多客户查看"></Title>
    <div class="maxAmountCustomer">
      <div class="select-sale-man">
        <span>
        请选择销售人员：
        </span>
      </div>
      <div>

        <el-select class="select-sale-man" v-model="salesman" filterable placeholder="请选择">
          <el-option
              v-for="item in allSalesMan"
              :key="item.value"
              :label="item.label"
              :value="item.label">
          </el-option>
        </el-select>
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
            icon="el-icon-search"
            @click="getData()"
        >
          搜索
        </el-button>
      </div>

      <div v-if="totalFinalAmount !== ''">

        <div class="customer-table">
          <el-table
              :data="customerInfo"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column
                prop="id"
                label="id"
                width="60">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="70">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                width="100"
                :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag
                    :type="scope.row.type === '供应商' ? 'primary' : 'success'"
                    disable-transitions>{{ scope.row.type }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
                prop="level"
                label="级别"
                width="50">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话"
                width="150">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址"
                width="150">
            </el-table-column>
            <el-table-column
                prop="zipcode"
                label="邮编"
                width="100">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="200">
            </el-table-column>
            <el-table-column
                prop="lineOfCredit"
                label="应收额度(元)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="receivable"
                label="应收(元)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="payable"
                label="应付(元)"
                width="120">
            </el-table-column>
            <el-table-column
                prop="operator"
                label="操作员"
                width="120">
            </el-table-column>

          </el-table>
        </div>

        <div class="max-amount">
        <span>
          该客户在该时间段内的消费总金额为
          <strong>
             {{ this.totalFinalAmount }}
          </strong>
        </span>
        </div>


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
