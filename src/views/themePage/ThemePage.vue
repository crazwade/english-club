<template>
  <Result :visible="resultData.visible" :type="resultData.type" :msg="resultData.msg" @close="handleCloseResult"/>

  <el-tag class="ml-2" type="warning" size="large" effect="dark">{{ themeTitle }}</el-tag>
  <div class="h-full flex flex-col overflow-auto mt-5">
    <!-- 主要顯示區域 -->
    <div class="overflow-auto">
      <el-row>
        <el-col :span="12" v-for="(item, index) in data" :key="index">
          <el-card style="margin: 5px" shadow="always" @click="intoPerson(item.postId)" class="cursor-pointer">
            {{ item.poster }}
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

// 處理 emit 的事件
const handleCloseResult = () => {
  resultData.visible = false;
};

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

onMounted(async() => {
  if (!themeId) {
    router.push({
      name: 'HomePage',
    });
  } else {
    try {
      const response = await useHttp().get('/english/getAllArticle.php', {
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
      data.value = list;
      themeTitle.value = themeName;

      return;
    } catch (error) {
      //@ts-ignore
      resultData.msg = error.message;
      resultData.type = 'error';
      resultData.visible = true;
      return;
    }
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
