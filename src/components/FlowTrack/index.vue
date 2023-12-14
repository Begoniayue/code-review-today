<template>
  <div id="main"/>
</template>

<script>
import * as echarts from 'echarts/core'
import { TooltipComponent } from 'echarts/components'
import { TreeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, TreeChart, CanvasRenderer])
let myChart
const chartData = {
  name: 'flare',
  children: [
    {
      name: 'data',
      children: [
        {
          name: 'converters',
          children: [
            { name: 'Converters', value: 721 },
            { name: 'DelimitedTextConverter', value: 4294 },
          ],
        },
        {
          name: 'DataUtil',
          value: 3322,
        },
      ],
    },
    {
      name: 'display',
      children: [
        { name: 'DirtySprite', value: 8833 },
        { name: 'LineSprite', value: 1732 },
      ],
    },
    {
      name: 'flex',
      children: [{ name: 'FlareVis', value: 4116 }],
    },
    {
      name: 'query',
      children: [
        { name: 'AggregateExpression', value: 1616 },
        { name: 'Not', value: 1554 },
      ],
    },
    {
      name: 'scale',
      children: [
        { name: 'LinearScale', value: 1316 },
        { name: 'LogScale', value: 3151 },
      ],
    },
  ],
}

export default {
  props: {
    applyTrackData: {
      type: Object,
      default: {},
    },
  },
  data () {
    return {
      currentName: '',
      option: {
        series: [
          {
            type: 'tree',
            zoom: 1,
            id: 0,
            name: 'tree1',
            data: [],
            top:'16%',
            symbolSize: 10,
            edgeShape: 'polyline',
            edgeForkPosition: '50%',
            initialTreeDepth: -1,// 初始化树有几层
            orient: 'TB',
            lineStyle: {
              width: 2,
            },
            roam: true,
            label: {
              position: [-100, -40],
              verticalAlign: 'middle',
              align: 'left',
              backgroundColor: '#E8F3FF',
              padding: 8,
              // width: 200,
              overflow: 'truncate',
              formatter: (params) => {
                const data = params.data
                  return [
                    `承信编号：${data.commitmentNo || '--'}`,
                    `承信金额：${data.commitmentPrice || '--'}`,
                    `${data.isFirstNode ? '登记' : '收信'}日期：${data.createTime || '--'}`,
                    `${data.isFirstNode ? '登记' : '收信'}企业：${data.currentReceiveEnterpriseName || '--'}`,
                  ].join('\n')
              },
              rich: {
                x: {
                  color: 'red'
                }
              }
            },
            labelLayout: {
              // hideOverlap: true,
              // moveOverlap: 'shiftY',
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
              },
            },
            emphasis: {
              focus: 'descendant',
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      },
    }
  },
  mounted () {
    myChart = echarts.init(document.getElementById('main'))
    // myChart.setOption(this.option)
  },
  watch: {
    applyTrackData (newVal, oldVal) {
      const { currentName, trackData } = newVal
      trackData.isFirstNode = true
      // todo 当前节点高亮
      this.currentName = currentName
      this.option.series[0].data = [trackData]
      myChart.setOption(this.option)
      document.getElementById('main').style.width = 1000 + 'px'
      document.getElementById('main').style.height = 500 + 'px'
      myChart.resize()
    },
  },
  methods: {},
  unmounted () {
    myChart.dispose()
  },
}
/*
    --很气，代码写完了发现原生支持，一个属性就解决了（2022-12-22 23:22）

    --series-tree. roam
    --是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启

    --
    :style="{width:`${width}px`,height:`${height}px`,top:`${top}px`,left:`${left}px`}"
    @mousewheel="scaleDom"
    @mousedown="mousedown"
    @mouseup="mouseup"
    @mousemove="mousemove"

    --
    width: 1000,
    height: 500,
    top: 0,
    left: 0,
    preWidth: 1000,
    preHeight: 500,
    pressDownFlag: false,
    pressX: 0,
    pressY: 0,
    ...
    scaleDom (e) {
      const div = document.getElementById('main')
      console.log(div.style.width)
      let width = parseInt(div.style.width, 10) || 500
      const delta = Math.round(e.wheelDelta)
      width += delta

      let k = width / this.preWidth     //缩放倍数
      this.width = width
      this.preWidth = width  //保存上一次宽度

      let height = Math.round(this.preHeight * k)
      this.height = height
      this.preHeight = height

      let deltaX = Math.round(width * (k - 1) / 2)
      let deltaY = Math.round(height * (k - 1) / 2)

      this.top = this.top - deltaY
      this.left = this.left - deltaX

      myChart.resize()
    },
    mousedown (e) {
      this.pressDownFlag = true
      this.pressX = e.layerX
      this.pressY = e.layerY
    },
    mouseup (e) {
      this.pressDownFlag = false
    },
    mousemove (e) {
      if (this.pressDownFlag) {
        let offsetX = e.layerX - this.pressX
        let offsetY = e.layerY - this.pressY
        this.left = this.left + offsetX
        this.top = this.top + offsetY
      }
    },

    --
    .container {
      width: 1000px;
      height: 500px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      transform: translate(0);
      cursor: pointer;
      z-index: 5;

      #main {
        border: 1px solid green;
        position: absolute;
        z-index: 3;
        zoom: 100%;
      }
    }
 */
</script>

<style scoped lang="scss">

#main {
  width: 100%;
  height: 100%;
}

</style>
