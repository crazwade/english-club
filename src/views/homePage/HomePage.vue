<template>
  <Result :visible.sync="resultData.visible" :type="resultData.type" :msg="resultData.msg" :title="resultData.title" @close="handleCloseResult"/>

  <NewTheme :is-visible="isVisible" @close="handleCloseDialog" @submit="handleSubmitDialog" />

  <div class="h-full flex flex-col overflow-auto">

    <!-- 主要顯示區域 -->
    <div class="overflow-auto">
      <div v-if="data.length > 0">
        <el-card v-for="(item, index) in data" :key="index" class="w-4/5 mx-auto mb-4 border border-gray-300 cursor-pointer">
          <div class="card-content p-[10px]" @click="intoTheme(item.themeId)">
            <h2 class="mb-2 items-center"> {{ item.themeName }} </h2>
            <p class="mb-2"> 舉辦時間: {{ timeStampToData(item.holdTime) }} </p>
            <p class="mb-2">{{ item.creator }} 出題</p>
            <p class="mb-2">投稿數量: {{ item.participants }}</p>
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
import { ref, onMounted, reactive } from 'vue';
import NewTheme from './components/NewTheme.vue';
import router from '../../router/index';
import { use as useHttp } from '../../api/request';
import Result from '../../components/Result.vue';

interface FormData {
  themeName: string;
  creator: string;
  holdTime: string;
}

interface ListData {
  themeId: string,
  themeName: string,
  holdTime: string,
  creator: string,
  participants: string,
}

const resultData = reactive({
  type: 'success',
  msg: '',
  visible: false,
  title: '',
})

// 定義與設置 props
const isVisible = ref(false);

/** 新增主題編輯頁面 */
const newTheme = () => {
  isVisible.value = true;
}

// 處理 emit 的事件
const handleCloseDialog = () => {
  isVisible.value = false;
};

const handleCloseResult = () => {
  resultData.visible = false;
};

/** 新增主題 */
const handleSubmitDialog = async (formData: FormData) => {
  try {
    const response = await useHttp().post('/uploadTheme.php', formData);
    //@ts-ignore
    resultData.msg = response.message;
    resultData.type = 'success';
    resultData.visible = true;
    await getAllTheme();
  } catch (error) {
    //@ts-ignore
    resultData.msg = error.message;
    resultData.type = 'error';
    resultData.visible = true;
  }
  isVisible.value = false;
};

/** 進入主題 */
const intoTheme = (themeId: string) => {
  router.push({
    name: 'ThemePage',
    query: { themeId },
  });
}

const timeStampToData = (timestamp: string) => {
  const dateObj = new Date(Number(timestamp));
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};


const data = ref<ListData[]>([]);

const getParticipants = async (themeId: any) => {
  try {
    const response = await useHttp().get('/getAllArticle.php', {
      params: {
        themeId,
      }
    });

    //@ts-ignore
    if (!response.success) {
      return 0;
    }

    //@ts-ignore
    return response.data.list.length;
  } catch (error: any) {
    resultData.msg = `Error Message: ${error.message}, 使用假資料替代`;
    resultData.type = 'error';
    resultData.visible = true;
    return 1;
  }
};

/** 取得全部主題 */
const getAllTheme = async () => {
  try {
    const response = await useHttp().get('/getAllTheme.php');

    //@ts-ignore
    if (!response.success) {
      //@ts-ignore
      resultData.msg = response.message;
      resultData.type = 'error';
      resultData.visible = true;
      data.value = [];
      return;
    }

    const apiData: ListData[] = await Promise.all(response.data.map(async (item: any) => ({
      themeId: item.themeId,
      themeName: item.themeName,
      holdTime: item.holdTime,
      creator: item.creator,
      participants: await getParticipants(item.themeId), // 使用 await 等待非同步函式的結果
    })));

    data.value = apiData;
    return;
  } catch (error) {
    //@ts-ignore
    resultData.title = error.message;
    resultData.msg = '使用假資料替代';
    resultData.type = 'error';
    resultData.visible = true;
    data.value = [
      {
        "themeId": "1",
        "themeName": "旅遊經驗",
        "holdTime": "1689868800000",
        "creator": "Jacky",
        "participants": '1'
      }
    ];
    return;
  }
}

onMounted(async () => {
  await getAllTheme();

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
