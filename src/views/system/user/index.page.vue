<script setup lang="ts">
import { deleteUser, getUserDetail, getUserList, type UserInfo } from '@/api/system/user';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';
import ResetModal from './ResetModal.vue';
import SetModal from './SetModal.vue';

const [registerSetModal, { openModal: openSetModel }] = useModal();
const [registerResetModal, { openModal: openResetModel }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getUserList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  formConfig: { labelWidth: 100, schemas: searchSchemas }, // 搜索表单配置
  bordered: true,
  rowKey: (rowData) => rowData.id,
  actionColumn: {
    width: 200,
    key: 'ACTION',
    render: (row: UserInfo) =>
      h(Action, {
        actions: row.isAdmin
          ? []
          : [
              {
                type: 'edit',
                onClick: async () => {
                  const { data } = await getUserDetail(row.id);
                  return openSetModel(true, data);
                },
              },
              {
                icon: 'i-ant-design:key-outlined',
                tooltipProps: { content: '重置密码' },
                buttonProps: {
                  type: 'success',
                  onClick: () => openResetModel(true, { id: row.id }),
                },
              },
              {
                type: 'del',
                onClick: async () => {
                  await deleteUser(row.id);
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
        <n-button class="mr-2" type="primary" @click="openSetModel(true)"> 新增 </n-button>
      </template>
    </Table>
    <SetModal @register="registerSetModal" @success="reload()" />
    <ResetModal @register="registerResetModal" />
  </PageWrapper>
</template>

<style scoped></style>
