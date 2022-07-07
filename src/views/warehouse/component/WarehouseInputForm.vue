<template>

  <div>
    <el-form :model="warehouseInputForm" label-width="100px" ref="warehouseInputForm" :rules="rules">
      <el-form-item
          v-if="!redFlushForm"
          label="进货单id: " prop="purchaseSheetId">
        <el-select v-model="warehouseInputForm.purchaseSheetId"
                   placeholder="请选择关联的进货单id"
                   @change="selectPurchase(purchaseSheets.filter(item => item.id === warehouseInputForm.purchaseSheetId))">
          <el-option
              v-for="(item, index) in purchaseSheets"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            <el-popover
                placement="right"
                width="500"
                trigger="hover">
              <el-table :data="purchaseSheets[index].purchaseSheetContent">
                <el-table-column width="100" property="id" label="id"></el-table-column>
                <el-table-column width="200" property="purchaseSheetId" label="purchaseSheetId"></el-table-column>
                <el-table-column width="100" property="pid" label="pid"></el-table-column>
                <el-table-column width="100" property="quantity" label="数量"></el-table-column>
                <el-table-column width="100" property="unitPrice" label="单价"></el-table-column>
                <el-table-column width="100" property="totalPrice" label="总价"></el-table-column>
                <el-table-column property="remark" label="备注"></el-table-column>
              </el-table>
              <span slot="reference">{{ item.id }}</span>
            </el-popover>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="入库单清单: " v-if="this.warehouseInputForm.list.length === 0">
        暂无数据!
      </el-form-item>
      <el-form-item label="入库单清单: " v-else>
        <div
            v-for="(item, index) in warehouseInputForm.list"
            :key="index" style="margin: 0.6rem 1rem 1rem 1rem">
          <el-descriptions>
            <el-descriptions-item label="商品ID">
              {{ item.pid }}
            </el-descriptions-item>
          </el-descriptions>
          <span> 数量：</span>
          <el-input v-model="item.quantity" size="mini" style="width: 40%"></el-input>
          <span> 单价：</span>
          <el-input v-model="item.purchasePrice" size="mini" style="width: 40%"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="备注: ">
        <el-input type="textarea" v-model="warehouseInputForm.remark" style="width: 60%"></el-input>
      </el-form-item>
    </el-form>
    <span slot=" footer
      " class="dialog-footer">
      <el-button type="primary" size="small" @click="submitForm('warehouseInputForm')">创建</el-button>
      <el-button type="primary" size="small" @click="resetForm">重置</el-button>
      </span>
  </div>
</template>

<script>
import {getAllPurchase} from "@/network/purchase";
import {warehouseInput} from "@/network/warehouse";

export default {
  name: "WarehouseInputForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  async mounted() {
    this.resetForm();
    await getAllPurchase({params: {state: 'SUCCESS'}}).then(res => {
      this.purchaseSheets = res.result
    });

  },
  data() {
    return {
      purchaseSheets: {},
      warehouseInputForm: {
        list: [],
      },
      rules: {
        purchaseSheetId: [
          {required: true, message: '请选择关联的进货单id', trigger: 'change'},
        ],
        list: [
          {required: true, message: '请添加入库单清单', trigger: 'change'},
        ],
      },
    }
  },
  methods: {

    selectPurchase(content) {
      this.warehouseInputForm.list = content[0].purchaseSheetContent;
    },
    resetForm() {
      if (this.redFlushForm) {
        this.warehouseInputForm.operator = this.redFlushForm.operator;
        this.warehouseInputForm.purchaseSheetId = this.redFlushForm.purchaseSheetId;
        this.warehouseInputForm.list = JSON.parse(JSON.stringify(this.redFlushForm.content))
        this.warehouseInputForm.list.forEach(item => {
          item.quantity = -item.quantity
        });
      } else {
        this.warehouseInputForm = {
          operator: "",
          purchaseSheetId: "",
          list: [],
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.warehouseInputForm.operator = sessionStorage.getItem('name')
          this.warehouseInputForm.list.forEach(item => {
            item.purchasePrice = Number(item.purchasePrice)
            item.quantity = Number(item.quantity)
          })
          warehouseInput(this.warehouseInputForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功');
              this.resetForm()
              this.$parent.$emit('submit')
            } else {
              this.$message.error('创建失败');
            }
          })

        }
      })
    },
  },
}
</script>

<style scoped>

</style>