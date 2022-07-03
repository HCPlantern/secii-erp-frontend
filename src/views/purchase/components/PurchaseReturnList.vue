<template>

  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">

      <div class="card-header">

        <span>ID: {{ item.id }}</span>
        <el-button v-if="(type === 1 || type === 2) && authorization" style="margin-left: 10px"
                   type="success" icon="el-icon-check" size="small" @click="approval(item.id)">
          <span>通过</span>
        </el-button>
        <el-button v-if="(type === 1 || type === 2) && authorization"
                   type="danger" icon="el-icon-close" size="small" @click="deny(item.id)">
          <span>不通过</span>
        </el-button>
        <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type='danger'>审核未通过</el-tag>
            </span>

        <el-button class="button" size="small"
                   @click="changeState(index)">
          <span v-if="!showAll[index]">
                展开</span>
          <span v-else>收起</span>
        </el-button>
      </div>
      <el-divider></el-divider>
      <div>
        <el-descriptions>
          <el-descriptions-item label="进货退货单编号">{{ item.id }}</el-descriptions-item>
          <el-descriptions-item label="关联进货单编号">{{ item.purchaseSheetId }}</el-descriptions-item>
          <el-descriptions-item label="操作员">{{ item.operator }}</el-descriptions-item>
          <el-descriptions-item label="备注">{{ item.remark }}</el-descriptions-item>
          <el-descriptions-item label="总额">{{ item.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="单据状态">{{ item.state }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ item.createTime }}</el-descriptions-item>
        </el-descriptions>

        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px">详细商品清单:</div>
          <el-table
              :data="item.purchaseReturnsSheetContent"
              border
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column
                prop="pid"
                label="商品id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="quantity"
                label="数量"
            >
            </el-table-column>
            <el-table-column
                prop="unitPrice"
                label="单价(元)"
            >
            </el-table-column>
            <el-table-column
                prop="totalPrice"
                label="金额(元)"
            >
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {returnFirstApproval, returnSecondApproval} from "@/network/purchase";
export default {
  name: 'purchaseReturnList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
  },
  methods: {
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
    },
    authorization() {
      const role = sessionStorage.getItem('role');
      if (role === 'GM' || role === 'SALE_MANAGER' || role === 'ADMIN') {
        return true;
      }
    },
    approval(id) {
      let config = {
        params: {
          purchaseReturnsSheetId: id,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        returnFirstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        returnSecondApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    },
    deny(id) {
      let config = {
        params: {
          purchaseReturnsSheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        returnFirstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        returnSecondApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;

  .button {
    float: right;
  }

}

.el-card {
  margin-bottom: 20px;
  //background: #EEF7F2;
}
</style>
