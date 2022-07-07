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
import {warehouseInputSheetApprove} from "@/network/warehouse";
import Sheet from "@/views/common/Sheet";
import {ROLE} from "@/common/const";

export default {
  name: "WarehouseInputList",
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      role: [ROLE.GM, ROLE.ADMIN, ROLE.INVENTORY_MANAGER],
      description: [
        {
          id: "入库单编号",
          batchId: "批次",
          operator: "操作员",
          createTime: "创建时间",
          purchaseSheetId: "关联的进货单",
          state: "单据状态",
        }, {
          id: "入库商品列表id",
          warehouseInputSheetId: "关联的入库单编号",
          pid: "商品id",
          quantity: "商品数量",
          purchasePrice: "单价",
          productionDate: "出厂日期",
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
      warehouseInputSheetApprove(config).then(res => {
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
      warehouseInputSheetApprove(config).then(res => {
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
