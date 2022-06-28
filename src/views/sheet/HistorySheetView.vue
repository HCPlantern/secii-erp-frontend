<template>
  <Layout>
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
              type="primary"
              style="float: right"
              @click="queryData"
          >
            查询结果
          </el-button>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="100px">

            <el-form-item class="form-item" label="时间段">
              <el-date-picker
                  class="select-time-range"
                  v-model="form.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '00:00:00']"
              ></el-date-picker>
            </el-form-item>

            <el-form-item class="form-item" label="单据类型">
              <el-select v-model="form.documentType" multiple collapse-tags clearable>
                <el-option-group
                    v-for="group in documentType"
                    :key="group.id"
                    :label="group.label">
                  <el-option
                      v-for="item in group.options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="客户">
              <el-select v-model="form.clients" clearable>
                <el-option
                    v-for="item in clients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="业务员">
              <el-select v-model="form.operator" clearable style="width:150px">
                <el-option
                    v-for="item in operators"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
      </el-card>

      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>单据列表</span>
        </div>

      </el-card>


      <div class="el-table">
        <el-table
            :data="sheetsData"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
            @selection-change="handleSelectionChange"
        >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="id"
              label="单据编号"
              width="80%"
          >
          </el-table-column>
          <el-table-column
              prop="documentType"
              label="单据类型"
          >
          </el-table-column>
          <el-table-column
              prop="date"
              label="时间"
          >
          </el-table-column>

          <el-table-column
              prop="client"
              label="客户"
          >
          </el-table-column>
          <el-table-column
              prop="operator"
              label="业务员"
          >
          </el-table-column>
          <el-table-column
              width="100"
              label="操作">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  size="small"
                  @click="handleView(scope.row)">
                查看
              </el-button>
            </template>
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
import {getAllCustomer} from "@/network/sale";
import {findAllUsers} from "@/network/user";

export default {
  components: {
    Layout,
    Title
  },
  async mounted() {
    this.getAllCustomer();
    this.getAllUsers();
  },
  data() {
    return {
      clients: [],
      operators: [],
      // 表单内容
      form: {
        date: "",
        documentType: [],
        client: "",
        operator: "",
      },
      documentType: [{
        label: "销售类单据",
        options: [{id: '10', name: '销售出货单'}, {id: '11', name: '销售退货单'}],
      }, {
        label: "进货类单据",
        options: [{id: '20', name: '进货单'}, {id: '21', name: '进货退货单'}],
      }, {
        label: "财务类单据",
        options: [{id: '30', name: '付款单'}, {id: '31', name: '收款单'}, {id: '32', name: '工资单'}],
      }, {
        label: "库存类单据",
        options: [{id: '40', name: '入库单'}, {id: '41', name: '出库单'}],
      }],
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
      // 单据列表及其详细内容
      sheetsData: [{
        id: 1,
        documentType: "销售出货单",
        client: "客户1",
        operator: "业务员1",
        date: "2018-01-01",
        amount: 100,
      }, {
        id: 2,
        documentType: "销售退货单",
        client: "客户2",
        operator: "业务员2",
        date: "2018-01-02",
        amount: 200,
      }, {
        id: 3,
        documentType: "进货单",
        client: "客户3",
        operator: "业务员3",
        date: "2018-01-03",
        amount: 300,
      }, {
        id: 4,
        documentType: "进货退货单",
        client: "客户4",
        operator: "业务员4",
        date: "2018-01-04",
        amount: 400,
      }, {
        id: 5,
        documentType: "付款单",
        client: "客户5",
        operator: "业务员5",
        date: "2018-01-05",
        amount: 500,
      }, {
        id: 6,
        documentType: "收款单",
        client: "客户6",
        operator: "业务员6",
        date: "2018-01-06",
        amount: 600,
      }, {
        id: 7,
        documentType: "现金费用单",
        client: "客户7",
        operator: "业务员7",
        date: "2018-01-07",
        amount: 700,
      }, {
        id: 8,
        documentType: "工资单",
      }],
      filteredData: [],
      // 多选框的选中值
      multipleSelection: [],

    }
  },
  computed: {
    beginDate: function () {
      return this.form.date === '' ? '' : formatDate(this.form.date[0])
    },
    endDate: function () {
      return this.form.date === '' ? '' : formatDate(this.form.date[1])
    },
  },
  methods: {
    getAllCustomer() {
      getAllCustomer().then(res => {
        this.clients = this.clients.concat(res.result);
      })
    },
    getAllUsers() {
      findAllUsers().then(res => {
        this.operators = this.operators.concat(res.result);
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询
    queryData() {
      if (this.beginDate === '' || this.endDate === '') {
        this.$message.error('缺少查询条件！')
        return
      }
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }

    },
    handleView(row) {

    },
    filterData() {
      this.filteredData = this.sheetsData;
      if (this.form.documentType.length > 0) {
        this.filteredData = this.filteredData.filter(item => {
          return this.form.documentType.includes(item.documentType)
        })
      }
      if (this.form.client.length > 0) {
        this.filteredData = this.filteredData.filter(item => {
          return this.form.client.includes(item.client)
        })
      }
      if (this.form.operator.length > 0) {
        this.filteredData = this.filteredData.filter(item => {
          return this.form.operator.includes(item.operator)
        })
      }
    },
  }
}
</script>

<style scoped>

.page {
  margin-top: 4rem;
}

.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}

.form-item {
  display: inline-block;
}

.form-icon-text {
  margin: 1rem;
}

span {
  margin: 1rem;
}

.el-table {
  border-radius: 4px;
}
</style>