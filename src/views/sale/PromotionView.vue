<template>
  <Layout>
    <Title title="制定促销策略"></Title>
    <div style="margin-top: 4rem">
      <el-card shadow="hover">
        <el-row>
          <i class="el-icon-search"></i>
          <span style="margin: 1rem">筛选搜索</span>

          <div class="button" style="float: right">
            <el-button
                icon="el-icon-search"
                size="small"
                type="primary"
                @click="getAllPromotion"
            >
              查询结果
            </el-button>
          </div>

          <div class="block" style="margin: 1rem">
            <span class="demonstration">有效日期范围 ： </span>
            <el-date-picker
                class="select-time-range"
                v-model="date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                :picker-options="pickerOptions"
                :default-time="['00:00:00', '00:00:00']">
            </el-date-picker>
          </div>

        </el-row>
      </el-card>


      <el-row>
        <el-button type="primary" size="large" @click="addDialogVisible1()">方案一 : 用户等级</el-button>
        <el-button type="primary" size="large" @click="addDialogVisible2()">方案二 : 特价包</el-button>
        <el-button type="primary" size="large" @click="addDialogVisible3()">方案三 : 总价</el-button>
      </el-row>

      <el-card class="el-card" shadow="hover">
        <div class="form-icon-text">
          <i class="el-icon-tickets"></i>
          <span>促销策略列表</span>
        </div>
      </el-card>

      <div style="border: 1px #6e6e73; border-radius: 4px">
        <div v-if="promotionList.length === 0">
          <el-empty></el-empty>
        </div>
        <div v-else>
          <PromotionList :list="promotionList" :type="0" @refresh="getAllPromotion"></PromotionList>
        </div>
      </div>

      <div style="margin-top: 10px">

        <el-dialog
            title="面向用户型促销"
            :visible.sync="addDialogVisible_1"
            @close="close()">
          <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">
            <el-form-item label="促销时间">
              <el-date-picker
                  class="select-time-range"
                  v-model="formDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '00:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户级别">
              <el-input v-model="promotionStrategyForm.customerLevel" placeholder="请输入用户级别"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(item, index) in promotionStrategyForm.gift"
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
                <el-input class="commodityFormItem" v-model="item.remark" placeholder="请填写备注"></el-input>
              </div>
              <el-button type="text" size="small" @click="addProduct"
                         v-if="index === promotionStrategyForm.gift.length - 1">添加
              </el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </el-form-item>

            <el-form-item label="折扣">
              <el-input v-model="promotionStrategyForm.discount" placeholder="请输入折扣"></el-input>
            </el-form-item>

            <el-form-item label="代金券">
              <el-input size="mini" v-model="promotionStrategyForm.coupon" placeholder="请输入代金券金额"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog
            title="组合商品促销"
            :visible.sync="addDialogVisible_2"
            @close="close()">

          <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">
            <el-form-item label="促销时间">
              <el-date-picker
                  class="select-time-range"
                  v-model="formDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '00:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商品">
              <el-input v-model="promotionStrategyForm.commodity" placeholder="请输入用户级别"></el-input>
            </el-form-item>

            <el-form-item label="折扣">
              <el-input v-model="promotionStrategyForm.discount" placeholder="请输入折扣"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog
            title="总价型促销"
            :visible.sync="addDialogVisible_3"
            @close="close()">
          <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">

            <el-form-item label="促销时间">
              <el-date-picker
                  class="select-time-range"
                  v-model="formDate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  unlink-panels
                  :picker-options="pickerOptions"
                  :default-time="['00:00:00', '00:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="总价">
              <el-input v-model="promotionStrategyForm.price" placeholder="总价"></el-input>
            </el-form-item>

            <el-form-item
                v-for="(item, index) in promotionStrategyForm.gift"
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
                <el-input class="commodityFormItem" v-model="item.remark" placeholder="请填写备注"></el-input>
              </div>
              <el-button type="text" size="small" @click="addProduct"
                         v-if="index === promotionStrategyForm.gift.length - 1">添加
              </el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </el-form-item>

            <el-form-item label="折扣">
              <el-input v-model="promotionStrategyForm.discount" placeholder="请输入折扣"></el-input>
            </el-form-item>

            <el-form-item label="代金券">
              <el-input size="mini" v-model="promotionStrategyForm.coupon" placeholder="请输入代金券金额"></el-input>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {formatDate} from "@/common/utils";
import PromotionList from "@/views/sale/components/PromotionList";
import {createPromotionStrategy, findPromotionStrategyByTime} from "@/network/promotion";
import {getAllCommodity} from "@/network/commodity";

