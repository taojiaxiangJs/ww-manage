<script setup>
import { ref, h, watch, reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, PlusCircleOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons-vue'
import storage from '../utils/storage.js'
const [modal, contextHolder] = Modal.useModal();


const activeKey = ref('mt');

const delivery = reactive({
  mt: {
    range: {
      normal: 20, // 正常时段
      night: 20,  // 夜宵时段
      unbalance: 20  // 供需失衡
    },
    timepart: [{
      time: ['00:00', '23:59'],
      range: [
        { min: 0, max: 3, fee: 20 },
        { min: 3, max: 4, fee: 25 },
        { min: 4, max: 5, fee: 30 },
        { min: 5, max: '∞', fee: 36 }
      ]
    }],
    rules: {
      amount: {
        name: '佣金收费规则',
        rule: [
          {
            baseFee: 0,
            minFee: 1.38,    // 最低收费
            min: 0,
            rate: 0.064,  // 费率
            size: 1,
            max: null       // 最高收费
          }
        ]
      },
      distance: {
        name: '距离收费',
        rule: [
          {
            minFee: 0,
            baseFee: 2.5,
            min: 0,
            rate: 0,
            size: 1,
            max: 3
          },{
            minFee: 0,
            baseFee: 2.5,
            min: 3,
            rate: 0.15,
            size: 0.1,
            max: 4
          },{
            minFee: 0,
            baseFee: 4,
            min:4,
            rate: 0.14,
            size: 0.1,
            max: null
          }
        ]
      },
      brokerage: {
        name: '价格收费',
        rule: [
          {
            minFee: 0,
            baseFee: 0,
            min: 0,
            rate: 0,
            size: 1,
            max: 25
          },{
            minFee: 0,
            baseFee: 0,
            min: 25,
            rate: 0.19,
            size: 1,
            max: 30
          },{
            minFee: 0,
            baseFee: 0.95,
            min: 30,
            rate: 0.15,
            size: 1,
            max: null
          }
        ]
      },
      time: {
        name: '时段收费',
        rule: [
          {
            minFee: 0,
            baseFee: 0,
            min: '00:00',
            rate: 0.8,
            size: 1,
            max: '02:00'
          },{
            minFee: 0,
            baseFee: 0,
            min: '02:00',
            rate: 1,
            size: 1,
            max: '06:00'
          },{
            minFee: 0,
            baseFee: 0,
            min: '06:00',
            rate: 0,
            size: 1,
            max: '21:00'
          },{
            minFee: 0,
            baseFee: 0,
            min: '21:00',
            rate: 0.3,
            size: 1,
            max: '24:00'
          }
        ]
      }
    }
  },
  ele: {
    range: {
      normal: 20, // 正常时段
      night: 20,  // 夜宵时段
      unbalance: 20  // 供需失衡
    },
    timepart: [{
      time: ['00:00', '14:20'],
      range: [
        { min: 0, max: 3, fee: 20 },
        { min: 3, max: 4, fee: 25 },
        { min: 4, max: '∞', fee: 40 }
      ]
    }],
    rules: {
      amount: {
        name: '佣金收费规则',
        rule: [
          {
            minFee: 1.38,    // 最低收费
            baseFee: 0,
            min: 0,
            rate: 0.064,  // 费率
            size: 1,
            max: null       // 最高收费
          }
        ]
      },
      distance: {
        name: '距离收费',
        rule: [
          {
            minFee: 0,
            baseFee: 2.55,
            min: 0,
            rate: 0,
            size: 1,
            max: 2.5
          },{
            minFee: 0,
            baseFee: 2.55,
            min: 2.5,
            rate: 0.5,
            size: 0.5,
            max: 4
          },{
            minFee: 0,
            baseFee: 4.05,
            min: 4,
            rate: 0.7,
            size: 0.5,
            max: null
          }
        ]
      },
      time: {
        name: '时段收费',
        rule: [
          {
            minFee: 0,
            baseFee: 0,
            min: '00:00',
            rate: 1,
            size: 1,
            max: '03:00'
          },{
            minFee: 0,
            baseFee: 0,
            min: '03:00',
            rate: 1.5,
            size: 1,
            max: '06:00'
          },{
            minFee: 0,
            baseFee: 0,
            min: '06:00',
            rate: 0,
            size: 1,
            max: '21:00'
          },{
            baseFee: 0,
            min: '21:00',
            rate: 0.5,
            size: 1,
            max: '24:00'
          }
        ]
      }
    }
  }
})

const deliveryData = defineModel()
deliveryData.value.delivery = delivery

const editDistanceRangeOpen = ref(false)
const editDistanceRangeData = reactive({
  type: 'add',
  index: 0,
  time: [],
  range: []
})
const handelDistanceRange = (type, index) => {
  editDistanceRangeData.type = type
  if(type === 'add') {
    editDistanceRangeData.time = []
    editDistanceRangeData.range = [{
      min: 0,
      max: 3,
      fee: 20
    },{
      min: 3,
      max: '∞',
      fee: 30
    }]
  }
  if(type === 'edit') {
    editDistanceRangeData.index = index
    let start_time = dayjs(delivery[activeKey.value].timepart[index].time[0], 'HH:mm')
    let end_time = dayjs(delivery[activeKey.value].timepart[index].time[1], 'HH:mm')
    editDistanceRangeData.time = [start_time, end_time]
    editDistanceRangeData.range = JSON.parse(JSON.stringify(delivery[activeKey.value].timepart[index].range))
  }
  editDistanceRangeOpen.value = true
}
const handleEditDistanceRangeOk = () => {
  if(editDistanceRangeData.time.length) {
    let time = [dayjs(editDistanceRangeData.time[0]).format('HH:mm'), dayjs(editDistanceRangeData.time[1]).format('HH:mm')]
    let distance_flag = true
    let fee_flag = true
    if(editDistanceRangeData.range.length === 1) {
      distance_flag = editDistanceRangeData.range[0].min >= 0
      fee_flag = editDistanceRangeData.range[0].fee >= 0
    }else{
      let pre_max = 0
      let pre_fee = 0
      editDistanceRangeData.range.forEach((item, index) => {
        if(item.min > item.max) {
          distance_flag = false
        }
        if(item.min !== pre_max && index > 0) {
          distance_flag = false
        }
        if(item.fee <= pre_fee && index > 0) {
          fee_flag = false
        }
        pre_max = item.max
        pre_fee = item.fee
      })
    }
    if(!fee_flag) {
      message.error('请合理设置起送价！');
      return
    }
    if(!distance_flag) {
      message.error('请合理设置阶梯式配送距离！');
      return
    }
    editDistanceRangeOpen.value = false
    if(editDistanceRangeData.type === 'add') {
      delivery[activeKey.value].timepart.push({
        time: time,
        range: editDistanceRangeData.range
      })
    }
    if(editDistanceRangeData.type === 'edit') {
      delivery[activeKey.value].timepart[editDistanceRangeData.index].time = time
      delivery[activeKey.value].timepart[editDistanceRangeData.index].range = editDistanceRangeData.range 
    }
    editDistanceRangeData.type = 'add'
    editDistanceRangeData.index = 0
    editDistanceRangeData.time = []
    editDistanceRangeData.range = []
  }else{
    message.error('请选择时间段');
  }
}
const addDistanceRangeItem = (index) => {
  if(index) {
    editDistanceRangeData.range.splice(index + 1, 0, {
      min: 0,
      max: 0,
      fee: 0
    })
  }else{
    editDistanceRangeData.range.unshift({
      min: 0,
      max: 0,
      fee: 0
    })
  }
}
const delDistanceRangeItem = (index) => {
  editDistanceRangeData.range.splice(index, 1)
}

// 删除时段
const delPartTime = (index) => {
  modal.confirm({
    title: '提示',
    icon: h(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    content: h('div', {style: 'font-size: 20px;padding: 10px 0;'}, '确定删除该时间段?'),
    onOk() {
      delivery[activeKey.value].timepart.splice(index, 1)
    },
    onCancel() {},
    class: 'test',
  });
}

const save = () => {
  storage.setItem('delivery', delivery)
  message.success('本地保存成功')
}

onMounted(() => {
  let storage_delivery = storage.getItem('delivery')
  if(storage_delivery) {
    delivery.mt = storage_delivery.mt
    delivery.ele = storage_delivery.ele
  }
})

// 监听距离段
watch(
  () => editDistanceRangeData.range, 
  (newValue) => {
    if(newValue.length > 1) {
      let len = newValue.length - 1
      editDistanceRangeData.range[len].min = editDistanceRangeData.range[len-1].max
      editDistanceRangeData.range[len].max = '∞'
    }else if(newValue.length === 1){
      editDistanceRangeData.range[0].min = 0
      editDistanceRangeData.range[0].max = '∞'
    }
  },
  { deep: true }
)
</script>

<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="mt">
        <template #tab>
          <span>
            美团
          </span>
        </template>
        <a-flex justify="space-between">
          <div flex flex-1>
            <div mr-40>
              <div font-medium text-base text-black>按配送范围设置起送价</div>
              <div text-gray-500 pl-4 my-2 >命中多个配送范围时，按起送价最低的范围生效</div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>正常时段（00:00 - 24:00）</div>
              <div pl-1>
                <span px-2>快送（42.24平方公里）</span>
                <a-input-number v-model:value="delivery.mt.range.normal" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>夜宵时段（21:00 - 次日06:00）</div>
              <div pl-1>
                <span px-2>快送（57.06平方公里）</span>
                <a-input-number v-model:value="delivery.mt.range.night" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>供需失衡（临时范围和价格）</div>
              <div pl-1>
                <span px-2>快送（7.54平方公里）</span>
                <a-input-number v-model:value="delivery.mt.range.unbalance" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
            </div>
            <div flex-1 mr-40>
              <div font-medium text-base text-black>按距离和时段设置起送价</div>
              <div text-gray-500 pl-4 my-2 >可根据经营需要，在特殊时段（如出参高峰期、夜宵时段等），按配送距离远近设置不同的起送价格</div>
              <a-button type="primary" size="small" @click="handelDistanceRange('add')">新增时段</a-button>
              <div flex mt-4>
                <div v-for="(item, index) in delivery.mt.timepart" :key="item.time" mr-22>
                  <div v-if="item.time.length === 2">
                    <div my-2 font-semibold text-gray-500 text-xl flex items-center>
                      <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
                      <span mx-2 text-orange-400>{{ item.time[0] }} - {{ item.time[1] }}</span>
                      <FormOutlined @click="handelDistanceRange('edit',index)" style="color: #1677FF;font-size: 18px; margin-left: 6px;"/>
                      <DeleteOutlined @click="delPartTime(index)" v-if="delivery.mt.timepart.length > 1" style="color: #FF4D4F;font-size: 18px; margin-left: 6px;"/>
                    </div>
                    <div v-for="(d,i) in item.range" :key="i" my-2 ml-5>
                      <span mr-2 v-if="d.max !== '∞'">{{ d.min }}-{{ d.max }}（包含）公里</span>
                      <span mr-2 v-else>超过{{ d.min }}公里</span>
                      <span text-red-500 text-lg font-medium>{{ d.fee }}</span>
                      <!-- <a-input-number v-model:value="d.fee" :min="1" :max="100" size="small"/> -->
                      <span ml-2>元起送</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div text-sm>
            <div font-medium text-base text-black>美团快送</div>
            <div text-gray-800 my-2 >1. 佣金收费规则</div>
            <div text-gray-500 pl-4 >商品优惠后金额  佣金比例 6.4% （保底 1.38元）</div>
            <div text-gray-800 my-2 >2. 配送服务费</div>
            <div text-gray-500 pl-4 >配送服务费=距离收费+价格收费+时段收费</div>
            <div text-gray-800 pl-4 my-2 >a. 距离收费</div>
            <div text-gray-500 pl-8 >0.0公里(含)-3.0公里(含)，收起步价2.5元<br/>3.0公里(不含)-4.0公里(含)，每0.1公里加收0.15元<br/>4.0公里(不含)以上，每0.1公里加收0.14元</div>
            <div text-gray-800 pl-4 my-2 >b. 价格收费</div>
            <div text-gray-500 pl-8 >收费基数=商品小计-商家活动支出</div>
            <div text-gray-500 pl-8 >0元(不含)-25元(含)，收0元<br/>25元(不含)-30元(含)，每上涨1元加收0.19元<br/>30元(不含)以上，每上涨1元加收0.15元</div>
            <div text-gray-800 pl-4 my-2 >c. 时段收费</div>
            <div text-gray-500 pl-8 >00:00(不含)-02:00(含):每单加收0.8元<br/>02:00(不含)-06:00(含):每单加收1元<br/>21:00(不含)-24:00(含):每单加收0.3元</div>
          </div>
        </a-flex>
      </a-tab-pane>
      <a-tab-pane key="ele">
        <template #tab>
          <span>
            饿了么
          </span>
        </template>
        <a-flex justify="space-between">
          <div flex flex-1>
            <div mr-40>
              <div font-medium text-base text-black>按配送范围设置起送价</div>
              <div text-gray-500 pl-4 my-2 >命中多个配送范围时，按起送价最低的范围生效</div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>正常时段（00:00 - 24:00）</div>
              <div pl-1>
                <span px-2>快送（42.24平方公里）</span>
                <a-input-number v-model:value="delivery.ele.range.normal" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>夜宵时段（21:00 - 次日06:00）</div>
              <div pl-1>
                <span px-2>快送（57.06平方公里）</span>
                <a-input-number v-model:value="delivery.ele.range.night" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
              <div pt-3 pb-2><span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5 mr-1></span>供需失衡（临时范围和价格）</div>
              <div pl-1>
                <span px-2>快送（7.54平方公里）</span>
                <a-input-number v-model:value="delivery.ele.range.unbalance" :min="1" :max="100" size="small" />元
                <span px-2>起送</span>
              </div>
            </div>
            <div flex-1 mr-40>
              <div font-medium text-base text-black>按距离和时段设置起送价</div>
              <div text-gray-500 pl-4 my-2 >可根据经营需要，在特殊时段（如出参高峰期、夜宵时段等），按配送距离远近设置不同的起送价格</div>
              <a-button type="primary" size="small" @click="handelDistanceRange('add')">新增时段</a-button>
              <div flex mt-4>
                <div v-for="(item, index) in delivery.ele.timepart" :key="item.time" mr-22>
                  <div v-if="item.time.length === 2">
                    <div my-2 font-semibold text-gray-500 text-xl flex items-center>
                      <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
                      <span mx-2 text-orange-400>{{ item.time[0] }} - {{ item.time[1] }}</span>
                      <FormOutlined @click="handelDistanceRange('edit',index)" style="color: #1677FF;font-size: 18px; margin-left: 6px;"/>
                      <DeleteOutlined @click="delPartTime(index)" v-if="delivery.ele.timepart.length > 1" style="color: #FF4D4F;font-size: 18px; margin-left: 6px;"/>
                    </div>
                    <div v-for="(d,i) in item.range" :key="i" my-2 ml-5>
                      <span mr-2 v-if="d.max !== '∞'">{{ d.min }}-{{ d.max }}（包含）公里</span>
                      <span mr-2 v-else>超过{{ d.min }}公里</span>
                      <span text-red-500 text-lg font-medium>{{ d.fee }}</span>
                      <span ml-2>元起送</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div text-sm>
            <div font-medium text-base text-black>饿了么-蜂鸟准时达</div>
            <div text-gray-800 my-2 >1. 佣金收费规则</div>
            <div text-gray-500 pl-4 >商品优惠后金额  佣金比例 6.4% （保底 1.38元）</div>
            <div text-gray-800 my-2 >2. 配送服务费</div>
            <div text-gray-500 pl-4 >配送服务费=距离收费+时段收费</div>
            <div text-gray-800 pl-4 my-2 >a. 距离收费</div>
            <div text-gray-500 pl-8 >0.0公里(含)-2.5公里(含)，收起步价2.55元<br/>2.5公里(不含)-4.0公里(含)，每0.5公里加收0.5元<br/>4.0公里(不含)以上，每0.5公里加收0.7元</div>
            <div text-gray-800 pl-4 my-2 >b. 时段收费</div>
            <div text-gray-500 pl-8 >00:00(不含)-02:59(含):每单加收1元<br/>03:00(不含)-05:59(含):每单加收1.5元<br/>21:00(不含)-23:59(含):每单加收0.5元</div>
          </div>
        </a-flex>
      </a-tab-pane>
      <template #rightExtra>
        <a-button @click="save">保存</a-button>
      </template>
    </a-tabs>
  </div>
  <a-modal v-model:open="editDistanceRangeOpen" title="编辑时段和距离" @ok="handleEditDistanceRangeOk" cancelText="取消" okText="确定" width="660px">
    <div mx-8 mt-8 mb-4>
      <a-time-range-picker v-model:value="editDistanceRangeData.time" format="HH:mm" :placeholder="['开始时间', '结束时间']"/>
      <div v-for="(item,index) in editDistanceRangeData.range" :key="index" my-4>
        <div v-if="index < editDistanceRangeData.range.length - 1" flex items-center>
          <a-input-number v-model:value="item.min" :min="0" :max="100" size="small"/><text>公里 - </text>
          <a-input-number v-model:value="item.max" :min="0" :max="100" size="small"/><text mr-6>（包含）公里</text>
          <a-input-number v-model:value="item.fee" :min="1" :max="100" size="small"/><text mr-4>元起送</text>
          <DeleteOutlined @click="delDistanceRangeItem(index)" style="color: #FF4D4F;font-size: 20px; margin-left: 6px;"/>
          <PlusCircleOutlined @click="addDistanceRangeItem(index)" v-if="index === editDistanceRangeData.range.length - 2" style="color: #1677FF;font-size: 20px; margin-left: 6px;"/>
        </div>
        <div v-else flex items-center>
          <text mr-6>超过 {{ item.min }} 公里</text>
          <a-input-number v-model:value="item.fee" :min="1" :max="100" size="small"/>元起送
          <PlusCircleOutlined @click="addDistanceRangeItem(index)" v-if="editDistanceRangeData.range.length === 1" style="color: #1677FF;font-size: 20px; margin-left: 6px;"/>
        </div>
      </div>
    </div>
  </a-modal>
  <context-holder />
</template>
