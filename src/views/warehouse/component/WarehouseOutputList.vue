<template>
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
import {warehouseOutputSheetApprove} from "@/network/warehouse";
import Sheet from "@/views/common/Sheet";
import {ROLE} from "@/common/const";

export default {
  name: "WarehouseOutputList",
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
          id: "出库单编号",
          operator: "操作员",
          createTime: "创建时间",
          saleSheetId: "关联的进货单",
          state: "单据状态",
        }, {
          id: "入库商品列表id",
          batchId: "批次",
          warehouseOutputSheetId: "关联的入库单编号",
          pid: "商品id",
          quantity: "商品数量",
          salePrice: "单价",
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
          collectionSheetId: id,
          state: 'SUCCESS'
        }
      }
      warehouseOutputSheetApprove(config).then(res => {
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
      warehouseOutputSheetApprove(config).then(res => {
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
