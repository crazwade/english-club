<template>
  <Result :visible.sync="resultData.visible" :type="resultData.type" :msg="resultData.msg" :title="resultData.title" @close="handleCloseResult"/>

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
import { ref, onMounted, computed, reactive } from 'vue';
import Result from '@/components/Result.vue';
import { useRoute } from 'vue-router';
import loadImages from '../../common/loadImages';
import { ElMessage } from 'element-plus'
import { use as useHttp } from '../../api/request';

const imageUrl = ref<string[]>([]);
const content = ref('');
const loading = ref(true);
const viewHeight = ref(50);
const articleHeight = computed(() => 46 + viewHeight.value - 50);
const imageHeight = computed(() => 46 + 50 - viewHeight.value);
const resultData = reactive({
  type: 'success',
  msg: '',
  visible: false,
  title: '',
})

const route = useRoute();
const postId = route.query.postId as string

function formatString(input: string): string {
  const lines = input.split(/\r?\n/);
  const formattedLines = lines.map(line => `<p>${line}</p>`).join('<br>');
  return formattedLines;
}

const handleCloseResult = () => {
  resultData.visible = false;
};

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
    //@ts-ignore
    resultData.title = error.message;
    resultData.msg = '使用假資料替代';
    resultData.type = 'error';
    resultData.visible = true;
    const data = {
      files: [
        "https://i.imgur.com/0L8b102h.jpg",
        "https://i.imgur.com/QcrDZFPh.jpg",
        "https://i.imgur.com/ngFmVjZh.jpg",
        "https://i.imgur.com/kOvYik6h.jpg",
        "https://i.imgur.com/VSc1kXMl.jpg",
        "https://i.imgur.com/GIqP5p2h.jpg",
        "https://i.imgur.com/FkmqVJKh.jpg"
      ],
      content: "As the plane descended into Stockholm, the capital of Sweden, I was immediately captivated by the beautiful archipelago that stretched out below. The journey had just begun.\r\n\r\nDay 1-3: Exploring Stockholm Stockholm, an enchanting city spread across 14 islands, is a fantastic blend of modernity and rich history. The cobblestone streets of Gamla Stan, the city’s old town, transported me back in time, while the modern district of Södermalm offered trendy boutiques and a vibrant nightlife. A visit to the Vasa Museum, home to a 17th-century ship, was a highlight.\r\n\r\Day 4-6: Drive to Gothenburg The drive to Gothenburg was scenic and peaceful. Sweden’s second-largest city welcomed me with its Dutch-style canals and leafy boulevards. The Universeum, a science center with a rainforest, aquarium, and animals, was a hit.\r\n\r\nDay 7-9: Venturing into Norway Crossing the border into Norway, the landscape changed dramatically. Majestic fjords and towering mountains replaced the gentle hills of Sweden. Oslo, Norway’s capital, was a delightful mix of old and new. The Viking Ship Museum was a must-see, and the view from the Holmenkollen Ski Jump was breathtaking.\r\n\r\nDay 10-12: The Fjords of Norway Driving along Norway’s west coast was an unforgettable experience. The Geirangerfjord and the Nærøyfjord, both UNESCO World Heritage sites, were stunningly beautiful. A ferry ride across the fjords was a unique experience that allowed me to appreciate the scale and beauty of these natural wonders.\r\n\r\nDay 13-15: Return to Sweden The drive back to Sweden was filled with reflection on the incredible journey. The cities, the countryside, the fjords - each had a unique charm that would linger in my memory.\r\n\r\nThis self-drive tour through Sweden and Norway was more than just a holiday. It was an adventure that offered a wealth of experiences - from cosmopolitan cities to stunning natural landscapes. It was a journey that I would recommend to anyone seeking a unique travel experience.",
    };
    await loadImages(data.files);
    imageUrl.value = data.files;
    content.value = formatString(data.content);
    loading.value = false;
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