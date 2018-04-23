<template>
    <div class="title">
        首页
        <span>链接</span>
    </div>
</template>

<script>
export default {
  created () {
    let token = sessionStorage.getItem("token")
    if (token) {
      this.$router.replace("/main")
    } else {
      this.$router.replace("/login")
    }
  }
}
</script>

<style scoped lang="less">
.title {
  color: red;
  span {
    color: green;
    transform: rotate(0);
  }
}
</style>
