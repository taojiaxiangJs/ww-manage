<template>
  <div>
    <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="mt">
      <template #tab>
        <span>
          <apple-outlined />
          美团
        </span>
      </template>
      <a-flex justify="space-between">
        <div></div>
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
          <android-outlined />
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
</template>

<script setup>
import { ref } from 'vue';
const activeKey = ref('mt');
</script>