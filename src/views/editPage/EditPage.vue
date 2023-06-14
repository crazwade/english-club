<template>
  <Result :visible="resultData.visible" :type="resultData.type" :msg="resultData.msg" @close="handleCloseResult"/>

  <div>
    <el-upload
      action="/uploadInfo"
      :before-upload="beforeUpload"
      multiple
    >
      <el-button type="primary">選擇檔案</el-button>
    </el-upload>
    <el-input v-model="formData.poster" placeholder="你的名字"></el-input>
    <el-input type="textarea" v-model="formData.content" placeholder="你的文章" rows="10"></el-input>
    <el-button type="success" @click="uploadInfo" class=" mt-3">上傳</el-button>
    <div>
      <template v-for="file in previewFiles" :key="file">
        -
        <img :src="file" width="200" height="100" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
//@ts-ignore
import { use as useHttp } from '../../api/request';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Result from '../../components/Result.vue';

const route = useRoute();
const router = useRouter();

const files = ref<File[]>([]);
  const resultData = reactive({
  type: 'success',
  msg: '',
  visible: false,
})

// 處理 emit 的事件
const handleCloseResult = () => {
  resultData.visible = false;
  const themeId = route.query.themeId as string;
  router.push({
    name: 'ThemePage',
    query: { themeId },
  });
};

interface FormData {
  themeId: string;
  content: string;
  poster: string;
  files: File[];
}

const formData:FormData = reactive({
  themeId: '',
  content: '',
  poster: '',
  files: [],
})

const beforeUpload = (file: File) => {
  files.value.push(file);
  // 預覽圖片
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === 'string') {
      previewFiles.value.push(reader.result);
    }
  };
  reader.readAsDataURL(file);
  return false; // 取消自動上傳
};

const previewFiles = ref<string[]>([]);

const uploadInfo = async () => {
  formData.themeId = route.query.themeId as string;

  // try {
  //   const fileData = new FormData();
  //   files.value.forEach((file: File) => {
  //     fileData.append('files[]', file);
  //   });
  //   fileData.append('themeId', formData.themeId);
  //   fileData.append('content', formData.content);
  //   fileData.append('poster', formData.poster);
  //   // TODO
  //   const response = await axios.post('/api/english/uploadInfo.php', fileData, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });

  //   //@ts-ignore
  //   resultData.msg = response.message;
  //   resultData.type = 'success';
  //   resultData.visible = true;
  //   // formData.files = Array.from(files.value);
  //   // const response = await useHttp().post('/english/uploadInfo.php', formData, {
  //   //   headers: {
  //   //     'Content-Type': 'multipart/form-data',
  //   //   },
  //   // });
  // } catch (error) {
  //   //@ts-ignore
  //   resultData.msg = error.message;
  //   resultData.type = 'error';
  //   resultData.visible = true;
  // }
  resultData.msg = '僅供展示';
  resultData.type = 'warning';
  resultData.visible = true;
};
</script>

<style>
.el-upload--text {
  display: inline-block;
  margin-right: 10px;
}
</style>
