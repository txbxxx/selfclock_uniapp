<template>
	<view>
    <view>
      <uv-navbar leftText="返回" :fixed="false" :safeAreaInsetTop="true" @leftClick="back">
        <template v-slot:left>
          <view class="uv-nav-slot">
            <uv-icon name="arrow-left" size="19"></uv-icon>
          </view>
        </template>
      </uv-navbar>
    </view>
    <uv-text size="50px" align="center" bold="true" color="#8076a3" margin="100rpx 0 0 0" text="注 册"></uv-text>
    <div class="loginFrom"  style="margin-top: 40rpx">
      <uv-form labelPosition="left" :model="User" :rules="rulesFrom" ref="form" :labelStyle="{ color: '#8076a3'}">
        <uv-form-item  borderBottom>
          <uv-input color="#8076a3" prefixIcon="order" v-model="name" placeholder="请输入用户名" border="none" clearable fontSize='20px'>
          </uv-input>
        </uv-form-item>
        <uv-form-item   borderBottom>
          <uv-input color="#8076a3"   prefixIcon="lock" v-model="pwd" placeholder="请输入密码" border="none" clearable password fontSize='20px'>
          </uv-input>
        </uv-form-item>
        <uv-form-item   borderBottom>
          <uv-input color="#8076a3"   prefixIcon="lock" v-model="anewPwd" placeholder="请输再次入密码" border="none" clearable password fontSize='20px'>
          </uv-input>
        </uv-form-item>
        <uv-button color="#131124" text="注 册" customStyle="margin-top: 10px" style="height: 100rpx;border: 30rpx;width: 730rpx;" @click="submit"></uv-button>
        <uv-transition
            :show="show"
            :custom-style="{'width':'100px','height':'100px','backgroundColor':'#3c9cff'}"
            @change="change">
        </uv-transition>
      </uv-form>
      <view class="register" style="margin-top: 30rpx">
      </view>
    </div>
	</view>
</template>

<script setup>
// 登录
import { ref,toRefs, reactive } from 'vue'
import {register} from "../../hook";
// 表单数据
const User = reactive({
  name: '',
  pwd: '',
  anewPwd: ''
})

// 表单数据，解包
const {name,pwd,anewPwd} = toRefs(User)

//动画
const show = ref(false)

// const rulesFrom = {
//   name: [
//     { required: true, message: '请输入用户名', trigger: 'submit' },
//     { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'submit' }
//   ],
//   pwd: [
//     { required: true, message: '请输入密码', trigger: 'submit' },
//     { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'submit' }
//   ],
//   anewPwd: [
//     { required: true, message: '请再次输入密码', trigger: 'submit' },
//     { min: 3, max: 5, message: '长度在 3 到 6 个字符', trigger: 'submit' }
//   ]
// }



// 注册
const submit = async () => {
  show.value = !show.value
  //判断两次输入的密码是否相同
  if(pwd.value !== anewPwd.value){
    uni.showToast({
      title: '两次密码输入不一致',
      icon: 'none'
    })
    return
  }
  const res = await register(name.value,pwd.value)

}

//放回到上一个页面
const back = () => {
  uni.navigateBack()
}


</script>

<style scoped lang="scss">
@mixin flex($direction: row) {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: $direction;
}
.uv-nav-slot {
  @include flex;
  align-items: center;
  justify-content: space-between;
  border-width: 0.5px;
  border-radius: 100px;
  border-color: #dadbde;
  padding: 3px 7px;
  opacity: 0.8;
}
</style>
