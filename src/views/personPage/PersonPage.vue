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
      content: "==此文章是測試文章==\r\n\r\n北歐，主要包含丹麥、挪威、瑞典、芬蘭、冰島等五個國家。這趟行程基於時間和金錢的因素，只去了斯勘地納維亞半島的4國 (丹麥、挪威、瑞典、芬蘭)加上一天的愛沙尼亞，而這篇文章將會把我這次21天的行程規劃還有在北歐自助旅行所需的實用資訊分享給大家。\r\n\r\n會想要去北歐的原因，是因為自從去完俄羅斯後，就一直在想接下來到底要去什麼地方呢？原本考慮的國家名單裡有墨西哥、克羅埃西亞等⋯⋯就在糾結了老半天的時候，跟著我一起去俄羅斯冒險的旅伴說她很想去北歐看看。而北歐也一直以來也是我夢想造訪的地區之一。\r\n\r\n開始想法是最短時間走過能走到最精華的地點，因為是從英國出差前順便走的一趟行程。這張圖內，最短可以走過三個國家的方法大概就是這樣。不管你是先降落哥本哈根一路往上走到卑爾根，或是相反方向行走，你基本上可以找幾個大都市，看看怎麼串起來和使用甚麼交通工具。丹麥哥本哈根和瑞典馬爾默之間有火車或巴士，這邊就有分巴士景觀好、火車班次多和速度快，最後因為海景可以在馬爾默拍，所以丹麥哥本哈根和瑞典馬爾默之間選擇火車。丹麥哥本哈根和挪威奧斯陸中間可以選飛機或是渡輪，飛機速度快和價格高、渡輪可當過夜旅館，所以選擇丹麥哥本哈根和挪威奧斯陸中間用渡輪。奧斯陸和卑爾根則是著名的火車（其實還有船合併可以做著名的挪威縮影之旅），不過礙於時間，只能搭過著名的火車而已。斯德哥爾摩則是太遠只能用飛機，就不去撿點了。這樣行程大概約為六至八天行程。",
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