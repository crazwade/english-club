<template>
  <div class="container" >
    <el-card class="overflow-auto">
      <div class="card-content" v-html="content"></div>
    </el-card>
  </div>
  <el-divider class="custom-divider">
    <el-icon><star-filled /></el-icon>
  </el-divider>
  <div class="container">
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
import { StarFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';
import { use as useHttp } from '../../api/request';

const imageUrl = ref([]);
const content = ref('');

const getInfo = async () => {
  try {
    const response = await useHttp().get('/getInfo', {
      params: {
        id: '0',
        account: 'jacky',
        theme: 'jacky_toc',
      },
    });
    imageUrl.value = response.data.files.map((base64Image: string) => `data:image/jpeg;base64,${base64Image}`);
    content.value = response.data.content;
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
.container {
  border: 5px solid gray;;
  border-radius: 5px;
  padding: 5px;
  margin: 10px 0;
  height: 45vh;
  overflow-y: auto;
}
.demo-image__lazy {
  height: 45vh;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}
</style>