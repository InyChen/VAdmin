<template>
    <GridPage>
        <SearchBar>
            <el-form-item label="审批人" v-for="i in 10" :key="i">
                <el-input v-model="form.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </SearchBar>
        <PaginateTable :data="tableData">
        </PaginateTable>
    </GridPage>
</template>

<script>
import { GridPage, PaginateTable, SearchBar } from "@/components/layout"

export default {
  components: {
    GridPage,
    PaginateTable,
    SearchBar
  },
  data () {
    return {
      form: {},
      tableData: {
        headers: [
          { name: "模块id", key: "mid" },
          { name: "模块名", key: "mname" }
        ],
        list: [],
        pager: {
          totalCount: 0,
          pagiSize: 10,
          currentPage: 1
        }
      }
    }
  },
  methods: {
    async onSearch () {
      let rs = await this.$post("/module/query", this.form)
      if (rs.returncode == "0") {
        this.tableData.list = rs.list
      }
    }
  }
}
</script>

<style scoped>

</style>
