<script setup>
import { ref } from 'vue'
import activityComponent from './components/activity.vue'
import packingFeeComponent from './components/packing-fee.vue'
const activeKey = ref('2')

const activityData = ref({})
const packingFeeData = ref({})

const base_foods = ref({
  ft_list: [
    {
      label: '基础饭团',
      price: 17.99,
      offline_price: 6,
      index: 0,
    },
  ],
  dj_list: [
    {
      label: '黄豆浆',
      price: 6.45,
      offline_price: 3,
      index: 0,
    },
    {
      label: '五谷杂粮豆浆',
      price: 9.99,
      offline_price: 4,
      index: 1,
    },
    {
      label: '红枣豆浆',
      price: 7.88,
      offline_price: 3.5,
      index: 2,
    },
    {
      label: '黑芝麻豆浆',
      price: 7.88,
      offline_price: 3.5,
      index: 3,
    },
    {
      label: '黑豆豆浆',
      price: 7.68,
      offline_price: 3.5,
      index: 4,
    },
    {
      label: '红豆薏仁豆浆',
      price: 8.45,
      offline_price: 3.5,
      index: 5,
    },
  ],
  xl_list: [
    {
      label: '菲力牛排',
      price: 12,
      offline_price: 6,
      index: 0,
    },
    {
      label: '里脊肉',
      price: 4.99,
      offline_price: 2,
      index: 1,
    },
    {
      label: '咸蛋黄',
      price: 4.99,
      offline_price: 2,
      index: 2,
    },
    {
      label: '奥尔良腿排',
      price: 9.99,
      offline_price: 3.5,
      index: 3,
    },
    {
      label: '原味煎鸡蛋',
      price: 4.99,
      offline_price: 2,
      index: 4,
    },
    {
      label: '脆骨肠',
      price: 5.99,
      offline_price: 2,
      index: 5,
    },
    {
      label: '大肉肠',
      price: 8.2,
      offline_price: 3,
      index: 6,
    },
    {
      label: '芝士',
      price: 8.98,
      offline_price: 3.5,
      index: 7,
    },
    {
      label: '烤肠',
      price: 4.99,
      offline_price: 2,
      index: 8,
    },
    {
      label: '美式培根咸',
      price: 4.99,
      offline_price: 2,
      index: 9,
    },
    {
      label: '双汇火腿肠',
      price: 5.99,
      offline_price: 2,
      index: 10,
    },
    {
      label: '卫龙辣条',
      price: 3.2,
      offline_price: 1,
      index: 11,
    },
    {
      label: '秘制卤蛋',
      price: 4.5,
      offline_price: 2,
      index: 12,
    },
    {
      label: '海草',
      price: 3.99,
      offline_price: 1,
      index: 13,
    },
    {
      label: '泡菜',
      price: 4.99,
      offline_price: 2,
      index: 14,
    },
    {
      label: '腊肠',
      price: 4.99,
      offline_price: 2,
      index: 15,
    },
    {
      label: '鸡肉松',
      price: 3.99,
      offline_price: 2,
      index: 16,
    },
    {
      label: '油条脆',
      price: 3.99,
      offline_price: 1,
      index: 17,
    },
  ],
})
</script>

<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="1" header="我的活动" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <activityComponent v-model="activityData"></activityComponent>
    </a-collapse-panel>
  </a-collapse>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="2" header="配送设置" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <packingFeeComponent v-model="packingFeeData"></packingFeeComponent>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss"></style>
