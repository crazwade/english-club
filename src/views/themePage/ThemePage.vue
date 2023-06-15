<template>
  <Result :visible="resultData.visible" :type="resultData.type" :msg="resultData.msg" @close="handleCloseResult"/>

  <el-tag class="ml-2" type="warning" size="large" effect="dark">{{ themeTitle }}</el-tag>
  <div class="h-full flex flex-col overflow-auto mt-5">
    <!-- 主要顯示區域 -->
    <div class="overflow-auto">
      <el-row>
        <el-col :span="12" v-for="(item, index) in data" :key="index" class="relative">
          <div
            class="absolute bg-gray-400 top-[50%] rounded-full text-gray-700 left-[80%] w-[40px] h-[40px] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center cursor-pointer hover:text-red-500"
            v-on:mouseover="item.deleteHover = true"
            v-on:mouseleave="item.deleteHover = false"
          >
            <el-icon @click="dialogCheck(item.postId)" class=" text-2xl">
              <Delete />
            </el-icon>
          </div>
          <el-card style="margin: 5px" shadow="always" @click="intoPerson(item.postId)" class="cursor-pointer hover:bg-orange-400" id="el-card-body" :class="{ ' bg-red-500': item.deleteHover }">
            <div>{{ item.poster }}</div>
          </el-card>
        </el-col>
      </el-row>
      <div v-if="data.length === 0" class="no-data">
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

  <el-dialog
    v-model="dialogVisible"
    title="確認"
    width="80%"
    :before-close="handleDialogClose"
  >
    <span>確定要刪除嗎?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">先不要</el-button>
        <el-button @click="deletePost" id="del">
          刪除
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router/index';
import { use as useHttp } from '../../api/request';
import Result from '../../components/Result.vue';

interface ListData {
  postId: number,
  poster: string,
  deleteHover: boolean,
}

const route = useRoute();
const themeId = route.query.themeId as string

const data = ref<ListData[]>([]);
const themeTitle = ref('');
const resultData = reactive({
  type: 'success',
  msg: '',
  visible: false,
})
const dialogVisible = ref(false);
const seletPostId = ref(-1);

// 處理 emit 的事件
const handleCloseResult = () => {
  resultData.visible = false;
};

const handleDialogClose = () => {
  seletPostId.value = -1;
  dialogVisible.value = false;
}

const newTheme = () => {
  router.push({
      name: 'EditPage',
      query: { themeId: themeId.toString() },
    });
}

const intoPerson = (postId: number) => {
  router.push({
    name: 'PersonPage',
    query: { themeId: themeId.toString(), postId: postId.toString() },
  });
}

const dialogCheck = (postId: number) => {
  seletPostId.value = postId;
  dialogVisible.value = true;
}

const deletePost = (async () => {
  if (seletPostId.value === -1) {
    resultData.msg = '不明錯誤請重試';
    resultData.type = 'error';
    resultData.visible = true;
    return;
  }

  try {
    const response = await useHttp().post('/deletePost.php', { postId: seletPostId.value });
    //@ts-ignore
    if (!response.success) {
    //@ts-ignore
      resultData.msg = response.message;
      resultData.type = 'error';
      resultData.visible = true;
      themeTitle.value = 'Error';
      handleDialogClose();
      return;
    }
    await init();
    handleDialogClose();
    return;
  } catch (error) {
    //@ts-ignore
    resultData.msg = error.message;
    resultData.type = 'error';
    resultData.visible = true;
    handleDialogClose();
    return;
  }
});

const init = (async() => {
  try {
    const response = await useHttp().get('/getAllArticle.php', {
      params: {
        themeId,
      }
    });
    //@ts-ignore
    if (!response.success) {
    //@ts-ignore
      resultData.msg = response.message;
      resultData.type = 'error';
      resultData.visible = true;
      data.value = [];
      themeTitle.value = 'Error';
      return;
    }

    const { list, themeName } = response.data;
    data.value = list.map((item: any) => ({ ...item, deleteHover: false }));
    themeTitle.value = themeName;

    return;
  } catch (error) {
    //@ts-ignore
    resultData.msg = error.message;
    resultData.type = 'error';
    resultData.visible = true;
    return;
  }
});

onMounted(async() => {
  if (!themeId) {
    router.push({
      name: 'HomePage',
    });
  } else {
    await init();
  }
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

<style>
#del {
  background-color: #EF5350 !important;
  color: white !important;
}
</style>