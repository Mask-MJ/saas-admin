<script setup lang="ts">
import SetModal from './SetModal.vue';
import {
  deleteDictData,
  getDictDataDetail,
  getDictDataList,
  type DictDataInfo,
} from '@/api/system/dict';
import { useModal } from '@/components/Modal';
import { Action, useTable } from '@/components/Table';

import { columns, searchSchemas } from './data';

const route = useRoute() as any;
const dictTypeId = computed(() => Number(route.params.id));

const [registerSetModal, { openModal }] = useModal();

const [registerTable, { reload }] = useTable({
  api: getDictDataList, // 请求接口
  columns, // 展示的列
  useSearchForm: true, // 启用搜索表单
  searchInfo: { dictTypeId: dictTypeId.value }, // 额外的请求参数
  formConfig: { schemas: searchSchemas }, // 搜索表单配置
  rowKey: (rowData) => rowData.id, // 表格行 key 的取值
  actionColumn: {
    width: 150,
    key: 'ACTION',
    render: (row: DictDataInfo) =>
      h(Action, {
        actions: [
          {
            type: 'edit',
            onClick: async () => {
              const { data } = await getDictDataDetail(row.id);
              return openModal(true, data);
            },
          },
          {
            type: 'del',
            onClick: async () => {
              await deleteDictData(row.id);
              await reload();
            },
          },
        ],
      }),
  },
});
const handleAdd = () => {
  openModal(true, { dictTypeId: dictTypeId.value });
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
