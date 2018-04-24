<template>
  <div class="password-reset">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="重复新密码" prop="repeatPassword">
        <el-input v-model="form.repeatPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即创建</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      require: true,
      type: Boolean
    }
  },
  data () {
    return {
      form: {
        password: "",
        newPassword: "",
        repeatPassword: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ],
        repeatPassword: [
          { required: true, message: "请确认新密码", trigger: "change" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "change"
          }
        ]
      }
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.$refs["form"].resetFields()
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          alert("submit!")
        } else {
          console.log("error submit!!")
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.password-reset {
  position: relative;
}
</style>
