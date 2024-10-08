<script setup lang="ts" name="SvgRadiusBg">
import { computed } from 'vue';
import { mixinColor } from '@/settings/theme/themeColor';

/** 填充颜色： [默认颜色, 暗黑主题颜色] */
type FillColor = [string, string];
/** 混合比例：[默认, 暗黑] */
type MixRatio = [number, number];

interface Props {
  /** 暗黑模式 */
  darkMode?: boolean;
  /** 激活状态 */
  isActive?: boolean;
  /** 鼠标悬浮状态 */
  isHover?: boolean;
  /** 主题颜色 */
  primaryColor?: string;
  /** 背景颜色 */
  bgColor?: FillColor;
  /** 悬浮时的背景颜色 */
  hoverBgColor?: FillColor;
  /** 激活状态时的混合颜色 */
  mixColor?: FillColor;
  /** 混合比例(主题颜色的占比) */
  mixRatio?: MixRatio;
}

const props = withDefaults(defineProps<Props>(), {
  darkMode: false,
  isActive: false,
  isHover: false,
  primaryColor: '#1890ff',
  bgColor: () => ['#ffffff', '#18181c'],
  hoverBgColor: () => ['#dee1e6', '#333333'],
  mixColor: () => ['#ffffff', '#000000'],
  mixRatio: () => [0.2, 0.3],
});

const fill = computed(() => {
  const index = Number(props.darkMode);
  let color = props.bgColor[index];
  if (props.isHover) color = props.hoverBgColor[index];

  if (props.isActive) {
    const ratio = props.mixRatio[index];
    color = mixinColor(props.mixColor[index], props.primaryColor, ratio);
  }
  return color;
});
</script>

<template>
  <svg style="width: 100%; height: 100%">
    <defs>
      <symbol id="geometry-left" viewBox="0 0 214 36">
        <path d="M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" />
      </symbol>
      <symbol id="geometry-right" viewBox="0 0 214 36">
        <use xlink:href="#geometry-left" />
      </symbol>
      <clipPath>
        <rect width="100%" height="100%" x="0" />
      </clipPath>
    </defs>
    <svg width="52%" height="100%">
      <use xlink:href="#geometry-left" width="214" height="36" :fill="fill" />
    </svg>
    <g transform="scale(-1, 1)">
      <svg width="52%" height="100%" x="-100%" y="0">
        <use xlink:href="#geometry-right" width="214" height="36" :fill="fill" />
      </svg>
    </g>
  </svg>
</template>

<style scoped></style>
