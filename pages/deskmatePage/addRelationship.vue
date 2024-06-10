<template>
	<view>
		<view class="container">
      <view class="bind-section">
        <uni-section title="绑定同桌" type="line">
          <uni-forms
            :modelValue="relathionshipFrom">
            <uni-forms-item>
              <uni-easyinput  v-model="friendname" placeholder="请输入对方的用户名" class="input-relation" />
            </uni-forms-item>
            <uni-forms-item>
              <uni-easyinput v-model="relationship" placeholder="请输入你们要绑定的关系" class="input-relation" />
            </uni-forms-item>
            <button class="btn_relation" @click="submitRelationship">提交</button>
          </uni-forms>
        </uni-section>
      </view>
    </view>
	</view>
</template>

<script setup>
import { ref,reactive,toRefs } from 'vue'
import { BindRelationship } from '../../hook';

//接收表单参数
const relathionshipFrom = reactive({
  friendname: '',
  relationship: ''
})

const {friendname,relationship} = toRefs(relathionshipFrom)


//添加关系
const submitRelationship = () =>{
   const res = BindRelationship(friendname.value,relationship.value).then(
   uni.redirectTo({
     url: 'pages/deskmatePage/deskmatePage'
   })
  )
}

</script>

<style>
.container{
  padding-top: 60rpx;
}

.btn_relation{
  width: 600rpx;
}


</style>
