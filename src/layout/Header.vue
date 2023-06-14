<template>
  <el-header class="bg-blue-800 fixed top-0 inset-x-0 h-[65px]">
    <div class="flex h-16 items-center">
      <button v-if="!isHomePage" class="mr-2 flex items-center justify-center" @click="goToHomePage">
        <el-icon><ArrowLeftBold /></el-icon>
      </button>
      <div class="flex items-center justify-center flex-grow">
        <h1 class="font-bold text-xl text-white">SAKAWA Tech. Co.</h1>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const isHomePage = computed(() => route.name === 'HomePage');

const goToHomePage = () => {
  if (route.name === 'PersonPage') {
    const themeId = route.query.themeId as string;
    router.push({
      name: 'ThemePage',
      query: { themeId },
    });
  } else if (route.name === 'EditPage') {
    const themeId = route.query.themeId as string;
    router.push({
      name: 'ThemePage',
      query: { themeId },
    });
  } else {
    router.push({ name: 'HomePage' });
  }

};

</script>