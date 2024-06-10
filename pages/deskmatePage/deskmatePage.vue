<template>
  <view>
    <uni-nav-bar
        border="false"
        shadow="false"
        fixed
        style="margin-top: 40rpx"
        height="60rpx"
        title="相互进步"
        background-color="#813c85"
        color="#e2e1e4"
    >
    </uni-nav-bar>
    <view v-if="isRelathionship===false">
      <navigator
        url="/pages/deskmatePage/addRelationship"
        open-type="navigate"
        hover-class="navigator-hover"
      >
      </navigator>
    </view>
    <view v-else >
      <view class="deskMateContainer">

        <view class="buddyName ">
          <text>{{ deskmateData.name }}是你的{{ relationshipData.relationship }}</text>
        </view>
        <view class="daysBound">
          <text>绑定天数：{{ relationshipData.day }}</text>
        </view>
        <view class="timeSpentStudying">
          <text>对方学习时间:{{ deskmateData.learnDate }}</text>
        </view>
        <view class="UnBindButton">
          <text @click="deletRelation">解除</text>
        </view>
        <view class="chatButton"></view>
        <view class="reminderButton"></view>
      </view>
    </view>

    <uni-popup ref="isDeleteRelation" type="dialog">
      <uni-popup-dialog  cancelText="关闭" confirmText="同意" 
      title="小心没有后悔药" content="确认要解除关系吗!" @confirm="deletRelationEnd(deskmateData.name)"
        @close="deletRelationClose"></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import {JudgeRelationshipSearch,ListRelationship,DeleteRelationship} from '../../hook/index'


onMounted(async () => {
  await judgeRelationship()
  await getUser()
})

//接收判断用户是否绑定关系
const isRelathionship = ref(false)

//接收绑定参数
const relationshipData = ref([])

//获取当前用户关系
const judgeRelationship = async () => {
  const res = await JudgeRelationshipSearch()
  if (res === false) {
    isRelathionship.value = res
  }else{
    relationshipData.value = res
    isRelathionship.value =  true
  }
}

//接收对方用户信息
const deskmateData = ref([])

//使用用户id来查找用户
const getUser = async () => {
  const res = await ListRelationship()
  deskmateData.value = res
}


//==================解除绑定=============

//确认删除弹窗
const isDeleteRelation = ref(null)

//打卡弹窗
const deletRelation = () => {
    isDeleteRelation.value.open()
}

//关闭弹窗
const deletRelationClose = () => {
  isDeleteRelation.value.close()
}

//解除关系
const deletRelationEnd = (friendname) => {
    console.log(friendname);
    const res = DeleteRelationship(friendname).then(() =>{
      uni.redirectTo({
        url: '/pages/deskmatePage/deskmatePage'
      });
    })
}

</script>

<style lang="scss">
.deskMateContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  margin-top: 100rpx;
  background-color: #f5f5f5; // 添加背景色


  & .UnBindButton {
    position: relative; // 使用绝对定位
    width: 80px; // 调整宽度
    height: 30px; // 调整高度
    line-height: 30px; // 调整行高
    text-align: center; // 文字居中
    border-radius: 15px; // 调整圆角大小
    background-image: linear-gradient(135deg, #c08eaf, #a06ea2); // 渐变背景色
    font-size: 18px; // 调整字体大小
    color: #ffffff; // 调整文字颜色
    font-weight: bold; // 调整字体粗细
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 调整阴影效果

    &:hover {
      opacity: 0.9; // 鼠标悬停时轻微透明度变化
      cursor: pointer; // 显示指针提示用户可点击
    }
  }

  & .daysBound {
    margin-top: 20px; // 调整上边距
    font-size: 16px; // 调整字体大小
    color: #666666; // 调整文字颜色
    background-image: linear-gradient(to right, #ffafcc, #c6c6ff); // 渐变背景色
    padding: 10px; // 添加内边距
    border-radius: 25px; // 圆角
  }

  & .timeSpentStudying {
    margin-top: 10px; // 调整上边距
    font-size: 16px; // 调整字体大小
    color: #333333; // 调整文字颜色
    padding: 10px; // 添加内边距
    border-radius: 25px; // 圆角
  }

  & .buddyName {
    margin-top: 15px; // 调整上边距
    font-size: 50rpx; // 调整字体大小
    color: #111111; // 调整文字颜色
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); // 添加文字阴影
    padding: 10px; // 添加内边距
    border-bottom: 2px solid #813c85; // 下划线
  }


}
</style>

