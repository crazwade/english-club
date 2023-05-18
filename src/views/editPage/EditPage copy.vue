<template>
  <div>
    <input type="file" multiple ref="fileInput" @change="handleFileUpload" />
    <button @click="uploadImages">Upload Images</button>
    <div>
      <div v-for="previewUrl in previewUrls" :key="previewUrl">
        <img :src="previewUrl" width="100" height="100" />
      </div>
    </div>
  </div>
  <div>
    <textarea v-model="articleContent" rows="5" placeholder="請輸入文章內容"></textarea>
    <button @click="uploadArticle">上傳文章</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { use as useHttp } from '../../api/request';

const imageUrl = ref([]);
const htmlContent = ref('');
const files = ref<File[]>([]);
const previewUrls = ref<File[]>([]);
const fileInputRef = ref<HTMLInputElement | null>(null);
const articleContent = ref('');

const handleFileUpload = () => {
  const files = fileInputRef.value?.files;
  previewUrls.value = [];

  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          previewUrls.value.push(result);
        }
      };

      reader.readAsDataURL(file);
    }
  }
};


const uploadArticle = async () => {
  try {
    const response = await useHttp().post('/uploadTxt', { content: articleContent.value });
    htmlContent.value = response.data;
    // 在這裡處理上傳後的回應
  } catch (error) {
    console.error(error);
  }
};

const uploadImages = async () => {
  const formData = new FormData();
  for (let i = 0; i < files.value.length; i++) {
    formData.append('images', files.value[i]);
  }

  try {
    const response = await useHttp().post('/uploadImg', formData);
    console.log(response.data);
    // 在這裡處理上傳後的回應
  } catch (error) {
    console.error(error);
  }
};

const getImages = async () => {
  try {
    const response = await useHttp().get('/getImg', {
      params: {
        account: 'jacky',
        theme: 'jacky_toc',
      },
    });
    imageUrl.value = response.data.map((base64Image: string) => `data:image/jpeg;base64,${base64Image}`);
    // 在這裡處理上傳後的回應
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getImages();
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
}
.demo-image__lazy {
  height: 50vh;
  overflow-y: auto;
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