<template>
  <div class="card">
    <el-card v-for="(value, key ,index) in list" :index="value.index" :key="value.id" shadow="hover">
      <Sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
          :content-field-name="'content'"
          :approval="approval"
          :deny="deny"
      ></Sheet>
    </el-card>
  </div>
</template>

<script>
import {paymentSheetApproval} from "@/network/finance";
import Sheet from "@/views/common/Sheet";

export default {
  name: "PaymentList",
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      role: ["GM", "ADMIN"],
      description: [
        {
          id: "付款单编号",
          customer: "客户id",
          operator: "操作员",
          totalAmount: "付款总金额",
          state: "单据状态",
          createTime: "创建时间"
        }, {
          id: "自增id",
          companyAccountId: "公司账户id",
          transferAmount: "转账金额",
          paymentSheetId: "关联的付款单id",
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
          paymentSheetId: id,
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
    deny(id) {
      let config = {
        params: {
          paymentSheetId: id,
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
  margin: 0 auto;

  .button {
    float: right;
    padding: 3px 0
  }
}

.el-card {
  margin-bottom: 20px;
}
</style>