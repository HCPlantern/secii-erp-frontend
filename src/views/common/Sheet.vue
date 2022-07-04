<!--单据展示模板-->
<!--采用 el-descriptions-->
<!--item 为单个单据内容-->
<!--type 为该单据类型，0 为单纯展示，1 2 3 4 对应审批四个类型-->
<!--role 为能够审批该单据的角色，数组-->
<!--description 为单据描述的字段，包括单据和单据内容的字段，分别为该数组的第0个和第1个元素-->
<!--redFlushField 传入需要取负的字段 包括两部分 和 description 类似-->
<template>
  <div>
    <div class="header">
      <span>ID: {{ item.id }}</span>
      <el-button v-if="(type === 1 || type === 2) && authorization"
                 class="button-left" type="success" icon="el-icon-check" size="small" @click="approval(item.id)">
        <span>通过</span>
      </el-button>
      <el-button v-if="(type === 1 || type === 2) && authorization"
                 class="button-left" type="danger" icon="el-icon-close" size="small" @click="deny(item.id)">
        <span>不通过</span>
      </el-button>
      <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type='danger'>审核未通过</el-tag>
            </span>

      <el-button
          v-if="description.length === 2"
          class="button-right"
          type="primary"
          size="small"
          @click="changeState">
          <span v-if="!showDetail">
                展开</span>
        <span v-else>收起</span>
      </el-button>

<!--      <el-button-->
<!--          v-if="redFlushField"-->
<!--          type="danger"-->
<!--          class="button-right"-->
<!--          size="small"-->
<!--          @click="showRed"-->
<!--      >红冲-->
<!--      </el-button>-->

    </div>

    <el-divider></el-divider>

    <div>
      <el-descriptions>
        <el-descriptions-item
            v-for="(value, key) in item"
            v-if="key !== contentFieldName"
            :label="description[0][key]"
        >
          {{ value }}
        </el-descriptions-item>
      </el-descriptions>

      <div v-if="showDetail" style="margin-top: 15px">
        <div style="margin-bottom: 15px">单据详细内容:</div>
        <el-table
            :data="item[contentFieldName]"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column
              v-for="(value, key, index) in description[1]"
              :prop="key"
              :label="value"
          >
          </el-table-column>
        </el-table>
      </div>

    </div>

    <div
        v-if="showRed"
        class="red-flush-form"
    >

    </div>
  </div>
</template>

<script>
export default {
  name: "Sheet",
  props: {
    item: Object,
    type: Number,
    role: Array,
    description: Array,
    contentFieldName: String,
    approval: Function,
    deny: Function,
    redFlushField: Array,
  },
  data() {
    return {
      showDetail: false,
      showRed: false,
    }
  },
  methods: {
    changeState() {
      this.showDetail = !this.showDetail
    },
    authorization() {
      return this.role.includes(sessionStorage.getItem('role'));
    },
  },
}
</script>

<style scoped>
.button-left {
  margin-left: 10px;
}

.button-right {
  margin: 0 0.5rem;
  float: right;
}

.header {
  align-items: center;
}
</style>