<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="用户名称">
        <el-input v-model="form.uname" placeholder="输入名称查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="可用状态">
          <el-option label="全部" value=""></el-option>
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch" :loading="loading">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onAdd">新增</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="user/query" :param="form" @loaded="loading=false" show-pager>
      <el-table-column prop="uid" label="用户ID" width="100">
      </el-table-column>
      <el-table-column prop="uname" label="用户名" width="200">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="props">
          <el-button @click="edit(props.row)" :loading="props.row.loading">编辑</el-button>
          <el-button @click="resume(props.row)" type="success" v-if="props.row.state=='0'" :loading="props.row.loading">恢复</el-button>
          <el-button @click="dis(props.row)" type="danger" v-if="props.row.state=='1'" :loading="props.row.loading">禁用</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
    <LayoutDialog title="用户信息" v-model="showDialog">
      <UserForm :user="user" @success="onSearch" @close="showDialog=false"></UserForm>
    </LayoutDialog>
  </LayoutPage>
</template>

<script>
import UserForm from "./UserForm"

export default {
  components: {
    UserForm
  },
  data () {
    return {
      form: { uname: "", state: "" },
      loading: false,
      showDialog: false,
      user: null
    }
  },
  methods: {
    onSearch () {
      this.loading = true
      this.$refs.myTable.search()
    },
    edit (user) {
      this.user = user
      this.showDialog = true
    },
    async resume (user) {
      user.loading = true
      let rs = await this.$post("user/setUserState", {
        uid: user.uid,
        state: "1"
      })
      if (rs.code == "0") {
        user.state = "1"
      }
      user.loading = false
    },
    async dis (user) {
      user.loading = true
      let rs = await this.$post("user/setUserState", {
        uid: user.uid,
        state: "0"
      })
      if (rs.code == "0") {
        user.state = "0"
      }
      user.loading = false
    },
    onAdd () {
      this.user = {}
      this.showDialog = true
    }
  }
}
</script>

<style scoped>

</style>
