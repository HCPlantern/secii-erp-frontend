<template>
  <div class="body">
      <vue-particles
          class="login-background"
          color="#97D0F2"
          :particleOpacity="0.7"
          :particlesNumber="50"
          shapeType="circle"
          :particleSize="4"
          linesColor="#97D0F2"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push">
      </vue-particles>
      <div class="form">
        <el-form :model="userInfo" :label-width="'100px'" class="registerContainer">
          <h2 class="title">企业ERP系统</h2>
          <el-form-item label="用户名：">
            <el-input v-model="userInfo.name" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" size="normal" type="text"></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select v-model="userInfo.role">
              <el-option
               v-for="item in roleList"
               :key="item.id"
               :label="item.name"
               :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码：">
            <el-input v-model="userInfo.password1" placeholder="请输入密码" prefix-icon="el-icon-lock" size="normal" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：">
            <el-input v-model="userInfo.password2" placeholder="请输入密码" prefix-icon="el-icon-lock" size="normal" type="password"></el-input>
          </el-form-item>
          <div class="confirm">
            <el-button type="primary" size="small" @click="registerThis()">注册</el-button>
          </div>
        </el-form>
      </div>

  </div>
</template>

<script>
import { register } from "@/network/auth";
export default {
  data() {
    return {
      userInfo: {},
      roleList: [
        { id: 1, name: "库存管理人员", value: "INVENTORY_MANAGER"},
        { id: 2, name: "进货销售人员", value: "SALE_STAFF"},
        { id: 3, name: "财务人员", value: "FINANCIAL_STAFF"},
        { id: 4, name: "销售经理", value: "SALE_MANAGER"},
        { id: 5, name: "人力资源人员", value: "HR"},
        { id: 6, name: "总经理", value: "GM"},
        {id: 7,name:"系统管理员",value: "ADMIN"}
      ]
    }
  },
  methods: {
    registerThis() {
      if (this.userInfo.password1 !== this.userInfo.password2) {
        this.$message({
          type: 'error',
          message: '两次密码输入不一致！'
        });
        this.userInfo.password1 = "";
        this.userInfo.password2 = "";
      } else {
        let params = {
          name: this.userInfo.name,
          role: this.userInfo.role,
          password: this.userInfo.password1
        };
        register(params).then(res => {
          // console.log(res);
          if (res.code === 'A0000') {
            this.$message({
              type: 'error',
              message: '用户名已存在！'
            });
            this.userInfo = {};
          } else {
            this.$message({
              type: 'success',
              message: '注册成功'
            });
            this.$router.push("/login");
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-background {
  background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.registerContainer{
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fefefe;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.form {
  z-index: 1;
  margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
  position: absolute;
  width: 60%;
}
.confirm {
  text-align: center;
}
.title {
  margin: 15px auto 20px auto;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #a486c7;
}
.body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>