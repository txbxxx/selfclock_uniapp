<template>
	<view>
    <uv-text size="50px" align="center" bold="true" color="#8076a3" margin="100rpx 0 0 0" text="注册"></uv-text>
    <div class="loginFrom">
      <uv-form labelPosition="left" :model="User" :rules="rules" ref="form" :labelStyle="{ color: '#8076a3'}">
        <uv-form-item  borderBottom>
          <uv-input color="#8076a3" prefixIcon="order" v-model="name" placeholder="请输入用户名" border="none" clearable fontSize='20px'>
          </uv-input>
        </uv-form-item>
        <uv-form-item   borderBottom>
          <uv-input color="#8076a3"   prefixIcon="lock" v-model="pwd" placeholder="请输入密码" border="none" clearable password fontSize='20px'>
          </uv-input>
        </uv-form-item>
        <uv-button color="#131124" text="登录" customStyle="margin-top: 10px" @click="submit"></uv-button>
      </uv-form>
      <view class="register" style="margin-top: 30rpx">
      </view>
    </div>
	</view>
</template>

<script setup>

</script>

<style>

</style>
