<template>
  <!-- 新增主題 -->
  <el-dialog
    v-model="props.isVisible"
    @close="handleClose"
    title="新增主題"
    class=" w-[90%]"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      :label-position="'left'"
    >
      <el-form-item label="主題">
        <el-input v-model="formData.themeName" placeholder="請輸入主題" required></el-input>
      </el-form-item>
      <el-form-item label="出題者">
        <el-input v-model="formData.creator" placeholder="請輸入出題者" required></el-input>
      </el-form-item>
      <el-form-item label="舉辦日期">
        <el-date-picker v-model="formData.holdTime" type="date" placeholder="請選擇日期" required></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer flex justify-center mt-5">
      <el-button @click="handleClose">取消</el-button>
      <el-button @click="handleSubmit">送出</el-button>
    </span>
  </el-dialog>
</template>


<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps({
  isVisible: Boolean
});

interface FormData {
  themeName: string;
  creator: string;
  holdTime: string;
}

const formData: FormData = reactive({
  themeName: '',
  creator: '',
  holdTime: ''
});

const emits = defineEmits(['close', 'submit']);

const handleClose = () => {
  emits('close');
};

const handleSubmit = () => {
  const dateObj = new Date(formData.holdTime);
  const timestamp = dateObj.getTime();
  const formDataWithTimestamp = { ...formData, holdTime: timestamp.toString() };
  emits('submit', formDataWithTimestamp);
};
</script>
