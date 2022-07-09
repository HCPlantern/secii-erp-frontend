<template>
  <Layout>
    <Title title="制定促销策略"></Title>

    <el-row>
    <div class = "block">
      <span class="demonstration">有效日期 ： </span>
      <el-date-picker
        class="select-time-range"
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        unlink-panels
        :picker-options="pickerOptions"
        :default-time="['00:00:00', '00:00:00']">
      </el-date-picker>
    </div>
    </el-row>

    <br/>
    <el-row>
      <el-button type="primary" size = "large" @click="addDialogVisible1()">方案一 : 用户等级</el-button>
      <el-button type="primary" size = "large" @click="addDialogVisible2()">方案二 : 特价包</el-button>
      <el-button type="primary" size = "large" @click="addDialogVisible3()">方案三 : 总价</el-button>
    </el-row>

    <el-card class="el-card" shadow="hover">
      <div class="form-icon-text">
        <i class="el-icon-tickets"></i>
        <span>促销策略列表</span>
      </div>
    </el-card>

    <div style="margin-top: 10px">

      <el-dialog
        title="面向用户型促销"
        :visible.sync="addDialogVisible_1"
        width="30%"
        @close="close()">
        <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">

          <el-form-item label="用户级别">
            <el-input v-model="promotionStrategyForm.customerLevel" placeholder="请输入用户级别"></el-input>
          </el-form-item>

          <el-form-item label="赠品">
            <el-select v-model="promotionStrategyForm.gift">
              <el-option v-for="item in gift"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="折扣">
            <el-input v-model="promotionStrategyForm.discount" :rows="2" placeholder="请输入折扣" type="number"></el-input>
          </el-form-item>

          <el-form-item label="代金券">
            <el-select v-model="promotionStrategyForm.coupon">
              <el-option v-for="item in coupon"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="组合商品促销"
        :visible.sync="addDialogVisible_2"
        width="30%"
        @close="close()">
        <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">

          <el-form-item label="商品">
            <el-input v-model="promotionStrategyForm.commodity" placeholder="请输入用户级别"></el-input>
          </el-form-item>

          <el-form-item label="降价后的价格">
            <el-input v-model="promotionStrategyForm.price" placeholder="价格"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="总价型促销"
        :visible.sync="addDialogVisible_3"
        width="30%"
        @close="close()">
        <el-form :model="promotionStrategyForm" :label-width="'100px'" size="mini">

          <el-form-item label="总价">
            <el-input v-model="promotionStrategyForm.price" placeholder="总价"></el-input>
          </el-form-item>

          <el-form-item label="赠品">
            <el-select v-model="promotionStrategyForm.gift">
              <el-option v-for="item in gift"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="代金券">
            <el-select v-model="promotionStrategyForm.coupon">
              <el-option v-for="item in coupon"
                         :key="item.index"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleAdd(false)">取 消</el-button>
          <el-button type="primary" @click="handleAdd(true)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {createPromotionStrategy} from "@/network/sale";
import {getAllCustomer} from "@/network/purchase";
import { formatDate } from "@/common/utils";
export default {
  name: "DepartmentSalaryRule",
  components: {Title, Layout},
  data(){
    return{
      date:'',
      addDialogVisible_1:false,
      addDialogVisible_2:false,
      addDialogVisible_3:false,
      gift:["1","2","3","4"],
      coupon:["10", "20", "30"],
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
      promotionStrategyForm :{
        promotionStrategy:'',
        customerLevel: '',
        gift: '',
        discount: '',
        coupon:'',
        commodity:'',
        price:'',
        beginDate:'',
        endDate:'',
      },
      salaryRulesList:[],
      addDialogVisible:false,
    }
  },
  async mounted(){
    getAllDepartmentSalaryRules({}).then(_res=>{
      this.salaryRulesList=_res.result
    })
  },
  computed: {
    beginDate: function () {
      return this.date === '' ? '' : formatDate(this.date[0])
    },
    endDate: function () {
      return this.date === '' ? '' : formatDate(this.date[1])
    }
  },
  methods:{
    addDialogVisible1(){
      this.addDialogVisible_1 = true;
      this.promotionStrategyForm.promotionStrategy = "CUSTOMER";
    },
    addDialogVisible2(){
      this.addDialogVisible_2 = true;
      this.promotionStrategyForm.promotionStrategy = "PACKET";
    },
    addDialogVisible3(){
      this.addDialogVisible_3 = true;
      this.promotionStrategyForm.promotionStrategy = "PRICE";
    },
    handleAdd(type){
      if(type===false){
        this.addDialogVisible_1 = false;
        this.addDialogVisible_2 = false;
        this.addDialogVisible_3 = false;
        this.salaryRuleForm={}
      }else {
        this.promotionStrategyForm.beginDate = this.beginDate;
        this.promotionStrategyForm.endDate = this.endDate;
        createPromotionStrategy(this.promotionStrategyForm).then(_res=>{
          if (_res.code === "B0001" || _res.code === "B0002") {
            this.$message({
              type: 'error',
              message: _res.msg
            });
          } else {
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            this.salaryRuleForm = {};
            this.addDialogVisible_1 = false;
            this.addDialogVisible_2 = false;
            this.addDialogVisible_3 = false;
            getAllDepartmentSalaryRules({}).then(_res=>{
              this.salaryRulesList=_res.result
            })
          }
        })
      }
    },
    //根据id修改信息
    editInfo(id){
      this.salaryRuleEditForm=this.salaryRulesList.filter(x=>x.id===id)[0];
      this.editDialogVisible=true;
    },
    handleEdit(type){
      if(type===false){
        this.editDialogVisible=false;
        this.salaryRuleEditForm={};
      }else {
        updateDepartmentSalaryRule(this.salaryRuleEditForm).then(_res=>{
          if (_res.code === 'B0003') {
            this.$message({
              type: 'error',
              message: _res.msg
            })
          } else {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.salaryRuleEditForm = {};
            this.editDialogVisible = false;
            getAllDepartmentSalaryRules({}).then(_res=>{
              this.salaryRulesList=_res.result
            })
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.el-card {
  border: 1px solid #ebeef5;
  margin: 1rem 0 1rem 0;
}

</style>
