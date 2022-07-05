<template>
  <div>
    <el-form ref="saleForm" :model="saleForm" :rules="rules" label-width="100px">
      <el-form-item label="销售商: " prop="supplier">
        <el-select v-model="saleForm.supplier" placeholder="请选择销售商">
          <el-option
              v-for="item in sellers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="折扣: " prop="discount">
        <el-input v-model="saleForm.discount" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="代金券总额: " prop="voucherAmount">
        <el-input v-model="saleForm.voucherAmount" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item
          v-for="(item, index) in saleForm.saleSheetContent"
          :key="index"
          :label="'商品' + index">
        <div>
          <el-select v-model="item.pid" placeholder="请选择商品id" style="width: 50%; margin-right: 5%">
            <el-option
                v-for="item1 in commodityList"
                :key="item1.id"
                :label="item1.id"
                :value="item1.id">
            </el-option>
          </el-select>
          <el-input v-model="item.quantity" placeholder="请输入商品数量"
                    style="width: 50%; margin: 1rem 1rem 0 0"></el-input>
          <el-input v-model="item.unitPrice" placeholder="请输入商品单价"
                    style="width: 50%; margin: 1rem 1rem 0.5rem 0"></el-input>
        </div>
        <div style="margin-top: 10px">
          <el-input v-model="item.remark" placeholder="请填写备注" style="width: 80%; margin-right: 10%"></el-input>
          <el-button v-if="index === saleForm.saleSheetContent.length - 1" size="small" type="text" @click="addProduct">
            添加
          </el-button>
          <el-button v-if="index !== 0" size="small" type="text" @click.prevent="removeProduct(item)">删除</el-button>
        </div>
      </el-form-item>
      <el-form-item label="备注: ">
        <el-input v-model="saleForm.remark" style="width: 80%" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="submitForm('saleForm')">创建</el-button>
      <el-button v-if="redFlushForm" size="small" type="primary" @click="resetForm">重置</el-button>
    </span>
  </div>
</template>
<script>
import {getAllCommodity} from "@/network/commodity";
import {getAllCustomer} from "@/network/purchase";
import {createSale} from "@/network/sale";

export default {
  name: "SaleForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  mounted() {
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({id: item.id}))
    })
    getAllCustomer({params: {type: 'SELLER'}}).then(_res => {
      this.sellers = _res.result
    })
    this.resetForm()
  },
  data() {
    return {
      saleForm: {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      sellers: [],
      commodityList: [],
      rules: {
        supplier: [
          {required: true, message: '请选择一个销售商', trigger: 'change'}
        ],
        discount: [
          {required: true, message: '请输入折扣', trigger: 'change'}
        ],
        voucherAmount: [
          {required: true, message: '请输入代金券总额', trigger: 'change'}
        ]
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleForm.id = null
          this.saleForm.operator = sessionStorage.getItem("name")
          this.saleForm.salesman = sessionStorage.getItem("name")
          this.saleForm.state = null
          this.saleForm.rawTotalAmount = null
          this.saleForm.finalAmount = null
          this.saleForm.discount = Number(this.saleForm.discount)
          this.saleForm.voucherAmount = Number(this.saleForm.voucherAmount)
          this.saleForm.saleSheetContent.forEach((item) => {
            item.id = null
            item.saleSheetId = null
            item.quantity = parseInt(item.quantity)
            item.unitPrice = parseInt(item.unitPrice)
            item.totalPrice = item.quantity * item.unitPrice
          })
          createSale(this.saleForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.$parent.$emit('submit')
              this.resetForm()
              this.getSale()
            }
          })
        }
      })
    },
    resetForm() {
      if (this.redFlushForm) {
        this.saleForm = JSON.parse(JSON.stringify(this.redFlushForm))
        this.saleForm.saleSheetContent.forEach((item, index) => {
          item.quantity = -item.quantity
        })
      }
    },
    addProduct() {
      this.saleForm.saleSheetContent.push({});
    },
    removeProduct(item) {
      const index = this.saleForm.saleSheetContent.indexOf(item);
      if (index !== -1) {
        this.saleForm.saleSheetContent.splice(index, 1)
      }
    },
  }
}
</script>

<style scoped>

</style>