<template>
  <!--这个用于制定收款单-->
  <Layout>
    <Title title="收款单管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible=true">制定收款单</el-button>
    <!--  主页面-->
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <collection-list :list="pendingList" :type="2" @refresh="getCollection()"/>
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <collection-list :list="successList" :type="3" @refresh="getCollection()"/>
          </div>
        </el-tab-pane>

        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length===0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <collection-list :list="failureList" :type="4" @refresh="getCollection()"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--  创建收款单时的dialog-->
    <el-dialog
        title="创建收款单"
        :visible.sync="dialogVisible"
        v-on:submit="formSubmit"
        :before-close="handleClose">
      <CollectionForm
          style="margin: 0 0 1rem 0">
      </CollectionForm>
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
import CollectionForm from "@/views/finance/components/CollectionForm";

export default {
  name: "CollectionView",
  components: {CollectionForm, CollectionList, Title, Layout},
  data() {
    return {
      activeName: 'PENDING',
      // 所有的收款单
      collectionList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      dialogVisible: false,

    }
  },
  async mounted() {
    this.getCollection()
  },
  methods: {
    getCollection() {
      getAllCollectionSheet({}).then(_res => {
        this.collectionList = _res.result
        this.pendingList = this.collectionList.filter(item => item.state === '待审批')
        this.successList = this.collectionList.filter(item => item.state === '审批完成')
        this.failureList = this.collectionList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm("确认关闭?").then(_ => {
        done();
      }).catch(_ => {
      });
    },
    formSubmit() {
      this.dialogVisible = false
      this.getCollection()
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