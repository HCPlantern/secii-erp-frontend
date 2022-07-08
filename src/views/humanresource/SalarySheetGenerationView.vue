<template>
  <Layout>
    <Title title="生成工资单"></Title>
    <!-- 工资单生成部分 -->
    <div>
      <span>请选择月份：</span>
      <el-date-picker
        class="select-month"
        v-model="date"
        type="month"
        :default-time="['00:00:00', '00:00:00']"
        :picker-options="pickerOptions"
      >
        >
      </el-date-picker>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="primary"
        size="medium"
        @click="generateSalarySheetByMonth()"
        >生成工资单</el-button
      >
    </div>

    <!-- 工资单展示部分 -->
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list
              :list="pendingLevel1List"
              :type="1"
              @refresh="getSalarySheet()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list
              :list="pendingLevel2List"
              :type="2"
              @refresh="getSalarySheet()"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="successList" :type="3" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="failureList" :type="4" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SalaryList from "@/views/salary/SalaryList";
import { formatDate } from "@/common/utils.js";
import { getSalarySheetByState, generateSalarySheet } from "@/network/salary";
export default {
  name: "SalarySheetApproval",
  components: { SalaryList, Title, Layout },
  data() {
    return {
      date: "",
      activeName: "PENDING_LEVEL_1",
      salaryList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
        ],
      },
    };
  },
  async mounted() {
    this.getSalarySheet();
  },
  methods: {
    getSalarySheet() {
      getSalarySheetByState({}).then((_res) => {
        this.salaryList = _res.result;
        this.pendingLevel1List = this.salaryList.filter(
          (item) => item.state === "待一级审批"
        );
        this.pendingLevel2List = this.salaryList.filter(
          (item) => item.state === "待二级审批"
        );
        this.successList = this.salaryList.filter(
          (item) => item.state === "审批完成"
        );
        this.failureList = this.salaryList.filter(
          (item) => item.state === "审批失败"
        );
      });
    },
    generateSalarySheetByMonth() {
      let beginTime = new Date(this.date.getFullYear(), this.date.getMonth()); //该月的最初一刻
      let endTime = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      ); //该月的最后一刻
      let config = {
        params: {
          beginTime: formatDate(beginTime),
          endTime: formatDate(endTime),
        },
      };
      generateSalarySheet(config).then((_res) => {
        if (_res.msg === "Success") {
          this.$message({
            type: "success",
            message: "生成工资单成功！",
          });
          this.getSalarySheet();
        }
      });
      this.$message({
        type: "info",
        message: "开始计算工资单，请稍等！",
        duration: 5000,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.body {
  margin: 10px auto 0;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>