<template>
  <LayoutPage>
    <LayoutSearch>
      <el-form-item label="模块">
        <el-input v-model="form.mname" placeholder="输入模块名查询"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.state" placeholder="可用状态">
          <el-option label="可用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
    </LayoutSearch>
    <LayoutTable ref="myTable" url="module/query" :param="form" :filter="filter">
      <el-table-column label="模块" width="220">
        <template slot-scope="props">
          <span :style="{'margin-left':(props.row.level-1)*30+'px'}">{{props.row.mname}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mid" label="模块ID" width="200">
      </el-table-column>
      <el-table-column prop="path" label="API路由" width="200">
      </el-table-column>
      <el-table-column prop="router" label="前端路由" width="200">
      </el-table-column>
      <el-table-column label="操作" width="250" fixed="right">
        <template slot-scope="props">
          <el-button>新增</el-button>
          <el-button>编辑</el-button>
          <el-button type="danger">禁用</el-button>
        </template>
      </el-table-column>
    </LayoutTable>
  </LayoutPage>
</template>

<script>
export default {
  data () {
    return {
      form: { mname: "", state: "1" }
    }
  },
  methods: {
    filter (list) {
      let toList = []
      this.generalLevel(list, toList)
      return toList.filter(item => {
        return item.mname.indexOf(this.form.mname) > -1
      })
    },
    generalLevel (list, toList) {
      list.forEach((item, index) => {
        toList.push(item)
        if (item.children) {
          this.generalLevel(item.children, toList)
        }
      })
    },
    onSearch () {
      this.$refs["myTable"].search()
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  },
  created () {}
}
</script>

<style scoped>

</style>
