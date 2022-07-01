<template>
  <Layout>

    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>

          <div class="button">
            <download-excel
                :data="excelData"
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
                @click="getFinancialReport"
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


          </el-form>
        </div>
      </el-card>

      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>经营情况</span>
          <el-descriptions title="收入" class="el-descriptions" :column="2">
            <el-descriptions-item label="销售收入">{{ data.saleIncome }}</el-descriptions-item>
            <el-descriptions-item label="销售已折让金额">{{ data.discount }}</el-descriptions-item>
            <el-descriptions-item label="商品收入">{{ data.commodityIncome }}</el-descriptions-item>
            <el-descriptions-item label="总收入">{{ data.finalIncome }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="支出" class="el-descriptions" :column="2">
            <el-descriptions-item label="销售成本">{{ data.saleOutcome }}</el-descriptions-item>
            <el-descriptions-item label="商品类成本">{{ data.commodityOutcome }}</el-descriptions-item>
            <el-descriptions-item label="人力成本">{{ data.humanResourceOutcome }}</el-descriptions-item>
            <el-descriptions-item label="总支出">{{ data.finalOutcome }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="利润" class="el-descriptions">
            <el-descriptions-item label="利润">{{ data.profit }}</el-descriptions-item>
          </el-descriptions>
        </div>

      </el-card>

    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {getFinancialReport} from "@/network/sheet";
import {formatDate} from "@/common/utils";

export default {
  name: "BusinessSituationView",
  components: {Layout, Title},
  data() {
    return {
      data: {},
      excelData: [],
      form: {
        date: '',
      },
      formRule: {
        time: [
          {required: true, message: "请选择日期", trigger: "change"}
        ]
      },
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
        "销售收入": "saleIncome",
        "销售已折让金额": "discount",
        "商品类收入": "commodityIncome",
        "总收入": "finalIncome",
        "销售成本": "saleOutcome",
        "商品类成本": "commodityOutcome",
        "人力成本": "humanResourceOutcome",
        "总成本": "finalOutcome",
        "总利润": "profit",
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
    getFinancialReport() {
      if (!this.form.date || !this.beginDate || !this.endDate) {
        this.$message.error("请选择时间段")
        return
      }
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      getFinancialReport(config).then(res => {
        if (res.code === '00000') {
          this.$message.success('查询成功')
          this.data = res.result;
          this.excelData = this.excelData.concat(this.data)
        } else {
          this.$message.error('该时间段内无数据')
        }
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

.el-descriptions {
  margin: 2rem 0 2rem 0;
}

</style>