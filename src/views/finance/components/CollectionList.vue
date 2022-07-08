<template>
  <!--  这个对应收款单VO-->
  <div class="card">
    <el-card v-for="(value, key, index) in list" :key="value.id" shadow="hover">
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
import {collectionSheetApproval} from '@/network/finance'
import Sheet from "@/views/common/Sheet";
import {ROLE} from "@/common/const";

export default {
  name: "CollectionList",
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      role: [ROLE.GM, ROLE.ADMIN],
      description: [
        {
          id: "收款单编号",
          customer: "客户id",
          operator: "操作员",
          totalAmount: "收款总金额",
          state: "单据状态",
          createTime: "创建时间"
        }, {
          id: "自增id",
          companyAccountId: "公司账户id",
          transferAmount: "转账金额",
          collectionSheetId: "关联的收款单id",
          remark: "备注"
        }
      ],
    }
  },
  mounted() {
  },
  methods: {
    // 审批收款单
    approval(id) {
      let config = {
        params: {
          collectionSheetId: id,
          state: 'SUCCESS'
        }
      }
      collectionSheetApproval(config).then(res => {
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
          collectionSheetId: id,
          state: 'FAILURE'
        }
      }
      collectionSheetApproval(config).then(res => {
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
  }
}

.el-card {
  margin-bottom: 20px;
}
</style>