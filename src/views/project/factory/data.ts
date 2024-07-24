import { getFactoryList, type FactoryInfo } from '@/api/project/factory';
import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '工厂名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' },
  },
];

export const columns: BasicColumn<FactoryInfo & { pendingStatus: boolean }>[] = [
  { title: '工厂名称', key: 'name', width: 300 },
  { title: '工厂地址', key: 'address' },
  { title: '创建人', key: 'createBy', width: 200 },
];

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  {
    path: 'factoryId',
    label: '所属工厂',
    required: true,
    component: 'ApiTreeSelect',
    componentProps: {
      immediate: true,
      api: getFactoryList,
      labelField: 'name',
      keyField: 'id',
      cascade: true,
    },
  },
  { path: 'name', label: '工厂名称', required: true, component: 'NInput' },
  { path: 'address', label: '工厂地址', required: true, component: 'NInput' },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];
