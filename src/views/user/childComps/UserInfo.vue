<template>
  <div class="user-info-container">
    <el-image class="avatar-wrap" :src="user.profile.avatarUrl" fit="cover"/>
    <div class="info-wrap">
      <h1 class="info-name">{{user.profile.nickname}}</h1>
      <div class="info-detail-wrap">
        <div class="info-level">{{'Lv'+user.level}}</div>
        <div class="info-gender">{{user.profile.gender==1?'男':'女'}}</div>
        <button class="btn circle fr">more</button>
        <button class="btn round fr">关注</button>
        <button class="btn round fr">发私信</button>
      </div>
      <div class="data-wrap">
        <a class="data-item" :href="'/#/user/events?uid='+user.profile.userId">
          <h2>{{user.profile.eventCount}}</h2>
          <span>动态</span>
        </a>
        <div class="data-item">
          <h2>{{user.profile.follows}}</h2>
          <span>关注</span>
        </div>
        <div class="data-item">
          <h2>{{user.profile.followeds}}</h2>
          <span>粉丝</span>
        </div>
      </div>
      <div class="info-item">
        <span>所在地区：</span>
        <span>{{user.profile.province + user.profile.city}}</span>
      </div>
      <div class="info-item">
        <span>社交网络：</span>
        <span v-if="user.bindings.length>0">{{user.bindings[0].type}}</span>
        <span v-else>未绑定</span>
      </div>
      <div class="info-item">
        <span>个人介绍：</span>
        <span>{{user.profile.description?user.profile.description:'暂无介绍'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    handleSubs () {
      console.log('检查是否登录')
      // 检查是否登录
      this.$emit('subscribe')
      // 未登录跳转到登录页面
      // this.$store.commit('showLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.user-info-container {
  display: flex;
  // margin-bottom: 20px;
}
.avatar-wrap {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}
.info-wrap {
  flex: 1;
  margin-left: 20px;
  > * {
    margin-bottom: 15px;
  }
  .info-detail-wrap {
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    .btn {
      margin-bottom: 5px;
    }
  }
  .info-level {
    display: inline-block;
    font-size: 8px;
    padding: 0 10px;
    background-color: #eee;
    height: 12px;
    line-height: 12px;
    border-radius: 6px;
  }
  .info-gender {
    display: inline-block;
    font-size: 8px;
  }
  .user-wrap  {
    display: flex;
    align-items: center;
    .avatar-wrap {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .data-wrap {
    display: flex;
    // justify-content: space-around;
    // width: 200px;
    // position: relative;
    .data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-right: 40px;
    }
    .data-item::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 1px;
      height: 90%;
      background-color: #eee;
      right: -20px;
    }
    :nth-last-child(1)::after {
      height: 0;
    }
  }
  .info-item {
    display: flex;
    .item-content {
      width: 150px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
