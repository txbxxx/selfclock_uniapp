  <template>
    <view>
      <view>
        <uni-calendar
            :insert="true"
            :lunar="true"
            :start-date="'1988-5-20'"
            :end-date="'2222-5-20'"
            @change="change"
        />
      </view>

      <view>
        <uni-collapse-item   type="line" title="日程表" >
          <view>
            <uni-table border  emptyText="怎么没有日程呢，世界那么大不想去看看吗"  >
              <!-- 表头行 -->
              <uni-tr>
                <uni-th width="20%" align="center">日期</uni-th>
                <uni-th width="100rpx"  align="left">日程</uni-th>
              </uni-tr>

            </uni-table>
          </view>
        </uni-collapse-item>
      </view>
    </view>
  </template>


  <script setup>
  const change = (e) => {
    console.log(e.fulldate)
  }
  </script>


  <style lang="scss">
  /*日历今日背景颜色*/
  .uni-calendar-item--isDay[data-v-65626c58] {
    background-color: #7e1671;
  }

  /*顶部日期颜色*/
  .uni-calendar__header-text[data-v-b6ab2cfb]{
    color: #7e1671;
  }
  .uni-calendar__header-btn[data-v-b6ab2cfb]{
    border-left-color: #7e1671;
    border-top-color: #7e1671;
  }


  .uni-calendar__backtoday[data-v-b6ab2cfb]  {
    color: #7e1671;
  }

  /*星期*/
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

