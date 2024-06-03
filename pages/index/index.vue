<template>
	<view>
		
		<uv-tabbar :value="value" @change="index=>value = index">
			<uv-tabbar-item text="首页" icon="home"></uv-tabbar-item>
			<uv-tabbar-item text="日程" icon="photo"></uv-tabbar-item>
			<uv-tabbar-item text="任务" icon="play-right"></uv-tabbar-item>
		</uv-tabbar>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const value = ref(0)
function rightClick() {
            console.log('rightClick');
        }
		
function leftClick() {
            console.log('leftClick');
        }
		
</script>