<template>
  <view>
    <view>
    <uni-nav-bar
          border="false"
          shadow="false"
          fixed
          style="margin-top: 40rpx"
          height="60rpx"
          title="用户设置"
          background-color="#813c85"
          color="#e2e1e4"
      >
    </uni-nav-bar>
  </view>
    <uv-button color="#322f3b" text="退出登录" customStyle="margin-top: 10px" style="height: 100rpx;" @click="logoutUser" />
  </view>
</template>

<script setup>
import { logout } from '../hook';
const logoutUser = () => {
 logout()
}
</script>

<style scoped></style>