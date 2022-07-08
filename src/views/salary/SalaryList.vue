<template>
  <div class="card">
    <el-card v-for="(value, key, index) in list" :key="value.id" shadow="hover">
      <Sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
      ></Sheet>
    </el-card>
  </div>
</template>
<script>
import Sheet from "@/views/common/Sheet";

export default {
  name: "SalaryList",
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      role: ["GM", "ADMIN", "FINANCIAL_STAFF"],
      description: [
        {
          id: "工资单编号",
          employeeId: "职员编号",
          employeeName:"职员姓名",
          createTime: "单据创建时间",
          job:"岗位",
          baseWage: "基本工资",
          postWage: "岗位工资",
          totalSalary: "总工资",
          tax:"税款",
          insurance:"失业保险金",
          housingFund:"住房公积金",
          taxedSalary: "税后工资",
          salaryAccount:"工资卡银行账户",
          state: "单据状态",
        }
      ],
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 0 auto;

  .button {
    float: right;
  }
}

.el-card {
  margin-bottom: 20px;
}
</style>
