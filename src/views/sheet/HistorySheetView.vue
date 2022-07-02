<template>
  <Layout>
    <Title title="经营历程表"></Title>
    <div class="page">
      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>

          <div class="button">
            <download-excel
                :data="filteredData"
                :fields="excelFields"
                name="经营历程表.xls">
              <el-button
                  class="export-excel-wrapper"
                  size="small"
                  type="success"
                  icon="el-icon-download"
              >
                导出
              </el-button>
            </download-excel>
          </div>

          <div class="button">
            <el-button
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="queryData"
            >
              查询结果
            </el-button>
          </div>

        </div>

        <div>
          <el-form class="form" ref="form" :model="form" :rules="formRule" label-width="100px">

            <el-form-item class="form-item" label="时间段" prop="time">
              <el-date-picker
                  class="select-time-range"
                  v-model="form.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '00:00:00']"
              ></el-date-picker>
            </el-form-item>

            <el-form-item class="form-item" label="单据类型" prop="type">
              <el-select v-model="form.sheetType" multiple collapse-tags clearable filterable @change="filterData">
                <el-option-group
                    v-for="group in sheetType"
                    :key="group.id"
                    :label="group.label">
                  <el-option
                      v-for="item in group.options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name">
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="客户" prop="client">
              <el-select v-model="form.client" clearable filterable @change="filterData">
                <el-option
                    v-for="item in clients"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item class="form-item" label="业务员" prop="operator">
              <el-select v-model="form.operator" clearable filterable style="width:150px" @change="filterData">
                <el-option
                    v-for="item in operators"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>

          </el-form>
        </div>
      </el-card>

      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>单据列表</span>
        </div>

      </el-card>

      <!--dialog-->
      <!--      <el-dialog-->
      <!--          title="提示"-->
      <!--          :visible.sync="dialogVisible"-->
      <!--          width="30%"-->
      <!--      >-->
      <!--&lt;!&ndash;        这里可以优化一下&ndash;&gt;-->
      <!--        <span>{{ this.sheetDetail }}</span>-->
      <!--        <span slot="footer" class="dialog-footer">-->
      <!--          <el-button @click="dialogVisible = false">取 消</el-button>-->
      <!--          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      <!--        </span>-->
      <!--      </el-dialog>-->

      <el-dialog
          title="销售单详细信息"
          :visible.sync="saleSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="销售单编号" fit></el-table-column>
          <el-table-column property="supplier" label="供应商编号" fit></el-table-column>
          <el-table-column property="salesman" label="业务员" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="remark" label="备注" fit></el-table-column>
          <el-table-column property="rawTotalAmount" label="折让前总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="finalAmount" label="折让后总额" fit></el-table-column>
          <el-table-column property="discount" label="折扣" fit></el-table-column>
          <el-table-column property="voucherAmount" label="优惠券金额" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="销售单内容"
            :visible.sync="saleSheetContentVisible"
            append-to-body>
          <el-table :data="saleSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="saleSheetId" label="销售单编号" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="数量" fit></el-table-column>
            <el-table-column property="unitPrice" label="单价" fit></el-table-column>
            <el-table-column property="totalPrice" label="总额" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saleSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saleSheetContentVisible=true">查看销售单内容</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="销售退货单详细信息"
          :visible.sync="saleReturnsSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="销售退货单编号" fit></el-table-column>
          <el-table-column property="saleSheetId" label="关联销售单编号" fit></el-table-column>
          <el-table-column property="supplier" label="供应商编号" fit></el-table-column>
          <el-table-column property="salesman" label="业务员" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="remark" label="备注" fit></el-table-column>
          <el-table-column property="rawTotalAmount" label="折让前总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="finalAmount" label="折让后总额" fit></el-table-column>
          <el-table-column property="discount" label="折扣" fit></el-table-column>
          <el-table-column property="voucherAmount" label="优惠券金额" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="销售退货单内容"
            :visible.sync="saleReturnsSheetContentVisible"
            append-to-body>
          <el-table :data="saleReturnSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="saleReturnsSheetId" label="销售退货单编号" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="数量" fit></el-table-column>
            <el-table-column property="unitPrice" label="单价" fit></el-table-column>
            <el-table-column property="totalPrice" label="总额" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saleReturnsSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saleReturnsSheetContentVisible=true">查看销售退货单内容</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="进货单详细信息"
          :visible.sync="purchaseSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="进货单编号" fit></el-table-column>
          <el-table-column property="supplier" label="供应商编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="remark" label="备注" fit></el-table-column>
          <el-table-column property="totalAmount" label="折让前总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="进货单内容"
            :visible.sync="purchaseSheetContentDialogVisible"
            append-to-body>
          <el-table :data="purchaseSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="purchaseSheetId" label="进货单编号" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="数量" fit></el-table-column>
            <el-table-column property="unitPrice" label="单价" fit></el-table-column>
            <el-table-column property="totalPrice" label="总额" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="purchaseSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="purchaseSheetContentDialogVisible=true">查看进货单内容</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="进货退货单详细信息"
          :visible.sync="purchaseReturnsSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="进货退货单编号" fit></el-table-column>
          <el-table-column property="purchaseSheetId" label="关联的进货单编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="remark" label="备注" fit></el-table-column>
          <el-table-column property="totalAmount" label="折让前总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="进货退货单内容"
            :visible.sync="purchaseReturnsSheetContentVisible"
            append-to-body>
          <el-table :data="purchaseReturnsSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="purchaseReturnsSheetId" label="进货退货单编号" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="数量" fit></el-table-column>
            <el-table-column property="unitPrice" label="单价" fit></el-table-column>
            <el-table-column property="totalPrice" label="总额" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="purchaseReturnsSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="purchaseReturnsSheetContentVisible=true">查看进货退货单内容</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="付款单详细信息"
          :visible.sync="paymentSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="付款单编号" fit></el-table-column>
          <el-table-column property="customer" label="关联的客户编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="totalAmount" label="付款总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="付款单内容"
            :visible.sync="paymentSheetContentDialogVisible"
            append-to-body>
          <el-table :data="paymentSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="companyAccountId" label="银行账户编号" fit></el-table-column>
            <el-table-column property="transferAmount" label="转账金额" fit></el-table-column>
            <el-table-column property="paymentSheetId" label="关联的付款单编号" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="paymentSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="paymentSheetContentDialogVisible=true">查看付款单内容</el-button>
        </span>
      </el-dialog>

      <el-dialog
          title="收款单详细信息"
          :visible.sync="collectionSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="收款单编号" fit></el-table-column>
          <el-table-column property="customer" label="关联的客户编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="totalAmount" label="收款总额" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="进货单内容"
            :visible.sync="collectionSheetContentDialogVisible"
            append-to-body>
          <el-table :data="collectionSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="companyAccountId" label="银行账户编号" fit></el-table-column>
            <el-table-column property="transferAmount" label="转账金额" fit></el-table-column>
            <el-table-column property="collectionSheetId" label="关联的收款单编号" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="collectionSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="collectionSheetContentDialogVisible=true">查看收款单内容</el-button>
        </span>
      </el-dialog>


      <el-dialog
          title="收款单详细信息"
          :visible.sync="salarySheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="收款单编号" fit></el-table-column>
          <el-table-column property="employeeId" label="员工Id" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
          <el-table-column property="baseWage" label="基本工资" fit></el-table-column>
          <el-table-column property="postWage" label="岗位工资" fit></el-table-column>
          <el-table-column property="totalSalary" label="未税总工资" fit></el-table-column>
          <el-table-column property="taxedSalary" label="税后总工资" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
        </el-table>

        <span slot="footer" class="dialog-footer">
          <el-button @click="salarySheetDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>





      <el-dialog
          title="入库单详细信息"
          :visible.sync="warehouseInputSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="入库单编号" fit></el-table-column>
          <el-table-column property="batchId" label="批次" fit></el-table-column>
          <el-table-column property="purchaseSheetId" label="关联的进货单编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="入库单内容"
            :visible.sync="warehouseInputSheetContentDialogVisible"
            append-to-body>
          <el-table :data="warehouseInputSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="warehouseInputSheetId" label="入库单编号" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="商品数量" fit></el-table-column>
            <el-table-column property="purchasePrice" label="关联的收款单编号" fit></el-table-column>
            <el-table-column property="productionDate" label="出厂日期" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="warehouseInputSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="warehouseInputSheetContentDialogVisible=true">查看入库单内容</el-button>
        </span>
      </el-dialog>


      <el-dialog
          title="出库单详细信息"
          :visible.sync="warehouseOutputSheetDialogVisible" width="80%"
      >
        <el-table :data="sheetDetail"
                  stripe
                  border
                  style="width: 100%"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="id" label="出库单编号" fit></el-table-column>
          <el-table-column property="saleSheetId" label="关联的进货单编号" fit></el-table-column>
          <el-table-column property="operator" label="操作员" fit></el-table-column>
          <el-table-column property="state" label="单据状态" fit></el-table-column>
          <el-table-column property="createTime" label="创建时间" fit></el-table-column>
        </el-table>
        <el-dialog
            width="60%"
            title="出库单内容"
            :visible.sync="warehouseOutputSheetContentDialogVisible"
            append-to-body>
          <el-table :data="warehouseOutputSheetContent"
                    stripe
                    border
                    style="width: 100%"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}">
            <el-table-column property="id" label="编号" fit></el-table-column>
            <el-table-column property="warehouseOutputSheetId" label="出库单编号" fit></el-table-column>
            <el-table-column property="batchId" label="批次" fit></el-table-column>
            <el-table-column property="pid" label="商品编号" fit></el-table-column>
            <el-table-column property="quantity" label="商品数量" fit></el-table-column>
            <el-table-column property="salePrice" label="关联的销售单编号" fit></el-table-column>
            <el-table-column property="remark" label="备注" fit></el-table-column>
          </el-table>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
          <el-button @click="warehouseOutputSheetDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="warehouseOutputSheetContentDialogVisible=true">查看出库单内容</el-button>
        </span>
      </el-dialog>


      <div class="el-table">
        <el-table
            :data="filteredData"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            border
            @selection-change="handleSelectionChange"
        >
          <el-table-column
              type="selection"
              width="55">
          </el-table-column>
          <el-table-column
              prop="id"
              label="单据编号"
              width="150%"
          >
          </el-table-column>
          <el-table-column
              prop="type"
              label="单据类型"
          >
          </el-table-column>
          <el-table-column
              prop="date"
              label="时间"
          >
          </el-table-column>

          <el-table-column
              prop="client"
              label="客户"
          >
          </el-table-column>
          <el-table-column
              prop="operator"
              label="业务员"
          >
          </el-table-column>
          <el-table-column
              width="100"
              label="操作">
            <template slot-scope="scope">
              <el-button
                  type="primary"
                  size="small"
                  @click="handleView(scope.row)">
                查看
              </el-button>
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";
import {findAllUsers} from "@/network/user";
import {findAllSheet} from "@/network/sheet";

