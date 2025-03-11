<script setup>
import { ref, reactive} from 'vue'
import activityComponent from './components/activity.vue'
import deliveryComponent from './components/delivery.vue'
import foodsComponent from './components/foods.vue'
import { accAdd, accSub } from '@/utils/utils'
const activeKey = ref('1')

const activityData = reactive({})
const deliveryData = reactive({})

const countActivityFee = (amount, type)=> {
  activityData[type].forEach(e=> {

  })
}

const type = ref('')
const amount = ref('30')
const count = (type)=> {
  type.value = type
  let activityList = countActivityFee(amount.value, type)
  console.log(activityList);
}
const logFn = () => {
  console.log(JSON.parse(JSON.stringify(activityData)),JSON.parse(JSON.stringify(deliveryData)));
}
</script>

<template>
  <a-space wrap>
    <a-button type="primary" size="small" @click="logFn()">打印</a-button>
    <a-button type="primary" size="small" @click="count('mt')">美团试算</a-button>
    <a-button type="primary" size="small" @click="count('ele')">饿了么试算</a-button>
  </a-space>
  <div p-4></div>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="3" header="基础商品" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <foodsComponent></foodsComponent>
    </a-collapse-panel>
  </a-collapse>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="1" header="我的活动" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <activityComponent v-model="activityData"></activityComponent>
    </a-collapse-panel>
  </a-collapse>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="2" header="配送设置" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <deliveryComponent v-model="deliveryData"></deliveryComponent>
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss"></style>
