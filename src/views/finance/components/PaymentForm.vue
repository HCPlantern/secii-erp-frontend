<template>
  <div>
    <!--      还要添加一个rules可能-->
    <el-form :model="paymentSheet" label-width="100px" ref="paymentSheet">
      <el-form-item label="客户: " prop="customer">
        <el-select v-model="paymentSheet.customer" placeholder="请选择付款客户">
          <el-option
              v-for="item in customers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
          v-for="(item,index) in paymentSheet.content"
          :key="index"
          :label="'转账列表' + ' '+index"
      >
        <div>
          <el-select v-model="item.companyAccountId" placeholder="请选择公司账户id" style="width: 40%; margin-right: 5%">
            <el-option v-for="item1 in companyAccountList"
                       :key="item1.id"
                       :label="item1.name"
                       :value="item1.id">
            </el-option>
          </el-select>
          <div>
            <el-input v-model="item.transferAmount" style="width: 40%; margin: 1rem 0 0 0;"
                      placeholder="请输入转账金额"></el-input>
          </div>
        </div>
        <div style="margin-top: 10px">
          <el-input v-model="item.remark" style="width: 60%;" placeholder="请填写备注"></el-input>
          <el-button type="text" size="small" style="margin: 1rem"
                     @click="addTransferList"
                     v-if="index === paymentSheet.content.length - 1">
            添加
          </el-button>
          <el-button type="text" size="small" @click.prevent="removeTransferList(item)" v-if="index !== 0">删除
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitForm('paymentSheet')">创建</el-button>
      <el-button type="primary" size="small" @click="resetForm">重置</el-button>
    </span>
  </div>
</template>

<script>
import {createPaymentSheet} from "@/network/finance";
import {getAllCustomer} from "@/network/sale";
import {getAllCompanyAccount} from "@/network/companyaccount";

export default {
  name: "PaymentForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null
    }
  },
  async mounted() {
    await getAllCustomer({}).then(_res => {
      this.customers = _res.result
    })
    await getAllCompanyAccount({}).then(_res => {
      this.companyAccountList = _res.result
    })
    this.resetForm()
  },
  data() {
    return {
      paymentSheet: {},
      customers: [],
      companyAccountList: []
    }
  },
  methods: {
    submitForm(formName) {
      this.paymentSheet.id = null
      this.paymentSheet.customer = parseInt(this.paymentSheet.customer)
      this.paymentSheet.operator = sessionStorage.getItem("name")
      this.paymentSheet.totalAmount = null
      this.paymentSheet.state = null
      this.paymentSheet.content.forEach((item) => {
        item.id = null
        item.paymentSheetId = null
        item.companyAccountId = parseInt(item.companyAccountId)
        item.transferAmount = parseInt(item.transferAmount)
      })
      createPaymentSheet(this.paymentSheet).then(_res => {
        if (_res.msg === 'Success') {
          this.$message.success('创建成功!')
          this.resetForm()
          this.$parent.$emit('submit')
        }
      })
    },
    resetForm() {
      if (this.redFlushForm) {
        this.paymentSheet = JSON.parse(JSON.stringify(this.redFlushForm))
        this.paymentSheet.content.forEach((item, index) => {
          item.transferAmount = -item.transferAmount
        })
      } else {
        this.paymentSheet = {
          content: [
            {
              id: '',
              companyAccountId: '',
              transferAmount: '',
              paymentSheetId: '',
              remark: ''
            }
          ]
        }
      }


    },
    addTransferList() {
      this.paymentSheet.content.push({});
    },
    removeTransferList(item) {
      let index = this.paymentSheet.content.indexOf(item)
      if (index !== -1) {
        this.paymentSheet.content.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>

</style>