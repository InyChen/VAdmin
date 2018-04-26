<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="用户ID" prop="uid">
                <el-input v-model="form.uid" :disabled="!!user"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="uname">
                <el-input v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-radio v-model="form.state" label="1" border>正常</el-radio>
                <el-radio v-model="form.state" label="0" border>禁用</el-radio>
            </el-form-item>
            <el-form-item label="角色">
                <el-checkbox v-for="role in roleList" :key="role.rid" v-model="role.checked">{{role.rname}}</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
                <el-button @click="$emit('close')" v-if="!submiting">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  props: {
    user: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      submiting: false,
      form: {
        uid: "",
        uname: "",
        state: ""
      },
      roleList: [],
      rules: {
        uid: [
          { required: true, message: "请输入用户ID", trigger: "change" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "change"
          }
        ],
        uname: [
          { required: true, message: "请输入用户名称", trigger: "change" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
            trigger: "change"
          }
        ]
      }
    }
  },
  watch: {
    user (val) {
      this.resetForm()
    }
  },
  methods: {
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },
    async loadRole () {
      this.submiting = true
      let rs = await this.$post("user/getUserRoles", this.user || {})
      if (rs.code == "0") {
        rs.list.forEach(role => {
          role.checked = !!role.uid
        })
        this.roleList = rs.list
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      this.form.roleList = this.roleList
      let rs = await this.$post("user/save", this.form)
      if (rs.code == "0") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success")
        this.$emit("close")
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    resetForm () {
      if (this.user) {
        this.form = {
          uid: this.user.uid,
          uname: this.user.uname,
          state: this.user.state
        }
      } else {
        this.form = {
          uid: "",
          uname: "",
          state: "1"
        }
      }
      this.loadRole()
    }
  },
  created () {
    this.resetForm()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>
