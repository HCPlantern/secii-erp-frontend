<template>

  <div class="card">
    <el-card v-for="(value, index) in list" :index="value.index" :key="value.id" shadow="hover">
      <Sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
          :content-field-name="'purchaseSheetContent'"
          :approval="approval"
          :deny="deny"
      >
      </Sheet>
    </el-card>
  </div>
</template>

<script>
import {firstApproval, secondApproval} from '@/network/purchase'
import Sheet from "@/views/common/Sheet";
import PurchaseForm from "@/views/purchase/components/PurchaseForm";
import {ROLE} from "@/common/const";

export default {
  name: 'PurchaseList',
  components: {PurchaseForm, Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      role: [ROLE.GM, ROLE.ADMIN],
      description: [
        {
          id: "进货单编号",
          supplier: "供应商ID",
          operator: "操作员",
          remark: "备注",
          totalAmount: "收款总金额",
          state: "单据状态",
        }, {
          id: "自增id",
          purchaseSheetId: "进货单ID",
          pid: "商品ID",
          quantity: "数量",
          unitPrice: "单价",
          totalPrice: "总额",
          remark: "备注"
        }
      ],
    }
  },
  mounted() {
  },
  methods: {
    approval(id) {
      let config = {
        params: {
          purchaseSheetId: id,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(() => {
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
          purchaseSheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(() => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(() => {
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
