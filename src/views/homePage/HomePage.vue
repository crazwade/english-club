<template>
  <NewTheme :is-visible="isVisible" @close="handleCloseDialog" @submit="handleSubmitDialog" />

  <div class="h-full flex flex-col overflow-auto">

    <!-- 主要顯示區域 -->
    <div class="overflow-auto">
      <div v-if="data.length > 0">
        <el-card v-for="(item, index) in data" :key="index" class="w-4/5 mx-auto mb-4 border border-gray-300 cursor-pointer">
          <div class="card-content p-[10px]" @click="intoTheme(item.themeId)">
            <h2 class="mb-2 items-center"> {{ item.title }} </h2>
            <p class="mb-2"> 舉辦時間: {{ timeStampToData(item.holdingTime) }} </p>
            <p class="mb-2">{{ item.creator }} 出題</p>
            <p class="mb-2">參與人數: {{ item.participants }}</p>
          </div>
        </el-card>
      </div>
      <div v-else>
        <el-card class="w-4/5 mx-auto border border-gray-300">
          <div class="card-content">
            <p>未有資料</p>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 底部按鈕 -->
    <div class="flex items-center justify-center mt-4">
      <div class="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-blue-800 cursor-pointer" @click="newTheme()">
        <el-icon size="30" class="text-white"><DocumentAdd /></el-icon>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NewTheme from './components/NewTheme.vue';
import router from '../../router/index';

interface FormData {
  title: string;
  creator: string;
  date: string;
}

// 定義與設置 props
const isVisible = ref(false);

const newTheme = () => {
  isVisible.value = true;
  console.log(123);
}

// 處理 emit 的事件
const handleCloseDialog = () => {
  isVisible.value = false;
};

const handleSubmitDialog = (formData: FormData) => {
  console.log(formData);
  isVisible.value = false;
};

const intoTheme = (themeId: number) => {
  router.push({
    name: 'ThemePage',
    query: { themeId: themeId.toString() },
  });
}

const timeStampToData = (timestamp: number) => {
  const dateObj = new Date(timestamp);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
}

const data = ref([
  {
    themeId: 0,
    title: 'title',
    holdingTime: 1683129600000,
    creator: 'jacky',
    participants: 5,
  },
  {
    themeId: 1,
    title: 'title',
    holdingTime: 1683129600000,
    creator: 'jacky',
    participants: 5,
  },
  {
    themeId: 2,
    title: 'title',
    holdingTime: 1683129600000,
    creator: 'jacky',
    participants: 5,
  },
  {
    themeId: 3,
    title: 'title',
    holdingTime: 1683129600000,
    creator: 'jacky',
    participants: 5,
  },
  {
    themeId: 4,
    title: 'title',
    holdingTime: 1683129600000,
    creator: 'jacky',
    participants: 5,
  },
]);

onMounted(() => {
  const contain = document.getElementById('contain');
  if (contain === null) {
    return;
  }

  if (contain.scrollHeight > contain.clientHeight) {
    contain.style.overflow = 'scroll';
    contain.style.paddingBottom = '68px'; // 調整底部按鈕高度
  }
});
</script>
