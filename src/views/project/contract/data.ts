import type { ContractInfo } from '@/api/project/contract';
import { getFactoryList } from '@/api/project/factory';
import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '项目名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' },
  },
  {
    path: 'factoryId',
    label: '所属工厂',
    component: 'ApiTreeSelect',
    span: 8,
    componentProps: {
      immediate: true, // 是否立即请求
      api: getFactoryList,
      labelField: 'name',
      keyField: 'id',
      cascade: true,
    },
  },
];

export const columns: BasicColumn<ContractInfo & { pendingStatus: boolean }>[] = [
  { title: '项目名称', key: 'name', width: 150 },
  { title: '所属工厂', key: 'factory.name', width: 250 },
  { title: '客户名称', key: 'customer', width: 100 },
  { title: '客户联系方式', key: 'customerPhone', width: 150 },
  { title: '采购阀门总数', key: 'valveCount', width: 150 },
  { title: '高级阀门数量', key: 'highValveCount', width: 150 },
  { title: '签订合同时间', key: 'contractTime', width: 200 },
  { title: '销售人员', key: 'saler', width: 100 },
];

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'name', label: '项目名称', required: true, component: 'NInput' },
  { path: 'customer', label: '客户名称', required: true, component: 'NInput' },
  { path: 'customerPhone', label: '客户联系方式', required: true, component: 'NInput' },
  { path: 'saler', label: '销售人员', required: true, component: 'NInput' },
  { path: 'valveCount', label: '采购阀门总数', required: true, component: 'NInputNumber' },
  { path: 'highValveCount', label: '高级阀门数量', required: true, component: 'NInputNumber' },
  { path: 'contractTime', label: '签订合同时间', required: true, component: 'NDatePicker' },
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
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];
