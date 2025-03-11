<script setup>
import { reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage()
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'

const activeKey = ref('mt')
const activity = reactive({
  /**
   * isCheck: 是否选中
   * value_type: 0: 仅有一个value对象;  1: value对象存在多个
   * use_type: 用户的使用次数类型  1: 仅1次  0：多次
   * value: 活动值
   *    reach： 满减金额
   *    reduced： 减免金额 
  */
  mt: [
    {
      key: 'maxout',
      name: '满减',
      value_type: 1,
      use_type: 0,
    },
    {
      key: 'delivery',
      name: '配送费立减',
      value_type: 0,
      use_type: 0,
    },
    {
      key: 'customer',
      name: '新客户立减',
      value_type: 0,
      use_type: 1,
    },
    {
      key: 'follow',
      name: '关注有礼',
      value_type: 0,
      use_type: 1,
    },
    {
      key: 'surprise',
      name: '神券红包',
      value_type: 0,
      use_type: 0,
    },
    {
      key: 'ticket',
      name: '店铺券',
      tips: '可设置顾客类型（新客、老客、全部）、券的发放数量、生效日期及指定时间段、券有效期',
      value_type: 1,
      use_type: 0,
    }
  ],
  ele: [
    {
      key: 'maxout',
      name: '满减',
      value_type: 1,
      use_type: 0,
    },
    {
      key: 'delivery',
      name: '配送费立减',
      value_type: 0,
      use_type: 0,
    },
    {
      key: 'customer',
      name: '新客户立减',
      value_type: 0,
      use_type: 1,
    },
    {
      key: 'follow',
      name: '关注有礼',
      value_type: 0,
      use_type: 1,
    },
    {
      key: 'surprise',
      name: '神券红包',
      value_type: 1,
      use_type: 0,
    },
    {
      key: 'ticket',
      name: '店铺券',
      tips: '可设置顾客类型（新客、老客、全部）、券的发放数量、生效日期及指定时间段、券有效期',
      value_type: 1,
      use_type: 0,
    }
  ]
})

const initActivity = (type)=> {
  activity[type].forEach(e=> {
    e.isCheck = true
    e.value = [
      {
        reach: '',
        reduced: '',
      }
    ]
  })
}
initActivity('mt')  // 美团
initActivity('ele')  // 美团


const activityData = defineModel()
activityData.value.activity = activity
debugger

const addMaxout = (item) => {
  let list = item.value.filter((e) => !e.reach || !e.reduced)
  if (list.length) {
    messageApi.warning('满减项请输入大于0的整数')
    return
  }
  item.value.push({
    reach: '',
    reduced: '',
  })
}
const delMaxout = (item, index) => {
  item.value.splice(index, 1)
}
</script>

<template>
  <context-holder />
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="mt">
      <template #tab>
        <span>
          美团
        </span>
      </template>
      <a-flex wrap>
        <div py-4 mr-30 v-for="item in activity.mt" :key="item.key">
          <a-flex vertical>
            <div flex justify-between>
              <a-checkbox v-model:checked="item.isCheck">
                {{ item.name }}
                <template v-if="!!item.tips">
                  <a-tooltip>
                    <template #delivery-title>{{ item.tips }}</template>
                    <QuestionCircleOutlined />
                  </a-tooltip>
                </template>
              </a-checkbox>
              <a-button v-if="item.value_type === 1" type="primary" size="small" @click="addMaxout(item)">添加阶梯</a-button>
            </div>
            <template v-if="item.value_type === 1">
              <div my-2 ml-4 v-for="(maxout, i) in item.value" :key="i">
                <span px-2>满</span>
                <a-input-number v-model:value="maxout.reach" :min="1" :max="9999" size="small" />元
                <span px-2>减</span>
                <a-input-number v-model:value="maxout.reduced" :min="1" :max="9999" size="small" />元
                <a-button type="text" size="small" danger @click="delMaxout(item, i)" v-if="i"><DeleteOutlined /></a-button>
              </div>
            </template>
            <template v-else>
              <div my-2 ml-4>商家立减: <a-input-number v-model:value="item.value[0].reduced" :min="1" :max="10" size="small" />元</div>
            </template>
          </a-flex>
        </div>
      </a-flex>
    </a-tab-pane>
    <a-tab-pane key="ele">
      <template #tab>
        <span>
          饿了么
        </span>
      </template>
      <a-flex>
        <div py-4 mr-30 v-for="item in activity.ele" :key="item.key">
          <a-flex vertical>
            <div flex justify-between>
              <a-checkbox v-model:checked="item.isCheck">
                {{ item.name }}
                <template v-if="!!item.tips">
                  <a-tooltip>
                    <template #delivery-title>{{ item.tips }}</template>
                    <QuestionCircleOutlined />
                  </a-tooltip>
                </template>
              </a-checkbox>
              <a-button v-if="item.value_type === 1" type="primary" size="small" @click="addMaxout(item)">添加阶梯</a-button>
            </div>
            <template v-if="item.value_type === 1">
              <div my-2 ml-4 v-for="(maxout, i) in item.value" :key="i">
                <span px-2>满</span>
                <a-input-number v-model:value="maxout.reach" :min="1" :max="10" size="small" />元
                <span px-2>减</span>
                <a-input-number v-model:value="maxout.reduced" :min="1" :max="10" size="small" />元
                <a-button type="text" size="small" danger @click="delMaxout(item, i)" v-if="i"><DeleteOutlined /></a-button>
              </div>
            </template>
            <template v-else>
              <div my-2 ml-4>商家立减: <a-input-number v-model:value="item.value[0].reduced" :min="1" :max="10" size="small" />元</div>
            </template>
          </a-flex>
        </div>
      </a-flex>
    </a-tab-pane>
  </a-tabs>
  
</template>

<style scoped lang="scss">

</style>