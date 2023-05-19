<template>
  <el-dialog
    v-model="props.visible"
    :show-close="false"
  >
    <el-row>
      <el-col :sm="12" :lg="6" v-if="props.type === 'success'">
        <el-result
          icon="success"
          title="Success Tip"
          :sub-title="props.msg"
        >
          <template #extra>
            <el-button type="primary" @click="emitClose">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6" v-if="props.type === 'warning'">
        <el-result
          icon="warning"
          title="Warning Tip"
          :sub-title="props.msg"
        >
          <template #extra>
            <el-button type="primary" @click="emitClose">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6" v-if="props.type === 'error'">
        <el-result
          icon="error"
          title="Error Tip"
          :sub-title="props.msg"
        >
          <template #extra>
            <el-button type="primary" @click="emitClose">Back</el-button>
          </template>
        </el-result>
      </el-col>
      <el-col :sm="12" :lg="6" v-if="props.type === 'info'">
        <el-result
          icon="info"
          title="Info Tip"
          :sub-title="props.msg"
        >
          <template #extra>
            <el-button type="primary" @click="emitClose">Back</el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const props = defineProps({
  type: String,
  msg: String,
  visible: Boolean,
});

onMounted(() => {
  console.log(props);
});

const emits = defineEmits(['close']);

const emitClose = () => {
  emits('close');
};

</script>
