<template>
  <el-dialog
     v-model="visible"
    :before-close="onCancel"
    :close-on-click-modal="false"
    width="930px"
  >
    <div v-loading="imageLoading" class="view-credit-image">
      <div :class="showIndex > 0?'view_normalIcon':'view_disabledIcon'" @click="getPre"><i class="el-icon-arrow-left" /></div>
      <div v-if="imgList && imgList.length > 0">
        <el-image class="view_carousel" :src="imgList[showIndex]" :preview-src-list="imgList" />
      </div>
      <div :class="showIndex!= (imgList.length - 1) ? 'view_normalIcon':'view_disabledIcon'" @click="getNext"><i class="el-icon-arrow-right" /></div>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'ImgDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      showIndex: 0,
      imageLoading: false
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    onCancel() {
      this.$emit('close')
    },
    getPre() {
      const currentIndex = this.showIndex
      if (currentIndex !== 0) {
        this.showImageLoading()
        this.showIndex = this.showIndex - 1
      }
    },
    getNext() {
      const currentIndex = this.showIndex
      const allImagesLength = this.imgList.length
      if (currentIndex < allImagesLength - 1) {
        this.showImageLoading()
        this.showIndex = this.showIndex + 1
      }
    },
    showImageLoading() {
      const self = this
      this.imageLoading = true
      // 图片切换效果loading
      setTimeout(() => {
        self.imageLoading = false
      }, 500)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.view-credit-image{
  display: flex;
  .view_carousel{
    width: 800px;
    height: 500px;
  }
  .view_normalIcon {
    width:50px;
    cursor:pointer;
    font-size:45px;
    color:#409eff !important;
    margin-top:300px;
    font-weight: bold;
  }
  .view_disabledIcon {
    width:50px;
    font-size:45px;
    color:#888282 !important;
    margin-top:300px;
    font-weight: bold;
    cursor:not-allowed;
  }
}
</style>
