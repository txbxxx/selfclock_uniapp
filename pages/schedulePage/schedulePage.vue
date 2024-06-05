<template>
  <view>
    <!-- 日历组件 -->
    <view>
      <uni-calendar
          :insert="true"
          :lunar="true"
          :start-date="'1988-5-20'"
          :end-date="'2222-5-20'"
          @change="change"
      />
    </view>

    <!-- 日程表组件 -->
    <view>
      <uni-collapse>
          <uni-collapse-item type="line" title="日程表" accordion>
            <view>
              <uni-list>
                <uni-list-item title="任务1" note="任务1的描述" />
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
          </uni-collapse-item>
      </uni-collapse>
    </view>

    <!-- 弹出层 -->
    <uni-popup v-model:show="showPopup" position="bottom" style="height: 80%">
      <!-- 任务详情内容 -->
      <view>
        <text>任务详情内容</text>
        <view>{{ taskDetails }}</view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, onMounted,nextTick,} from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { UserSchedule_list } from "../../hook/index";
import UniListItem from "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.vue";
import UniCollapse from "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue";


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
const change = async  (e) => {
  clickDate.value = e.fulldate;
  await  filterScheduleList(clickDate.value);
};

// 过滤日程数据
const filterScheduleList =  (date) => {
  console.log(scheduleList.value)
  filteredScheduleList.value = scheduleList.value.filter(item => item.date === date)
  console.log(filteredScheduleList.value)
};

// 是否展示弹出层
const showPopup = ref(false);

// 任务详情内容
const taskDetails = ref({});

// 显示任务详情
const showTaskDetails = (task) => {
  console.log('用户点击了任务：', task);
  taskDetails.value = task;
  showPopup.value = true;
};

</script>

<style lang="scss">
/* 日历今日背景颜色 */
.uni-calendar-item--isDay[data-v-65626c58] {
  background-color: #7e1671;
}
/* 顶部日期颜色 */
.uni-calendar__header-text[data-v-b6ab2cfb]{
  color: #7e1671;
}
.uni-calendar__header-btn[data-v-b6ab2cfb]{
  border-left-color: #7e1671;
  border-top-color: #7e1671;
}
.uni-calendar__backtoday[data-v-b6ab2cfb] {
  color: #7e1671;
}
/* 星期 */
.uni-calendar__weeks-day-text[data-v-b6ab2cfb]{
  color: #7e1671; /*魏紫*/
  font-weight: bold;
}
.uni-calendar-item--isDay-text[data-v-65626c58]{
  color: #c8adc4; /*凤信紫*/
}
.uni-calendar-item--checked[data-v-65626c58] {
  background-color: #8b2671;
}
</style>
