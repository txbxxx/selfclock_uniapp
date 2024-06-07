<template>
  <view>

    <view class="ziPage">
      <view v-if="topath === 'indexPage'">
        <IndexPage />
      </view>

      <view v-if="topath === 'task'">
        <TaskPage />
      </view>

      <view v-if="topath === 'calendar'">
        <SchedulePage />
      </view>
    </view>
    <uv-tabbar
        :value="value"
        :border="false"
        :statusBar="true"
        style="margin-top: 40rpx"
        @change="changeButton"
        activeColor="#7e1671"
    >
      <uv-tabbar-item
          v-for="(item, index) in DataTabbars"
          :key="index"
          :text="item.name"
          :icon="item.icon"
          @click="navigateTo(index, item.path)"
      >
      </uv-tabbar-item>
    </uv-tabbar>

  </view>
</template>

<script setup>
import IndexPage from "../indexPage/indexPage.vue";
import SchedulePage from "../schedulePage/schedulePage.vue";
import TaskPage from "../taskPage/taskPage.vue";
import { ref } from 'vue';

const DataTabbars = ref([
  { name: '首页', icon: 'home', path: 'indexPage' },
  { name: "日程", icon: "calendar", path: 'calendar' },
  { name: "任务", icon: "bell", path: "task" }
]);

const value = ref(0);
const topath = ref('indexPage');

const changeButton = (index) => {
  value.value = index;
  topath.value = DataTabbars.value[index].path;
};

const navigateTo = (index, path) => {
  value.value = index;
  topath.value = path;
};

</script>

<style>


</style>
