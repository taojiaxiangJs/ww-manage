<script setup>
import { ref } from 'vue'
import activityComponent from './components/activity.vue'
import packingFeeComponent from './components/packing-fee.vue'
import foodsComponent from './components/foods.vue'
const activeKey = ref('3')

const activityData = ref({})
const packingFeeData = ref({})



const logFn = () => {
  console.log(packingFeeData.value);
}
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
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="3" header="商品配置" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <foodsComponent></foodsComponent>
    </a-collapse-panel>
  </a-collapse>
  <a-button type="primary" size="small" @click="logFn()">打印</a-button>
</template>

<style scoped lang="scss"></style>
