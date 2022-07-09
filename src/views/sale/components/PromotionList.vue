<template>

  <div class="card">
    <el-card v-for="(value, index) in list" :index="value.index" :key="value.id" shadow="hover">
      <sheet
          :item="value"
          :type="type"
          :role="role"
          :description="description"
          :content-field-name="'gift'"
      ></sheet>
    </el-card>
  </div>
</template>

<script>
import Sheet from "@/views/common/Sheet";
import {ROLE} from "@/common/const";

export default {
  name: 'PromotionList',
  components: {Sheet},
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      date: "",
      promotionList: [],
      role: [ROLE.GM, ROLE.ADMIN],
      description: [
        {
          id: "促销策略ID",
          promotionStrategy: "促销策略类型",
          customerLevel: "最低用户等级",
          discount: "折扣",
          coupon: "代金券",
          price: "触发总价",
          beginTime: "开始时间",
          endTime: "结束时间",
        }, {
          pid: "商品ID",
          promotionSheetId: "促销策略ID",
          quantity: "数量",
          remark: "备注"
        }
      ]
    }
  },
  mounted() {
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: auto;

  .button {
    float: right;
  }
}

.el-card {
  margin-bottom: 20px;
  //background: #EEF7F2;
}
</style>
