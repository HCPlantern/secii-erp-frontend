<template>
  <Layout>
    <Title title="制定部门薪资规则"></Title>
    <el-card class="el-card" shadow="hover">
      <div class="form-icon-text">
        <i class="el-icon-tickets"></i>
        <span>各部门薪酬规则列表</span>
      </div>
    </el-card>
    <div style="margin-top: 10px">
      <el-table
        :data="salaryRulesList"
        stripe
        border
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column label="部门名称" fit>
          <template slot-scope="scope">
            <span>{{
              _self.deptName.filter((x) => x.value === scope.row.name)[0].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baseWage" label="基本工资" fit>
        </el-table-column>
        <el-table-column label="薪资计算方法" fit>
          <template slot-scope="scope">
            <span>{{
              _self.salaryCalculationClassification.filter(
                (x) => x.value === scope.row.salaryCalculationMethod
              )[0].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="薪资发放方法" fit>
          <template slot-scope="scope">
            <span>{{
              _self.salaryPaymentClassification.filter(
                (x) => x.value === scope.row.salaryPaymentMethod
              )[0].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="postWage" label="岗位工资" fit>
        </el-table-column>
        <el-table-column prop="deductRate" label="提成率" fit>
        </el-table-column>
        <el-table-column prop="gradeRate" label="岗位级别加薪率" fit>
        </el-table-column>
        <el-table-column prop="insurance" label="失业保险金" fit>
        </el-table-column>
        <el-table-column prop="housingFund" label="住房公积金" fit>
        </el-table-column>
        <el-table-column prop="annualBonus" label="年终奖" fit>
        </el-table-column>
        <el-table-column fixed="right" width="120" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editInfo(scope.row.id)"
              type="text"
              size="small"
            >
              <i class="el-icon-edit">编辑</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="修改部门薪资规则"
        :visible.sync="editDialogVisible"
        width="30%"
      >
        <el-form :model="salaryRuleEditForm" :label-width="'100px'" size="mini">
          <el-form-item label="部门名称">
            <el-select v-model="salaryRuleEditForm.name" :disabled="true">
              <el-option
                v-for="item in deptName"
                :key="item.index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input
              class="numrule"
              v-model="salaryRuleEditForm.baseWage"
              :rows="2"
              placeholder="请输入基本工资"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="薪资计算方法">
            <el-select v-model="salaryRuleEditForm.salaryCalculationMethod">
              <el-option
                v-for="item in salaryCalculationClassification"
                :key="item.index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资发放方法">
            <el-select v-model="salaryRuleEditForm.salaryPaymentMethod">
              <el-option
                v-for="item in salaryPaymentClassification"
                :key="item.index"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位工资">
            <el-input
              v-model="salaryRuleEditForm.postWage"
              :rows="2"
              placeholder="请输入岗位工资"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
          <el-form-item label="提成率">
            <el-input
              v-model="salaryRuleEditForm.deductRate"
              :rows="1"
              placeholder="请输入提成率"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
          <el-form-item label="岗位级别加薪率">
            <el-input
              v-model="salaryRuleEditForm.gradeRate"
              :rows="1"
              placeholder="请输入岗位级别加薪率"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
          <el-form-item label="失业保险金">
            <el-input
              v-model="salaryRuleEditForm.insurance"
              :rows="2"
              placeholder="请输入失业保险金"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
          <el-form-item label="住房公积金">
            <el-input
              v-model="salaryRuleEditForm.housingFund"
              :rows="2"
              placeholder="请输入住房公积金"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
          <el-form-item label="年终奖">
            <el-input
              :disabled="true"
              v-model="salaryRuleEditForm.annualBonus"
              :rows="2"
              placeholder="年终奖由总经理制定"
              type="number"
              class="numrule"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEdit()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getAllDepartmentSalaryRules,
  updateDepartmentSalaryRule,
} from "@/network/humanresource";
export default {
  name: "DepartmentSalaryRule",
  components: { Title, Layout },
  data() {
    return {
      deptName: [
        { name: "库存管理部门", value: "INVENTORY_MANAGER" },
        { name: "进货销售部门", value: "SALE_STAFF" },
        { name: "财务部门", value: "FINANCIAL_STAFF" },
        { name: "销售经理", value: "SALE_MANAGER" },
        { name: "人力资源部门", value: "HR" },
        { name: "总经理", value: "GM" },
      ], //ADMIN不算部门
      salaryCalculationClassification: [
        { name: "基本工资+岗位工资", value: "POST" },
        { name: "基本工资+提成", value: "DEDUCT" },
      ],
      salaryPaymentClassification: [
        { name: "月薪制", value: "MONTHLY" },
        { name: "年薪制", value: "ANNUALLY" },
      ],
      // 修改薪酬规定时的表单
      salaryRuleEditForm: {
        id: "",
        name: "",
        baseWage: "",
        salaryCalculationMethod: "",
        salaryPaymentMethod: "",
        postWage: "",
        deductRate: "",
        gradeRate: "",
        insurance: "",
        housingFund: "",
        annualBonus: "",
      },
      salaryRulesList: [],
      editDialogVisible: false,
    };
  },
  async mounted() {
    getAllDepartmentSalaryRules({}).then((_res) => {
      this.salaryRulesList = _res.result;
    });
    var _self = this;
  },
  methods: {
    //根据id修改信息
    editInfo(id) {
      this.salaryRuleEditForm = JSON.parse(
        JSON.stringify(this.salaryRulesList.filter((x) => x.id === id)[0])
      ); //深拷贝
      this.editDialogVisible = true;
    },
    handleEdit() {
      updateDepartmentSalaryRule(this.salaryRuleEditForm).then((_res) => {
        if (_res.code === "B0003") {
          this.$message({
            type: "error",
            message: _res.msg,
          });
        } else {
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          getAllDepartmentSalaryRules({}).then((_res) => {
            this.salaryRulesList = _res.result;
          });
          this.editDialogVisible = false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}
::v-deep .numrule input::-webkit-outer-spin-button,
::v-deep .numrule input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep .numrule input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>