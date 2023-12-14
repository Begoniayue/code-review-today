<template>
  <el-scrollbar class="avue-menu">
    <div v-if="menu&&menu.length==0&&!isHorizontal"
         class="avue-sidebar--tip">{{ $t('menuTip') }}
    </div>
    <el-menu unique-opened
             :default-active="nowTagValue"
             :mode="setting.sidebar"
             :collapse="getScreen(isCollapse)">
      <sidebar-item :menu="menu"></sidebar-item>
    </el-menu>
    <Fold v-if="!isCollapse" @click="setCollapse" class="fold-icon"/>
    <Expand v-else @click="setCollapse" class="fold-icon"/>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import sidebarItem from './sidebarItem.vue'

export default {
  name: 'sidebar',
  components: { sidebarItem },
  inject: ['index'],
  created () {
    this.index.openMenu()
  },
  computed: {
    ...mapGetters(['isHorizontal', 'setting', 'menu', 'tag', 'isCollapse', 'menuId']),
    nowTagValue () { return this.$route.path },
  },
  methods: {
    setCollapse () {
      this.$store.commit('SET_COLLAPSE')
    },
  },
}
</script>
<style lang="scss" scoped>
.fold-icon {
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  color: #86909C;
}
</style>

