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
    <view class="search-bar-container">
      <uni-search-bar
          :radius="1"
          style="height: 60rpx; width: 700rpx;background-color: #ede3e7 "
          clearButton="auto"
          textColor="#7e1671"
          @confirm="search"
      ></uni-search-bar>
    </view>
    <uni-section class="mb-10" title="任务列表" type="line">
      <template v-slot:right>
        <uv-icon name="plus-circle" color="#983680" size="24" @click="addTask"></uv-icon>
      </template>

      <view v-for="(task, index) in tasks" :key="index">
        <uv-list :border="true">
          <uv-list-item :title="task.taskName" :note="task.taskField" ellipsis="8"  :class="{'completed-task': task.isOver}" >
            <template v-slot:header>
              <view class="slot-box slot-text-header">
                <uni-tag text=" " :circle="true" :style="{backgroundColor: task.color}"></uni-tag>
              </view>
            </template>
            <template v-slot:footer>
              <uv-icon name="edit-pen" color="#983680" size="24" @click="updateTask(task.taskField,task.taskName, task.taskLevel)"></uv-icon>
              <uv-icon name="trash" color="#983680" size="24" @click="deleteTask(task.taskName)"></uv-icon>
              <view class="slot-box">
                <uni-data-checkbox
                    class="checkbox-box"
                    :multiple="true"
                    :localdata="[{value: index,text: ''}]"
                    :v-model="task.isOver"
                    @change="checkData(index)"
                    selectedColor="#7e1671"
                />
              </view>
            </template>
          </uv-list-item>
        </uv-list>
      </view>
    </uni-section>
    <!-- 添加表单弹出层 -->
    <uni-popup ref="popup" type="dialog" style="text-decoration: line-through;" borderRadius="20rpx 20rpx 20rpx 20rpx">
      <view class="popup-content">
        <uni-section title="添加任务" type="line">
          <view class="form-container">
            <!-- 基础表单校验 -->
            <uni-forms ref="valiForm" :rules="rules" :modelValue="addFiled">
              <uni-forms-item required name="taskName">
                <uni-easyinput styles="width: 40rpx;" v-model="taskName" placeholder="请输入你即将要完成的任务名" clearable />
              </uni-forms-item>
              <uni-forms-item required name="taskFiled">
                <uni-easyinput v-model="addFiled.taskFiled" placeholder="那么他有些什么内容呢？" type="textarea" autoHeight clearable />
              </uni-forms-item>
              <uni-forms-item name="level">
                <uni-data-select
                    v-model="value"
                    label="选择任务等级"
                    :localdata="range"
                    @change="level($event)"
                >
                </uni-data-select>
              </uni-forms-item>
            </uni-forms>
            <view class="button-group">
              <button type="default" size="mini" @click="closePopup">取消</button>
              <button type="primary" size="mini" @click="submit">提交</button>
            </view>
          </view>
        </uni-section>
      </view>
    </uni-popup>
    <!--修改表单弹出层-->
    <uni-popup ref="popupEdit" type="dialog" borderRadius="20rpx 20rpx 20rpx 20rpx">
      <view class="popup-content">
        <uni-section title="添加任务" type="line">
          <view class="form-container">
            <uni-forms ref="valiForm" :rules="rules" :modelValue="updateBeforData">
              <uni-forms-item required name="taskName">
                <uni-easyinput  styles="width: 40rpx;" v-model="updateBeforData.taskName" placeholder="请输入你即将要完成的任务名" clearable />
              </uni-forms-item>
              <uni-forms-item required name="taskFiled">
                <uni-easyinput v-model="updateBeforData.taskFiled" placeholder="那么他有些什么内容呢？" type="textarea" autoHeight clearable />
              </uni-forms-item>
              <uni-forms-item name="level">
                <uni-data-select
                    v-model="updateBeforData.taskLevel"
                    :localdata="range"
                    @change="level($event)"
                >
                </uni-data-select>
              </uni-forms-item>
            </uni-forms>
            <view class="button-group">
              <button type="default" size="mini" @click="closePopupEdit">取消</button>
              <button type="primary" size="mini" @click="submitAferData">提交</button>
            </view>
          </view>
        </uni-section>
      </view>
    </uni-popup>
  </view>
</template>




<script setup>
import { ref, onMounted, reactive, toRefs } from 'vue'
import {UserTask_list, UserTask_add, UserTask_delete, UserTask_update, UserTask_updateStatus} from '../../hook';

//=============================获取任务================================
onMounted(() => {
  getTaskList()
})

const value = ref(1)

// 任务列表
const tasks = ref([])

// 获取任务列表
const getTaskList = () => {
  UserTask_list().then(res => {
    tasks.value = res.map(task => ({
      taskName: task.taskName,
      taskField: task.taskField,
      taskLevel: task.taskLevel,
      isOver: task.isOver, //获取任务是否完成
      color: getColorByLevel(task.taskLevel) // 根据任务等级设置颜色
    }))
  })
}

