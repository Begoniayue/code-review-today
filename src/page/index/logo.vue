<template>
  <div class="avue-logo">
    <transition name="fade">
      <img
          src="https://img.tcpjw.com/file/logo.png"
          alt=""
          style="width:32px;height: 32px"
          v-if="getScreen(isCollapse)"
          key="0"
      >
    </transition>
    <transition-group name="fade">
      <template v-if="getScreen(!isCollapse)">
        <span class="avue-logo_title"
              key="1">{{ website.indexTitle }} </span>
      </template>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'logo',
  data () {
    return {}
  },
  created () { },
  computed: {
    ...mapGetters(['isCollapse']),
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.avue-logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