export default {
  name: "PromotionView",
  components: {PromotionList, Title, Layout},
  data() {
    return {
      date: '',
      commodityList: [],
      formDate: '',
      addDialogVisible_1: false,
      addDialogVisible_2: false,
      addDialogVisible_3: false,
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
      },

      // 创建促销策略的表单
      promotionStrategyForm: {},
      promotionList: [],
    }
  },
  async mounted() {
    getAllCommodity({}).then(_res => {
      let res = _res.result
      console.log(res)
      res.forEach(item => this.commodityList.push({id: item.id}))
    })
    this.resetForm()
  },
  computed: {
    beginDate: function () {
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function () {
      return this.date === '' ? '' : formatDate(this.date[1])
    },
    formBeginTime: function () {
      return this.formDate === '' ? '' : formatDate(this.formDate[0])
    },
    formEndTime: function () {
      return this.formDate === '' ? '' : formatDate(this.formDate[1])
    }
  },
  methods: {
    resetForm() {
      this.promotionStrategyForm = {
        promotionStrategy: '',
        customerLevel: '',
        gift: [{}],
        discount: '',
        coupon: '',
        price: '',
        beginTime: '',
        endTime: '',
      }
    },
    addDialogVisible1() {
      this.addDialogVisible_1 = true;
      this.promotionStrategyForm.promotionStrategy = "CUSTOMER";
    },
    addDialogVisible2() {
      this.addDialogVisible_2 = true;
      this.promotionStrategyForm.promotionStrategy = "PACKET";
    },
    addDialogVisible3() {
      this.addDialogVisible_3 = true;
      this.promotionStrategyForm.promotionStrategy = "PRICE";
    },
    getAllPromotion() {
      if (this.date === '' || this.beginDate === null || this.endDate === null) {
        this.$message.error('请选择时间段')
        return
      }
      this.loading = true
      const config = {
        params: {
          beginTime: this.beginDate,
          endTime: this.endDate
        }
      }
      findPromotionStrategyByTime(config).then(res => {
        if (res.msg === 'Success') {
          console.log(res)
          this.promotionList = this.promotionList.concat(res.result)
          console.log(this.promotionList)
          this.$message.success('查询成功')
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    addProduct() {
      this.promotionStrategyForm.gift.push({})
    },
    removeProduct(item) {
      const index = this.promotionStrategyForm.gift.indexOf(item);
      if (index !== -1) {
        this.promotionStrategyForm.gift.splice(index, 1)
      }
    },
    close() {
      this.resetForm()
    },
    submitForm() {
      this.promotionStrategyForm.beginTime = this.formBeginTime
      this.promotionStrategyForm.endTime = this.formEndTime
      createPromotionStrategy(this.promotionStrategyForm).then(res => {
        if (res.msg === 'Success') {
          this.$message.success('添加成功')
          this.addDialogVisible_1 = false;
          this.addDialogVisible_2 = false;
          this.addDialogVisible_3 = false;
          this.promotionStrategyForm = {
            promotionStrategy: '',
            customerLevel: '',
            gift: [{}],
            discount: '',
            coupon: '',
            price: '',
            beginTime: '',
            endTime: '',
          }
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    // handleAdd(type) {
    //   if (type === false) {
    //     this.addDialogVisible_1 = false;
    //     this.addDialogVisible_2 = false;
    //     this.addDialogVisible_3 = false;
    //     this.salaryRuleForm = {}
    //   } else {
    //     this.promotionStrategyForm.beginDate = this.beginDate;
    //     this.promotionStrategyForm.endDate = this.endDate;
    //     createPromotionStrategy(this.promotionStrategyForm).then(_res => {
    //       if (_res.code === "B0001" || _res.code === "B0002") {
    //         this.$message({
    //           type: 'error',
    //           message: _res.msg
    //         });
    //       } else {
    //         this.$message({
    //           type: 'success',
    //           message: '新增成功!'
    //         });
    //         this.salaryRuleForm = {};
    //         this.addDialogVisible_1 = false;
    //         this.addDialogVisible_2 = false;
    //         this.addDialogVisible_3 = false;
    //         getAllDepartmentSalaryRules({}).then(_res => {
    //           this.salaryRulesList = _res.result
    //         })
    //       }
    //     })
    //   }
    // },
    //根据id修改信息
    // editInfo(id) {
    //   this.salaryRuleEditForm = this.salaryRulesList.filter(x => x.id === id)[0];
    //   this.editDialogVisible = true;
    // },
    // handleEdit(type) {
    //   if (type === false) {
    //     this.editDialogVisible = false;
    //     this.salaryRuleEditForm = {};
    //   } else {
    //     updateDepartmentSalaryRule(this.salaryRuleEditForm).then(_res => {
    //       if (_res.code === 'B0003') {
    //         this.$message({
    //           type: 'error',
    //           message: _res.msg
    //         })
    //       } else {
    //         this.$message({
    //           type: 'success',
    //           message: '修改成功！'
    //         })
    //         this.salaryRuleEditForm = {};
    //         this.editDialogVisible = false;
    //         getAllDepartmentSalaryRules({}).then(_res => {
    //           this.salaryRulesList = _res.result
    //         })
    //       }
    //     })
    //   }
    // },

  },
}
</script>

<style scoped>
.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}

.commodityFormItem {
  margin: 0.5rem 0 0.5rem 0;
}

</style>
