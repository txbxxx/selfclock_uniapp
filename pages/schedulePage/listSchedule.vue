<template>
	<view>
    <view class="navbar-container">
      <uni-nav-bar
          border="false"
          shadow="false"
          left-text="返回"
          fixed
          height="60rpx"
          style="margin-top: 40rpx"
          title="这些都是你的诗和远方吗"
          background-color="#813c85"
          color="#e2e1e4"
          @click-left="back"
      ></uni-nav-bar>
    </view>
    <view>
      <uni-list-item
          v-for="(item, index) in allList"
          :key="index"
          :title="item.date+' '+item.startTime+'至'+item.endTime"
          :note="'日程内容: '+item.scheduleFiled"
      >
        <template v-slot:footer>
          <uni-icons
              type="trash"
              color="#525288"
              @click="deleteS(item.scheduleFiled, item.date)"
              size="30"
          ></uni-icons>
        </template>
      </uni-list-item>
    </view>
	</view>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from "vue";
import {UserSchedule_delete, UserSchedule_list} from "../../hook";
const allList =  ref([])

onMounted(()=>{
  getSchedule();
})

const back = () => {
  uni.redirectTo({
    url: '/pages/index/index'
  });
};

// 获取日程
const getSchedule = async () => {
  try {
    const res = await UserSchedule_list();
    allList.value = res;
  } catch (error) {
    console.error('获取日程数据失败:', error);
  }
};


// 删除日程
const deleteS = async (s, e) => {
  try {
    await UserSchedule_delete(s, e);
    await getSchedule(); // 确保删除成功后重新获取日程数据
  } catch (error) {
    console.error('删除日程失败:', error);
  }
};

</script>

<style>

</style>
