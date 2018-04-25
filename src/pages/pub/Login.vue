<template>
  <div class="body">
    <div class="form">
      <div class="title">系统登录</div>
      <label class="row-input">
        <i class="iconfont row-icon">&#xe63e;</i>
        <input class="row-input-inner" v-model="form.uid" type="text" @keydown="onAccountKeyDown" placeholder="请输入用户名" />
      </label>
      <label class="row-input">
        <i class="iconfont row-icon">&#xe603;</i>
        <input type="password" name="txtPassword" style="display:none">
        <input name="txtPassword" class="row-input-inner password" v-model="form.password" @keydown="onPasswordKeyDown" :type="showPassword?'text':'password'" placeholder="请输入密码" autocomplete="off" />
        <i class="iconfont row-icon showpassword" @click="showPassword=!showPassword">&#xe611;</i>
      </label>
      <div class="row-remember">
        <el-checkbox v-model="store">记住用户名</el-checkbox>
      </div>
      <div class="row-button">
        <el-button type="primary" size="medium" @click="doLogin" :loading="loading">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        uid: "",
        password: ""
      },
      showPassword: false,
      store: false,
      loading: false
    }
  },
  watch: {
    store (val) {
      localStorage.setItem("storeAccount", val ? "1" : "0")
    }
  },
  methods: {
    onAccountKeyDown (e) {
      if (e.keyCode === 13) {
        this.$el.querySelector(".password").focus()
      }
    },
    onPasswordKeyDown (e) {
      if (e.keyCode === 13) {
        this.doLogin()
      }
    },
    async doLogin () {
      if (!this.form.uid) {
        this.$message.error("请输入用户名")
        return null
      }
      if (!this.form.password) {
        this.$message.error("请输入密码")
        return null
      }

      this.loading = true
      let rs = await this.$post("/auth/login", this.form)
      if (rs.code === "0") {
        localStorage.setItem("token", rs.token)
        this.$store.commit("setUser", rs.user)
        if (this.store) {
          localStorage.setItem("uid", this.uid)
        }
        this.$router.replace("/main")
      } else {
        this.$message.error(rs.msg)
      }
      this.loading = false
    }
  },
  created () {
    let storeUid = localStorage.getItem("storeUid")
    let uid = localStorage.getItem("uid")
    this.store = storeUid === "1"
    if (this.store && uid) {
      this.uid = uid
    }
  }
}
</script>

<style scoped>
.body {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  flex: 0 0 400px;
  min-height: 300px;
  margin-top: -50px;
}
.title {
  line-height: 50px;
  font-size: 26px;
  color: #eee;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}
.row-input {
  display: flex;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  height: 40px;
  line-height: 40px;
}
.row-icon {
  flex: 0 0 40px;
  font-size: 16px;
  color: #999;
  text-align: center;
}
.row-input-inner,
.row-input-inner:-webkit-autofill {
  flex: 1 1 auto;
  border: 0;
  background: transparent !important;
  outline: none !important;
  color: #fff !important;
  font-size: 14px !important;
  border-radius: 5px;
  box-shadow: 0 0 0px 1000px rgb(38, 46, 58) inset;
  -webkit-text-fill-color: #fff;
}
.row-remember {
  text-align: right;
}
.row-button {
  margin-top: 30px;
}
.row-button button {
  width: 100%;
}
.showpassword {
  cursor: pointer;
}
.showpassword:hover {
  color: #fff;
}
</style>
