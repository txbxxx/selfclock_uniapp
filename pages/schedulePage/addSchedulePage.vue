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
          title="是要去看世界吗？"
          background-color="#813c85"
          color="#e2e1e4"
          @clickLeft="back"
      ></uni-nav-bar>
    </view>

    <view class="containerSchedule">
      <uni-section title="添加日程" type="line">
        <view class="example">
          <!-- 基础表单校验 -->
          <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
            <uni-forms-item label="内容" required name="filed">
              <uni-easyinput v-model="filed" placeholder="请输入内容" />
            </uni-forms-item>
            <uni-forms-item label="时间" required name="date">
              <view class="example-body">
                <uni-datetime-picker type="datetimerange" rangeSeparator="至" @change="changeLog" />
              </view>
            </uni-forms-item>
          </uni-forms>
          <button type="primary" @click="submit">提交</button>
        </view>
      </uni-section>
    </view>
  </view>
</template>

<script setup>
import {ref, reactive, toRefs,inject } from 'vue';
import {UserSchedule_add} from '../../hook';

// 初始化表单数据
const valiFormData = reactive({
  filed: '',
  date: '',
  endDate: '',
  starTime: '',
  endTime: ''
});

// 使用 toRefs 解包
const {filed, date, starTime, endTime, endDate} = toRefs(valiFormData);


// 返回上一页
const back = () => {
  uni.redirectTo({
    url: '/pages/index/index'
  });
};

// 处理日期时间变化
const changeLog = (e) => {
  date.value = e[0].split(' ')[0];
  endDate.value = e[1].split(' ')[0];
  starTime.value = e[0].split(' ')[1];
  endTime.value = e[1].split(' ')[1];
  console.log(date.value);
  console.log(starTime.value);
  console.log(endTime.value);
};

// 校验规则
const rules = {
  filed: {
    rules: [
      {
        required: true,
        errorMessage: "请填写内容"
      }
    ]
  },
  date: {
    rules: [
      {
        required: true,
        errorMessage: "请选择时间"
      }
    ]
  }
};

// 表单引用
const valiForm = ref(null);

// 提交表单
const submit = () => {
  // 校验表单
  valiForm.value.validate().then((res) => {
    // 校验成功后提交表单
    UserSchedule_add(filed.value, date.value, starTime.value, endTime.value, endDate.value).then(()=>{
      // 回退到上级
      back()
    })
  }).catch((err) => {
    console.log('err', err);
  });
};

</script>

<style lang="scss">
.example {
  padding: 15px;
  background-color: #fff;
}

.segmented-control {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
}

.form-item {
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  align-items: center;
  height: 35px;
  margin-left: 10px;
}
</style>
