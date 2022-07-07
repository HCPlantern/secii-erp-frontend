<template>
  <el-dialog
    :title="mytitle"
    :visible.sync="visible"
    width="30%"
    :destroy-on-close="true"
    @close="handleClose()"
  >
    <el-form :model="myform" :label-width="'100px'" size="mini" :rules="rules">
      <el-form-item label="姓名" :required="true">
        <el-input
          v-model="myform.name"
          :rows="2"
          placeholder="请输入姓名"
          type="string"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="所在部门">
        <el-select v-model="myform.job">
          <el-option
            v-for="item in deptName"
            :key="item.index"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="myform.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input
          class="numrule"
          v-model="myform.phone"
          :rows="1"
          placeholder="电话号码"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="岗位级别">
        <el-input
          class="numrule"
          v-model="myform.jobGrade"
          :rows="1"
          placeholder="请输入岗位级别"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="工资卡银行账户">
        <el-input
          class="numrule"
          v-model="myform.salaryAccount"
          :rows="2"
          placeholder="请输入工资卡银行账户"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          style="width: 150px"
          v-model="myform.birthday"
          type="date"
          value-format="yyyy-MM-dd"
          :editable="false"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose()">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addEmployee, updateEmployee } from "@/network/humanresource";
import { DEPT_NAME } from "@/common/const.js";
export default {
  name: "EmployeeInfoDialog",
  props: { visible: Boolean, form: {}, type: String },
  data() {
    let validateName = (rule, value, callback) => {
      console.log("校验");
      if (this.employeeEditForm.name === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    let rules = {
      name: [{ validator: validateName }],
    };
    let mytitle = this.type === "edit" ? "修改员工信息" : "添加员工";
    return {
      deptName: DEPT_NAME,
      mytitle,
      myform: {
        name: "",
        job: "",
        sex: "",
        phone: "",
        jobGrade: "",
        salaryAccount: "",
        birthday: "",
      },
      rules,
    };
  },
  created() {
    this.myform = JSON.parse(JSON.stringify(this.form)); //深拷贝
  },
  watch: {
    form(news, olds) {
      this.myform = JSON.parse(JSON.stringify(news));
    },
  }, //持续监听变化
  methods: {
    handleClose() {
      this.$emit("update:visible", (this.visible = false));
    }, //修改visible必须调用此方法实现双向绑定
    handleEdit() {
      updateEmployee(this.myform).then((_res) => {
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
          this.handleClose();
        }
      });
    },
    handleAdd() {
      addEmployee(this.myform).then((_res) => {
        if (_res.code === "B0003") {
          this.$message({
            type: "error",
            message: _res.msg,
          });
        } else {
          this.$message({
            type: "success",
            message: "添加成功！",
          });
          this.handleClose();
        }
      });
    },
    handleConfirm() {
      this.type === "edit" ? this.handleEdit() : this.handleAdd();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .numrule input::-webkit-outer-spin-button,
::v-deep .numrule input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
::v-deep .numrule input[type="number"] {
  -moz-appearance: textfield !important;
}
</style>
