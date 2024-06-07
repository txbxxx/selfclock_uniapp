<template>
  <view>
    <uni-nav-bar
        border="false"
        shadow="false"
        fixed
        style="margin-top: 40rpx"
        height="60rpx"
        title="任务列表"
        background-color="#813c85"
        color="#e2e1e4"
    >
    </uni-nav-bar>
    <uni-section class="mb-10" title="任务列表" type="line">
      <template v-slot:right>
        <uv-icon name="plus-circle" color="#983680" size="24" @click="addTask" ></uv-icon>
      </template>
      <view v-for="(task, index) in tasks" :key="index">
        <uv-list :border="true">
          <uv-list-item :title="task.taskName" :note="task.taskField" ellipsis="8">
            <template v-slot:header>
              <view class="slot-box slot-text-header">
                <uni-tag text=" " :circle="true" :style="{backgroundColor: task.color}"></uni-tag>
              </view>
            </template>
            <template v-slot:footer>
              <uv-icon name="edit-pen" color="#983680" size="24" @click="" ></uv-icon>
              <uv-icon name="trash" color="#983680" size="24" @click=""  ></uv-icon>
              <view class="slot-box">
                <uni-data-checkbox
                    :multiple="true"
                    :localdata="[{value: index, text:''}]"
                    :v-model="value"
                    @change=""
                    selectedColor="#7e1671"
                />
              </view>
            </template>
          </uv-list-item>
        </uv-list>
      </view>
    </uni-section>
  </view>
</template>




<script setup>
import { ref ,onMounted} from 'vue'
import {UserTask_list} from "../../hook";

onMounted(() => {
  getTaskList()
})

//
const value = ref(0)


//任务列表
const tasks = ref()

// 获取任务列表
const getTaskList = () => {
  UserTask_list().then(res => {
    // 假设返回的任务列表中每个任务对象都有 taskName 属性
    tasks.value = res.map(task => ({
      taskName: task.taskName,
      taskField: task.taskField,
      completed: false,// 初始状态都设置为未完成
      color: getColorByLevel(task.taskLevel) // 根据任务等级设置颜色
    }))
    console.log(tasks.value.color)
  })
}
// 根据任务等级返回对应的颜色
const getColorByLevel = (level) => {
  console.log(level)
  switch (level) {
    case 1:
      return '#12a182'; // 绿色
    case 2:
      return '#d2b42c'; // 黄色
    case 3:
      return '#fba414'; // 橙色
    case 4:
      return '#ef82a0'; // 红色
    default:
      return '#CCCCCC'; // 默认灰色
  }
}

//添加任务
const addTask = () => {
  uni.navigateTo({
    url: '/pages/task/addTask'
  })
}

</script>



<style lang="scss">
.slot-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.slot-text-header{
  flex:0.1;
  font-size: 19px;
}


.uni-tag--default[data-v-1f94d070]{
  color: #5c2223;
  font-size: 15px;
}

.uni-data-checklist .checklist-group .checklist-box .checkbox__inner[data-v-2f788efd]{
  border: 2px solid #2c2c2c;
  height: 50rpx;
  width: 50rpx;
  margin-left: 40rpx;
}

/*标题的line颜色*/
.uni-section .uni-section-header__decoration[data-v-637fd36b]{
  background-color: #7e1671;
}
</style>


