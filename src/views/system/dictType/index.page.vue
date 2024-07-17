<script setup lang="ts">
import SetModal from './SetModal.vue';
import {
  deleteDictType,
  getDictTypeDetail,
  getDictTypeList,
  type DictTypeInfo,
} from '@/api/system/dict';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';

const router = useRouter();
const [registerSetModal, { openModal }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getDictTypeList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  formConfig: { labelWidth: 100, schemas: searchSchemas }, // 搜索表单配置
  bordered: true, // 是否显示边框
  rowKey: (rowData) => rowData.id, // 表格行 key 的取值
  actionColumn: {
    width: 150,
    key: 'ACTION',
    render: (row: DictTypeInfo) =>
      h(Action, {
        actions: [
          {
            type: 'edit',
            onClick: async () => {
              const { data } = await getDictTypeDetail(row.id);
              return openModal(true, data);
            },
          },
          {
            icon: 'i-line-md:list-3',
            tooltipProps: { content: '模版管理' },
            buttonProps: {
              type: 'success',
              onClick: () => router.push(`/system/dictData/${row.id}`),
            },
          },
          {
            type: 'del',
            onClick: async () => {
              await deleteDictType(row.id);
              await reload();
            },
          },
        ],
      }),
  },
});
const handleAdd = () => {
  openModal(true);
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
