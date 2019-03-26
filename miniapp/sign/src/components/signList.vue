<template>
  <div class="wrap">
    <ul v-if="list.length">
      <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
        <p>
          <span>{{item.company}}</span>
          <span :class="'tag'+(item.status+2)">{{item.status?item.status==1?'已放弃':'未开始':'已打卡'}}</span>
        </p>
        <p>{{item.address.address}}</p>
        <p>
          <span>面试时间: {{item.start_time}}</span>
          <span :class="'tag'+(2-item.status)">{{item.remind?'未提醒':'已提醒'}}</span>
        </p>
      </li>
    </ul>
    <p v-else class="none">当前分类还没有面试!</p>
  </div>
</template>

<script>


export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    goDetail(id){
      wx.navigateTo({ url: '/pages/sign/detail/main?id='+id });
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  padding-top: 88rpx;
}
li{
  border-top: 20rpx solid #eee;
  // margin-top: 20rpx;
  width: 100%;
  padding: 10rpx 30rpx;
  box-sizing: border-box;
  p{
    display:flex;
    line-height: 1.5;
    margin: 15rpx 0;
    align-items: center;
    justify-content: space-between;
  }
  p:nth-child(1){
    span:first-child{
      color: #000;
      font-size: 44rpx;
      font-weight: 500;
    }
    span:last-child{
      font-size: 30rpx;
      padding: 5rpx 10rpx;
    }
  }
  p:nth-child(2){
    font-size: 32rpx;
    color: #999;
    line-height: 1.2;
    overflow: hidden;
    text-overflow:ellipsis;//文本溢出显示省略号
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  p:nth-child(3){
    font-size: 34rpx;
    color: #666;
    span:last-child{
      padding: 5rpx 10rpx;
    }
  }
}
.tag1{
  background-color: rgba(144,147,153,.1);
  border-color: rgba(144,147,153,.2);
  color: #909399
}
.tag2{
  background-color: rgba(64,158,255,.1);
  color: #409eff;
  border: 1px solid rgba(64,158,255,.2);
}
.tag3{
  background-color: rgba(245,108,108,.1);
  border-color: rgba(245,108,108,.2);
  color: #f56c6c;
}
.none{
  padding: 100rpx 0;
  text-align: center;
  font-size: 30rpx;
  color: #666;
}
</style>
