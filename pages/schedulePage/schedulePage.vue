<template>
  <view>
    <!-- 搜索组件 -->
    <view class="search-bar-container">
      <uni-search-bar placeholder="搜索日程" :radius="1" clearButton="auto" textColor="#7e1671" @confirm="search"></uni-search-bar>
      <view>
       <navigator url="/pages/addSchedulePage/addSchedulePage">
         <button @click="addSchedule" class="add-schedule-button"></button>
       </navigator>
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
          >
          </uni-list-item>
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
        <uni-list-item v-if="filteredScheduleList.length === 0" note="当前日期还没有日程，世界那么大不想去看看吗">
        </uni-list-item>
        <!-- 仅显示选中日期的任务 -->
        <uni-list-item
            v-for="(item, index) in filteredScheduleList"
            :key="index"
            @click="showTaskDetails(item)"
            :title="item.date"
            :note="item.scheduleFiled"
        >
        </uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UserSchedule_list,UserSchedule_query} from "../../hook/index";

// 页面挂载后获取日程数据
onMounted(() => {
  getSchedule();
});

// 日程数据
const scheduleList = ref([]);

// 过滤后的日程数据（根据选中的日期）
const filteredScheduleList = ref([]);

// 获取日程数据
const getSchedule = () => {
  UserSchedule_list().then(res => {
    scheduleList.value = res;
  });
};

// 点击的日期
const clickDate = ref('');

// 处理日期变化
const change = async (e) => {
  clickDate.value = e.fulldate;
  await filterScheduleList(clickDate.value);
};

// 过滤日程数据
const filterScheduleList = (date) => {
  filteredScheduleList.value = scheduleList.value.filter(item => item.date === date);
};

// 添加日程
const addSchedule = () => {
  //跳转到添加日程界面

};

//搜索的值
const searchValue = ref([]);
//搜索弹窗
const popup = ref(null);

// 搜索功能
const search = (e) => {
  // 在这里处理搜索逻辑
  UserSchedule_query(e.value).then(res => {
    searchValue.value = res
    console.log(searchValue.value.length)
    popup.value.open();
  });
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
  margin-right: 20rpx;
  background-image: url("../../icon/添加日程.png");
  background-size: contain;
  background-color: transparent;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 搜索栏样式 */
.uni-searchbar[data-v-f07ef577] {
  background-color: #ffffff;
  border: 1px solid #eee;
  border-radius: 20px;
}

.uni-input-placeholder {
  color: #7e1671 ;
}

.uni-searchbar__cancel[data-v-f07ef577] {
  color: #7e1671;
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
  font-size: 14px;
}
</style>
