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
      <AddRelationship />
    </view>
    <view v-else >
      <view class="deskMateContainer">
        <text class="deskMateName">{{ deskmateData.name }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import {JudgeRelationshipSearch,ListRelationship} from '../../hook/index'
import AddRelationship from './addRelationship.vue';

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
  console.log(deskmateData.value);
}

</script>

<style lang="scss">
.deskMateContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 81vh;

}

.deskMateName{
  font-size: 120rpx;
  width: 40%;
  border-radius: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c08eaf;
}

</style>
