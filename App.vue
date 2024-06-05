
<script setup>
//倒计时功能
import { provide, ref, computed } from 'vue';
import { updateUserLearnData} from './hook/';


//倒计时功能
const countdownTime = ref(0);


//默认分钟数10
const countdownMinutesInput = ref(10);

//计算时间
const displayMinutes = computed(() => Math.floor(countdownTime.value / 60));
const displaySeconds = computed(() => countdownTime.value % 60);

// 定时器的变量
let countdownInterval;


//倒计时
const overtime = ref(false);

//启动倒计时
const startCountdown = () => {
  uni.showToast({
    title: '开始学习冲冲冲，只有倒计时结束之后才可以会结算时间哦！！',
    icon: 'none',
    duration: 5000,
  });
  //初始化时间,将分钟数转换为秒数
  countdownTime.value = countdownMinutesInput.value * 60;
  // 清除定时器和重置状态
  if (countdownInterval) {
    overtime.value = false;
    clearInterval(countdownInterval);
  }
  // 启动定时器，每秒递减1秒
  countdownInterval = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value--;
    } else {
      //如果完成了打卡
      overtime.value = true;
      console.log(countdownMinutesInput)
      //更新用户学习时间
      updateUserLearnData(countdownMinutesInput.value);
      clearInterval(countdownInterval);
    }
  }, 1000);
};

//
provide('countdownTime', countdownTime);
provide('countdownMinutesInput', countdownMinutesInput);
provide('displayMinutes', displayMinutes);
provide('displaySeconds', displaySeconds);
provide('startCountdown', startCountdown);
provide('countdownInterval', countdownInterval);

//-------------------------------------------------------------




</script>

<style>
page {
	background-color: #eef7f2;
}
</style>
