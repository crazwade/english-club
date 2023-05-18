<template>
  <!-- Header -->
  <el-container>
    <Header />
  </el-container>
  <el-container>
    <div class="absolute w-full mt-[70px]" :style="{ height: height }">
      <!-- Main -->
      <div
        class="absolute inset-0 p-0 w-full h-full"
        :style="{ height: height, zIndex: showMenu ? 0 : 1 }"
      >
        <el-main class="p-0 w-full h-full">
          <div class="h-full">
            <div class="h-full p-4 flex flex-col">
              <router-view />
            </div>
          </div>
        </el-main>
      </div>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Header from './Header.vue';

const height = computed(() => "calc( 100vh - 60px )");
const showMenu = ref(false);

</script>
