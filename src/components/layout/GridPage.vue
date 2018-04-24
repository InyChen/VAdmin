<template>
    <div class="grid-page">
        <slot></slot>
    </div>
</template>

<script>
import { PaginateTable, SearchBar } from "@/components/layout"

export default {
  components: {
    PaginateTable,
    SearchBar
  }
}
</script>

<style scoped>
.grid-page {
  display: flex;
  flex-direction: column;
}
</style>
