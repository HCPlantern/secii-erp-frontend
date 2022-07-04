<template>
  <Layout>
    <Title title="进货管理"></Title>
    <PurchaseForm>
    </PurchaseForm>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="pendingLevel1List" :type="1" @refresh="getPurchase()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="pendingLevel2List" :type="2" @refresh="getPurchase()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>


  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import PurchaseList from "./components/PurchaseList"
import { getAllPurchase, createPurchase, getAllCustomer } from '../../network/purchase'
import { getAllCommodity } from '../../network/commodity'
import PurchaseForm from "@/views/purchase/components/PurchaseForm";
export default {
  name: 'PurchaseView',
  components: {
    PurchaseForm,
    Layout,
    Title,
    PurchaseList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      purchaseList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
    }
  },
  async mounted() {
    this.getPurchase()
  },
  methods: {
    getPurchase() {
      getAllPurchase({}).then(_res => {
        this.purchaseList = _res.result
        this.pendingLevel1List = this.purchaseList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.purchaseList.filter(item => item.state === '待二级审批')
        this.successList = this.purchaseList.filter(item => item.state === '审批完成')
        this.failureList = this.purchaseList.filter(item => item.state === '审批失败')
      })
    },
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