<script setup>
import { ref, reactive } from 'vue'
import activityComponent from './components/activity.vue'
import deliveryComponent from './components/delivery.vue'
import foodsComponent from './components/foods.vue'
import { accAdd, accSub } from '@/utils/utils'
const activeKey = ref('1')

const activityData = reactive({})
const deliveryData = reactive({})

// 计算活动后的金额
const countActivityFee = (amount, type) => {
  const activity = [...activityData.activity[type]]
  const checkedList = activity.filter((e) => e.isCheck)
  const useOnce = checkedList.filter((e) => e.use_type)
  const useMore = checkedList.filter((e) => !e.use_type)
  const onceDerateFee = getDerateFee(useOnce, amount)
  const moreDerateFee = getDerateFee(useMore, amount)
  let max = amount
  moreDerateFee.forEach((e) => {
    max = accSub(max, e.value)
  })
  let min = max
  onceDerateFee.forEach((e) => {
    min = accSub(min, e.value)
  })
  return [min, max]
}
const getDerateFee = (list, amount) => {
  let res = []
  list.forEach((e) => {
    if (e.value_type === 0) {
      res.push({ value: e.value[0].reduced, label: e.name })
    } else {
      let list = e.value.sort((a, b) => a.reach - b.reach)
      let max = list.length - 1
      while (max >= 0) {
        if (amount >= list[max].reach) {
          res.push({ value: list[max].reduced, label: list[max].name })
          max = -1
        } else {
          max--
        }
      }
    }
  })
  return res
}

const type = ref('')
const amount = ref('30')

// 计算最终价格
const count = (t) => {
  type.value = t
  getAllCol(t)
}

const getAllCol = (type) => {
  let activityList = countActivityFee(amount.value, type)
  console.log(activityList, deliveryData)

  let timesList = deliveryData?.delivery[type]?.rules?.time?.rule || []
  let distanceList = deliveryData?.delivery[type]?.rules?.distance?.rule || []
  let col = {}
  activityList.forEach((e, i) => {
    col.name = i ? '商家补贴优惠后金额（max）' : '商家补贴优惠后金额（min）'
    col.value = e
    col.rule = null
    if (timesList.length) {
      col.children = []
      timesList.forEach((t) => {
        let obj_t = {
          name: '时段',
          value: `${t.min}-${t.max}`,
          rule: t,
          children: [],
        }
        distanceList.forEach((d) => {
          let obj_d = {
            name: '距离（KM）',
            value: `${d.min}-${d.max}`,
            rule: d,
            children: [
              {
                name: '预计收入',
                ...getPrice(e, t, d, type),
              },
            ],
          }
          obj_t.children.push(obj_d)
        })
        col.children.push(obj_t)
      })
    }
  })
}

const getPrice = (money, time, distance, type) => {
  let range = deliveryData?.delivery[type]?.range
  let t = Number(accAdd(accMul(time.rate, time.size), time.baseFee))
  let time_sub = t > time.minFee ? t : time.minFee
  let d_min = Number(accAdd(accMul(accMul(distance.rate, distance.size), distance.min), distance.baseFee))
  let d_max = Number(accAdd(accMul(accMul(distance.rate, distance.size), distance.max), distance.baseFee))
  let distance_sub_min = d_min > distance.minFee ? d_min : distance.minFee
  let distance_sub_max = d_max > distance.minFee ? d_max : distance.minFee
  console.log(money, time, distance)
  return 1
}

const logFn = () => {
  console.log(JSON.parse(JSON.stringify(activityData)), JSON.parse(JSON.stringify(deliveryData)))
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
