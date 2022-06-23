<template>
<!--这个用于制定收款单-->
<Layout>
  <Title title="收款单管理"></Title>
  <el-button type="primary" size="medium" @click="dialogVisible=true">制定收款单</el-button>
  <div class="body">
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane label="待审批" name="PENDING">
        <div v-if="pendingList.length===0">
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div v-else>
          <collection-list :list="pendingList" :type="1" @refresh="getCollection()"/>
        </div>
      </el-tab-pane>

      <el-tab-pane label="审批完成" name="SUCCESS">
        <div v-if="successList.length===0">
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div v-else>
          <collection-list :list="successList" :type="2" @refresh="getCollection()"/>
        </div>
      </el-tab-pane>

      <el-tab-pane label="审批失败" name="FAILURE">
        <div v-if="failureList.length===0">
          <el-empty description="暂无数据"></el-empty>
        </div>
        <div v-else>
          <collection-list :list="failureList" :type="3" @refresh="getCollection()"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
  <el-dialog
    title="创建收款单"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <div style="width: 90%; margin: 0 auto">
<!--      还要添加一个rules可能-->
      <el-form :model="collectionSheet" label-width="100px" ref="saleForm">
        <el-form-item label="客户: " prop="customer">
          <el-select v-model="collectionSheet.customer" placeholder="请选择收款客户">
            <el-option
                v-for="item in customers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
            v-for="(item,index) in collectionSheet.collectionContent"
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
            <el-button type="text" size="small" @click="addTransferList" v-if="index === collectionSheet.collectionContent.length - 1">添加</el-button>
            <el-button type="text" size="small" @click.prevent="removeTransferList(item)" v-if="index !== 0">删除</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('collectionSheet')">立即创建</el-button>
    </span>
  </el-dialog>
</Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import {createCollectionSheet, getAllCollectionSheet} from "@/network/finance";
import Title from "@/components/content/Title";
import CollectionList from "@/views/finance/components/CollectionList";
import {getAllCustomer} from "@/network/sale";
import {getAllCompanyAccount} from "@/network/companyaccount";
export default {
  name: "CollectionView",
  components: {CollectionList, Title, Layout},
  data() {
    return {
      activeName: 'PENDING',
      // 所有的收款单
      collectionList: [],
      pendingList:[],
      successList: [],
      failureList: [],
      dialogVisible: false,
      collectionSheet:{
        collectionContent:[
            {
              id: '',
              companyAccountId: '',
              transferAmount: '',
              collectionSheetId: '',
              remark: ''
            }
        ]
      },
      customers: [],
      companyAccountList:[]
    }
  },
  async mounted(){
    this.getCollection()
    await getAllCustomer({}).then(_res=>{
      this.customers=_res.result
    })
    await getAllCompanyAccount({}).then(_res=>{
      this.companyAccountList=_res.result
    })
  },
  methods:{
    getCollection(){
      getAllCollectionSheet({}).then(_res=>{
        this.collectionList=_res.result
        this.pendingList=this.collectionList.filter(item=>item.state==='待审批')
        console.log(this.pendingList)
        this.successList=this.collectionList.filter(item=>item.state==='审批完成')
        this.failureList=this.collectionList.filter(item=>item.state==='审批失败')
      })
    },
    handleClose(done){
      this.$confirm("确认关闭?").then(_=>{
        this.resetForm()
        done();
      }).catch(_=>{});
    },
    submitForm(formName){
      this.collectionSheet.id=null
      this.collectionSheet.customer=parseInt(this.collectionSheet.customer)
      this.collectionSheet.operator = sessionStorage.getItem("name")
      this.collectionSheet.totalAmount=null
      this.collectionSheet.state=null
      this.collectionSheet.collectionContent.forEach((item)=>{
        item.id=null
        item.collectionSheetId=null
        item.companyAccountId=parseInt(item.companyAccountId)
        item.transferAmount=parseInt(item.transferAmount)
      })
      createCollectionSheet(this.collectionSheet).then(_res=>{
        if(_res.msg==='Success'){
          this.$message.success('创建成功!')
          this.dialogVisible = false
          this.collectionSheet={}
          this.collectionSheet.collectionContent=[]
          this.getCollection()
        }
      })
    },
    resetForm(){
      this.collectionSheet={
        collectionContent: []
      }
    },
    addTransferList(){
      this.collectionSheet.collectionContent.push({});
    },
    removeTransferList(item){
      let index=this.collectionSheet.collectionContent.indexOf(item)
      if(index!==-1){
        this.collectionSheet.collectionContent.splice(index,1)
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