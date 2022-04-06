<template>
  <div class="event-container container">
    <h1>用户名XX的动态</h1>
    <div class="event-list">
      <EventItem v-for="(item, index) in events"
        :key="index"
        :item="item"
        @refClick="handleRefClick">
        <PicList :pics="item.pics" />
      </EventItem>
    </div>
    <div>
      {{events[0]}}
    </div>
  </div>
</template>

<script>
import EventItem from './childComps/EventItem.vue'
import PicList from '@/components/content/PicList.vue'

import {
  _getUserEvent
} from '@/network/user.js'

export default {
  name: 'UserEvent',
  components: { EventItem, PicList },
  data () {
    return {
      uid: null,
      events: [],
      lasttime: -1,
      more: false
    }
  },
  created () {},
  activated () {
    this.uid = this.$route.query.uid
    this.getUserEvent(this.uid)
  },
  methods: {
    async getUserEvent (uid, limit, lasttime) {
      const { data: res } = await _getUserEvent(uid, limit, lasttime)
      this.events = res.events
      this.lasttime = res.lasttime
      this.more = res.more
      console.log(this.events[2])
      const jsonObj = JSON.parse(this.events[2].json)
      console.log(jsonObj.song.artists)
    },
    handleRefClick (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
