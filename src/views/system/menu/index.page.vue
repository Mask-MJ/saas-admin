<script setup lang="ts">
import { deleteMenu, getMenuDetail, getMenuList, type MenuInfo } from '@/api/system/menu';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';
import SetModal from './SetModal.vue';

const [registerSetModal, { openModal: openSetModel }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getMenuList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  formConfig: { labelWidth: 100, schemas: searchSchemas }, // 搜索表单配置
  pagination: false, // 是否分页
  bordered: true, // 是否展示边框
  rowKey: (rowData) => rowData.id, // 数组中每一项的唯一标识
  showIndexColumn: false, // 是否显示序号列
  //  action 操作列
  actionColumn: {
    width: 150,
    key: 'ACTION',
    render: (row: MenuInfo) =>
      h(Action, {
        actions: [
          {
            type: 'edit',
            onClick: async () => {
              const result = await getMenuDetail(row.id);
              return openSetModel(true, result.data);
            },
          },
          {
            type: 'del',
            onClick: async () => {
              await deleteMenu(row.id);
              await reload();
            },
          },
        ],
      }),
  },
});
const handleAdd = () => {
  openSetModel(true);
};
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="handleAdd"> 新增 </n-button>
      </template>
    </Table>
    <SetModal @register="registerSetModal" @success="reload()" />
  </PageWrapper>
</template>

<style lang="" scoped></style>