// 根据任务等级返回对应的颜色
const getColorByLevel = (level) => {
  switch (level) {
    case 4:
      return '#12a182'; // 绿色
    case 3:
      return '#d2b42c'; // 黄色
    case 2:
      return '#fba414'; // 橙色
    case 1:
      return '#ef82a0'; // 红色
    default:
      return '#CCCCCC'; // 默认灰色
  }
}

// ===============添加任务=======================
// 弹出层
const popup = ref(null);

const addTask = () => {
  popup.value.open();
}

const closePopup = () => {
  popup.value.close();
}

// 接受输入的值
const addFiled = reactive({
  taskFiled: '',
  taskName: '',
  taskLevel: '',
  isOver: '',
})

const { taskFiled, taskName, taskLevel,isOver } = toRefs(addFiled)

// 任务等级
const range = [
  {
    text: '重要且紧急',
    value: 1
  },
  {
    text: '重要不紧急',
    value: 2
  },
  {
    text: '紧急不重要',
    value: 3
  },
  {
    text: '不重要不紧急',
    value: 4
  }
]

// 校验规则
const rules = {
  taskFiled: {
    rules: [
      {
        required: true,
        errorMessage: "请填写内容"
      }
    ]
  },
  taskName: {
    rules: [
      {
        required: true,
        errorMessage: "请填写任务名"
      }
    ]
  }
};

// 表单引用
const valiForm = ref(null);

// 提交表单
const submit = () => {
  if (valiForm.value) {
    // 校验表单
    valiForm.value.validate().then(() => {
      // 校验成功后提交表单
      UserTask_add(taskFiled.value, taskName.value, taskLevel.value).then(() => {
        // 刷新任务列表
        getTaskList();
        // 关闭弹出层
        closePopup();
      })
    }).catch((err) => {
      console.log('err', err);
    });
  }
};

//任务等级
const level = (e) => {
  addFiled.taskLevel = e
}


//==================删除任务===================
const deleteTask = (taskName) => {
  UserTask_delete(taskName).then(() => {
    getTaskList()
  })
}



//=================修改任务====================

//获取需要修改任务的值
const updateBeforData = ref({
  taskFiled: '',
  taskName: '',
  taskLevel: '',
  oldtaskname: '',
})
//弹出修改框
const popupEdit = ref(null);
const updateTask = (taskFiled,taskname,tasklevel) => {
  updateBeforData.value.oldtaskname = taskname
  updateBeforData.value.taskFiled= taskFiled
  updateBeforData.value.taskName= taskname
  updateBeforData.value.taskLevel= tasklevel

  popupEdit.value.open();
}

const closePopupEdit = () => {
  popupEdit.value.close();
}
//修改任务内容
const submitAferData = () => {
  console.log(updateBeforData.value.oldtaskname)
  UserTask_update(updateBeforData.value.taskFiled,updateBeforData.value.taskName,updateBeforData.value.taskLevel,updateBeforData.value.oldtaskname).then(() => {
    getTaskList()
    closePopupEdit()
  })
}


//===================多选框选中增加删除线============================
//是否选中
const checkData = (index) => {
  //更新用户状态
  if(!tasks.value[index].isOver) {
    UserTask_updateStatus(tasks.value[index].taskName,1).then(() => {
      getTaskList()
    })
  }else {
    tasks.value[index].completed = !tasks.value[index].completed
    UserTask_updateStatus(tasks.value[index].taskName,0).then(() => {
      getTaskList()
    })
  }

}

</script>




<style lang="scss">
.slot-box {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.slot-text-header {
  flex: 0.1;
  font-size: 19px;
}

.uni-tag--default {
  color: #5c2223;
  font-size: 15px;
}

/*复选框*/
.uni-data-checklist .checklist-group .checklist-box .checkbox__inner[data-v-2f788efd]{
  border: 2px solid #1e131d ;
  height: 50rpx;
  width: 50rpx;
  margin-left: 40rpx;
}

/*复选框内icon*/
.uni-data-checklist .checklist-group .checklist-box .checkbox__inner .checkbox__inner-icon[data-v-2f788efd]{
  height: 20rpx;
  width: 20rpx;
}


/* 标题的 line 颜色 */
.uni-section .uni-section-header__decoration {
  background-color: #7e1671 !important;
}

/* 弹出层 */
.popup-content {
  height: 700rpx;
  width: 700rpx;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
}

.form-container {
  padding: 20rpx;
  background-color: #f7f7f7;
  border-radius: 10rpx;
}

.uni-forms-item {
  margin-bottom: 20rpx;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20rpx;
}

button {
  flex: 1;
  margin: 0 10rpx;
}

/*是否完成样式*/
.completed-task {
  position: relative;
  color: #1e131d;
  opacity: 0.6; /* 改变文本颜色使其变淡 */

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    height: 2px;
    background: linear-gradient(to right, #ff7e79, #ef82a0, #cda2ab);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%);
  }

  /* 增加文字阴影 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}


/*搜索组件内部input*/
.uni-searchbar__box[data-v-f07ef577]{
  height: 60rpx;
}

</style>




