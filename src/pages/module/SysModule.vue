<template>
  <GridPage>
    <SearchBar>
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
    </SearchBar>
    <PaginateTable :data="filterdList" :loading="loading">
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
    </PaginateTable>
  </GridPage>
</template>

<script>
import {
  GridPage,
  PaginateTable,
  SearchBar,
  LayoutPager
} from "@/components/layout"

export default {
  components: {
    GridPage,
    PaginateTable,
    SearchBar,
    LayoutPager
  },
  data () {
    return {
      form: { mname: "", state: "1" },
      list: [],
      currentPage: 1
    }
  },
  computed: {
    filterdList () {
      return this.list.filter(item => {
        return item.mname.indexOf(this.form.mname) > -1
      })
    }
  },
  methods: {
    generalLevel (list) {
      list.forEach((item, index) => {
        item.open = true
        item.show = true
        this.list.push(item)
        if (item.children) {
          this.generalLevel(item.children)
        }
      })
    },
    async onSearch () {
      this.loading = true
      let rs = await this.$post("module/query", this.form)
      if (rs.code == "0") {
        this.list = []
        this.generalLevel(rs.list)
      }
      this.loading = false
    },
    handleSizeChange () {},
    handleCurrentChange () {}
  },
  created () {
    this.onSearch()
  }
}
</script>

<style scoped>

</style>
