<template>
  <view class="login-container">
    <uv-text class="title" size="50px" align="center" :bold="true" color="#7e1671" text="登 录"></uv-text>
    <div class="login-form">
      <uv-form
          labelPosition="left"
          :model="user"
          :rules="rules"
          ref="formRef"
          :labelStyle="{ color: '#7e1671'}">
        <uv-form-item borderBottom>
          <uv-input
              color="#7e1671"
              prefixIcon="order"
              v-model="user.name"
              placeholder="请输入用户名"
              border="none"
              clearable
              fontSize="20px"/>
        </uv-form-item>
        <uv-form-item borderBottom>
          <uv-input
              color="#7e1671"
              prefixIcon="lock"
              v-model="user.pwd"
              placeholder="请输入密码"
              border="none"
              clearable
              password
              fontSize="20px"/>
        </uv-form-item>
        <uv-button color="#322f3b" text="登 录" customStyle="margin-top: 10px" style="height: 100rpx;" @click="submit"/>
      </uv-form>
      <transition name="slide">
        <view v-if="showRegisterTip" class="register-link" @click="toRegister">
          <uv-text color="#7e1671" text="没有账号？"/>
        </view>
      </transition>
    </div>
  </view>
</template>

<script setup>
import { login } from '../../hook';
import { reactive, ref } from 'vue';
//表单接受参数
const user = reactive({ name: '', pwd: '' });

//显示注册提示
const showRegisterTip = ref(true);


const formRef = ref(null);

const submit = async () => {
  const res = await login(user.name, user.pwd);
};

const toRegister = () => {
  //点击注册按钮后隐藏注册提示
  showRegisterTip.value = false;
  setTimeout(() => {
    uni.navigateTo({
      url: '/pages/register/register',
      //跳转成功后显示注册表示
      success: function (res){
        showRegisterTip.value = true;
      }
    });
  }, 300);
};
</script>

<style scoped>
.login-container {
  padding: 40rpx;
  margin-top: 150rpx;
}

.login-form {
  margin-top: 40rpx;
}
.register-link {
  text-align: center;
  margin-top: 30rpx;
}

/* 动画样式 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>