<script setup lang="ts" name="ChromeTab">
import { CssRender } from 'css-render';
import SvgRadiusBg from './SvgRadiusBg.vue';
import IconClose from './IconClose.vue';

/** 填充颜色： [默认颜色, 暗黑主题颜色] */
type FillColor = [string, string];

/** 混合比例：[默认, 暗黑] */
type MixRatio = [number, number];

interface Props {
  /** 暗黑模式 */
  darkMode?: boolean;
  /** 激活状态 */
  isActive?: boolean;
  /** 主题颜色 */
  primaryColor?: string;
  /** 是否显示关闭图标 */
  closable?: boolean;
  /** 背景颜色 */
  bgColor?: FillColor;
  /** 悬浮时的背景颜色 */
  hoverBgColor?: FillColor;
  /** 激活状态时的混合颜色 */
  mixColor?: FillColor;
  /** 混合比例(主题颜色的占比) */
  mixRatio?: MixRatio;
}

withDefaults(defineProps<Props>(), {
  darkMode: false,
  isActive: false,
  primaryColor: '#1890ff',
  closable: true,
  bgColor: () => ['#ffffff', '#18181c'],
  hoverBgColor: () => ['#dee1e6', '#3f3c37'],
  mixColor: () => ['#ffffff', '#000'],
  mixRatio: () => [0.13, 0.35],
});

const emit = defineEmits<Emits>();

interface Emits {
  /** 点击关闭图标 */
  (e: 'close'): void;
}

const [value] = useToggle();

function handleClose(e: MouseEvent) {
  e.stopPropagation();
  emit('close');
}

const { c } = CssRender();
const style = c(
  '.admin-tab__chrome-tab',
  {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    height: '34px',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginRight: '-18px',
    cursor: 'pointer',
  },
  [
    c('&--active', {
      zIndex: 10,
    }),
    c('&--hover', {
      zIndex: 9,
    }),
    c('&__bg', {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }),
    c('&__slot', {
      position: 'relative',
      zIndex: 2,
      whiteSpace: 'nowrap',
    }),
    c('&__icon', {
      paddingLeft: '18px',
    }),
    c(
      '&__divider',
      {
        position: 'absolute',
        right: '7.5px',
        zIndex: 2,
        width: '1px',
        height: '16px',
        backgroundColor: '#1f2225',
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      },
      [
        c('&--hide', {
          opacity: 0,
        }),
        c('&--dark', {
          backgroundColor: 'rgba(255,255,255,0.9) !important',
        }),
      ],
    ),
  ],
);
style.render();
style.mount();
</script>

<template>
  <div
    class="admin-tab__chrome-tab"
    :class="{ 'admin-tab__chrome-tab--active': isActive, 'admin-tab__chrome-tab--hover': value }"
    @mouseenter="value = true"
    @mouseleave="value = false"
  >
    <div class="admin-tab__chrome-tab__bg">
      <SvgRadiusBg
        :dark-mode="darkMode"
        :is-active="isActive"
        :is-hover="value"
        :primary-color="primaryColor"
        :bg-color="bgColor"
        :hover-bg-color="hoverBgColor"
        :mix-color="mixColor"
        :mix-ratio="mixRatio"
      />
    </div>
    <span class="admin-tab__chrome-tab__slot">
      <slot />
    </span>
    <div v-if="closable" class="admin-tab__chrome-tab__icon">
      <IconClose :is-active="isActive" :active-color="primaryColor" @click="handleClose" />
    </div>
    <div
      class="admin-tab__chrome-tab__divider"
      :class="{
        'admin-tab__chrome-tab__divider--hide': value || isActive,
        'admin-tab__chrome-tab__divider--dark': darkMode,
      }"
    />
  </div>
</template>

<style scoped></style>
