<script setup>
import { ref, h } from 'vue'
import { message } from 'ant-design-vue'
const [messageApi, contextHolder] = message.useMessage()
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue'
const activeKey = ref('1')
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
  <context-holder />
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="1" header="我的活动" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <a-flex justify="space-between">
        <!-- 满减 -->
        <div class="active-box">
          <a-flex vertical>
            <a-checkbox v-model:checked="activity.maxout_check">满减:</a-checkbox>
            <div class="active-item" v-for="(maxout, i) in activity.maxout_list" :key="i">
              <span>满</span>
              <a-input-number v-model:value="maxout.reach" :min="1" :max="10" size="small" />元
              <span>减</span>
              <a-input-number v-model:value="maxout.reduced" :min="1" :max="10" size="small" />元
              <a-button type="text" size="small" danger @click="delMaxout('maxout', i)" v-if="i"><DeleteOutlined /></a-button>
            </div>
            <a-button type="primary" size="small" @click="addMaxout('maxout')">添加</a-button>
          </a-flex>
        </div>

        <!-- 配送费优惠 -->
        <div class="active-box">
          <a-flex vertical style="margin-bottom: 10px">
            <a-checkbox v-model:checked="activity.delivery_check"> 配送费 </a-checkbox>
            <div class="active-item">配送费优惠:<a-input-number v-model:value="activity.delivery" :min="1" :max="10" size="small" />元</div>
          </a-flex>
          <a-flex vertical style="margin-bottom: 10px">
            <a-checkbox v-model:checked="activity.new_customer_check"> 新用户 </a-checkbox>
            <div class="active-item">新用户立减:<a-input-number v-model:value="activity.new_customer" :min="1" :max="10" size="small" />元</div>
          </a-flex>
          <a-flex vertical style="margin-bottom: 10px">
            <a-checkbox v-model:checked="activity.collect_check"> 收藏有礼 </a-checkbox>
            <div class="active-item">
              <span>满</span>
              <a-input-number v-model:value="activity.collect.reach" :min="1" :max="10" size="small" />元
              <span>减</span>
              <a-input-number v-model:value="activity.collect.reduced" :min="1" :max="10" size="small" />元
            </div>
          </a-flex>
        </div>
        <!-- 优惠券 -->
        <div class="active-box">
          <a-flex vertical>
            <a-checkbox v-model:checked="activity.ticket_check">
              店内领券
              <a-tooltip>
                <template #title>可设置顾客类型（新客、老客、全部）、券的发放数量、生效日期及指定时间段、券有效期</template>
                <QuestionCircleOutlined />
              </a-tooltip>
            </a-checkbox>
            <div class="active-item" v-for="(maxout, i) in activity.ticket_list" :key="i">
              <span>满</span>
              <a-input-number v-model:value="maxout.reach" :min="1" :max="10" size="small" />元
              <span>减</span>
              <a-input-number v-model:value="maxout.reduced" :min="1" :max="10" size="small" />元
              <a-button type="text" size="small" danger @click="delMaxout('ticket', i)" v-if="i"><DeleteOutlined /></a-button>
            </div>
            <a-button type="primary" size="small" @click="addMaxout('ticket')">添加</a-button>
          </a-flex>
        </div>
        <!-- 神券红包 -->
        <div class="active-box">
          <a-flex vertical style="margin-bottom: 10px">
            <a-checkbox v-model:checked="activity.swell_ticket_check"> 神券红包 </a-checkbox>
            <div class="active-item">商家承担:<a-input-number v-model:value="activity.swell_ticket" :min="1" :max="10" size="small" />元</div>
          </a-flex>
        </div>
      </a-flex>
    </a-collapse-panel>
  </a-collapse>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background: rgb(255, 255, 255)">
    <a-collapse-panel key="2" header="配送设置" style="background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden">
      <a-flex>
        <div>
          <div class="title">美团快送</div>
          <div class="sub-title">1. 佣金收费规则</div>
          <div>商品优惠后金额  佣金比例 6.4% （保底 1.38元）</div>
          <div class="sub-title">2. 配送服务费</div>
          <div>配送服务费=距离收费+价格收费+时段收费</div>
          <div class="sub-title">a. 距离收费</div>
          <div>0.0公里(含)-3.0公里(含)，收起步价2.5元<br/>3.0公里(不含)-4.0公里(含)，每0.1公里加收0.15元<br/>4.0公里(不含)以上，每0.1公里加收0.14元</div>
          <div class="sub-title">b. 价格收费</div>
          <div>收费基数=商品小计-商家活动支出</div>
          <div>0元(不含)-25元(含)，收0元<br/>25元(不含)-30元(含)，每上涨1元加收0.19元<br/>30元(不含)以上，每上涨1元加收0.15元</div>
          <div class="sub-title">c. 时段收费</div>
          <div>00:00(不含)-02:00(含):每单加收0.8元<br/>02:00(不含)-06:00(含):每单加收1元<br/>21:00(不含)-24:00(含):每单加收0.3元</div>
        </div>

        <div>
          <div class="title">饿了么-蜂鸟准时达</div>
          <div class="sub-title">1. 佣金收费规则</div>
          <div>商品优惠后金额  佣金比例 6.4% （保底 1.38元）</div>
          <div class="sub-title">2. 配送服务费</div>
          <div>配送服务费=距离收费+价格收费+时段收费</div>
          <div class="sub-title">a. 距离收费</div>
          <div>0.0公里(含)-3.0公里(含)，收起步价2.5元<br/>3.0公里(不含)-4.0公里(含)，每0.1公里加收0.15元<br/>4.0公里(不含)以上，每0.1公里加收0.14元</div>
          <div class="sub-title">b. 价格收费</div>
          <div>收费基数=商品小计-商家活动支出</div>
          <div>0元(不含)-25元(含)，收0元<br/>25元(不含)-30元(含)，每上涨1元加收0.19元<br/>30元(不含)以上，每上涨1元加收0.15元</div>
          <div class="sub-title">c. 时段收费</div>
          <div>00:00(不含)-02:00(含):每单加收0.8元<br/>02:00(不含)-06:00(含):每单加收1元<br/>21:00(不含)-24:00(含):每单加收0.3元</div>
        </div>
        
      </a-flex>
      
    </a-collapse-panel>
  </a-collapse>
</template>

<style scoped lang="scss">
.active-box {
  padding-left: 20px;
  padding-right: 20px;
}
.active-item {
  margin: 10px 0 10px 14px;
  span {
    padding: 0 8px;
  }
}
</style>
