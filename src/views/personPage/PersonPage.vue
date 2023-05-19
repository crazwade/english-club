<template>
  <div class="containerPost" >
    <el-card class="overflow-auto">
      <div class="card-content" v-html="content"></div>
    </el-card>
  </div>
  <el-divider class="custom-divider">
    <el-icon><star-filled /></el-icon>
  </el-divider>
  <div class="containerPost">
    <div class="demo-image__lazy">
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { StarFilled } from '@element-plus/icons-vue'
import { use as useHttp } from '../../api/request';

const imageUrl = ref([]);
const content = ref('');

const route = useRoute();
const postId = route.query.postId as string

function formatString(input: string): string {
  const lines = input.split(/\r?\n/);
  const formattedLines = lines.map(line => `<p>${line}</p>`).join('<br>');
  return formattedLines;
}


const getInfo = async () => {
  try {
    const response = await useHttp().get('/english/getInfo.php', {
      params: {
        postId,
      },
    });
    imageUrl.value = response.data.files;
    content.value = formatString(response.data.content);
  } catch (error) {
    console.error(error);
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
.custom-divider {
  border: 3px solid gray;
  border-radius: 5px;
}
.containerPost {
  border: 5px solid gray;;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
  height: 50%;
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