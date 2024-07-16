<script setup lang="ts">
import SetModal from './SetModal.vue';
import { deletePost, getPostDetail, getPostList, type PostInfo } from '@/api/system/post';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';

const [registerSetModal, { openModal }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getPostList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  formConfig: { labelWidth: 100, schemas: searchSchemas }, // 搜索表单配置
  bordered: true, // 是否显示边框
  rowKey: (rowData) => rowData.id, // 表格行 key 的取值
  actionColumn: {
    width: 150,
    key: 'ACTION',
    render: (row: PostInfo) =>
      h(Action, {
        actions: [
          {
            type: 'edit',
            onClick: async () => {
              const result = await getPostDetail(row.id);
              return openModal(true, result.data);
            },
          },
          {
            type: 'del',
            onClick: async () => {
              await deletePost(row.id);
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
