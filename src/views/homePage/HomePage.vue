<template>
  <Result :visible="resultData.visible" :type="resultData.type" :msg="resultData.msg" @close="handleCloseResult"/>

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
import { ref, onMounted, reactive } from 'vue';
import NewTheme from './components/NewTheme.vue';
import router from '../../router/index';
//@ts-ignore
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
//@ts-ignore
const handleSubmitDialog = async (formData: FormData) => {
  // try {
  //   const response = await useHttp().post('/english/uploadTheme.php', formData);
  //   //@ts-ignore
  //   resultData.msg = response.message;
  //   resultData.type = 'success';
  //   resultData.visible = true;
  //   await getAllTheme();
  // } catch (error) {
  //   //@ts-ignore
  //   resultData.msg = error.message;
  //   resultData.type = 'error';
  //   resultData.visible = true;
  // }
  resultData.msg = '僅供展示';
  resultData.type = 'warning';
  resultData.visible = true;
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

/** 取得全部主題 */
const getAllTheme = async () => {
  data.value = [
    {
      themeId: '2',
      themeName: '旅遊',
      holdTime: '1683820800000',
      creator: '小羊',
      participants: '5',
    },
    {
      themeId: '3',
      themeName: '初戀',
      holdTime: '1684425600000',
      creator: 'Paul',
      participants: '5',
    }
  ]
  // try {
  //   const response = await useHttp().get('/english/getAllTheme.php');

  //   const apiData: ListData[] = response.data.map((item: any) => ({
  //     themeId: item.themeId,
  //     themeName: item.themeName,
  //     holdTime: item.holdTime,
  //     creator: item.creator,
  //   }));

  //   data.value = apiData;
  // } catch (error) {
  //   //@ts-ignore
  //   resultData.msg = error.message;
  //   resultData.type = 'error';
  //   resultData.visible = true;
  // }
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
