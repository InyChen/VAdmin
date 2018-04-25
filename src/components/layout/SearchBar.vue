<template>
    <div class="search-bar">
        <el-form :inline="true">
            <slot></slot>
        </el-form>
    </div>
</template>

<style scoped>
.search-bar {
  flex: 0 1 100%;
  padding: 10px;
  padding-bottom: 0;
  border-bottom: 1px solid #eee;
  background: #fff;
}
</style>
