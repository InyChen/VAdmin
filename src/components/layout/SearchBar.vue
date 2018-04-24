<template>
    <div class="search-bar">
        <el-form :inline="true">
            <slot></slot>
        </el-form>
    </div>
</template>

<style scoped>
.search-bar {
  flex: 1 0 auto;
  padding: 10px;
  padding-bottom: 0;
  border-bottom: 1px solid #ccc;
}
</style>
