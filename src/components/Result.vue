<template>
  <el-dialog
    :model-value="props.visible"
    :show-close="false"
  >
    <el-row style="justify-content: center">
      <el-col :sm="12" :lg="6" v-if="props.type === 'success'">
        <el-result
          icon="success"
          :title="props.title"
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
          :title="props.title"
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
          :title="props.title"
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
          :title="props.title"
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

const props = defineProps({
  type: String,
  msg: String,
  visible: Boolean,
  title: String,
});

const emits = defineEmits(['close']);

const emitClose = () => {
  emits('close');
};

</script>
