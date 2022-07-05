<template>
  <Layout>
    <Title title="工资单审批"></Title>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingLevel1List" :type="1" @refresh="getSalarySheet()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingLevel2List" :type="2" @refresh="getSalarySheet()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SalaryList from "@/views/salary/SalaryList";
import {getSalarySheetByState} from "@/network/salary";
export default {
  name: "SalarySheetApproval",
  components: {SalaryList, Title, Layout},
  data(){
    return{
      activeName: 'PENDING_LEVEL_1',
      salaryList:[],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
    }
  },
  async mounted(){
    this.getSalarySheet()

  },
  methods:{
    getSalarySheet(){
      getSalarySheetByState({}).then(_res=>{
        this.salaryList=_res.result
        this.pendingLevel1List=this.salaryList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List=this.salaryList.filter(item => item.state === '待二级审批')
        this.successList=this.salaryList.filter(item => item.state === '审批完成')
        this.failureList=this.salaryList.filter(item => item.state === '审批失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.body {
  margin: 10px auto 0;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>