<template>
  <Layout>
    <Title title="公司账户管理"></Title>
    <el-button type="primary" size="medium" @click="addAccount">新增账户</el-button>
    <div class="search" style="width: 20%;margin-top: 20px">
      <el-input
          prefix-icon="el-icon-search"
          v-model="search"
          size="mini"
          placeholder="请输入关键字搜索账户"/>

    </div>

    <div style="margin-top: 10px">
      <el-table
          :data="accountList.filter(data => !search || data.name.includes(search))"
          stripe
          border
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="id"
            label="账户id"
            fit>
        </el-table-column>
        <el-table-column
            prop="name"
            label="账户名称"
            fit>
        </el-table-column>
        <el-table-column
            prop="amount"
            label="账户余额(元)"
            fit>
        </el-table-column>
        <el-table-column
            fit
            label="操作">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="editInfo(scope.row.id)"
                type="text"
                size="small">
              <i class="el-icon-edit">编辑</i>
            </el-button>
            <el-button
                @click="deleteAccount(scope.row.id)"
                type="text"
                size="small">
              <i class="el-icon-delete">删除</i>
            </el-button>
          </template>
        </el-table-column>

<!--        <el-table-column>-->
<!--          <template slot="header">-->
<!--            <div class="top">-->
<!--              <div class="left">-->
<!--                查询账户-->
<!--                <el-input-->
<!--                    v-model="search"-->
<!--                    size="mini"-->
<!--                    placeholder="输入关键字搜索"/>-->
<!--              </div>-->
<!--            </div>-->
<!--          </template>-->
<!--        </el-table-column>-->


      </el-table>
<!--      新增账户的模态框-->
      <el-dialog
          title="新增账户"
          :visible.sync="addDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="accountForm" :label-width="'100px'" size="mini" :rules="rules">
          <el-form-item label="姓名">
            <el-input v-model="accountForm.name" :rows="2" placeholder="请输入账户名称"></el-input>
          </el-form-item>
          <el-form-item label="初始余额">
            <el-input v-model="accountForm.amount" :rows="2" placeholder="请输入账户余额"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>
<!--      修改账户余额的模态框-->
      <el-dialog
          title="修改客户信息"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="accountEditForm" :label-width="'100px'" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="accountEditForm.name" :rows="2" placeholder="请输入账户名称"></el-input>
          </el-form-item>
          <el-form-item label="初始余额">
            <el-input v-model="accountEditForm.amount" :rows="2" type="number" placeholder="请输入账户余额"></el-input>
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
import {
  createCompanyAccount,
  deleteCompanyAccountById,
  getAllCompanyAccount,
  updateCompanyAccount
} from "@/network/companyaccount";

export default {
  name: "AccountView",
  components: {
    Layout,
    Title
  },
  data(){
    return{
      // 账户
      accountForm:{
        id: '',
        name: '',
        amount:''
      },
    //  账户修改
      accountEditForm:{
        name: '',
        amount:''
      },
      accountList:[],
      addDialogVisible:false,
      editDialogVisible: false,
      search: ''
    }
  },
  async mounted(){
    await getAllCompanyAccount({}).then(_res=>{
      this.accountList=_res.result
    })
  },
  methods:{
    addAccount(){
      this.addDialogVisible=true
    },
    handleAdd(type) {
      if (type === false) {
        this.addDialogVisible = false;
        this.accountForm = {};
      } else if (type === true) {
        createCompanyAccount(this.accountForm).then(_res => {
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
            this.accountForm = {};
            this.addDialogVisible = false;
            getAllCompanyAccount({}).then(_res => {
              this.accountList = _res.result
            })
          }
        })
      }
    },
    editInfo(id) {
      this.accountEditForm=this.accountList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    handleEdit(type) {
      if (type === false) {
        this.editDialogVisible = false;
        this.accountEditForm = {};
      } else if (type === true) {
        updateCompanyAccount(this.accountEditForm).then(_res => {
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
            this.accountEditForm = {};
            this.editDialogVisible = false;
            getAllCompanyAccount({}).then(_res => {
              this.accountList = _res.result
            })
          }
        })
      }
    },
    deleteAccount(id) {
      console.log("Id是"+id)
      let config = {
        params: {
          id: id
        }
      };
      this.$confirm('是否要删除该银行账户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCompanyAccountById(config).then(_res => {
          if (_res.msg === 'Success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            getAllCompanyAccount({}).then(_res => {
              this.accountList = _res.result
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>

<style scoped>

</style>