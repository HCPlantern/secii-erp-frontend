<template>
  <div>
    <!--      还要添加一个rules可能-->
    <el-form :model="collectionSheet" label-width="100px" ref="saleForm">
      <el-form-item label="客户: " prop="customer">
        <el-select v-model="collectionSheet.customer" placeholder="请选择收款客户">
          <el-option
              v-for="item in customers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
          v-for="(item,index) in collectionSheet.content"
          :key="index"
          :label="'转账列表' + ' '+index"
      >
        <div>
          <el-select v-model="item.companyAccountId" placeholder="请选择公司账户id"
                     style="width: 30%; margin: 0.5rem 1rem 0.5rem 0;">
            <el-option v-for="item1 in companyAccountList"
                       :key="item1.id"
                       :label="item1.name"
                       :value="item1.id">
            </el-option>
          </el-select>
          <el-input v-model="item.transferAmount" style="width: 30%;"
                    placeholder="请输入转账金额"></el-input>
        </div>
        <div style="margin-top: 10px">
          <el-input v-model="item.remark" style="width: 62%; margin: 0.5rem 1rem 0.5rem 0;"
                    placeholder="请填写备注"></el-input>
          <el-button type="text" size="small" @click="addTransferList"
                     v-if="index === collectionSheet.content.length - 1">添加
          </el-button>
          <el-button type="text" size="small" @click.prevent="removeTransferList(item)" v-if="index !== 0">删除
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="submitForm('collectionSheet')">创建</el-button>
      <el-button type="primary" size="small" @click="resetForm">重置</el-button>
    </span>
  </div>
</template>

<script>
import {getAllCustomer} from "@/network/sale";
import {getAllCompanyAccount} from "@/network/companyaccount";
import {createCollectionSheet} from "@/network/finance";

export default {
  name: "CollectionForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  async mounted() {
    await getAllCustomer({}).then(_res => {
      this.customers = _res.result;
    })
    await getAllCompanyAccount({}).then(_res => {
      this.companyAccountList = _res.result
    })
    this.resetForm()
  },
  data() {
    return {
      customers: [],
      companyAccountList: [],
      collectionSheet: {},
    }
  },
  methods: {
    resetForm() {
      if (this.redFlushForm) {
        this.collectionSheet = JSON.parse(JSON.stringify(this.redFlushForm))
        this.collectionSheet.content.forEach((item, index) => {
          item.transferAmount = -item.transferAmount
        })
      } else {
        this.collectionSheet = {
          content: [
            {
              id: '',
              companyAccountId: '',
              transferAmount: '',
              collectionSheetId: '',
              remark: ''
            }
          ]
        }
      }
    },
    addTransferList() {
      this.collectionSheet.content.push({});
    },
    removeTransferList(item) {
      let index = this.collectionSheet.content.indexOf(item)
      if (index !== -1) {
        this.collectionSheet.content.splice(index, 1)
      }
    },
    submitForm(formName) {
      this.collectionSheet.id = null
      this.collectionSheet.customer = parseInt(this.collectionSheet.customer)
      this.collectionSheet.operator = sessionStorage.getItem("name")
      this.collectionSheet.totalAmount = null
      this.collectionSheet.state = null
      this.collectionSheet.content.forEach((item) => {
        item.id = null
        item.collectionSheetId = null
        item.companyAccountId = parseInt(item.companyAccountId)
        item.transferAmount = parseInt(item.transferAmount)
      })
      createCollectionSheet(this.collectionSheet).then(_res => {
        if (_res.msg === 'Success') {
          this.$message.success('创建成功!')
          this.resetForm()
          this.$parent.$emit('submit')
        }
      })
    },
  }
}
</script>

<style scoped>

</style>