<template>
  <Layout>
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
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
              <el-select multiple v-model="form.documentType" style="width: 150px">
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
              <el-select v-model="form.clients" style="width:150px">
                <el-option
                    v-for="item in clients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="业务员">
              <el-select v-model="form.operator" style="width:150px">
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
        options: [{id: '30', name: '付款单'}, {id: '31', name: '收款单'}, {id: '32', name: '现金费用单'}, {id: '33', name: '工资单'}],
      }, {
        label: "库存类单据",
        options: [{id: '40', name: '报溢单'}, {id: '41', name: '报损单'}, {id: '42', name: '赠送单'}],
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
        console.log(this.operators)
      })
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
}

.form-item {
  display: inline-block;
}

.form-icon-text {
  margin: 1rem;
}
</style>