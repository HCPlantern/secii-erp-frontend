<template>
  <div>
    <el-form :model="saleReturnForm" label-width="100px" ref="saleReturnForm" :rules="rules">
      <el-form-item
          v-if="!redFlushForm"
          label="销售单id: " prop="saleSheetId">
        <el-select v-model="saleReturnForm.saleSheetId"
                   placeholder="请选择关联的销售单id"
                   @change="selectSale(completedSale.filter(item => item.id === saleReturnForm.saleSheetId))">
          <el-option
              v-for="(item, index) in completedSale"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            <el-popover
                placement="right"
                width="500"
                trigger="hover">
              <el-table :data="completedSale[index].saleSheetContent">
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
      <el-form-item label="销售单清单: " v-if="this.saleReturnForm.saleReturnsSheetContent.length === 0">
        暂无数据!
      </el-form-item>
      <el-form-item label="销售单清单: " v-else>
        <div
            v-for="(item, index) in saleReturnForm.saleReturnsSheetContent"
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
        <el-input type="textarea" v-model="saleReturnForm.remark" style="width: 60%"></el-input>
      </el-form-item>
    </el-form>
    <span slot=" footer
      " class="dialog-footer">
      <el-button type="primary" size="small" @click="submitForm('saleReturnForm')">创建</el-button>
      <el-button type="primary" size="small" v-if="redFlushForm" @click="resetForm">重置</el-button>
      </span>
  </div>
</template>

<script>
import {createSaleReturn, getAllSale} from "@/network/sale";

export default {
  name: "SaleReturnForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  async mounted() {
    this.resetForm()
    if (!this.redFlushForm) {
      // 得到所有审批完成的销售单
      await getAllSale({params: {state: 'SUCCESS'}}).then(_res => {
        this.completedSale = _res.result
      })
      console.log(this.completedSale)
    }
  },
  data() {
    return {
      saleReturnForm: {
        saleReturnsSheetContent: []
      },
      completedSale: [],
      rules: {
        saleSheetId: [
          {required: true, message: '请选择关联的销售单', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleReturnForm.id = null
          this.saleReturnForm.supplier = null
          this.saleReturnForm.salesman = sessionStorage.getItem("name")
          this.saleReturnForm.operator = sessionStorage.getItem("name")
          this.saleReturnForm.rawTotalAmount = null
          this.saleReturnForm.state = null
          this.saleReturnForm.finalAmount = null
          this.saleReturnForm.voucherAmount = null
          this.saleReturnForm.createTime = null
          this.saleReturnForm.saleReturnsSheetContent.forEach(item => {
            item.unitPrice = Number(item.unitPrice)
            item.quantity = Number(item.quantity)
            item.totalPrice = item.unitPrice * item.quantity
          })
          createSaleReturn(this.saleReturnForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.getSaleReturn()
            }
          })
        }
      })
    },
    // 销售退货的内容
    selectSale(content) {
      this.saleReturnForm.saleReturnsSheetContent = content[0].saleSheetContent
    },
    resetForm() {
      if (this.redFlushForm) {
        this.saleReturnForm = JSON.parse(JSON.stringify(this.redFlushForm))
        this.saleReturnForm.saleReturnsSheetContent.forEach((item, index) => {
          item.quantity = -item.quantity
        })
      }
    },
  }
}
</script>

<style scoped>

</style>