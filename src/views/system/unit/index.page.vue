<script setup lang="ts">
import SetModal from './SetModal.vue';
import { deleteUnit, getUnitDetail, getUnitList, type UnitInfo } from '@/api/system/unit';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';

const [registerSetModal, { openModal }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getUnitList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  formConfig: { labelWidth: 100, schemas: searchSchemas }, // 搜索表单配置
  bordered: true, // 是否显示边框
  rowKey: (rowData) => rowData.id, // 表格行 key 的取值
  actionColumn: {
    width: 150,
    key: 'ACTION',
    render: (row: UnitInfo) =>
      h(Action, {
        actions: [
          {
            type: 'edit',
            onClick: async () => {
              const { data } = await getUnitDetail(row.id);
              return openModal(true, data);
            },
          },
          {
            type: 'del',
            onClick: async () => {
              await deleteUnit(row.id);
              await reload();
            },
          },
        ],
      }),
  },
});
</script>

<template>
  <PageWrapper>
    <Table @register="registerTable">
      <template #toolbar>
        <n-button class="mr-2" type="primary" @click="openModal(true)"> 新增 </n-button>
      </template>
    </Table>
    <SetModal @register="registerSetModal" @success="reload()" />
  </PageWrapper>
</template>

<style lang="" scoped></style>
