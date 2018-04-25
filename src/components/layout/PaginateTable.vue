<template>
  <div class="paginate-table">
    <el-table :data="data" border v-loading="loading" :max-height="maxTableHeight">
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      require: true,
      type: Array
    },
    loading: {
      require: true,
      type: Boolean
    }
  },
  data () {
    return {
      maxTableHeight: 200
    }
  },
  watch: {
    data: {
      deep: true,
      handler () {
        this.$nextTick(() => {
          this.maxTableHeight = this.$el.offsetHeight
        })
      }
    }
  }
}
</script>

<style scoped>
.paginate-table {
  flex: 1 1 auto;
  margin: 10px;
  overflow: auto;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
