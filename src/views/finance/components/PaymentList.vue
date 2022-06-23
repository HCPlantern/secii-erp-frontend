<template>
  <div class="card">
    <el-card v-for="(item,index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <!--          这个部分使用authorization判断角色，决定是否显示勾叉图标-->
          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>
            <el-button v-if="authorization() === 1" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 1"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>
            <!--            <el-button v-if="authorization() === 2" style="margin-left: 10px"-->
            <!--                       type="primary" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>-->
            <!--            <el-button v-if="authorization() === 2"-->
            <!--                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>-->
            <!--            是否审核通过-->
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 3" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>

          <!--          这一部分使用showAll函数实现展开和收起功能-->
          <el-col :span="6">
            <el-button class="button" type="text"
                       v-if="!showAll[index]"
                       @click="changeState(index)">
              展开
            </el-button>
            <el-button class="button" type="text"
                       v-if="showAll[index]"
                       @click="changeState(index)">
              收起</el-button>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="8">
            <span><strong>关联的客户id: </strong>{{item.customer}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>付款总金额(元): </strong>{{item.totalAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <div v-if="showAll[index]" style="margin-top: 15px">
        <div style="margin-bottom: 20px"><strong>详细付款条目:</strong></div>
        <el-table
            :data="item.paymentSheetContentVOS"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <!--            <el-table-column-->
          <!--              prop="id"-->
          <!--              lable="编号"-->
          <!--              width="260"-->
          <!--            >-->
          <!--            </el-table-column>-->
          <el-table-column
              prop="id"
              label="id"
              width="260">
          </el-table-column>
          <el-table-column
              prop="companyAccountId"
              label="关联的账户"
              width="260">
          </el-table-column>
          <el-table-column
              prop="transferAmount"
              label="转账金额(元)"
              width="260">
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              width="260">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import {paymentSheetApproval} from "@/network/finance";

export default {
  name: "PaymentList",
  props:{
    list: Array,
    type: Number
  },
  data(){
    return{
      showAll:[],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
  },
  methods:{
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
    },
    // 验证一下
    authorization() {
      if (this.type === 1 && sessionStorage.getItem('role') === 'GM') {
        return 1
      }
    },
    approval(id){
      let config={
        params:{
          paymentSheetId :id,
          state: 'SUCCESS'
        }
      }
      paymentSheetApproval(config).then(res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    deny(id){
      let config={
        params:{
          paymentSheetId :id,
          state: 'FAILURE'
        }
      }
      paymentSheetApproval(config).then(res => {
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>