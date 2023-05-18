<template>
  <el-tag class="ml-2" type="warning" size="large" effect="dark">{{ themeName }}</el-tag>
  <div class="h-full flex flex-col overflow-auto mt-5">
    <!-- 主要顯示區域 -->
    <div class="overflow-auto">
      <el-row>
        <el-col :span="12" v-for="(item, index) in data" :key="index">
          <el-card style="margin: 5px" shadow="always" @click="intoPerson(item.userId)" class="cursor-pointer">
            {{ item.name }}
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router/index';
import { use as useHttp } from '../../api/request';

const route = useRoute();
const themeId = route.query.themeId as string

const data = ref([]);
const themeName = ref('');

const newTheme = () => {
  router.push({
      name: 'EditPage',
      query: { themeId: themeId.toString() },
    });
}

const intoPerson = (userId: number) => {
  router.push({
    name: 'PersonPage',
    query: { themeId: themeId.toString(), userId: userId.toString() },
  });
  console.log(userId);
}

onMounted(async() => {
  if (!themeId) {
    router.push({
      name: 'HomePage',
    });
  } else {
    try {
      const response = await useHttp().post('/getTheme', { themeId });
      const { list, theme } = response.data;
      data.value = list;
      themeName.value = theme;
    } catch (error) {
      console.error(error);
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
