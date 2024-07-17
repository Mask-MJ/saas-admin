import type { FormSchema } from '@/components/Form';

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '模版名称', component: 'NInput', span: 8 },
];

export const columns = [
  { title: '模版名称', key: 'name', width: 150 },
  { title: '关键字', key: 'value', width: 200 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 },
];

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'dictTypeId', component: 'NInputNumber', show: false },
  { path: 'name', label: '模版名称', required: true, component: 'NInput' },
  { path: 'value', label: '关键字', required: true, component: 'NInput' },
  { path: 'sort', label: '排序', component: 'NInputNumber' },
  // {
  //   path: 'status',
  //   label: '状态',
  //   component: 'NRadioGroup',
  //   defaultValue: 1,
  //   componentProps: {
  //     options: [
  //       { label: '正常', value: 1 },
  //       { label: '停用', value: 0 }
  //     ]
  //   }
  // },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];
