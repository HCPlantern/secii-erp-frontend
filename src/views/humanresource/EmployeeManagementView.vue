<template>
  <Layout>
    <Title title="管理员工信息"></Title>
    <el-button type="primary" size="medium" @click="addDialogVisible = true"
      >添加员工</el-button
    >
    <el-card class="el-card" shadow="hover">
      <div class="form-icon-text">
        <i class="el-icon-tickets"></i>
        <span>员工信息列表</span>
      </div>
    </el-card>
    <div style="margin-top: 10px">
      <el-table
        :data="employeeList"
        stripe
        border
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column prop="name" label="姓名" fit> </el-table-column>
        <el-table-column label="所在部门" fit>
          <template slot-scope="scope">
            <span>{{
              _self.deptName.filter((x) => x.value === scope.row.job)[0].name
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" fit> </el-table-column>
        <el-table-column prop="phone" label="电话号码" fit> </el-table-column>
        <el-table-column prop="jobGrade" label="岗位级别" fit> </el-table-column>
        <el-table-column prop="salaryAccount" label="工资卡银行账户" fit>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" fit>
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
            <el-button
              @click.native.prevent="handleDelete(scope.row.id)"
              type="text"
              size="small"
            >
              <i class="el-icon-delete">删除</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <employee-info-dialog
        :form="employeeEditForm"
        :type="'edit'"
        :visible.sync="editDialogVisible"
      ></employee-info-dialog>
      <employee-info-dialog
        :form="employeeEditForm"
        :type="'add'"
        :visible.sync="addDialogVisible"
      ></employee-info-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { DEPT_NAME } from "@/common/const.js";
import EmployeeInfoDialog from "./component/EmployeeInfoDialog.vue";
import {
  deleteEmployeeById,
  getAllEmployee,
} from "@/network/humanresource";
export default {
  name: "EmployeeManagement",
  components: { Title, Layout, EmployeeInfoDialog },
  data() {
    return {
      deptName: DEPT_NAME,
      employeeEditForm: {
        name: "",
        job: "",
        sex: "",
        phone: "",
        jobGrade: "",
        salaryAccount: "",
        birthday: "",
      }, // 修改员工信息时的表单
      employeeList: [],
      editDialogVisible: false,
      addDialogVisible: false,
    };
  },
  async mounted() {
    this.showAllEmployees();
    var _self = this; //解决作用域问题
  },
  watch: {
    editDialogVisible: {
      handler(news, olds) {
        if (!news) {
          this.showAllEmployees();
          this.employeeEditForm = {};
        }
      },
    },
    addDialogVisible: {
      handler(news, olds) {
        if (!news) {
          this.showAllEmployees();
          this.employeeEditForm = {};
        }
      },
    },
  },
  methods: {
    //根据id修改信息
    showAllEmployees() {
      getAllEmployee({}).then((_res) => {
        this.employeeList = _res.result;
      });
    },
    editInfo(id) {
      this.employeeEditForm = this.employeeList.filter((x) => x.id === id)[0];
      this.editDialogVisible = true;
    },
    handleDelete(id) {
      let config = {
        params: {
          id: id,
        },
      };
      deleteEmployeeById(config).then((_res) => {
        if (_res.msg === "Success") {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          getAllEmployee({}).then((_res) => {
            this.employeeList = _res.result;
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}
</style>