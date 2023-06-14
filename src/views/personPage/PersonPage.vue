<template>
  <div class="slider-demo-block px-1">
    <el-slider v-model="viewHeight" />
  </div>
  <div class="containerPost" :style="{ height: `${articleHeight}%` }">
    <el-card class="overflow-auto">
      <div class="card-content" v-html="content"></div>
    </el-card>
  </div>
  <div class="containerPost" :style="{ height: `${imageHeight}%` }">
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
// import { use as useHttp } from '../../api/request';

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


const getInfo = (async () => {
  if (postId === '6') {
    const response = {
      files: [
        "https://cdn.pixabay.com/photo/2019/09/15/14/35/city-4478471_1280.jpg",
        "https://cdn.pixabay.com/photo/2018/12/20/16/48/sweden-3886351_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/10/19/04/plough-1814954_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/06/09/21/04/alley-2388256_1280.jpg",
      ],
      content: "I'm more like a easy-going person, a jam-packed schedule is not my style of trip.\r\nWhen it comes to exploring a new place, sure I'll check out the must-see tourist spot like everyone else, and more intent to sleep in and then maybe fine myself chilling at a  oceanfront or a local diner.\r\n\r\nOver the past 20 years, I have traveled to so many places. One of the most memorable trips was my journey to Northern Europe. About last December I flew to Oslo, Norway, and rented a car to Gothenburg, Sweden for my one-week vaca. The weather, people, vibes and culture are my dream destination.\r\n\r\nPicture this: during high way no one  will drive over the limit and no flashing headlights, noisy horns or road rage person. That place is paradise on Earth, no joke.\r\n\r\nGuess the price for this trip ? \r\n1. The flight from Taiwan to Oslo costs around 40,000\r\n2. We rented a car for a week, which costs around 10,000\r\n3. Two Airbnb rentals average 3,000 per night, so that's 21,000 dollars.\r\n4. If you cook and buy groceries from a local supermarket would probably be around 500 dollars per day, so that's 3500\r\n\r\nWe are a group of 7 people, and after splitting the trip expenses, it comes to around 50,000 dollars.\r\n\r\nFor sure the flight is expensive, but after that? I can afford it.",
      poster: "Jacky"
    }

    const res = await loadImages(response.files);

    if (res) {
      // @ts-ignore
      imageUrl.value = response.files;
      content.value = formatString(response.content);
      loading.value = false;
      return;
    }

    ElMessage.error('有張圖片壞掉了');
    // @ts-ignore
    imageUrl.value = response.files;
    content.value = formatString(response.content);
    loading.value = false;
  }

  if (postId === '7') {
    const response = {
      files: [
        "https://cdn.pixabay.com/photo/2019/04/20/18/46/squirrel-4142446_1280.jpg",
        "https://cdn.pixabay.com/photo/2020/12/02/01/06/chipmunk-5795916_1280.jpg",
      ],
      content: "im good\r\nim 19\r\n\r\n\r\nim byebye",
      poster: "JJ"
    }

    const res = await loadImages(response.files);

    if (res) {
      // @ts-ignore
      imageUrl.value = response.files;
      content.value = formatString(response.content);
      loading.value = false;
      return;
    }

    ElMessage.error('有張圖片壞掉了');
    // @ts-ignore
    imageUrl.value = response.files;
    content.value = formatString(response.content);
    loading.value = false;
  }
  // try {
  //   const response = await useHttp().get('/english/getInfo.php', {
  //     params: {
  //       postId,
  //     },
  //   });
  //   imageUrl.value = response.data.files;
  //   content.value = formatString(response.data.content);
  // } catch (error) {
  //   console.error(error);
  // }
  // loading.value = false;
});

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