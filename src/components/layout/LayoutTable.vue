<template>
  <div class="paginate-table">
    <el-table :data="data" border v-loading="loading" :max-height="maxTableHeight">
      <slot></slot>
    </el-table>
    <div class="paginate-pager" v-if="showPager">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pager.currentPage" :page-sizes="pager.pageSizes" :page-size="pager.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pager.totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutTable",
  props: {
    param: {
      require: false,
      type: Object
    },
    debounce: {
      require: false,
      type: Number
    },
    url: {
      require: false,
      type: String
    },
    showPager: {
      require: false,
      type: Boolean
    },
    filter: {
      require: false,
      type: Function
    }
  },
  data () {
    return {
      maxTableHeight: 500,
      loading: false,
      list: [],
      pager: null,
      autoSearchInd: null
    }
  },
  computed: {
    data () {
      if (this.filter) {
        return this.filter(this.list)
      }
      return this.list
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.autoHeight()
      }
    },
    param: {
      deep: true,
      handler () {
        if (this.autoSearchInd) {
          clearTimeout(this.autoSearchInd)
        }
        this.autoSearchInd = setTimeout(this.search, this.debounce || 500)
      }
    }
  },
  methods: {
    autoHeight () {
      this.$nextTick(() => {
        if (this.pager) {
          this.maxTableHeight =
            this.$el.offsetHeight -
            this.$el.querySelector(".paginate-pager").offsetHeight
        } else {
          this.maxTableHeight = this.$el.offsetHeight
        }
      })
    },
    handleSizeChange (s) {
      this.pager.pageSize = s
    },
    handleCurrentChange (page) {
      this.pager.currentPage = page
      this.search()
    },
    deleteRow (row) {
      let ind = this.list.indexOf(row)
      if (ind > -1) {
        this.list.splice(ind, 1)
      }
    },
    async search () {
      this.loading = true
      let form = Object.assign(this.param, this.pager)

      let rs = await this.$post(this.url, form)
      if (rs.code == "0") {
        // 添加loading属性
        rs.list.forEach(item => {
          item.loading = false
        })
        this.list = rs.list
        this.pager = rs.pager
      }
      this.autoHeight()
      this.loading = false
      this.$emit("loaded")
    }
  },
  created () {
    if (this.showPager) {
      this.pager = {
        currentPage: 1,
        pageSize: 30,
        pageSizes: [30, 50, 100, 200]
      }
    }
    this.search()
  }
}
</script>

<style scoped>
.paginate-table {
  flex: 1 1 auto;
  margin: 10px;
  overflow: auto;
}
.paginate-pager {
  padding: 10px 0;
}
</style>
