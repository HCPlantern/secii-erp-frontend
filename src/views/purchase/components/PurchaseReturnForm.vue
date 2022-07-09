<template>

  <div>
    <el-form
        :model="purchaseReturnForm"
        label-width="100px"
        ref="purchaseReturnForm"
        :rules="rules"
    >
      <el-form-item
          v-if="!redFlushForm"
          label="进货单id: "
          prop="purchaseSheetId">
        <el-select v-model="purchaseReturnForm.purchaseSheetId"
                   placeholder="请选择关联的进货单id"
                   @change="selectPurchase(completedPurchase.filter(item => item.id === purchaseReturnForm.purchaseSheetId))">
          <el-option
              v-for="(item, index) in completedPurchase"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            <el-popover
                placement="right"
                width="500"
                trigger="hover">
              <el-table :data="completedPurchase[index].purchaseSheetContent">
                <el-table-column width="100" property="id" label="id"></el-table-column>
                <el-table-column width="200" property="pid" label="pid"></el-table-column>
                <el-table-column width="100" property="unitPrice" label="单价"></el-table-column>
                <el-table-column width="100" property="quantity" label="数量"></el-table-column>
                <el-table-column width="100" property="totalPrice" label="总价"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
              </el-table>
              <span slot="reference">{{ item.id }}</span>
            </el-popover>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="进货退货清单: " v-if="this.purchaseReturnForm.purchaseReturnsSheetContent.length === 0">
        暂无数据!
      </el-form-item>
      <el-form-item label="进货退货清单: " v-else>
        <div
            v-for="(item, index) in purchaseReturnForm.purchaseReturnsSheetContent"
            :key="index" style="margin: 0.6rem 1rem 1rem 1rem">
          <el-descriptions>
            <el-descriptions-item label="商品ID">
              {{ item.pid }}
            </el-descriptions-item>
          </el-descriptions>
          <span> 数量：</span>
          <el-input v-model="item.quantity" size="mini" style="width: 20%"></el-input>
          <span> 单价：</span>
          <el-input v-model="item.unitPrice" size="mini" style="width: 20%"></el-input>
        </div>

      </el-form-item>
      <el-form-item label="备注: ">
        <el-input type="textarea" v-model="purchaseReturnForm.remark" style="width: 60%"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitForm('purchaseReturnForm')">创建</el-button>
      <el-button type="primary" size="small" v-if="redFlushForm" @click="resetForm">重置</el-button>
      </span>
  </div>
</template>

<script>
import {createPurchaseReturn, getAllPurchase} from "@/network/purchase";

export default {
  name: "PurchaseReturnForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  async mounted() {
    this.resetForm()
    if (!this.redFlushForm) {
      await getAllPurchase({params: {state: 'SUCCESS'}}).then(_res => {
        this.completedPurchase = _res.result
      })
    }
  },
  data() {
    return {
      purchaseReturnForm: {
        purchaseSheetId: null,
        purchaseReturnsSheetContent: [],
        remark: null,
      },
      completedPurchase: [],
      rules: {
        purchaseSheetId: [
          {required: true, message: '请选择关联的进货单', trigger: 'change'},
        ],
      }
    }
  },
  methods: {
    resetForm() {
      if (this.redFlushForm) {
        this.purchaseReturnForm = JSON.parse(JSON.stringify(this.redFlushForm))
        this.purchaseReturnForm.purchaseReturnsSheetContent.forEach((item, index) => {
          item.quantity = -item.quantity
        })
      }
    },
    selectPurchase(content) {
      this.purchaseReturnForm.purchaseReturnsSheetContent = content[0].purchaseSheetContent
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.purchaseReturnForm.id = null
          this.purchaseReturnForm.operator = sessionStorage.getItem("name")
          this.purchaseReturnForm.totalAmount = null
          this.purchaseReturnForm.state = null
          this.purchaseReturnForm.createTime = null
          this.purchaseReturnForm.purchaseReturnsSheetContent.forEach(item => {
            item.unitPrice = Number(item.unitPrice)
            item.quantity = Number(item.quantity)
            item.totalPrice = item.unitPrice * item.quantity
          })
          createPurchaseReturn(this.purchaseReturnForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.$parent.$emit('submit')
              this.resetForm()
              this.getPurchaseReturn()
            } else {
              this.$message.error(_res.msg)
            }
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>