<template>
  <Layout>
    <Title title="付款单审批"></Title>
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

  </Layout>

</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import PaymentList from "@/views/finance/components/PaymentList";
import {getAllCustomer} from "@/network/sale";
import {getAllCompanyAccount} from "@/network/companyaccount";
import {createPaymentSheet, getAllCollectionSheet, getAllPaymentSheet} from "@/network/finance";
export default {
  name: "PaymentSheetApproval",
  components: {
    Title,
    Layout,
    PaymentList
  },
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

<style scoped>

</style>