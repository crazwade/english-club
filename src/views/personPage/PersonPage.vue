<template>
  <div class="slider-demo-block px-1">
    <el-slider v-model="viewHeight" />
  </div>
  <div class="containerPost" :style="{ height: `${articleHeight}%` }" v-if="articleHeight > 5">
    <el-card class="overflow-auto">
      <div class="card-content" v-html="content"></div>
    </el-card>
  </div>
  <div class="containerPost" :style="{ height: `${imageHeight}%` }" v-if="imageHeight > 5">
    <div class="demo-image__lazy">
      <el-skeleton style="width: 240px" :loading="loading" animated :count="3">
        <template #template>
          <el-skeleton-item variant="image" style="width: 400px; height: 267px" />
        </template>
      </el-skeleton>
      <el-image
        v-for="(url, index) in imageUrl"
        :key="index"
        :src="url"
        :preview-src-list="imageUrl"
        fit="cover"
        :lazy="true"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import loadImages from '../../common/loadImages';
import { ElMessage } from 'element-plus'
import { use as useHttp } from '../../api/request';

const imageUrl = ref([]);
const content = ref('');
const loading = ref(true);
const viewHeight = ref(50);
const articleHeight = computed(() => 46 + viewHeight.value - 50);
const imageHeight = computed(() => 46 + 50 - viewHeight.value);

const route = useRoute();
const postId = route.query.postId as string

function formatString(input: string): string {
  const lines = input.split(/\r?\n/);
  const formattedLines = lines.map(line => `<p>${line}</p>`).join('<br>');
  return formattedLines;
}


const getInfo = async () => {
  try {
    const response = await useHttp().get('/getInfo.php', {
      params: {
        postId,
      },
    });

    const res = await loadImages(response.data.files);

    if (res) {
      imageUrl.value = response.data.files;
      content.value = formatString(response.data.content);
      loading.value = false;
      return;
    }

    ElMessage.error('有張圖片壞掉了');
    // @ts-ignore
    imageUrl.value = response.data.files;
    content.value = formatString(response.data.content);
    loading.value = false;
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

onMounted(() => {
  getInfo();
});

</script>

<style scoped>
.card-content {
  text-align: left;
}
.containerPost {
  border: 5px solid gray;;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
  height: 46%;
  overflow-y: auto;
}
.demo-image__lazy {
  height: 45%;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  max-width: 500px;
  margin-bottom: 10px;
  margin: 0 auto;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>