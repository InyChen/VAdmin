<template>
  <div class="page">
    <div class="side" :class="{'side-collapse':isCollapse}">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :background-color="style.backgroundColor"
        :text-color="style.textColor"
        :active-text-color="style.activeTextColor">
        <el-menu-item index="ROOT" >
          <i class="el-icon-document"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <template v-for="menu in menuList" >
          <el-submenu :index="menu.mid" :key="menu.mid" v-if="menu.children && menu.type!='URL'">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{menu.mname}}</span>
            </template>
            <template v-if="menu.children">
              <template v-for="secondMenu in menu.children">
                <el-submenu class="nest-menu" :index="secondMenu.mid" :key="secondMenu.mid" v-if="secondMenu.children && secondMenu.type!='URL'">
                  <span slot="title">{{secondMenu.mname}}</span>
                  <el-menu-item :index="thdMenu.mid" :key="thdMenu.mid" v-for="thdMenu in secondMenu.children">
                    {{thdMenu.mname}}
                  </el-menu-item>
                </el-submenu>
                <el-menu-item :index="secondMenu.mid" :key="secondMenu.mid" v-if="secondMenu.type=='URL'">
                  {{secondMenu.mname}}
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
          <el-menu-item :index="menu.mid" :key="menu.mid" v-if="menu.type=='URL'">
            <i class="el-icon-document"></i>
            <span slot="title">{{menu.mname}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="main" :class="{'main-collapse':isCollapse}">
      <div class="title">
        <div class="iconfont title-collapse" :class="{'title-collapse-close':isCollapse}" @click="isCollapse=!isCollapse" >&#xe653;</div>
        <div class="title-tools">
          <div class="iconfont title-tools-icon" @click="toggleScreen" v-show="!isFullscreen" >&#xe601;</div>
          <div class="iconfont title-tools-icon" @click="toggleScreen" v-show="isFullscreen">&#xe600;</div>

          <el-dropdown class="title-avatar-container right-menu-item" trigger="click">
            <div class="title-avatar-wrapper">
              <img class="title-user-avatar" src="@/assets/default-head.png">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/">
                <el-dropdown-item>
                  首页
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
                <span @click="logout" style="display:block;">退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <router-view>
        kkk
      </router-view>
    </div>
  </div>
</template>

<script>
import screenfull from "screenfull"

export default {
  data () {
    return {
      menuList: [],
      isCollapse: false,
      isFullscreen: false,
      style: {
        backgroundColor: "#304156",
        textColor: "#bfcbd9",
        activeTextColor: "#409EFF"
      }
    }
  },
  methods: {
    async loadMenu () {
      let rs = await this.$get("/auth/loadRouter")
      if (rs.code == "0") {
        this.menuList = rs.list
      }
    },
    toggleScreen () {
      if (!screenfull.enabled) {
        this.$message({
          message: "您的浏览器不支持全屏",
          type: "warning"
        })
        return false
      }
      screenfull.toggle()
      this.isFullscreen = !this.isFullscreen
    },
    logout () {}
  },
  created () {
    this.loadMenu()
  }
}
</script>

<style scoped>
.page {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.side {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  overflow: auto;
  transition: width 0.5s;
  background: #304156;
}
.side-collapse {
  width: 64px;
}
.side .el-menu {
  border: none;
}
.main {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 200px;
  transition: left 0.5s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.main-collapse {
  left: 64px;
}
.title {
  flex: 0 0 50px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.title-collapse {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 26px;
  cursor: pointer;
  transition: transform 0.5s;
}
.title-collapse-close {
  transform: rotate(90deg);
}
.title-tools {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  line-height: 50px;
  padding-right: 10px;
}
.title-tools-icon {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  line-height: 30px;
  width: 30px;
  font-size: 26px;
  text-align: center;
  cursor: pointer;
}
.title-avatar-container {
  display: inline-block;
  vertical-align: middle;
  height: 30px;
  margin-right: 30px;
}
.title-avatar-wrapper {
  cursor: pointer;
  margin-top: 5px;
  position: relative;
}
.title-user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 10px;
}
.title-avatar-container .el-icon-caret-bottom {
  position: absolute;
  left: 40px;
  bottom: 10px;
  font-size: 12px;
}
</style>
