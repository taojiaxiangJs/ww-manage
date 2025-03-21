<script setup>
import { ref, reactive } from 'vue'
import activityComponent from './components/activity.vue'
import deliveryComponent from './components/delivery.vue'
import foodsComponent from './components/foods.vue'
import { accAdd, accSub, accMul, accDiv } from '@/utils/utils'
const activeKey = ref(['1', '2'])

const openDrawer = ref(false);
const drawerHeight = ref(900)
const showDrawer = () => {
  drawerHeight.value = window.innerHeight - 100 > 900 ? 900 : window.innerHeight - 100
  openDrawer.value = true;
};
const onClose = () => {
  openDrawer.value = false;
}
const renderFoodsList= ref([])
const onCheckFoods = () => {
  renderFoodsList.value = checkedFoodsList.value.checkedFoods
  let total_online = 0
  let total_offline = 0
  checkedFoodsList.value.checkedFoods.forEach((e) => {
    total_online = accAdd(total_online, e.online_price)
    total_offline = accAdd(total_offline, e.offline_price)
  })
  openDrawer.value = false;
  amount.value = total_online
  amount_offline.value = total_offline
}

const checkedFoodsList = ref([])
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
    discounts: [min, max],
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

const amount = ref('0') // 商品小计
const amount_offline = ref('0') // 商品小计
const countResult = ref([]) // 计算结果
const subsidyList = ref([]) // 商家对顾客的活动补贴
const discountsList = ref([]) // 商品优惠后的价格
const randerDiscountsList = ref([]) // 商品优惠后的价格(页面渲染用)
// 计算最终价格
const count = (type) => {
  let { subsidy, discounts } = countActivityFee(amount.value, type)
  discountsList.value = discounts
  subsidyList.value = subsidy
  console.log(discounts, subsidy)
  countResult.value = []
  let timesList = deliveryData?.delivery[type]?.rules?.time?.rule || []
  let distanceList = deliveryData?.delivery[type]?.rules?.distance?.rule || []
  let brokerageList = deliveryData?.delivery[type]?.rules?.brokerage?.rule || []
  discounts.forEach((e, i) => {
    let col = {}
    col.name = i ? '商家补贴优惠后金额（max）' : '商家补贴优惠后金额（min）'
    col.value = e
    col.rule = null
    let brokerage_sub = 0
    if (brokerageList.length) {
      brokerageList.forEach((b) => {
        if (Number(b.min) <= Number(e) && (!b.max || Number(b.max) >= Number(e))) {
          brokerage_sub = accAdd(accMul(accDiv(accSub(e, b.min), b.size), b.rate), b.baseFee)
        }
      })
    }
    if (timesList.length) {
      col.children = []
      timesList.forEach((t) => {
        let obj_t = {
          type: 'time',
          name: '时段',
          value: `${t.min} - ${t.max}`,
          rule: t,
          children: [],
        }
        if (distanceList.length) {
          [1, 2, 3, 4, 5, 6, 7].forEach((d) => {
            let distance_sub = getDistanceSub(d, distanceList)
            let obj_d = {
              type: 'distance',
              name: '距离（KM）',
              value: d,
              rule: d,
              children: [
                {
                  name: '预计收入',
                  type: 'earning',
                  distance: d,
                  valid_delivery: validDelivery(type, d, t.min, t.max),
                  value: getPrice(e, brokerage_sub, t, distance_sub),
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
  randerDiscountsList.value = formatResult(countResult.value)
  console.log('randerDiscountsList', randerDiscountsList.value, countResult.value)
}

const getDistanceSub = (d, distanceList) => {
  let sum = 0
  distanceList.forEach((e) => {
    if (e.min <= d && (d < e.max || !e.max)) {
      sum = accAdd(accMul(accDiv(accSub(d, e.min), e.size), e.rate), e.baseFee)
    }
  })
  return sum
}

const validDelivery = (type, curDistance, curTimeMin, curTimeMax) => {
  let timepart = deliveryData?.delivery[type].timepart || []
  let range = deliveryData?.delivery[type].range || []
  let filterRule = []
  timepart.forEach(e=> {
    if(e.time[0] >= curTimeMin && e.time[1] >= curTimeMax) {
      filterRule.concat(e.range)
    }
  })
  let filterThreshold = []
  filterRule.forEach(e=> {
    if(e.min <= curDistance && curDistance < e.max) {
      filterThreshold.push(e.fee)
    }
  })
  for(let k in range){
    let times = range[k].time
    if(times.length){
      times.forEach(e=> {
        if(e.min_time <= curTimeMin && e.max_time >= curTimeMin) {
          filterThreshold.push(range[k].value)
        }
      })
    }
  }
  return filterThreshold.some(e=> e <= amount.value)
}

const getPrice = (money, brokerage_sub, time, distance_sub) => {
  let t = Number(accAdd(accMul(time.rate, time.size), time.baseFee))
  let time_sub = t > time.minFee ? t : time.minFee
  let subtotal = accSub(accSub(accSub(money, time_sub), brokerage_sub), distance_sub)
  return subtotal
}

const formatResult = (result) => {
  let arr = []
  const deep = (list, index) => {
    list.forEach((e) => {
      let obj = { ...e }
      if (!arr[index] || !arr[index][e.name]) {
        if (!arr[index]) {
          arr[index] = {}
        }
        arr[index][e.name] = [obj]
      } else {
        arr[index][e.name].push(obj)
      }
      if (e.children && e.children.length) {
        deep(e.children, index)
      }
    })
  }
  result.forEach((e, index) => {
    if (!arr[index] || !arr[index][e.name]) {
      if (!arr[index]) {
        arr[index] = {}
      }
      arr[index][e.name] = [{ ...e }]
    } else {
      arr[index][e.name].push({ ...e })
    }
    if (e.children && e.children.length) {
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
  <div mb-4>
    <a-button type="primary" size="small" @click="showDrawer()">选择商品</a-button>
  </div>
  <template v-if="renderFoodsList?.length">
    <div p-4 my-4>
      <a-space wrap>
        <div v-for="(item, index) in renderFoodsList" :key="index" p-4 rounded-lg border border-solid border-gray-200 flex>
          <img :src="item.image || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'" style="width: 70px;height: 70px" rounded-lg/>
          <div ml-4 min-w-32>
            <div font-semibold text-gray-600>{{ item.name }}</div>
            <div text-gray-500 pt-2>线下: <span text-gray-500 px-1 font-semibold text-red-400>{{ item.offline_price }}</span> 元</div>
            <div text-gray-500 pt-2>线上: <span text-gray-500 px-1 font-semibold text-red-400>{{ item.online_price }}</span> 元</div>
          </div>
        </div>
      </a-space>
    </div>
    <a-space wrap>
      <a-button type="primary" size="small" @click="logFn()">打印</a-button>
      <a-button type="primary" size="small" @click="count('mt')">美团试算</a-button>
      <a-button type="primary" size="small" @click="count('ele')">饿了么试算</a-button>
    </a-space>
    <div p-4>
      <div pb-8>
        <div flex>
          <div>商品小计（线上）：<span text-red-500 font-semibold px-2>{{ amount }}</span>元</div>
          <div ml-16>商品小计（线下）：<span text-red-500 font-semibold px-2>{{ amount_offline }}</span>元</div>
        </div>
        
        <div mt-2 v-if="subsidyList.length">
          商家活动补贴：新顾客<span text-green-500 font-semibold px-2>{{ subsidyList[0] }}</span>元、老顾客<span text-green-500 font-semibold px-2>{{ subsidyList[1] }}</span>元
        </div>
        <div mt-2 v-if="discountsList.length">
          商品优惠后金额：新顾客<span text-red-500 font-semibold px-2>{{ discountsList[0] }}</span>元、老顾客<span text-red-500 font-semibold px-2>{{ discountsList[1] }}</span>元
        </div>
      </div>
      <div>试算结果：</div>
      <div v-for="(item, index) in randerDiscountsList" :key="index" mt-6 border border-solid border-gray-400>
        <div v-for="(list, k) in item" :key="k" flex>
          <div w-60 p-2 border border-solid border-gray-400 text-center>{{ k }}</div>
          <div v-for="(e, j) in list" :key="j" flex-1 text-center p-2 border border-solid border-gray-400>
            <template v-if="e.type === 'earning'">
              <text text-green-500 font-semibold v-if="e.value > amount_offline">{{ e.value }}</text>
              <text text-red-500 font-semibold v-else>{{ e.value }}</text>
            </template>
            <text v-else>{{ e.value }}</text>
          </div>
        </div>
      </div>
    </div>
  </template>
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
  <a-drawer :height="drawerHeight" title="基础商品" placement="bottom" :open="openDrawer" @close="onClose">
    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
      <a-button type="primary" @click="onCheckFoods">确定</a-button>
    </template>
    <foodsComponent v-if="openDrawer" isCheck v-model="checkedFoodsList"></foodsComponent>
  </a-drawer>
</template>

<style scoped lang="scss"></style>
