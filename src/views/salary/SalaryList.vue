<template>
  <div class="card">
    <el-card v-for="(value, key, index) in list" :key="value.id" shadow="hover">
      <Sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
          :approval="approval"
          :deny="deny"
      ></Sheet>
    </el-card>
  </div>
</template>
<script>
import Sheet from "@/views/common/Sheet";
import {firstApproval, secondApproval} from "@/network/sale";
import {salaryFirstApproval, salarySecondApproval} from "@/network/salary";

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
          job:"岗位名称",

          baseWage: "基本工资",
          postWage: "岗位工资",
          totalSalary: "未税总工资",
          tax:"税款",
          insurance:"失业保险",
          housingFund:"住房公积金",
          taxedSalary: "税后工资",
          salaryAccount:"工资卡账户",
          state: "单据状态",
        }
      ],
    }
  },
  mounted() {
  },
  methods: {
    approval(id){
      let config={
        params:{
          salarySheetId: id,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        salaryFirstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        salarySecondApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }

    },
    deny(id) {
      let config = {
        params: {
          salarySheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        salaryFirstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        salarySecondApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    }
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
