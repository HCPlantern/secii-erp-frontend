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
        v-on:submit="formSubmit"
        :before-close="handleClose">
      <PaymentForm>
      </PaymentForm>
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
import PaymentForm from "@/views/finance/components/PaymentForm";

export default {
  name: "PaymentView",
  components: {PaymentForm, PaymentList, Title, Layout},
  data() {
    return {
      activeName: 'PENDING',
      // 所有的收款单
      paymentList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
    }
  },
  async mounted() {
    this.getPayment()

  },
  methods: {
    getPayment() {
      getAllPaymentSheet({}).then(_res => {
        this.paymentList = _res.result
        this.pendingList = this.paymentList.filter(item => item.state === '待审批')
        this.successList = this.paymentList.filter(item => item.state === '审批完成')
        this.failureList = this.paymentList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭?").then(_ => {
        this.dialogVisible = false
        done();
      }).catch(_ => {
      });
    },
    formSubmit() {
      this.dialogVisible = false;
      this.getPayment()
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