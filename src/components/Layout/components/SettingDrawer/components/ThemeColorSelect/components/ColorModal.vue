<script setup lang="ts" name="ColorModal">
import ColorCheckbox from './ColorCheckbox.vue';
import { traditionColors } from '@/settings/theme';

interface Props {
  visible: boolean;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

interface Emits {
  (e: 'close'): void;
}

const theme = useThemeStore();

function handleClose() {
  emit('close');
}
</script>

<template>
  <n-modal
    :show="visible"
    preset="card"
    class="h-480px w-640px"
    :z-index="10001"
    @close="handleClose"
  >
    <div class="flex-x-center">
      <n-gradient-text type="primary" :size="24"> 中国传统颜色 </n-gradient-text>
    </div>
    <n-tabs>
      <n-tab-pane
        v-for="item in traditionColors"
        :key="item.label"
        :name="item.label"
        :tab="item.label"
      >
        <n-grid :cols="8" :x-gap="16" :y-gap="8">
          <n-grid-item v-for="i in item.data" :key="i.label">
            <ColorCheckbox
              class="!h-36px !w-full !rounded-4px"
              :color="i.color"
              :checked="i.color === theme.themeColor"
              icon-class="text-20px"
              @click="theme.setThemeColor(i.color)"
            />
            <p class="text-center">
              {{ i.label }}
            </p>
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<style scoped></style>
