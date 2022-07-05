<template>
  <Layout>
    <Title title="期初建账"></Title>
<!--    这是期初建账的界面-->
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>

        <div class="searchCondition">
          <el-form class="form" ref="form" :model="form"  label-width="100px">
            <el-form-item class="form-item" label="期初信息选择" prop="initMessageType">
              <el-select v-model="form.initMessageType" collapse-tags clearable filterable>
                <el-option v-for="item in messageType"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="button">
          <el-button
              icon="el-icon-search"
              size="small"
              type="primary"
              @click="addCustomer"
          >
            期初新建客户
          </el-button>
        </div>

        <div class="button">
          <el-button
              icon="el-icon-search"
              size="small"
              type="primary"
              @click="addProduct"
          >
            期初新建产品
          </el-button>
        </div>

        <div class="button">
          <el-button
              icon="el-icon-search"
              size="small"
              type="primary"
              @click="addAccount"
          >
            期初新建账户
          </el-button>
        </div>
      </el-card>
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>单据列表</span>
        </div>

      </el-card>
      <el-table
          v-if="form.initMessageType==='initProduct'"
          :data="initProductList"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          border
          fit
      >
        <el-table-column v-for="item in labelOptions[2]" :key="item.id" :label="item.title" :prop="item.value">
        </el-table-column>
      </el-table>
      <el-table
          v-if="form.initMessageType==='initCustomer'"
          :data="initCustomerList"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          border
          fit
      >
        <el-table-column v-for="item in labelOptions[1]" :key="item.id" :label="item.title" :prop="item.value">
        </el-table-column>
      </el-table>

      <el-table
          v-if="form.initMessageType==='initCompanyAccount'"
          :data="initCompanyAccountList"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          border
          fit
      >
        <el-table-column v-for="item in labelOptions[0]" :key="item.id" :label="item.title" :prop="item.value">
        </el-table-column>
      </el-table>




      <el-dialog
          title="新增客户"
          :visible.sync="addCustomerDialogVisible"
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
          <el-button @click="handleAddCustomer(false)">取 消</el-button>
          <el-button type="primary" @click="handleAddCustomer(true)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
          title="新增商品"
          :visible.sync="addProductDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="addForm" :label-width="'100px'" size="mini">
          <el-form-item label="所属分类">
            <el-select v-model="addForm.categoryId">
              <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名 称">
            <el-input v-model="addForm.name" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="类 型">
            <el-input v-model="addForm.type" type="textarea" :rows="2" placeholder="请输入商品类型"></el-input>
          </el-form-item>
          <el-form-item label="进价/零售价">
            <el-col :span="11">
              <el-input v-model="addForm.purchasePrice" placeholder="请输入商品进价" type="number"></el-input>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-input v-model="addForm.retailPrice" placeholder="请输入商品零售价" type="number"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAddProduct(false)">取 消</el-button>
          <el-button type="primary" @click="handleAddProduct(true)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
          title="新增账户"
          :visible.sync="addCompanyAccountDialogVisible"
          width="30%"
          @close="close()">
        <el-form :model="accountForm" :label-width="'100px'" size="mini">
          <el-form-item label="姓名">
            <el-input v-model="accountForm.name" :rows="2" placeholder="请输入账户名称"></el-input>
          </el-form-item>
          <el-form-item label="初始余额">
            <el-input v-model="accountForm.amount" :rows="2" placeholder="请输入账户余额"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAddAccount(false)">取 消</el-button>
          <el-button type="primary" @click="handleAddAccount(true)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  createInitCompanyAccount,
  createInitCustomer, createInitProduct,
  getAllInitCompanyAccount,
  getAllInitCustomer,
  getAllInitProduct
} from "@/network/finance";
import {findAllSheet} from "@/network/sheet";
import {createCustomer, getAllCustomer} from "@/network/purchase";
import {createCommodity, getAllCommodityClassification} from "@/network/commodity";
import {createCompanyAccount, getAllCompanyAccount} from "@/network/companyaccount";
export default {
  name: "InitAccountView",
  components: {Title, Layout},
  data(){
    return{
      form:{
        initMessageType: ''
      },
      addCustomerDialogVisible: false,
      addProductDialogVisible: false,
      addCompanyAccountDialogVisible: false,
      initCustomerList:[],
      initProductList:[],
      initCompanyAccountList:[],
      classificationList:['销售商','供应商'],
      categoryList:[],
      messageType:[{
        value: "initCompanyAccount",
        label: '期初账户信息',
      },{
        value: "initProduct",
        label: '期初商品信息',
      },{
        value: "initCustomer",
        label: '期初客户信息',
      }],
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
      accountForm:{
        id: '',
        name: '',
        amount:''
      },
      addForm: {
        categoryId: '暂未选择',
        name: '',
        type: '',
        purchasePrice: '',
        retailPrice: ''
      },
      labelOptions:[
          [
            {
              id: 0,
              title: '银行账户编号',
              value: 'id'
            },
            {
              id: 1,
              title: '银行账户名称',
              value: 'name'
            },
            {
              id: 2,
              title: '银行账户余额',
              value: 'amount'
            }
          ],
          [
            {
              id: 0,
              title: '客户类型',
              value: 'type'
            },
            {
              id: 0,
              title: '客户姓名',
              value: 'name'
            },
            {
              id: 0,
              title: '客户级别',
              value: 'level'
            },
            {
              id: 0,
              title: '客户手机号',
              value: 'phone'
            },
            {
              id: 0,
              title: '客户住址',
              value: 'address'
            },
            {
              id: 0,
              title: '客户邮编',
              value: 'zipcode'
            },
            {
              id: 0,
              title: '客户邮箱',
              value: 'email'
            },
            {
              id: 0,
              title: "信用",
              value: 'lineOfCredit'
            },
            {
              id: 0,
              title: '操作员',
              value: 'operator'
            },
          ],
          [
            {
              id: 0,
              title: '商品编号',
              value: 'id'
            },
            {
              id: 0,
              title: '商品名称',
              value: 'name'
            },
            {
              id: 0,
              title: '分类编号',
              value: 'category_id'
            },
            {
              id: 0,
              title: '商品类别',
              value: 'type'
            },
            {
              id: 0,
              title: '商品数量',
              value: 'quantity'
            },
            {
              id: 0,
              title: '进价',
              value: 'purchase_price'
            },
            {
              id: 0,
              title: '售价',
              value: 'retail_price'
            },
          ]
      ]
    }
  },
  async mounted(){
    getAllInitProduct({}).then(_res=>{
      this.initProductList=_res.result
    });
    getAllInitCompanyAccount({}).then(_res=>{
      this.initCompanyAccountList=_res.result
    });
    getAllInitCustomer({}).then(_res=>{
      this.initCustomerList=_res.result
    });
    getAllCommodityClassification({}).then(_res => {
      this.categoryList = _res.result;
      var tempList = this.categoryList.map((item,index) =>{
        return Object.assign({},{ id: item.id, name: item.name})
      })
      this.categoryList = tempList;
    })
  },
  methods:{
    handleAddCustomer(type) {
      if (type === false) {
        this.addCustomerDialogVisible = false;
        this.customerForm = {};
      } else if (type === true) {
        createInitCustomer(this.customerForm).then(_res => {
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
            this.addCustomerDialogVisible = false;
            getAllInitCustomer({}).then(_res => {
              this.initCustomerList = _res.result
            })
          }
        })
      }
    },
    handleAddProduct(type) {
      if (type === false) {
        this.addProductDialogVisible = false;
        this.addForm = {};
      } else if (type === true) {
        createInitProduct(this.addForm).then(_res => {
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
            this.addForm = {};
            this.addProductDialogVisible = false;
            getAllCommodityClassification({}).then(_res => {
              this.categoryList = _res.result;
              var tempList = this.categoryList.map((item,index) =>{
                return Object.assign({},{ id: item.id, name: item.name})
              })
              this.categoryList = tempList;
            })
          }
        })
      }
    },
    handleAddAccount(type) {
      if (type === false) {
        this.addCompanyAccountDialogVisible = false;
        this.accountForm = {};
      } else if (type === true) {
        createInitCompanyAccount(this.accountForm).then(_res => {
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
            this.addCompanyAccountDialogVisible = false;
            getAllInitCompanyAccount({}).then(_res => {
              this.initCompanyAccountList = _res.result
            })
          }
        })
      }
    },
    addCustomer() {
      this.addCustomerDialogVisible=true
    },
    addProduct() {
      this.addProductDialogVisible=true
    },
    addAccount() {
      this.addCompanyAccountDialogVisible=true
    },
  }
}
</script>

<style scoped>
.button{
  margin-top: 20px;
  margin-bottom: 20px;
}
.form-item{
  margin-top: 30px;
  display: inline-block;
}
.el-card{
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}
</style>