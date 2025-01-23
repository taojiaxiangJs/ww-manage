<script setup>
import { ref, h } from 'vue';
import dayjs from 'dayjs';
import { message, Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
const [modal, contextHolder] = Modal.useModal();


const activeKey = ref('mt');
const range_pp_fee = ref({
  normal: 20, // 正常时段
  night: 20,  // 夜宵时段
  unbalance: 20  // 供需失衡
})
const timepart_packingfee_mt = ref([
  {
    time: '00:00-24:00',
    range: [
      {
        min: 0,
        max: 3,
        fee: 20
      },{
        min: 3,
        max: 4,
        fee: 25
      },{
        min: 4,
        max: 5,
        fee: 30
      },{
        min: 5,
        max: '∞',
        fee: 36
      }
    ]
  }
])
const timepart_packingfee_mt_add = ref({
  time:'',
  range: [
    {
      min: 1,
      max: '∞',
      fee: 20
    }
  ]
})
const addPartTime = ()=> {
  addTimePartModelOpen.value = true
}
const addTimePartModelOpen = ref(false)
const addTimePartValue = ref([])
const handleAddTimePartOk = () => {
  if(addTimePartValue.value.length) {
    addTimePartModelOpen.value = false
    timepart_packingfee_mt_add.value.time = dayjs(addTimePartValue.value[0]).format('HH:mm') + '-' + dayjs(addTimePartValue.value[1]).format('HH:mm')
    timepart_packingfee_mt.value.push(timepart_packingfee_mt_add.value)
  }else{
    message.error('请选择时间');
  }
}

const delPartTime = (index) => {
  modal.confirm({
    title: '提示',
    icon: h(ExclamationCircleOutlined),
    okText: '确定',
    cancelText: '取消',
    content: h(
      'div',
      {
        style: 'font-size: 20px;padding: 10px 0;',
      },
      '确定删除该时间段?',
    ),
    onOk() {
      timepart_packingfee_mt.value.splice(index, 1)
    },
    onCancel() {},
    class: 'test',
  });
}


const editDistanceRangeOpen = ref(false)
let editDistanceRangeData = ref({
  index: 0,
  range: []
})
const editDistanceRange = (index) => {
  editDistanceRangeData.value.index = index
  editDistanceRangeData.value.range = timepart_packingfee_mt.value[index].range
  editDistanceRangeOpen.value = true
}

const handleEditDistanceRangeOk = () => {
  
}
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
        <div>
          <div font-medium text-base text-black>按配送范围设置起送价</div>
          <div text-gray-500 pl-4 my-2 >命中多个配送范围时，按起送价最低的范围生效</div>
          <div>正常时段（00:00 - 24:00）</div>
          <div>
            <span px-2>快送（42.24平方公里）</span>
            <a-input-number v-model:value="range_pp_fee.normal" :min="1" :max="100" size="small" />元
            <span px-2>起送</span>
          </div>
          <div>夜宵时段（21:00 - 次日06:00）</div>
          <div>
            <span px-2>快送（57.06平方公里）</span>
            <a-input-number v-model:value="range_pp_fee.night" :min="1" :max="100" size="small" />元
            <span px-2>起送</span>
          </div>
          <div>供需失衡（临时范围和价格）</div>
          <div>
            <span px-2>快送（7.54平方公里）</span>
            <a-input-number v-model:value="range_pp_fee.normal" :min="1" :max="100" size="small" />元
            <span px-2>起送</span>
          </div>
        </div>
        <div>
          <div font-medium text-base text-black>按距离和时段设置起送价</div>
          <div text-gray-500 pl-4 my-2 >可根据经营需要，在特殊时段（如出参高峰期、夜宵时段等），按配送距离远近设置不同的起送价格</div>
          <a-button type="primary" size="small" @click="addPartTime()">新增时段</a-button>
          <div flex>
            <div v-for="(item, index) in timepart_packingfee_mt" :key="item.time" mr-22>
              <div my-2 font-semibold text-gray-500 text-xl flex items-center>
                <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
                <span mx-2 text-orange-400>{{ item.time }}</span>
                <a-button danger size="small" @click="delPartTime()">删除</a-button>
              </div>
              <div v-for="(d,i) in item.range" :key="i" my-2 ml-5>
                <span mr-2 v-if="d.max !== '∞'">{{ d.min }}-{{ d.max }}（包含）公里</span>
                <span mr-2 v-else>超过{{ d.min }}公里</span>
                <a-input-number v-model:value="d.fee" :min="1" :max="100" size="small"/>
                <span ml-2>元起送</span>
              </div>
              <div float-right>
                <a-button type="primary" size="small" @click="editDistanceRange(index)">编辑距离</a-button>
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
        <div></div>
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
  </a-tabs>
  </div>
  <a-modal v-model:open="addTimePartModelOpen" title="添加时段" @ok="handleAddTimePartOk" cancelText="取消" okText="确定">
    <div mx-8 mt-8 mb-4>
      <a-time-range-picker v-model:value="addTimePartValue" format="HH:mm" :placeholder="['开始时间', '结束时间']"/>
    </div>
  </a-modal>
  <a-modal v-model:open="editDistanceRangeOpen" title="编辑距离" @ok="handleEditDistanceRangeOk" cancelText="取消" okText="确定">
    <div mx-8 mt-8 mb-4>
      <div v-for="(item,index) in editDistanceRangeData.range" :key="index">
        <a-input-number v-model:value="item.min" :min="0" :max="100" size="small"/>公里 - 
        <a-input-number v-model:value="item.max" :min="0" :max="100" size="small"/>（包含）公里
        <a-input-number v-model:value="item.fee" :min="1" :max="100" size="small"/>元起送
      </div>
    </div>
  </a-modal>
  <context-holder />
</template>
