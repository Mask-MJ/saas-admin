<script lang="ts" setup>
import type { PopoverPlacement } from 'naive-ui';

interface Props {
  /** tooltip显示文本 */
  tooltipContent?: string;
  /** tooltip的位置 */
  placement?: PopoverPlacement;
  /** class类 */
  contentClass?: string;
  /** 反转模式下 */
  inverted?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  tooltipContent: '',
  placement: 'bottom',
  contentClass: '',
  inverted: false,
});

const showTooltip = computed(() => Boolean(props.tooltipContent));

const contentClassName = computed(
  () => `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-[#f6f6f6]'}`,
);
</script>

<template>
  <div v-if="showTooltip">
    <n-tooltip :placement="placement" trigger="hover">
      <template #trigger>
        <div
          class="h-full flex-center cursor-pointer dark:hover:bg-[#333]"
          :class="contentClassName"
        >
          <slot />
        </div>
      </template>
      {{ tooltipContent }}
    </n-tooltip>
  </div>
  <div v-else class="flex-center cursor-pointer dark:hover:bg-[#333]" :class="contentClassName">
    <slot />
  </div>
</template>

<style scoped></style>
