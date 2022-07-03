<template>
  <Layout>
    <Title title="经营历程表"></Title>
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>

          <div class="button">
            <download-excel
                :data="filteredData"
                :fields="excelFields"
                name="经营历程表.xls">
              <el-button
                  class="export-excel-wrapper"
                  size="small"
                  type="success"
                  icon="el-icon-download"
              >
                导出
              </el-button>
            </download-excel>
          </div>

          <div class="button">
            <el-button
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="queryData"
            >
              查询结果
            </el-button>
          </div>

        </div>

        <div>
          <el-form class="form" ref="form" :model="form" :rules="formRule" label-width="100px">

            <el-form-item class="form-item" label="时间段" prop="time">
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

            <el-form-item class="form-item" label="单据类型" prop="type">
              <el-select v-model="form.sheetType" multiple collapse-tags clearable filterable @change="filterData">
                <el-option-group
                    v-for="group in sheetType"
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

            <el-form-item class="form-item" label="客户" prop="client">
              <el-select v-model="form.client" clearable filterable @change="filterData">
                <el-option
                    v-for="item in clients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="业务员" prop="operator">
              <el-select v-model="form.operator" clearable filterable style="width:150px" @change="filterData">
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
            :data="filteredData"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
        >
          <el-table-column
              prop="id"
              label="单据编号"
              width="150%"
          >
          </el-table-column>
          <el-table-column
              prop="type"
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

      <div class="dialog">
        <el-dialog
            title="详细信息"
            :visible.sync="dialogVisible" width="80%"
        >
          <SaleList
              v-if="selectedType==='销售单'"
              :list="sheetDetail"
              :type="0"
          ></SaleList>
          <SaleReturnList
              v-else-if="selectedType==='销售退货单'"
              :list="sheetDetail"
              :type="0"></SaleReturnList>
          <PurchaseList
              v-else-if="selectedType==='进货单'"
              :list="sheetDetail"
              :type="0"></PurchaseList>
          <PurchaseReturnList
              v-else-if="selectedType==='进货退货单'"
              :list="sheetDetail"
              :type="0"></PurchaseReturnList>
          <PaymentList
              v-else-if="selectedType==='付款单'"
              :list="sheetDetail"
              :type="0"></PaymentList>
          <CollectionList
              v-else-if="selectedType==='收款单'"
              :list="sheetDetail"
              :type="0"></CollectionList>
        </el-dialog>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";
import {findAllUsers} from "@/network/user";
import {findAllSheet} from "@/network/sheet";

import {
  getAllCustomer, getSaleBySheetId, getSaleReturnBySheetId
} from "@/network/sale";
import {
  getPurchaseBySheetId, getPurchaseReturnBySheetId
} from "@/network/purchase";
import {
  getCollectionSheetById, getPaymentSheetById
} from "@/network/finance";
import {
  getWarehouseOutputSheetById, getWarehouseInputSheetById
} from "@/network/warehouse";
import {
  getSalarySheetById
} from "@/network/salary";
import SaleList from "@/views/sale/components/SaleList";
import SaleReturnList from "@/views/sale/components/SaleReturnList";
import PurchaseList from "@/views/purchase/components/PurchaseList";
import PurchaseReturnList from "@/views/purchase/components/PurchaseReturnList";
import Sheet from "@/views/common/Sheet";
import PaymentList from "@/views/finance/components/PaymentList";
import CollectionList from "@/views/finance/components/CollectionList";

export default {
  components: {
    CollectionList,
    PaymentList,
    Sheet,
    PurchaseReturnList,
    PurchaseList,
    SaleReturnList,
    SaleList,
    Layout,
    Title
  },
  async mounted() {
    getAllCustomer().then(res => {
      this.clients = this.clients.concat(res.result);
    });
    findAllUsers().then(res => {
      this.operators = this.operators.concat(res.result);
    });
  },
  data() {
    return {
      // test: ["ADMIN"],
      clients: [],
      operators: [],
      // 表单内容
      form: {
        date: "",
        sheetType: [],
        client: "",
        operator: "",
      },
      formRule: {
        time: [
          {required: true, message: "请选择日期", trigger: "change"}
        ],
      },
      sheetType: [{
        label: "销售类单据",
        options: [{id: '10', name: '销售单'}, {id: '11', name: '销售退货单'}],
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
      }
      ,
      // 单据列表
      sheetsData: [],
      filteredData: [],

      dialogVisible: false,
      selectedType: "",
      // 单据详情
      sheetDetail: [],
      excelFields: {
        "单据编号": "id",
        "单据类型": "type",
        "时间": "date",
        "客户": "client",
        "业务员": "operator",
      },
    }
  },
  computed: {
    beginDate: function () {
      return this.form.date === null ? null : formatDate(this.form.date[0])
    },
    endDate: function () {
      return this.form.date === null ? null : formatDate(this.form.date[1])
    },
  },
  methods: {
    // 查询
    queryData() {
      if (this.form.date === '' || this.beginDate === null || this.endDate === null) {
        this.$message.error('请选择时间段')
        return
      }
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      findAllSheet(config).then(res => {
        if (res.code === '00000') {
          this.$message.success('查询成功')
          this.sheetsData = [];
          this.sheetsData = this.sheetsData.concat(res.result);
          this.filteredData = this.sheetsData;
          this.filterData();
        } else {
          this.$message.error('该时间段内无数据')
        }
      })
    },
    handleView(row) {
      this.sheetDetail = [];
      this.dialogVisible = true;
      const config = {
        params: {
          id: row.id
        }
      }
      switch (row.type) {
        case '销售单':
          this.selectedType = '销售单'
          getSaleBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '销售退货单':
          this.selectedType = '销售退货单'
          getSaleReturnBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '进货单':
          this.selectedType = '进货单'
          getPurchaseBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '进货退货单':
          this.selectedType = '进货退货单'
          getPurchaseReturnBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '付款单':
          this.selectedType = '付款单'
          getPaymentSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '收款单':
          this.selectedType = '收款单'
          getCollectionSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '工资单':
          this.selectedType = '工资单'
          getSalarySheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '入库单':
          this.selectedType = '入库单'
          getWarehouseInputSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '出库单':
          this.selectedType = '出库单'
          getWarehouseOutputSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
      }
      this.dialogVisible = true
      console.log(this.sheetDetail)
    },
    filterData() {
      this.filteredData = this.sheetsData;
      if (this.form.sheetType.length > 0) {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.sheetType.includes(item.type);
        })
      }
      if (this.form.client !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.client.includes(item.client);
        })
      }
      if (this.form.operator !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.operator.includes(item.operator);
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

.form {
  margin: 2rem 0 2rem 0;
}

span {
  margin: 1rem;
}

.el-table {
  border-radius: 4px;
}

.button {
  display: inline-block;
  float: right;
  margin: 0 1rem 0 1rem;
}
</style>