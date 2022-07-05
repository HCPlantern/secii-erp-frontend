<template>
  <Layout>
    <Title title="进货退货管理"></Title>
    <el-button type="primary" @click="dialogVisible = true">制定进货退货单</el-button>
    <el-dialog
        title="创建进货退货单"
        :visible.sync="dialogVisible"
        v-on:submit="formSubmit"
        :before-close="handleClose">
      <PurchaseReturnForm
          style="margin: 0 0 1rem 0">
      </PurchaseReturnForm>
    </el-dialog>

    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="pendingLevel1List" :type="1" @refresh="getPurchaseReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="pendingLevel2List" :type="2" @refresh="getPurchaseReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import purchaseReturnList from "./components/PurchaseReturnList"
import {
  getAllPurchaseReturn,
  getAllPurchase,
} from '@/network/purchase'
import PurchaseReturnForm from "@/views/purchase/components/PurchaseReturnForm";

export default {
  name: 'PurchaseReturnView',
  components: {
    PurchaseReturnForm,
    Layout,
    Title,
    purchaseReturnList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      purchaseReturnList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      purchaseReturnForm: {
        saleReturnsSheetContent: []
      },
      completedPurchase: []
    }
  },
  async mounted() {
    this.getPurchaseReturn()

  },
  methods: {
    getPurchaseReturn() {
      getAllPurchaseReturn({}).then(_res => {
        this.purchaseReturnList = _res.result
        this.pendingLevel1List = this.purchaseReturnList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.purchaseReturnList.filter(item => item.state === '待二级审批')
        this.successList = this.purchaseReturnList.filter(item => item.state === '审批完成')
        this.failureList = this.purchaseReturnList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    formSubmit() {
      this.dialogVisible = false
      this.getPurchaseReturn()
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