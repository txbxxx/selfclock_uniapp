<template>
	<view>
		<uv-navbar title="个人中心" @leftClick="leftClick"></uv-navbar>
		<uv-tabbar :value="value"
		:border="false"
		:fixed="true"
		@change="changeButton"
		activeColor="#7e1671">
      <uv-tabbar-item v-for="(item, index) in DataTabbars" :key="index" :text="item.name" :icon="item.icon" @click="navigateTo(item.path)"></uv-tabbar-item>
    </uv-tabbar>
    <view v-if="value === 0">
      <IndexPage />
    </view>
	
	
    <view v-else-if="topath === 'content'">
      <Content />
    </view>
	
    <view v-else-if="topath === 'calendar'">

    </view>
	</view>
</template>

<script setup>
import IndexPage from "../indexPage/indexPage.vue";
import Content from "../content/content.vue";
import { ref,computed } from 'vue';

const DataTabbars = ref([
	{name: '首页', icon: 'home',path:'indexPage'},
	{name: "日程",icon:"calendar",path: 'calendar'},
	{name: "任务",icon:"bell",path: "content"}
])

const value = ref(0)
const topath = ref('')

const  changeButton = (index) =>{
	value.value = index
}

const navigateTo = (path) => {
    topath.value = path
}



const rightClick = () => {
	console.log('rightClick');
}
		
const leftClick = () => {
	console.log('leftClick');
}
		
</script>