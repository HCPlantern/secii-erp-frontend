<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addCustomer">新增客户</el-button>
    <div style="margin-top: 10px">
      <el-table
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zipcode"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lineOfCredit"
          label="应收额度(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="receivable"
          label="应收(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payable"
          label="应付(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editInfo(scope.row.id)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
                @click="deleteCustomer(scope.row.id)"
                type="text"
                size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
          title="新增客户"
          :visible.sync="addDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="customerForm" :label-width="'100px'" size="mini">
          <el-form-item label="客户分类">
            <el-select v-model="customerForm.type">
              <el-option
                  v-for="item in classificationList"
                  :key="item.index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户级别">
            <el-input v-model="customerForm.level" placeholder="请输入客户级别" type="number"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="customerForm.name" :rows="2" placeholder="请输入客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="客户电话号码">
            <el-input v-model="customerForm.phone" :rows="2" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="customerForm.address" :rows="2" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="customerForm.zipcode" :rows="2" placeholder="请输入邮编"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="customerForm.email" :rows="2" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="应收额度">
            <el-input v-model="customerForm.lineOfCredit" type="number" :rows="2" placeholder="请输入应收额度"></el-input>
          </el-form-item>
          <el-form-item label="默认业务员">
            <el-input v-model="customerForm.operator" :rows="2" placeholder="请输入默认业务员"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
          title="修改客户信息"
          :visible.sync="editDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="customerEditForm" :label-width="'100px'" size="mini">
          <el-form-item label="客户分类">
            <el-select v-model="customerEditForm.type">
              <el-option
                  v-for="item in classificationList"
                  :key="item.index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户级别">
            <el-input v-model="customerEditForm.level" placeholder="请输入客户级别" type="number"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="customerEditForm.name" :rows="2" placeholder="请输入客户姓名"></el-input>
          </el-form-item>
          <el-form-item label="客户电话号码">
            <el-input v-model="customerEditForm.phone" :rows="2" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="customerEditForm.address" :rows="2" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="邮编">
            <el-input v-model="customerEditForm.zipcode" :rows="2" placeholder="请输入邮编"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="customerEditForm.email" :rows="2" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="应收额度">
            <el-input v-model="customerEditForm.lineOfCredit" type="number" :rows="2" placeholder="请输入应收额度"></el-input>
          </el-form-item>
          <el-form-item label="应收">
            <el-input v-model="customerEditForm.receivable" type="number" :rows="2" placeholder="请输入客户编号"></el-input>
          </el-form-item>
          <el-form-item label="应付">
            <el-input v-model="customerEditForm.payable" type="number" :rows="2" placeholder="请输入客户编号"></el-input>
          </el-form-item>
          <el-form-item label="默认业务员">
            <el-input v-model="customerEditForm.operator" :rows="2" placeholder="请输入默认业务员"></el-input>
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
import {getAllCustomer, createCustomer, updateCustomer, deleteCustomerById} from "../../network/purchase";
import {createCommodity, deleteCommodity, updateCommodity} from "@/network/commodity";
export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      classificationList:['销售商','供应商'],
      customerForm: {
        type: '',
        level: '',
        name: '',
        phone: '',
        address: '',
        zipcode: '',
        email: '',
        lineOfCredit: '',
        operator: ''
      },
      customerEditForm:{
        id: '',
        type: '',
        level: '',
        name: '',
        phone: '',
        address: '',
        zipcode: '',
        email: '',
        lineOfCredit: '',
        receivable: '',
        payable: '',
        operator: ''
      },
      customerList: [],
      addDialogVisible:false,
      editDialogVisible: false
    }
  },
  async mounted() {
    await getAllCustomer({}).then(_res => {
      this.customerList = _res.result
    })
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    addCustomer() {
      // TODO: 新增客户
      this.addDialogVisible=true
    },
    handleAdd(type) {
      if (type === false) {
        this.addDialogVisible = false;
        this.addForm = {};
      } else if (type === true) {
        createCustomer(this.customerForm).then(_res => {
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
            this.customerForm = {};
            this.addDialogVisible = false;
            getAllCustomer({}).then(_res => {
              this.customerList = _res.result
            })
          }
        })
      }
    },
    editInfo(id) {
      // TODO: 修改客户信息
      this.customerEditForm=this.customerList.filter(x => x.id === id)[0];
      this.editDialogVisible = true;
    },
    handleEdit(type) {
      if (type === false) {
        this.editDialogVisible = false;
        this.customerEditForm = {};
      } else if (type === true) {
        updateCustomer(this.customerEditForm).then(_res => {
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
            this.editForm = {};
            this.editDialogVisible = false;
            getAllCustomer({}).then(_res => {
              this.customerList = _res.result
            })
          }
        })
      }
    },
    deleteCustomer(id) {
      console.log("Id是"+id)
      let config = {
        params: {
          id: id
        }
      };
      this.$confirm('是否要删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCustomerById(config).then(_res => {
          if (_res.msg === 'Success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            getAllCustomer({}).then(_res => {
              this.customerList = _res.result
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

<style>

</style>
