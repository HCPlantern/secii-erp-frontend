<template>
  <Layout>
    <Title title="销售退货管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售退货单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="pendingLevel1List" :type="1" @refresh="getSaleReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="pendingLevel2List" :type="2" @refresh="getSaleReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建销售退货单"
        :visible.sync="dialogVisible"
        v-on:submit="submit"
        :before-close="handleClose">
      <SaleReturnForm
          style="margin: 0 0 1rem 0"></SaleReturnForm>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {
  getAllSaleReturn,
  getAllSale,
  createSaleReturn
} from '@/network/sale'
import saleReturnList from "@/views/sale/components/SaleReturnList";
import SaleReturnForm from "@/views/sale/components/SaleReturnForm";

export default {
  name: 'SaleReturnView',
  components: {
    SaleReturnForm,
    Layout,
    Title,
    saleReturnList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      saleReturnList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      completedSale: [],
      dialogVisible: false,
      rules: {
        saleSheetId: [
          {required: true, message: '请选择一个销售单', trigger: 'change'}
        ]
      }
    }
  },
  async mounted() {
    this.getSaleReturn()

  },
  methods: {
    getSaleReturn() {
      // 得到所有的销售退货单 并且按照审批状态分类
      getAllSaleReturn({}).then(_res => {
        this.saleReturnList = _res.result
        this.pendingLevel1List = this.saleReturnList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.saleReturnList.filter(item => item.state === '待二级审批')
        this.successList = this.saleReturnList.filter(item => item.state === '审批完成')
        this.failureList = this.saleReturnList.filter(item => item.state === '审批失败')
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


    submit() {
      this.dialogVisible = false
      this.getSaleReturn()
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