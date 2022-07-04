<template>
<!--这个用于制定付款单-->
  <Layout>
    <Title title="付款单管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible=true">制定付款单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="pendingList" :type="2" @refresh="getPayment()"/>
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="successList" :type="3" @refresh="getPayment()"/>
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payment-list :list="failureList" :type="4" @refresh="getPayment()"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
<!--    创建付款单的模态框-->
    <el-dialog
        title="创建付款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <!--      还要添加一个rules可能-->
        <el-form :model="paymentSheet" label-width="100px" ref="paymentSheet">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="paymentSheet.customer" placeholder="请选择付款客户">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              v-for="(item,index) in paymentSheet.content"
              :key="index"
              :label="'转账列表' + ' '+index"
          >
            <div>
              <el-select v-model="item.companyAccountId" placeholder="请选择公司账户id" style="width: 40%; margin-right: 5%">
                <el-option v-for="item1 in companyAccountList"
                           :key="item1.id"
                           :label="item1.name"
                           :value="item1.id">
                </el-option>
              </el-select>
              <el-input v-model="item.transferAmount" style="width: 25%; margin-right: 5%" placeholder="请输入转账金额"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 70%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="addTransferList" v-if="index === paymentSheet.content.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeTransferList(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('paymentSheet')">立即创建</el-button>
    </span>
    </el-dialog>

  </Layout>
</template>
<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {createPaymentSheet, getAllPaymentSheet} from "@/network/finance";
import PaymentList from "@/views/finance/components/PaymentList";
import {getAllCustomer} from "@/network/sale";
import {getAllCompanyAccount} from "@/network/companyaccount";
export default {
  name: "PaymentView",
  components: {PaymentList, Title, Layout},
  data(){
    return{
      activeName: 'PENDING',
      // 所有的收款单
      paymentList: [],
      pendingList:[],
      successList: [],
      failureList: [],
      dialogVisible: false,
      paymentSheet:{
        content:[
          {
            id: '',
            companyAccountId: '',
            transferAmount: '',
            paymentSheetId: '',
            remark: ''
          }
        ]
      },
      customers: [],
      companyAccountList:[]
    }
  },
  async mounted(){
    this.getPayment()
    await getAllCustomer({}).then(_res=>{
      this.customers=_res.result
    })
    await getAllCompanyAccount({}).then(_res=>{
      this.companyAccountList=_res.result
    })
  },
  methods:{
    getPayment(){
      getAllPaymentSheet({}).then(_res=>{
        this.paymentList=_res.result
        this.pendingList=this.paymentList.filter(item=>item.state==='待审批')
        console.log(this.pendingList)
        this.successList=this.paymentList.filter(item=>item.state==='审批完成')
        this.failureList=this.paymentList.filter(item=>item.state==='审批失败')
      })
    },
    handleClose(done){
      this.$confirm("确认关闭?").then(_=>{
        this.resetForm()
        done();
      }).catch(_=>{});
    },
    submitForm(formName){
      this.paymentSheet.id=null
      this.paymentSheet.customer=parseInt(this.paymentSheet.customer)
      this.paymentSheet.operator = sessionStorage.getItem("name")
      this.paymentSheet.totalAmount=null
      this.paymentSheet.state=null
      this.paymentSheet.content.forEach((item)=>{
        item.id=null
        item.paymentSheetId=null
        item.companyAccountId=parseInt(item.companyAccountId)
        item.transferAmount=parseInt(item.transferAmount)
      })
      createPaymentSheet(this.paymentSheet).then(_res=>{
        if(_res.msg==='Success'){
          this.$message.success('创建成功!')
          this.dialogVisible = false
          this.paymentSheet={}
          this.paymentSheet.content=[]
          this.getPayment()
        }
      })
    },
    resetForm(){
      this.paymentList={
        paymentSheetContentVOS: []
      }
    },
    addTransferList(){
      this.paymentSheet.content.push({});
    },
    removeTransferList(item){
      let index=this.paymentSheet.content.indexOf(item)
      if(index!==-1){
        this.paymentSheet.content.splice(index,1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>