import {
  getAllCustomer, getSaleBySheetId, getSaleReturnBySheetId
} from "@/network/sale";
import {
  getPurchaseBySheetId, getPurchaseReturnBySheetId
} from "@/network/purchase";
import {
  getCollectionSheetById, getPaymentSheetById
} from "@/network/finance";
import {
  getWarehouseOutputSheetById, getWarehouseInputSheetById
} from "@/network/warehouse";
import {
  getSalarySheetById
} from "@/network/salary";

export default {
  components: {
    Layout,
    Title
  },
  async mounted() {
    getAllCustomer().then(res => {
      this.clients = this.clients.concat(res.result);
    });
    findAllUsers().then(res => {
      this.operators = this.operators.concat(res.result);
    });
  },
  data() {
    return {
      clients: [],
      operators: [],
      // 表单内容
      form: {
        date: "",
        sheetType: [],
        client: "",
        operator: "",
      },
      formRule: {
        time: [
          {required: true, message: "请选择日期", trigger: "change"}
        ],
      },
      sheetType: [{
        label: "销售类单据",
        options: [{id: '10', name: '销售单'}, {id: '11', name: '销售退货单'}],
      }, {
        label: "进货类单据",
        options: [{id: '20', name: '进货单'}, {id: '21', name: '进货退货单'}],
      }, {
        label: "财务类单据",
        options: [{id: '30', name: '付款单'}, {id: '31', name: '收款单'}, {id: '32', name: '工资单'}],
      }, {
        label: "库存类单据",
        options: [{id: '40', name: '入库单'}, {id: '41', name: '出库单'}],
      }],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
      ,
      // 单据列表
      sheetsData: [],
      saleSheetContent: [],
      saleReturnSheetContent: [],
      purchaseSheetContent: [],
      purchaseReturnsSheetContent: [],
      paymentSheetContent: [],
      collectionSheetContent: [],
      warehouseInputSheetContent: [],
      warehouseOutputSheetContent: [],

      filteredData: [],
      // 多选框的选中值
      multipleSelection: [],
      dialogVisible: false,

      saleSheetDialogVisible: false,
      saleSheetContentVisible: false,

      saleReturnsSheetDialogVisible: false,
      saleReturnsSheetContentVisible: false,

      purchaseSheetDialogVisible: false,
      purchaseSheetContentDialogVisible: false,

      purchaseReturnsSheetDialogVisible: false,
      purchaseReturnsSheetContentVisible: false,

      paymentSheetDialogVisible: false,
      paymentSheetContentDialogVisible: false,

      collectionSheetDialogVisible: false,
      collectionSheetContentDialogVisible: false,

      salarySheetDialogVisible: false,

      warehouseInputSheetDialogVisible: false,
      warehouseInputSheetContentDialogVisible: false,

      warehouseOutputSheetDialogVisible: false,
      warehouseOutputSheetContentDialogVisible: false,

      // 单据详情
      sheetDetail: [],
      excelFields: {
        "单据编号": "id",
        "单据类型": "type",
        "时间": "date",
        "客户": "client",
        "业务员": "operator",
      },
    }
  },
  computed: {
    beginDate: function () {
      return this.form.date === null ? null : formatDate(this.form.date[0])
    },
    endDate: function () {
      return this.form.date === null ? null : formatDate(this.form.date[1])
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询
    queryData() {
      if (this.form.date === '' || this.beginDate === null || this.endDate === null) {
        this.$message.error('请选择时间段')
        return
      }
      const config = {
        params: {
          beginDateStr: this.beginDate,
          endDateStr: this.endDate
        }
      }
      findAllSheet(config).then(res => {
        if (res.code === '00000') {
          this.$message.success('查询成功')
          this.sheetsData = [];
          this.sheetsData = this.sheetsData.concat(res.result);
          this.filteredData = this.sheetsData;
          this.filterData();
        } else {
          this.$message.error('该时间段内无数据')
        }
      })
    },
    handleView(row) {
      this.sheetDetail = [];
      this.dialogVisible = true;
      const config = {
        params: {
          id: row.id
        }
      }
      switch (row.type) {
        case '销售单':
          this.saleSheetDialogVisible = true
          getSaleBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
            this.saleSheetContent = this.sheetDetail[0].saleSheetContent;
          })
          break;
        case '销售退货单':
          this.saleReturnsSheetDialogVisible = true
          getSaleReturnBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
            this.saleReturnSheetContent = this.sheetDetail[0].saleReturnsSheetContent;
          })
          break;
        case '进货单':
          this.purchaseSheetDialogVisible = true
          getPurchaseBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
            this.purchaseSheetContent = this.sheetDetail[0].purchaseSheetContent;
          })
          break;
        case '进货退货单':
          this.purchaseReturnsSheetDialogVisible = true
          getPurchaseReturnBySheetId(config).then(res => {
            this.sheetDetail.push(res.result);
            this.purchaseReturnsSheetContent = this.sheetDetail[0].purchaseReturnsSheetContent;
          })
          break;
        case '付款单':
          this.paymentSheetDialogVisible = true
          getPaymentSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
            this.paymentSheetContent = this.sheetDetail[0].paymentSheetContent;
          })
          break;
        case '收款单':
          this.collectionSheetDialogVisible = true
          getCollectionSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
            this.collectionSheetContent = this.sheetDetail[0].collectionContent;
          })
          break;
        case '工资单':
          this.salarySheetDialogVisible = true
          getSalarySheetById(config).then(res => {
            this.sheetDetail.push(res.result);
          })
          break;
        case '入库单':
          this.warehouseInputSheetDialogVisible = true;
          getWarehouseInputSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
            this.warehouseInputSheetContent = this.sheetDetail[0].content;
          })
          break;
        case '出库单':
          this.warehouseOutputSheetDialogVisible = true;
          getWarehouseOutputSheetById(config).then(res => {
            this.sheetDetail.push(res.result);
            this.warehouseOutputSheetContent = this.sheetDetail[0].content;
          })
          break;
      }
      console.log(this.sheetDetail)
    },
    filterData() {
      this.filteredData = this.sheetsData;
      if (this.form.sheetType.length > 0) {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.sheetType.includes(item.type);
        })
      }
      if (this.form.client !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.client.includes(item.client);
        })
      }
      if (this.form.operator !== '') {
        this.filteredData = this.filteredData.filter((item) => {
          return this.form.operator.includes(item.operator);
        })
      }
    },
  }
}
</script>

<style scoped>

.page {
  margin-top: 4rem;
}

.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}

.form-item {
  display: inline-block;
}

.form-icon-text {
  margin: 1rem;
}

.form {
  margin: 2rem 0 2rem 0;
}

span {
  margin: 1rem;
}

.el-table {
  border-radius: 4px;
}

.button {
  display: inline-block;
  float: right;
  margin: 0 1rem 0 1rem;
}
</style>