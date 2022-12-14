<template>
  <Layout>
    <Title title="销售明细表"></Title>
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <div class="button">
          <download-excel
              :data="filteredData"
              :fields="excelFields"
              name="销售明细表.xls">
            <el-button
                icon="el-icon-download"
                class="export-excel-wrapper"
                type="success"
                size="small"
            >
              导出
            </el-button>
          </download-excel>
        </div>
        <div class="button">
          <el-button
              class="search"
              type="primary"
              size="small"
              icon="el-icon-search"
              @click="getData()"
          >
            查询结果
          </el-button>
        </div>

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
        <div class="select-commodity">
          <el-select v-model="commoditySelected" clearable filterable placeholder="请选择商品名" @change="filterData($event)"
          >
            <el-option
                v-for="item in commodities"
                :key="item.id"
                :label="item.name"
                :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-client">
          <el-select v-model="clientSelected" clearable filterable placeholder="请选择客户" @change="filterData($event)"
          >
            <el-option
                v-for="item in clients"
                :key="item.id"
                :label="item.name"
                :value="item.name"
            >
            </el-option>
          </el-select>
        </div>
        <div class="select-commodity">
          <el-select v-model="userSelected" clearable filterable placeholder="请选择业务员" @change="filterData($event)"
          >
            <el-option
                v-for="item in user"
                :key="item"
                :label="item"
                :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </el-card>

      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>单据列表</span>
        </div>
      </el-card>

      <div class="detail-table">
        <el-table
            :data="filteredData"
            style="border-radius: 4px"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
        >
          <el-table-column
              prop="date"
              label="时间"
          >
          </el-table-column>

          <el-table-column
              prop="salesman"
              label="业务员"
          >
          </el-table-column>

          <el-table-column
              prop="supplier"
              label="客户"
          >
          </el-table-column>

          <el-table-column
              prop="name"
              label="商品名"
          >
          </el-table-column>

          <el-table-column
              prop="type"
              label="型号"
          >
          </el-table-column>

          <el-table-column
              prop="quantity"
              label="数量"
          >
          </el-table-column>

          <el-table-column
              prop="unitPrice"
              label="单价"
          >
          </el-table-column>

          <el-table-column
              prop="totalPrice"
              label="总价"
          >
          </el-table-column>

        </el-table>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";

import {
  getAllCommodity
} from "@/network/commodity";

import {
  getAllCustomer
} from "@/network/sale";

import {
  getAllSaleDetailByTime
} from "@/network/sale";

import {
  findAllUsers
} from "@/network/user";

export default {
  components: {
    Layout,
    Title
  },
  data() {
    return {
      date: '',
      commoditySelected: '',
      commodities: [],
      clientSelected: '',
      clients: [],
      userSelected: '',
      user: [],
      data: [],
      filteredData: [],
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
      },
      excelFields: {
        '时间': 'date',
        '业务员': 'salesman',
        '客户': 'supplier',
        '商品名': 'name',
        '型号': 'type',
        '数量': 'quantity',
        '单价': 'unitPrice',
        '总价': 'totalPrice'
      },
    }
  },
  async mounted() {
    this.getAllCommodities();
    this.getAllCustomer();
    this.findAllUsers();
  },
  computed: {
    beginDate: function () {
      return this.date === null ? null : formatDate(this.date[0])
    },
    endDate: function () {
      return this.date === null ? null : formatDate(this.date[1])
    },

  },
  methods: {
    filterData() {
      let data = this.data;
      this.filteredData = data;
      if (this.commoditySelected !== '') {
        this.filteredData = data.filter((item) => {
          return item.name === this.commoditySelected;
        })
      }
      if (this.clientSelected !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return item.supplier === this.clientSelected;
        })
      }
      if (this.userSelected !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return item.salesman === this.userSelected;
        })
      }
    },
    getAllCommodities() {
      getAllCommodity().then(res => {
        this.commodities = this.commodities.concat(res.result);
      })
    },
    getAllCustomer() {
      getAllCustomer().then(res => {
        this.clients = this.clients.concat(res.result);
      })
    },
    findAllUsers() {
      findAllUsers().then(res => {
        this.user = this.user.concat(res.result);
      })
    },
    getData() {
      if (this.date === '' || this.beginDate === null || this.endDate === null) {
        this.$message.error('请选择时间段');
        return
      }
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      getAllSaleDetailByTime(config).then(res => {
        if (res.code === '00000') {
          this.$message.success('查询成功')
          this.data = [];
          this.data = this.data.concat(res.result);
          this.filteredData = this.data;
          this.filterData();
        } else {
          this.$message.error('该时间段内无数据');
        }
      })

    },

    formatDate
  }
};
</script>

<style scoped lang="scss">
.select-sale-man, .select-time-range, .search, .customer-table, .max-amount {
  margin: 1rem 1rem 1rem 1rem;
}

.select-commodity, .select-client, .export-excel-wrapper {
  margin: 1rem 1rem 1rem 1rem;
}

.page {
  margin-top: 4rem;
}

.form-icon-text {
  margin: 1rem;
}
span {
  margin: 1rem;
}
.button {
  display: inline-block;
  float: right;
}

.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}
</style>
