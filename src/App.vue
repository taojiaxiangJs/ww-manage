<script setup>
import { ref, reactive } from 'vue'
import activityComponent from './components/activity.vue'
import deliveryComponent from './components/delivery.vue'
import foodsComponent from './components/foods.vue'
import { accAdd, accSub, accMul, accDiv } from '@/utils/utils'
const activeKey = ref('1')

const activityData = reactive({})
const deliveryData = reactive({})

// 计算商家优惠后的金额
const countActivityFee = (amount, type) => {
  const activity = [...activityData.activity[type]]
  const checkedList = activity.filter((e) => e.isCheck)
  const useOnce = checkedList.filter((e) => e.use_type)
  const useMore = checkedList.filter((e) => !e.use_type)
  const onceDerateFee = getDerateFee(useOnce, amount)
  const moreDerateFee = getDerateFee(useMore, amount)
  let max = amount
  let subsidy_max = 0
  moreDerateFee.forEach((e) => {
    subsidy_max = accAdd(subsidy_max, e.value)
    max = accSub(max, e.value)
  })
  let min = max
  let subsidy_min = subsidy_max
  onceDerateFee.forEach((e) => {
    subsidy_min = accAdd(subsidy_min, e.value)
    min = accSub(min, e.value)
  })
  return {
    subsidy: [subsidy_min, subsidy_max],
    discounts: [min, max]
  }
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

const amount = ref('50')     // 商品小计
const countResult = ref([])  // 计算结果
const subsidyList = ref([])  // 商家对顾客的活动补贴
const discountsList = ref([])// 商品优惠后的价格
const randerDiscountsList = ref([])// 商品优惠后的价格(页面渲染用)
// 计算最终价格 
const count = (type) => {
  let { subsidy, discounts } = countActivityFee(amount.value, type)
  discountsList.value = discounts
  subsidyList.value = subsidy
  console.log(discounts, subsidy)

  let timesList = deliveryData?.delivery[type]?.rules?.time?.rule || []
  let distanceList = deliveryData?.delivery[type]?.rules?.distance?.rule || []
  let brokerageList = deliveryData?.delivery[type]?.rules?.brokerage?.rule || []
  discounts.forEach((e, i) => {
    let col = {}
    col.name = i ? '商家补贴优惠后金额（max）' : '商家补贴优惠后金额（min）'
    col.value = e
    col.rule = null
    let brokerage_sub = 0
    if(brokerageList.length) {
      brokerageList.forEach((b) => {
        if(Number(b.min) <= Number(e) && (!b.max || Number(b.max) >= Number(e))) {
          brokerage_sub = accAdd(accMul(accDiv(accSub(e, b.min), b.size), b.rate), b.baseFee)
        }
      })
    }
    if (timesList.length) {
      col.children = []
      timesList.forEach((t) => {
        let obj_t = {
          name: '时段',
          value: `${t.min}-${t.max}`,
          rule: t,
          children: [],
        }
        if(distanceList.length) {
          distanceList.forEach((d) => {
            let obj_d = {
              name: '距离（KM）',
              value: `${d.min}-${d.max}`,
              rule: d,
              children: [
                {
                  name: '预计收入',
                  value: getPrice(e, brokerage_sub, t, d, type),
                },
              ],
            }
            obj_t.children.push(obj_d)
          })
        }
        col.children.push(obj_t)
      })
    }
    countResult.value.push(col)
  })
  console.log(JSON.parse(JSON.stringify(countResult.value)));
  randerDiscountsList.value = formatResult(countResult.value)
}

const getPrice = (money, brokerage_sub, time, distance, type) => {
  let range = deliveryData?.delivery[type]?.range
  let t = Number(accAdd(accMul(time.rate, time.size), time.baseFee))
  let time_sub = t > time.minFee ? t : time.minFee
  let d_min = Number(accAdd(accMul(accMul(distance.rate, distance.size), distance.min), distance.baseFee))
  let d_max = distance.max ? Number(accAdd(accMul(accMul(distance.rate, distance.size), distance.max), distance.baseFee)) : null
  let distance_sub_min = d_min > distance.minFee ? d_min : distance.minFee
  let distance_sub_max = d_max ? (d_max > distance.minFee ? d_max : distance.minFee) : null
  let subtotal_min = accSub(accSub(accSub(money, time_sub), brokerage_sub), distance_sub_min)
  let subtotal_max = distance_sub_max ?accSub(accSub(accSub(money, time_sub), brokerage_sub), distance_sub_max) : '∞'
  // console.log(money, time_sub, brokerage_sub, distance_sub_min, distance_sub_max, `${subtotal_min} - ${subtotal_max}`);
  return `${subtotal_min} - ${subtotal_max}`
}

const formatResult = (result) => {
  let arr = []
  const deep = (list, index) => {
    list.forEach((e) => {
      let obj = { value: e.value, name: e.name }
      if(!arr[index] || !arr[index][e.name]) {
        if(!arr[index]) {
          arr[index] = {}
        }
        arr[index][e.name] = [obj]
      }else{
        arr[index][e.name].push(obj)
      }
      if(e.children && e.children.length) {
        deep(e.children, index)
      }
    })
  }
  result.forEach((e, index) => {
    if(!arr[index] || !arr[index][e.name]) {
      if(!arr[index]) {
        arr[index] = {}
      }
      arr[index][e.name] = [{ value: e.value, name: e.name }]
    }else{
      arr[index][e.name].push({ value: e.value, name: e.name })
    }
    if(e.children && e.children.length) {
      deep(e.children, index)
    }
  })

  return arr
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

  <div p-4>
    <div flex pb-8>
      <div>商品小计：<span text-red-500 font-semibold px-2>{{ amount }}</span>元</div>
      <div ml-16 v-if="subsidyList.length">商家活动补贴：新顾客<span text-red-500 font-semibold px-2>{{ subsidyList[0] }}</span>元、老顾客<span text-red-500 font-semibold px-2>{{ subsidyList[1] }}</span>元</div>
      <div ml-16 v-if="discountsList.length">商品优惠后金额：新顾客<span text-red-500 font-semibold px-2>{{ discountsList[0] }}</span>元、老顾客<span text-red-500 font-semibold px-2>{{ discountsList[1] }}</span>元</div>
    </div>
    <div v-for="(item, index) in randerDiscountsList" :key="index" mt-6 border border-solid border-indigo-600>
      <div v-for="(list, k) in item" :key="k" flex>
        <div w-60 p-2 border border-solid border-indigo-600 text-center>{{ k }}</div>
        <div v-for="(e, j) in list" :key="j" flex-1 text-center p-2 border border-solid border-indigo-600>{{ e.value }}</div>
      </div>
    </div>
  </div>
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
