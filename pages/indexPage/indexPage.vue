<template>
  <view>
    <view class="navbar-container">
      <uni-nav-bar
          border="false"
          shadow="false"
          fixed
          style="margin-top: 40rpx"
          height="60rpx"
          title="不学习就无法生存"
          background-color="#813c85"
          color="#e2e1e4"
      >
      </uni-nav-bar>
    </view>
    <view class="container">
      <view>
        <view class="title">
          <text class="title-text" style="color: #7e1671;">您已经学习了:{{ learnDate }}分钟</text>
        </view>
      </view>
      <view class="countdown">
        {{ displayMinutes }}:{{ displaySeconds < 10 ? '0' + displaySeconds : displaySeconds }}
      </view>

      <view class="controls">
        <view>
          <uni-number-box
              :value="countdownMinutesInput"
              @change="updateCountdownMinutes"
              color="#7e1671"
              :min="0"
              :max="60"
              :step="1"
          />
        </view>
        <view>
          <button style="color: #894276; background-color: #d1c2d3; text-align: center;" @click="startCountdown">
            开始学习之旅！
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { getUserLearnData } from "../../hook";

const countdownMinutesInput = inject('countdownMinutesInput');
const displayMinutes = inject('displayMinutes');
const displaySeconds = inject('displaySeconds');
const startCountdown = inject('startCountdown');

// 统计学习时间
const learnDate = ref(0);

// 更新分钟数
const updateCountdownMinutes = (event) => {
  countdownMinutesInput.value = event;
};

// 更新用户的学习时间
onMounted(() => {
  const userLearnData = getUserLearnData().then(res => {
    learnDate.value = res;
  });
});
</script>

<style lang="scss">
.navbar-container {
  position: relative;
  z-index: 10;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 82vh; /* 全屏高度 */
  padding-top: 20px; /* 上方留出一些空间 */
}

.title-text {
  color: #7e1671;
  font-size: 36rpx; /* 调整字体大小 */
  font-weight: bold; /* 加粗字体 */
  text-align: center; /* 居中对齐 */
  border: 2rpx solid #7e1671; /* 添加边框 */
  padding: 10rpx; /* 添加内边距 */
  border-radius: 10rpx; /* 圆角边框 */
  background-color: #f3e5f5; /* 背景色 */
}

.controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

.countdown {
  font-size: 200rpx;
  font-weight: bold;
  margin-top: 30rpx;
  color: #7e1671;
}


</style>

