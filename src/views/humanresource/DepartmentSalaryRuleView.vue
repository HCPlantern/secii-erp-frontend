<template>
  <Layout>
    <Title title="制定部门薪资规则"></Title>
    <el-button type="primary" size="medium" @click="addDepartmentSalaryRule">制定部门薪酬规则</el-button>
    <el-card class="el-card" shadow="hover">
      <div class="form-icon-text">
        <i class="el-icon-tickets"></i>
        <span>各部门薪酬规则列表</span>
      </div>
    </el-card>
    <div style="margin-top: 10px">
      <el-table :data="salaryRulesList"
                stripe
                border
                style="width: 100%"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
      >
        <el-table-column
            prop="id"
            label="id"
            fit>
        </el-table-column>
        <el-table-column
            prop="name"
            label="部门名称"
            fit>
        </el-table-column>
        <el-table-column
            prop="baseWage"
            label="基本工资"
            fit>
        </el-table-column>
        <el-table-column
            prop="salaryCalculationMethod"
            label="薪资计算方法"
            fit>
        </el-table-column>
        <el-table-column
            prop="salaryPaymentMethod"
            label="薪资发放方法"
            fit>
        </el-table-column>
        <el-table-column
            prop="postWage"
            label="岗位工资"
            fit>
        </el-table-column>
        <el-table-column
            prop="annualBonus"
            label="年终奖"
            fit>
        </el-table-column>
        <el-table-column
            fixed="right"
            width="120"
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="editInfo(scope.row.id)"
                type="text"
                size="small">
              <i class="el-icon-edit">编辑</i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog
        title="新增部门薪资规则"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="close()">
        <el-form :model="salaryRuleForm" :label-width="'100px'" size="mini">
          <el-form-item label="部门名称">
            <el-select v-model="salaryRuleForm.name">
              <el-option v-for="item in deptName"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input v-model="salaryRuleForm.baseWage" :rows="2" placeholder="请输入基本工资" type="number"></el-input>
          </el-form-item>
          <el-form-item label="薪资计算方法">
            <el-select v-model="salaryRuleForm.salaryCalculationMethod">
              <el-option v-for="item in salaryCalculationClassification"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资发放方法">
            <el-select v-model="salaryRuleForm.salaryPaymentMethod">
              <el-option v-for="item in salaryPaymentClassification"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位工资">
            <el-input v-model="salaryRuleForm.postWage" :rows="2" placeholder="请输入岗位工资" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
          title="修改部门薪资规则"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="salaryRuleEditForm" :label-width="'100px'" size="mini">
          <el-form-item label="部门名称">
            <el-select v-model="salaryRuleEditForm.name">
              <el-option v-for="item in deptName"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input v-model="salaryRuleEditForm.baseWage" :rows="2" placeholder="请输入基本工资" type="number"></el-input>
          </el-form-item>
          <el-form-item label="薪资计算方法">
            <el-select v-model="salaryRuleEditForm.salaryCalculationMethod">
              <el-option v-for="item in salaryCalculationClassification"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资发放方法">
            <el-select v-model="salaryRuleEditForm.salaryPaymentMethod">
              <el-option v-for="item in salaryPaymentClassification"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位工资">
            <el-input v-model="salaryRuleEditForm.postWage" :rows="2" placeholder="请输入岗位工资" type="number"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleEdit(false)">取 消</el-button>
          <el-button type="primary" @click="handleEdit(true)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {createDepartmentSalaryRule, getAllDepartmentSalaryRules, updateDepartmentSalaryRule} from "@/network/finance";
import {getAllCustomer} from "@/network/purchase";
export default {
  name: "DepartmentSalaryRule",
  components: {Title, Layout},
  data(){
    return{
      deptName:["INVENTORY_MANAGER","SALE_STAFF","FINANCIAL_STAFF","SALE_MANAGER","HR","GM","ADMIN"],
      salaryCalculationClassification:["POST","DEDUCT"],
      salaryPaymentClassification:["MONTHLY","ANNUALLY"],
      // 创建薪酬规则时的表单
      salaryRuleForm:{
        name: '',
        baseWage: '',
        salaryCalculationMethod: '',
        salaryPaymentMethod: '',
        postWage: '',
      //  年终奖不是手动填写
      },
      // 修改薪酬规定时的表单
      salaryRuleEditForm:{
        id: '',
        name: '',
        baseWage: '',
        salaryCalculationMethod: '',
        salaryPaymentMethod: '',
        postWage: '',
      },
      salaryRulesList:[],
      addDialogVisible:false,
      editDialogVisible: false
    }
  },
  async mounted(){
    getAllDepartmentSalaryRules({}).then(_res=>{
      this.salaryRulesList=_res.result
    })
  },
  methods:{
    addDepartmentSalaryRule(){
      this.addDialogVisible=true
    },
    handleAdd(type){
      if(type===false){
        this.addDialogVisible=false;
        this.salaryRuleForm={}
      }else {
        createDepartmentSalaryRule(this.salaryRuleForm).then(_res=>{
          if (_res.code === "B0001" || _res.code === "B0002") {
            this.$message({
              type: 'error',
              message: _res.msg
            });
          } else {
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            this.salaryRuleForm = {};
            this.addDialogVisible = false;
            getAllDepartmentSalaryRules({}).then(_res=>{
              this.salaryRulesList=_res.result
            })
          }
        })
      }
    },
    //根据id修改信息
    editInfo(id){
      this.salaryRuleEditForm=this.salaryRulesList.filter(x=>x.id===id)[0];
      this.editDialogVisible=true;
    },
    handleEdit(type){
      if(type===false){
        this.editDialogVisible=false;
        this.salaryRuleEditForm={};
      }else {
        updateDepartmentSalaryRule(this.salaryRuleEditForm).then(_res=>{
          if (_res.code === 'B0003') {
            this.$message({
              type: 'error',
              message: _res.msg
            })
          } else {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.salaryRuleEditForm = {};
            this.editDialogVisible = false;
            getAllDepartmentSalaryRules({}).then(_res=>{
              this.salaryRulesList=_res.result
            })
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}

</style>