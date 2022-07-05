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
<!--    <div class="login">-->
      <div class="form">
        <el-form :model="userInfo" :label-width="'100px'" class="loginContainer" :rules="rules">
          <h2 class="title">企业ERP系统</h2>
          <el-form-item label="用户名：" prop="name">
            <el-input v-model="userInfo.name" placeholder="请输入用户名" prefix-icon="el-icon-user-solid" size="normal" type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="userInfo.password" placeholder="请输入密码" prefix-icon="el-icon-lock" size="normal" type="password"></el-input>
          </el-form-item>
          <div class="tip">
            <!-- 记住我 -->
            <el-checkbox v-model="checked" class="rememberMe">记住密码</el-checkbox>
          </div>
          <div class="confirm">
            <el-button type="primary" size="small" @click="loginThis()">登录</el-button>
          </div>
          <div class="confirm" style="margin-top: 15px">
            <el-button type="text" size="small" @click="toRegister">暂无账号？立即注册</el-button>
          </div>
        </el-form>
      </div>
<!--    </div>-->
  </div>
</template>

<script>
import { login, auth } from "@/network/auth";
export default {
  data() {
    return {
      userInfo: {
        name: '',
        password: ''
      },
      rules:{
        name:[
          {required:true,message:'请输入名字',trigger:"blur"}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:"blur"}
        ]
      },
      checked: false,
    }
  },
  mounted() {
    let username = localStorage.getItem("name");
    const Base64 = require("js-base64").Base64;
    if (username) {
      this.userInfo.name = localStorage.getItem("name");
      this.userInfo.password = Base64.decode(localStorage.getItem("password"));// base64解密
      this.checked = true;
    }
  },
  methods: {
    loginThis() {
      console.log(this.userInfo);
      const Base64 = require("js-base64").Base64;
      if (this.checked) {
        let password = Base64.encode(this.userInfo.password); // base64加密
        localStorage.setItem("name", this.userInfo.name);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("name");
        localStorage.removeItem("password");
      }
      login(this.userInfo).then(_res => {
        if (_res.code === '00000') {

          let token = _res.result.token;
          if (token == null) {
            this.$message({
              type: 'error',
              message: '无效的用户'
            });
            return;
          } else {
            sessionStorage.setItem("token", token);
            let config = {
              params: {
                token: token
              }
            };
            auth(config).then(res2 => {
              // console.log(res2);
              sessionStorage.setItem("name", res2.result.name);
              sessionStorage.setItem("role", res2.result.role);
              this.$router.push("/");
            })
          }
        }
      })
      .catch(err => {
        console.error("获取token失败!", err);
      });
    },
    toRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-background {
  background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.form {
  z-index: 1;
  margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
  position: absolute;
  width: 60%;
}
.loginContainer{
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fefefe;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 15px auto 20px auto;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #a486c7;
}
.tip{
  text-align: right;
}
.confirm {
  text-align: center;
}
.body {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
