<template>
  <Layout>
    <Title title="收款单审批"></Title>
<!--    总经理的收款单页面-->
<!--    直接把收款单审批和付款单审批抄过来-->
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
  </Layout>
</template>
<script>
  import Layout from "@/components/content/Layout";
  import Title from "@/components/content/Title";
  import {getAllCustomer} from "@/network/sale";
  import {getAllCompanyAccount} from "@/network/companyaccount";
  import {createCollectionSheet, getAllCollectionSheet} from "@/network/finance";
  import CollectionList from "@/views/finance/components/CollectionList";
  export default {
    name: "CollectionSheetApproval",
    components: {
      CollectionList,
        Layout,
        Title
    },
    data(){
      return{
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
        companyAccountList:[],
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
      resetForm(){
        this.collectionSheet={
          collectionContent: []
        }
      },
    }
  };
</script>

<style scoped>
</style>
