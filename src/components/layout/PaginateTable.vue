<template>
    <div class="paginate-table">
        tableData
    </div>
</template>

<script>
export default {
  props: {
    data: {
      require: true,
      type: Object
    }
  }
}
</script>

<style scoped>
.paginate-table {
  flex: 0 1 100%;
}
</style>
