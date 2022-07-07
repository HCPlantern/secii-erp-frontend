<template>
  <div>
    <el-form :model="warehouseOutputForm" label-width="100px" ref="warehouseOutputForm" :rules="rules">
      <el-form-item
          v-if="!redFlushForm"
          label="销售单id: " prop="saleSheetId">
        <el-select v-model="warehouseOutputForm.saleSheetId"
                   placeholder="请选择关联的销售单id"
                   @change="selectSale(saleSheets.filter(item => item.id === warehouseOutputForm.saleSheetId))">
          <el-option
              v-for="(item, index) in saleSheets"
              :key="item.id"
              :label="item.id"
              :value="item.id">
            <el-popover
                placement="right"
                width="500"
                trigger="hover">
              <el-table :data="saleSheets[index].saleSheetContent">
                <el-table-column width="100" property="id" label="id"></el-table-column>
                <el-table-column width="200" property="saleSheetId" label="saleSheetId"></el-table-column>
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

      <el-form-item label="入库单清单: " v-if="this.warehouseOutputForm.list.length === 0">
        暂无数据!
      </el-form-item>
      <el-form-item label="入库单清单: " v-else>
        <div
            v-for="(item, index) in warehouseOutputForm.list"
            :key="index" style="margin: 0.6rem 1rem 1rem 1rem">
          <el-descriptions>
            <el-descriptions-item label="商品ID">
              {{ item.pid }}
            </el-descriptions-item>
          </el-descriptions>
          <span> 数量：</span>
          <el-input v-model="item.quantity" size="mini" style="width: 40%"></el-input>
          <span> 单价：</span>
          <el-input v-model="item.salePrice" size="mini" style="width: 40%"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="备注: ">
        <el-input type="textarea" v-model="warehouseOutputForm.remark" style="width: 60%"></el-input>
      </el-form-item>
    </el-form>
    <span slot=" footer
      " class="dialog-footer">
      <el-button type="primary" size="small" @click="submitForm('warehouseOutputForm')">创建</el-button>
      <el-button type="primary" size="small" @click="resetForm">重置</el-button>
      </span>
  </div>
</template>

<script>
import {getAllSale} from "@/network/sale";
import {warehouseOutput} from "@/network/warehouse";

export default {
  name: "WarehouseOutputForm",
  props: {
    redFlushForm: {
      type: Object,
      default: null,
    }
  },
  async mounted() {
    this.resetForm();
    await getAllSale({params: {state: 'SUCCESS'}}).then(res => {
      this.saleSheets = res.result
    });

  },
  data() {
    return {
      saleSheets: [],
      warehouseOutputForm: {
        list: [],
      },
      rules: {
      },
    }
  },
  methods: {
    selectSale(content) {
      this.warehouseOutputForm.list = content[0].saleSheetContent;
    },
    resetForm() {
      if (this.redFlushForm) {
        this.warehouseOutputForm.operator = this.redFlushForm.operator;
        this.warehouseOutputForm.saleSheetId = this.redFlushForm.saleSheetId;
        this.warehouseOutputForm.list = JSON.parse(JSON.stringify(this.redFlushForm.content))
        this.warehouseOutputForm.list.forEach(item => {
          item.quantity = -item.quantity
        });
      } else {
        this.warehouseOutputForm = {
          operator: "",
          saleSheetId: "",
          list: [],
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.warehouseOutputForm.operator = sessionStorage.getItem('name')
          this.warehouseOutputForm.list.forEach(item => {
            item.saleSheetPrice = Number(item.saleSheetPrice)
            item.quantity = Number(item.quantity)
          })
          warehouseOutput(this.warehouseOutputForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功');
              this.resetForm()
              this.$parent.$emit('submit')
            } else {
              this.$message.error('创建失败');
            }
          }).catch(err => {
            this.$message.error('创建失败');
          })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
