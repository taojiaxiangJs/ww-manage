<script setup>
import { ref, reactive, h } from 'vue'
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue';
const [modal, contextHolder] = Modal.useModal();

const base_foods = ref({
  ft_list: [
    {
      // name: '基础饭团',
      name: '基础产品',
      online_price: 17.99,
      offline_price: 6,
      cost: '',
      index: 0,
      description: '人见人夸、狗见狗爱',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
  ],
  xl_list: [
    {
      name: '菲力牛排',
      online_price: 12,
      offline_price: 6,
      cost: '',
      index: 0,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '里脊肉',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 1,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '咸蛋黄',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 2,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '奥尔良腿排',
      online_price: 9.99,
      offline_price: 3.5,
      cost: '',
      index: 3,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '原味煎鸡蛋',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 4,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '脆骨肠',
      online_price: 5.99,
      offline_price: 2,
      cost: '',
      index: 5,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '大肉肠',
      online_price: 8.2,
      offline_price: 3,
      cost: '',
      index: 6,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '芝士',
      online_price: 8.98,
      offline_price: 3.5,
      cost: '',
      index: 7,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '烤肠',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 8,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '美式培根咸',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 9,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '双汇火腿肠',
      online_price: 5.99,
      offline_price: 2,
      cost: '',
      index: 10,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '卫龙辣条',
      online_price: 3.2,
      offline_price: 1,
      cost: '',
      index: 11,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '秘制卤蛋',
      online_price: 4.5,
      offline_price: 2,
      cost: '',
      index: 12,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '海草',
      online_price: 3.99,
      offline_price: 1,
      cost: '',
      index: 13,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '泡菜',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 14,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '腊肠',
      online_price: 4.99,
      offline_price: 2,
      cost: '',
      index: 15,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '鸡肉松',
      online_price: 3.99,
      offline_price: 2,
      cost: '',
      index: 16,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '油条脆',
      online_price: 3.99,
      offline_price: 1,
      cost: '',
      index: 17,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
  ],
  dj_list: [
    {
      name: '黄豆浆',
      online_price: 6.45,
      offline_price: 3,
      cost: '',
      index: 0,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '五谷杂粮豆浆',
      online_price: 9.99,
      offline_price: 4,
      cost: '',
      index: 1,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 0,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '红枣豆浆',
      online_price: 7.88,
      offline_price: 3.5,
      cost: '',
      index: 2,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '黑芝麻豆浆',
      online_price: 7.88,
      offline_price: 3.5,
      cost: '',
      index: 3,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '黑豆豆浆',
      online_price: 7.68,
      offline_price: 3.5,
      cost: '',
      index: 4,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: [],  // 父类id
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: false
    },
    {
      name: '红豆薏仁豆浆',
      online_price: 8.45,
      offline_price: 3.5,
      cost: '',
      index: 5,
      description: '',
      image: '',
      id: '',  // id
      associated_ids: ['1'],  // 被关联的商品id集合
      status: 1,  // 0:下架 1:上架
      check: false,  // 是否选中
      show_check: true
    },
  ],
})
const sku_list = ref([
  {
    id: '1',
    name: '基础饭团',
    online_price: 17.99,
    offline_price: 6,
    comb_online_price: 17.99,
    comb_offline_price: 6,
    packing_fee: 0,
    cost: '',
    description: '',
    comb_list: [

    ]
  }
])

const handleStatus = (type, item, index) => {
  if(item.status === 1) {
    let associated_ids = item.associated_ids || []
    let names = []
    if(associated_ids.length) {
      sku_list.value.forEach(i=> {
        if(associated_ids.includes(i.id)) {
          names.push(i.name)
        }
      })
    }
    let content = names.length ?  h('div', {style: 'font-size: 20px;padding: 10px 0;'}, `该商品正在被【${names.join(',')}】关联, 确定下架所有关联商品么?`) : h('div', {style: 'font-size: 20px;padding: 10px 0;'}, `确定下架该商品么?`)
    
    modal.confirm({
      title: '提示',
      icon: h(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      content,
      onOk() {
        base_foods.value[type][index].status = 0
        if(names.length) {
          sku_list.value.forEach(i=> {
            if(associated_ids.includes(i.id)) {
              i.status = 0
            }
          })
        }
      },
      onCancel() {},
      class: 'test',
    });
  } else{
    modal.confirm({
      title: '提示',
      icon: h(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      content: h('div', {style: 'font-size: 20px;padding: 10px 0;'}, `确定上架该商品么?`),
      onOk() {
        base_foods.value[type][index].status = 1
      },
      onCancel() {},
      class: 'test',
    });
  }
}
const handleDelete = (type, item, index) => {
  let associated_ids = item.associated_ids || []
  let names = []
  if(associated_ids.length) {
    sku_list.value.forEach(i=> {
      if(associated_ids.includes(i.id)) {
        names.push(i.name)
      }
    })
  }
  if(names.length) {
    message.warning('该商品已被关联,无法删除!');
  }else{
    modal.confirm({
      title: '提示',
      icon: h(ExclamationCircleOutlined),
      okText: '确定',
      cancelText: '取消',
      content: h('div', {style: 'font-size: 20px;padding: 10px 0;'}, `确定删除该该商品?`),
      onOk() {
        base_foods.value[type].splice(index, 1)
      },
      onCancel() {},
      class: 'test',
    });
  }
}
const editModalOpen = ref(false)
const editData = {
  type: '',
  index: 0,
  data: {}
}
const formState = reactive({
  name: '',
  online_price: '',
  offline_price: '',
  description: ''
})
const handleEdit = (type, item, index) => {
  let associated_ids = item.associated_ids || []
  let names = []
  if(associated_ids.length) {
    sku_list.value.forEach(i=> {
      if(associated_ids.includes(i.id)) {
        names.push(i.name)
      }
    })
  }
  if(names.length) {
    message.warning('该商品已被关联,暂不支持编辑!');
  }else{
    editData.type = type
    editData.index = index
    editData.data = item
    formState.name = item.name
    formState.online_price = item.online_price
    formState.offline_price = item.offline_price
    formState.description = item.description
    editModalOpen.value = true
  }
}
const formRef = ref();
const handleEditOk = () => {
  formRef.value
    .validate()
    .then(()=> {
      editData.data.name = formState.name
      editData.data.online_price = formState.online_price
      editData.data.offline_price = formState.offline_price
      editData.data.description = formState.description
      base_foods.value[editData.type][editData.index] = editData.data
      handleEditCancel()
    })
}
const handleEditCancel = () => {
  formRef.value.resetFields();
  editModalOpen.value = false
}
</script>

<template>
  <div>
    <div my-3>
      <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
      <span ml-2>基础饭团</span>
    </div>
    <div flex flex-wrap ml-4>
      <a-card v-for="(item, index) in base_foods.ft_list" :key="index" hoverable  style="width: 280px; margin-right: 10px; margin-bottom: 20px;" :style="{ 'border-color': item.check ? '#EE7E63' : '#f0f0f0', background: item.check ? '#FFF4F2' : '#fcfcfc'}">
        <template #actions>
          <span @click="handleStatus('ft_list', item, index)">{{ item.status ? '下架' : '上架'}}</span>
          <span @click="handleEdit('ft_list', item, index)">编辑</span>
          <span @click="handleDelete('ft_list', item, index)">删除</span>
        </template>
        <a-card-meta :title="item.name" :class="{disabled: item.status === 0, 'check-box': item.show_check}" @click="item.check = !item.check">
          <template #avatar>
            <a-avatar :src="item.image || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'" />
          </template>
          <template #description>
            <div flex justify-between>
              <div>线下: <span text-gray-600>{{ item.offline_price }}</span> 元</div>
              <div>线上: <span text-gray-600>{{ item.online_price }}</span> 元</div>
            </div>
            <div>{{ item.description }}</div>
            <div class="check-icon" v-if="item.show_check" :class="{check: item.check}">
              <!-- <CheckOutlined style="font-size: 20px;" :style="{color: item.check ? '#389e0d' : '#fff'}" /> -->
              <image class="" src="../assets/check.png"></image>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div my-3>
      <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
      <span ml-2>基础加料</span>
    </div>
    <div flex flex-wrap ml-4>
      <a-card v-for="(item, index) in base_foods.xl_list" :key="index" hoverable  style="width: 280px; margin-right: 10px; margin-bottom: 20px;" :style="{ 'border-color': item.check ? '#EE7E63' : '#f0f0f0', background: item.check ? '#FFF4F2' : '#fcfcfc'}">
        <template #actions>
          <span @click="handleStatus('xl_list', item, index)">{{ item.status ? '下架' : '上架'}}</span>
          <span @click="handleEdit('xl_list', item, index)">编辑</span>
          <span @click="handleDelete('xl_list', item, index)">删除</span>
        </template>
        <a-card-meta :title="item.name" :class="{disabled: item.status === 0, 'check-box': item.show_check}" @click="item.check = !item.check">
          <template #avatar>
            <a-avatar :src="item.image || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'" />
          </template>
          <template #description>
            <div flex justify-between>
              <div>线下: <span text-gray-600>{{ item.offline_price }}</span> 元</div>
              <div>线上: <span text-gray-600>{{ item.online_price }}</span> 元</div>
            </div>
            <div>{{ item.description }}</div>
            <div class="check-icon" v-if="item.show_check" :class="{check: item.check}">
              <!-- <CheckOutlined style="font-size: 20px;" :style="{color: item.check ? '#389e0d' : '#fff'}" /> -->
              <image class="" src="../assets/check.png"></image>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div my-3>
      <span style="width: 4px;height: 10px;" inline-block bg-cyan-500 text-white rounded-sm mt-1.5></span>
      <span ml-2>现磨豆浆</span>
    </div>
    <div flex flex-wrap ml-4>
      <a-card v-for="(item, index) in base_foods.dj_list" :key="index" hoverable  style="width: 280px; margin-right: 10px; margin-bottom: 20px;" :style="{ 'border-color': item.check ? '#EE7E63' : '#f0f0f0', background: item.check ? '#FFF4F2' : '#fcfcfc'}">
        <template #actions>
          <span @click="handleStatus('dj_list', item, index)">{{ item.status ? '下架' : '上架'}}</span>
          <span @click="handleEdit('dj_list', item, index)">编辑</span>
          <span @click="handleDelete('dj_list', item, index)">删除</span>
        </template>
        <a-card-meta :title="item.name" :class="{disabled: item.status === 0, 'check-box': item.show_check}" @click="item.check = !item.check">
          <template #avatar>
            <a-avatar :src="item.image || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'" />
          </template>
          <template #description>
            <div flex justify-between>
              <div>线下: <span text-gray-600>{{ item.offline_price }}</span> 元</div>
              <div>线上: <span text-gray-600>{{ item.online_price }}</span> 元</div>
            </div>
            <div>{{ item.description }}</div>
            <div class="check-icon" v-if="item.show_check" :class="{check: item.check}">
              <!-- <CheckOutlined style="font-size: 20px;" :style="{color: item.check ? '#389e0d' : '#fff'}" /> -->
              <image class="" src="../assets/check.png"></image>
            </div>
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <context-holder />
  </div>
  <a-modal v-model:open="editModalOpen" title="编辑" @ok="handleEditOk" @cancel="handleEditCancel" cancelText="取消" okText="确定" width="500px">
    <a-form
      :model="formState"
      ref="formRef"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="商品名称" name="name" :rules="[{ required: true, message: '请输入商品名称!' }]">
        <a-input v-model:value="formState.name"/>
      </a-form-item>
      <a-form-item label="线上价格" name="online_price" :rules="[{ required: true, message: '请输入线上价格!' }]">
        <a-input v-model:value="formState.online_price" suffix="元"/>
      </a-form-item>
      <a-form-item label="线下价格" name="offline_price" :rules="[{ required: true, message: '请输入线下价格!' }]">
        <a-input v-model:value="formState.offline_price" suffix="元" />
      </a-form-item>
      <a-form-item label="商品描述" name="description">
        <a-textarea v-model:value="formState.description" :auto-size="{ minRows: 2, maxRows: 3 }" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped lang="scss">
.disabled{
  opacity: 0.3;
}
.check-avatar{
  border: 3px solid #EE7E63;
}
.check-box{
  position: relative;
  .check-icon{
    position: absolute;
    top: 4px;
    right: 0;
    width: 30px;
    height: 30px;
    // background: #eee;
    // border-radius: 0 8px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // .check{
  //   background: #b7eb8f;
  // }
}
::v-deep(.ant-card-body) {
  padding: 0;
}
::v-deep(.ant-card-meta-avatar) {
  padding-inline-end: 12px;
}
::v-deep(.ant-card-meta) {
  padding: 20px;
}
::v-deep(.ant-avatar) {
  width: 48px;
  height: 48px;
}
</style>