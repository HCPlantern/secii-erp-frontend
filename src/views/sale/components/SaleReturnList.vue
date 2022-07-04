<template>

  <div class="card">
    <el-card v-for="(value, index) in list" :index="value.index" :key="value.id" shadow="hover">
      <Sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
          :content-field-name="'saleReturnSheetContent'"
          :approval="approval"
          :deny="deny"
      ></Sheet>

    </el-card>
  </div>
</template>

<script>
import {returnFirstApproval, returnSecondApproval} from '@/network/sale'
import Sheet from "@/views/common/Sheet";

export default {
  name: 'SaleReturnList',
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
      role: ['GM', 'SALE_MANAGER', 'ADMIN'],
      description: [
        {
          id: "单据编号",
          saleSheetId: "关联的销售单ID",
          supplier: "供应商ID",
          salesman: "业务员",
          operator: "操作员",
          remark: "备注",
          rawTotalAmount: "折让前总额",
          state: "单据状态",
          finalAmount: "折让后总额",
          discount: "折扣",
          voucherAmount: "使用代金券总额",
          createTime: "创建时间"
        }, {
          id: "自增ID",
          saleReturnSheetId: "销售退货单ID",
          pid: "商品ID",
          quantity: "数量",
          unitPrice: "单价",
          totalPrice: "总额",
          remark: "备注"
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    approval(id) {
      let config = {
        params: {
          saleReturnsSheetId: id,
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
          saleSheetId: id,
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
