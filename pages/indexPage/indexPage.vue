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
    <uni-section class="mb-10" title="倒计时卡片" sub-title="重要的日子就需要提醒你" type="line">
      <template v-slot:right>
        <uv-icon name="plus-circle" color="#983680" size="24" @click="addCountdown"></uv-icon>
      </template>
      <view v-for="(item, index) in countdownCardList" :key="index">

        <uni-card >
          <template v-slot:title>
            <view>
              <text  class="styled-text">{{item.countdownName}}</text>
              <uni-icons type="minus" size="15" style="float: right" @click="deleteCountdown(item.countdownName)"></uni-icons>
            </view>
          </template>
          <text>剩余时间: {{item.countdownDay - item.countdownPast}} 天</text>
        </uni-card>
      </view>

    </uni-section>

    <!--倒计时弹窗-->
    <uni-popup ref="popupAddCountDown" type="dialog" borderRadius="20rpx 20rpx 20rpx 20rpx">
      <view class="popupCountDown">
        <uni-section title="添加倒计时" type="line">
          <view class="form-container">
            <!-- 基础表单校验 -->
            <uni-forms ref="valiForm" rules="" :modelValue="addCountDownData">
              <uni-forms-item required name="taskName">
                <uni-easyinput styles="width: 40rpx;" v-model="addCountDownData.countdownName" placeholder="有什么重要日子啦？" clearable />
              </uni-forms-item>
              <uni-forms-item required name="taskFiled">
                <uni-easyinput v-model="addCountDownData.countdownDay" placeholder="还有多久呀？"   clearable />
              </uni-forms-item>
            </uni-forms>
            <view class="button-group">
              <button type="default" size="mini" @click="closePopupCountDown">取消</button>
              <button type="primary" size="mini" @click="submit">提交</button>
            </view>
          </view>
        </uni-section>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import {getUserLearnData, UserCountdown_add, UserCountdown_delete, UserCountdown_list,UserCountdown_update} from "../../hook";

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
  listCountdownCard()
  updateCountdownStatus()
});
//===========倒计时=========================
//接收倒计时参数
const countdownCardList = ref([]);

//获取所有未完成的倒计时
const listCountdownCard = () => {
  UserCountdown_list().then(res => {
    countdownCardList.value = res;
  })
}

//添加倒计时弹窗
const popupAddCountDown = ref(null);

//接收添加倒计时表单参数
const addCountDownData =  ref(
    {
      countdownName: '',
      countdownDay: '',
    }
)
//添加倒计时弹窗
const addCountdown = () => {
  popupAddCountDown.value.open();
}

//关闭弹窗
const closePopupCountDown = () => {
  popupAddCountDown.value.close();
}

//添加倒计时
const submit = () => {
  UserCountdown_add(addCountDownData.value.countdownName,addCountDownData.value.countdownDay).then(res => {
    listCountdownCard();
    closePopupCountDown();
  })
}


//删除倒计时
const deleteCountdown = (countdownName) => {
  UserCountdown_delete(countdownName).then(res => {
    listCountdownCard();
  })
}


//更新倒计时状态
const updateCountdownStatus = () => {
  UserCountdown_update().then(res => {
    listCountdownCard();
  })
}
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
  height: 40vh; /* 全屏高度 */
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

.popupCountDown{
  height: 700rpx;
  width: 700rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
}

.uni-view[data-v-4a605131]{
  background-color: #7e1671;
}

.uni-card .uni-card__content[data-v-ae4bee67]{
  background-color: #8076a3;
  color: #FFFFFF;
}

.styled-text {
  background-color: #d1c2d3;
  font-size: 30rpx;
  border: 1px solid #ccc;
  margin-bottom: 5rpx;
  border-radius: 5px;
  display: inline-block; /* 确保内联元素正确显示边框和填充 */
}

</style>

