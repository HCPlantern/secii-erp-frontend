<template>
  <div>
    <el-form
        :model="purchaseForm"
        label-width="100px"
        ref="purchaseForm"
        :rules="rules"
    >
      <el-form-item label="供应商: " prop="supplier">
        <el-select
            v-model="purchaseForm.supplier"
            placeholder="请选择供应商"
            filterable
            clearable
        >
          <el-option
              v-for="item in suppliers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
          v-for="(item, index) in purchaseForm.purchaseSheetContent"
          :key="index"
          :label="'商品' + index">
        <el-select class="commodityFormItem" v-model="item.pid" placeholder="请选择商品id">
          <el-option
              v-for="item1 in commodityList"
              :key="item1.id"
              :label="item1.id"
              :value="item1.id">
          </el-option>
        </el-select>
        <div>
          <el-input class="commodityFormItem" v-model="item.quantity" placeholder="请输入商品数量"></el-input>
        </div>
        <div>
          <el-input class="commodityFormItem" v-model="item.unitPrice" placeholder="请输入商品单价"></el-input>
        </div>
        <div>
          <el-input class="commodityFormItem" v-model="item.remark" placeholder="请填写备注"></el-input>
        </div>
        <el-button type="text" size="small" @click="addProduct"
                   v-if="index === purchaseForm.purchaseSheetContent.length - 1">添加
        </el-button>
        <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
      </el-form-item>

      <el-form-item class="commodityFormRemark" label="备注: ">
        <el-input type="textarea" v-model="purchaseForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitForm('purchaseForm')">创建</el-button>
      <el-button type="primary" size="small" v-if="redFlushForm" @click="resetForm">重置</el-button>
      </span>
  </div>

</template>

<script>
import {createPurchase, getAllCustomer} from "@/network/purchase";
import {getAllCommodity} from "@/network/commodity";

export default {
  name: "PurchaseForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      suppliers: [],
      commodityList: [],
      purchaseForm: {
        supplier: "",
        purchaseSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      rules: {
        supplier: [
          {required: true, message: '请选择一个供应商', trigger: 'change'}
        ],
      },
    }
  },
  async mounted() {
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({id: item.id}))
    })
    getAllCustomer({params: {type: 'SUPPLIER'}}).then(_res => {
      this.suppliers = _res.result
    })
    this.resetForm()
  },
  methods: {
    resetForm() {
      if (this.redFlushForm) {
        this.purchaseForm = JSON.parse(JSON.stringify(this.redFlushForm))
        this.purchaseForm.purchaseSheetContent.forEach((item, index) => {
          item.quantity = -item.quantity
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.purchaseForm.id = null
          this.purchaseForm.operator = sessionStorage.getItem("name")
          this.purchaseForm.totalAmount = null
          this.purchaseForm.state = null
          this.purchaseForm.purchaseSheetContent.forEach((item) => {
            item.id = null
            item.purchaseSheetId = null
            item.quantity = parseInt(item.quantity)
            item.unitPrice = parseInt(item.unitPrice)
            item.totalPrice = item.quantity * item.unitPrice
          })
          createPurchase(this.purchaseForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.$parent.$emit('submit')
              this.resetForm()
              this.getPurchase()
            }
          })
        } else {
          this.$message.error('请检查表单');
        }
      });
    },
    addProduct() {
      this.purchaseForm.purchaseSheetContent.push({})
    },
    removeProduct(item) {
      const index = this.purchaseForm.purchaseSheetContent.indexOf(item);
      if (index !== -1) {
        this.purchaseForm.purchaseSheetContent.splice(index, 1)
      }
    },
  },
}
</script>

<style scoped>
.commodityFormRemark {
  width: 60%;
}

.commodityFormItem {
  margin: 0.5rem 1rem 0.5rem 0;
  width: 40%;
}
</style>