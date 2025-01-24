<script setup>
import { ref, h } from 'vue'
import { message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage()
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'

const activity = ref({
  // 满减
  maxout_check: true,
  maxout_list: [
    {
      reach: '',
      reduced: '',
    },
  ],
  delivery_check: true, // 配送费立减
  delivery: 3,
  new_customer_check: true, // 新客户立减
  new_customer: 1,
  collect_check: true, // 收藏立减
  collect: {
    reach: 0,
    reduced: 1,
  },
  swell_ticket_check: true,
  swell_ticket: 5,
  ticket_check: false,
  ticket_list: [
    {
      reach: '',
      reduced: '',
    },
  ],
})

const addMaxout = (type) => {
  let list = activity.value[`${type}_list`].filter((e) => !e.reach || !e.reduced)
  if (list.length) {
    messageApi.warning('满减项请输入大于0的整数')
    return
  }
  activity.value[`${type}_list`].push({
    reach: '',
    reduced: '',
  })
}
const delMaxout = (type, index) => {
  activity.value[`${type}_list`].splice(index, 1)
}
</script>

<template>
  <context-holder />
  <a-flex>
    <!-- 满减 -->
    <div py-4  mr-40>
      <a-flex vertical>
        <a-checkbox v-model:checked="activity.maxout_check">满减:</a-checkbox>
        <div my-2 ml-4 v-for="(maxout, i) in activity.maxout_list" :key="i">
          <span px-2>满</span>
          <a-input-number v-model:value="maxout.reach" :min="1" :max="10" size="small" />元
          <span px-2>减</span>
          <a-input-number v-model:value="maxout.reduced" :min="1" :max="10" size="small" />元
          <a-button type="text" size="small" danger @click="delMaxout('maxout', i)" v-if="i"><DeleteOutlined /></a-button>
        </div>
        <a-button type="primary" size="small" @click="addMaxout('maxout')">添加</a-button>
      </a-flex>
    </div>

    <!-- 配送费优惠 -->
    <div py-4  mr-40>
      <a-flex vertical style="margin-bottom: 10px">
        <a-checkbox v-model:checked="activity.delivery_check"> 配送费 </a-checkbox>
        <div my-2 ml-4>配送费优惠:<a-input-number v-model:value="activity.delivery" :min="1" :max="10" size="small" />元</div>
      </a-flex>
      <a-flex vertical style="margin-bottom: 10px">
        <a-checkbox v-model:checked="activity.new_customer_check"> 新用户 </a-checkbox>
        <div my-2 ml-4>新用户立减:<a-input-number v-model:value="activity.new_customer" :min="1" :max="10" size="small" />元</div>
      </a-flex>
      <a-flex vertical style="margin-bottom: 10px">
        <a-checkbox v-model:checked="activity.collect_check"> 收藏有礼 </a-checkbox>
        <div my-2 ml-4>
          <span px-2>满</span>
          <a-input-number v-model:value="activity.collect.reach" :min="1" :max="10" size="small" />元
          <span px-2>减</span>
          <a-input-number v-model:value="activity.collect.reduced" :min="1" :max="10" size="small" />元
        </div>
      </a-flex>
    </div>
    <!-- 优惠券 -->
    <div py-4  mr-40>
      <a-flex vertical>
        <a-checkbox v-model:checked="activity.ticket_check">
          店内领券
          <a-tooltip>
            <template #delivery-title>可设置顾客类型（新客、老客、全部）、券的发放数量、生效日期及指定时间段、券有效期</template>
            <QuestionCircleOutlined />
          </a-tooltip>
        </a-checkbox>
        <div my-2 ml-4 v-for="(maxout, i) in activity.ticket_list" :key="i">
          <span px-2>满</span>
          <a-input-number v-model:value="maxout.reach" :min="1" :max="10" size="small" />元
          <span px-2>减</span>
          <a-input-number v-model:value="maxout.reduced" :min="1" :max="10" size="small" />元
          <a-button type="text" size="small" danger @click="delMaxout('ticket', i)" v-if="i"><DeleteOutlined /></a-button>
        </div>
        <a-button type="primary" size="small" @click="addMaxout('ticket')">添加</a-button>
      </a-flex>
    </div>
    <!-- 神券红包 -->
    <div py-4>
      <a-flex vertical style="margin-bottom: 10px">
        <a-checkbox v-model:checked="activity.swell_ticket_check"> 神券红包 </a-checkbox>
        <div my-2 ml-4>商家承担:<a-input-number v-model:value="activity.swell_ticket" :min="1" :max="10" size="small" />元</div>
      </a-flex>
    </div>
  </a-flex>
</template>

<style scoped lang="scss">

</style>