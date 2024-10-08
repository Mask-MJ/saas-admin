<script setup lang="ts" name="ButtonTab">
import { computed } from 'vue';
import { CssRender } from 'css-render';
import IconClose from './IconClose.vue';
import { addColorAlpha } from '@/settings/theme/themeColor';

interface Props {
  /** 暗黑模式 */
  darkMode?: boolean;
  /** 激活状态 */
  isActive?: boolean;
  /** 主题颜色 */
  primaryColor?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 暗黑模式的边框颜色 */
  darkBorderColor?: string;
  /** 是否显示关闭图标 */
  closable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
  isActive: false,
  primaryColor: '#1890ff',
  borderColor: '#e5e7eb',
  darkBorderColor: '#ffffff3d',
  closable: true,
});

const emit = defineEmits<Emits>();

interface Emits {
  /** 点击关闭图标 */
  (e: 'close'): void;
}

const [value] = useToggle();

const isIconActive = computed(() => props.isActive || value.value);

const buttonStyle = computed(() => {
  const style: Record<string, string> = {};
  style.borderColor = props.darkMode ? props.darkBorderColor : props.borderColor;
  if (isIconActive.value) {
    style.color = props.primaryColor;
    style.borderColor = addColorAlpha(props.primaryColor, 0.3);
    if (props.isActive) {
      const alpha = props.darkMode ? 0.15 : 0.1;
      style.backgroundColor = addColorAlpha(props.primaryColor, alpha);
    }
  }
  return style;
});

function handleClose(e: MouseEvent) {
  e.stopPropagation();
  emit('close');
}

const { c } = CssRender();
const style = c(
  '.admin-tab__button-tab',
  {
    position: 'relative',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
    paddingLeft: '14px',
    paddingRight: '6px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderRadius: '2px',
    cursor: 'pointer',
  },
  [
    c('&--unclosable', { paddingRight: '14px !important' }),
    c('&__preffix', { whiteSpace: 'nowrap' }),
    c('&__icon', { paddingLeft: '10px' }),
  ],
);
style.render();
style.mount();
</script>

<template>
  <div
    class="admin-tab__button-tab"
    :class="{ 'admin-tab__button-tab--unclosable': !closable }"
    :style="buttonStyle"
    @mouseenter="value = true"
    @mouseleave="value = false"
  >
    <span class="admin-tab__button-tab__preffix">
      <slot />
    </span>
    <div v-if="closable" class="admin-tab__button-tab__icon">
      <IconClose :is-active="isIconActive" :active-color="primaryColor" @click="handleClose" />
    </div>
  </div>
</template>

<style scoped></style>
