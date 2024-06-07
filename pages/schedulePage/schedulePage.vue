<template>
  <view>
    <view class="navbar-container">
      <uni-nav-bar
          border="false"
          shadow="false"
          fixed
          height="60rpx"
          title="诗和远方"
          style="margin-top: 40rpx"
          background-color="#813c85"
          color="#e2e1e4"
      ></uni-nav-bar>
    </view>
    <!-- 搜索组件 -->
    <view class="search-bar-container">
      <uni-search-bar
          placeholder="搜索日程"
          :radius="1"
          clearButton="auto"
          textColor="#7e1671"
          @confirm="search"
      ></uni-search-bar>
      <view class="add_schedule">
        <uni-icons
          type="calendar"
          color="#815c94"
          @click="listAllSchedulePage"
          size="30"
      ></uni-icons>

        <uni-icons
            type="plus"
            @click="navigateToAddSchedulePage"
            size="30"
            color="#4e2a40"
        ></uni-icons>
      </view>
    </view>
    <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">

      <!--搜索到的字段-->
      <uni-list v-if="searchValue.length > 0">
        <uni-list-item
            v-for="(item, index) in searchValue"
            :key="index"
            :title="item.date"
            :note="item.scheduleFiled"
        ></uni-list-item>
      </uni-list>
    </uni-popup>

    <!-- 日历组件 -->
    <view class="calendar">
      <uni-calendar
          :insert="true"
          :lunar="true"
          :start-date="'1988-5-20'"
          :end-date="'2222-5-20'"
          @change="change"
      />
    </view>

    <!-- 日程表组件 -->
    <view class="schedule-list">
      <uni-list>
        <uni-list-item
            v-if="filteredScheduleList.length === 0"
            note="当前日期还没有日程，世界那么大不想去看看吗"
        >
        </uni-list-item>
        <!-- 仅显示选中日期的任务 -->
        <uni-list-item
            v-for="(item, index) in filteredScheduleList"
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
      </uni-list>
    </view>
  </view>
</template>

<script setup>
import {ref, onMounted, nextTick,onUnmounted} from 'vue';
import {UserSchedule_list, UserSchedule_query, UserSchedule_delete} from '../../hook/index';

// 页面挂载后获取日程数据
onMounted(async () => {
  await nextTick();
  await getSchedule();
  // 获取当前日期并初始化显示
  const today = new Date();
  const formattedDate = formatDate(today);
  clickDate.value = formattedDate;
  await filterScheduleList(formattedDate);

});


// 格式化日期为 'yyyy-MM-dd'
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 日程数据
const scheduleList = ref([]);

// 过滤后的日程数据（根据选中的日期）
const filteredScheduleList = ref([]);

// 获取日程数据
const getSchedule = async () => {
  try {
    const res = await UserSchedule_list();
    scheduleList.value = res;
    await filterScheduleList(clickDate.value); // 获取新数据后重新过滤
  } catch (error) {
    console.error('获取日程数据失败:', error);
  }
};

// 点击的日期
const clickDate = ref('');

// 处理日期变化
const change = async (e) => {
  clickDate.value = e.fulldate;
  await filterScheduleList(clickDate.value);
};

// 过滤日程数据
const filterScheduleList = async (date) => {
  filteredScheduleList.value = scheduleList.value.filter(item => item.date === date);
};

// 跳转到添加日程页面
const navigateToAddSchedulePage = () => {
  uni.navigateTo({
    url: '/pages/schedulePage/addSchedulePage',
    success: () => {
      console.log('跳转到添加日程页面成功');
    },
  });
};

//跳转到所有日程列表
const listAllSchedulePage = () => {
  uni.navigateTo({
    url: '/pages/schedulePage/listSchedule',
  });
};

// 搜索的值
const searchValue = ref([]);
// 搜索弹窗
const popup = ref(null);

// 搜索功能
const search = async (e) => {
  // 在这里处理搜索逻辑
  try {
    const res = await UserSchedule_query(e.value);
    searchValue.value = res;
    popup.value.open();
  } catch (error) {
    console.error('搜索失败:', error);
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

<style lang="scss">
/* 搜索栏和按钮容器 */
.search-bar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  background-color: #f8f8f8;
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 2;
}

/* 添加日程按钮样式 */
.add-schedule-button {
  width: 60rpx;
  height: 60rpx;
  border: none;
  border-radius: 5px;
}

/* 搜索栏样式 */
.uni-searchbar[data-v-f07ef577] {
  background-color: #ffffff;
  border: 1px solid #eee;
  border-radius: 20px;
}

.uni-input-placeholder {
  color: #7e1671;
}

.uni-searchbar__cancel[data-v-f07ef577] {
  color: #7e1671 !important;
}

/* 日历组件样式 */
.calendar {
  margin-top: 10px;
}

.uni-calendar-item--isDay[data-v-65626c58] {
  background-color: #7e1671;
}

.uni-calendar__header-text[data-v-b6ab2cfb] {
  color: #7e1671;
}

.uni-calendar__header-btn[data-v-b6ab2cfb] {
  border-left-color: #7e1671;
  border-top-color: #7e1671;
}

.uni-calendar__backtoday[data-v-b6ab2cfb] {
  color: #7e1671;
}

.uni-calendar__weeks-day-text[data-v-b6ab2cfb] {
  color: #7e1671;
  font-weight: bold;
}

.uni-calendar-item--isDay-text[data-v-65626c58] {
  color: #c8adc4;
}

.uni-calendar-item--checked[data-v-65626c58] {
  border: 30px;
  background-color: #8b2671;
}

/* 日程表样式 */
.schedule-list {
  margin-top: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-top: 1px solid #eee;
}

.uni-list-item__content-title[data-v-c7524739] {
  color: #ba2f7b;
  font-weight: bold;
  font-size: 16px;
}

.uni-list-item__content-note[data-v-c7524739] {
  color: #c8adc4;
  font-size: 16px;
}
</style>
