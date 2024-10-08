<script setup lang="ts" name="TabDetail">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import ButtonTab from './ButtonTab.vue';
import ChromeTab from './ChromeTab.vue';
import ContextMenu from './ContextMenu.vue';

interface Emits {
  (e: 'scroll', clientX: number): void;
}

const emit = defineEmits<Emits>();

const theme = useThemeStore();
const tabStore = useTabStore();
const isChromeMode = computed(() => theme.tab.mode === 'chrome');
const activeComponent = computed(() => (isChromeMode.value ? ChromeTab : ButtonTab));

// 获取当前激活的tab的clientX
const tabRef = ref<HTMLElement>();
async function getActiveTabClientX() {
  await nextTick();
  if (
    tabRef.value &&
    tabRef.value.children.length &&
    tabRef.value.children[tabStore.activeTabIndex]
  ) {
    const activeTabElement = tabRef.value.children[tabStore.activeTabIndex];
    const { x, width } = activeTabElement.getBoundingClientRect();
    const clientX = x + width / 2;
    setTimeout(() => {
      emit('scroll', clientX);
    }, 50);
  }
}

interface DropdownConfig {
  visible: boolean;
  affix: boolean;
  x: number;
  y: number;
  currentPath: string;
}

const dropdown: DropdownConfig = reactive({
  visible: false,
  affix: false,
  x: 0,
  y: 0,
  currentPath: '',
});

function setDropdown(config: Partial<DropdownConfig>) {
  Object.assign(dropdown, config);
}

let isClickContextMenu = false;

function handleDropdownVisible(visible: boolean) {
  if (!isClickContextMenu) setDropdown({ visible });
}

/** 点击右键菜单 */
async function handleContextMenu(e: MouseEvent, currentPath: string, affix?: boolean) {
  e.preventDefault();

  const { clientX, clientY } = e;

  isClickContextMenu = true;

  const DURATION = dropdown.visible ? 150 : 0;

  setDropdown({ visible: false });

  setTimeout(() => {
    setDropdown({
      visible: true,
      x: clientX,
      y: clientY,
      currentPath,
      affix,
    });
    isClickContextMenu = false;
  }, DURATION);
}

watch(
  () => tabStore.activeTabIndex,
  () => {
    getActiveTabClientX();
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div ref="tabRef" class="h-full" :class="[isChromeMode ? 'flex items-end' : 'flex-y-center']">
    <component
      :is="activeComponent"
      v-for="(item, index) in tabStore.getTabs"
      :key="item.fullPath"
      :is-active="tabStore.activeTab === item.fullPath"
      :primary-color="theme.themeColor"
      :closable="!(item.name === tabStore.homeTab.name || item.meta.affix)"
      :dark-mode="theme.darkMode"
      :class="{
        '!mr-0': isChromeMode && index === tabStore.getTabs.length - 1,
        'mr-10px': !isChromeMode,
      }"
      @click="tabStore.handleClickTab(item.fullPath)"
      @close="() => tabStore.removeTab(item.fullPath)"
      @contextmenu="handleContextMenu($event, item.fullPath, item.meta.affix as boolean)"
    >
      <i :class="item.meta.icon" class="mr-4px inline-block align-text-bottom text-16px" />
      {{ item.meta.title }}
    </component>
  </div>
  <ContextMenu
    :visible="dropdown.visible"
    :current-path="dropdown.currentPath"
    :affix="dropdown.affix"
    :x="dropdown.x"
    :y="dropdown.y"
    @update:visible="handleDropdownVisible"
  />
</template>

<style scoped></style>
