import type { FormSchema } from '@/components/Form'

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '字典名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' }
  },
  { path: 'value', label: '关键字', component: 'NInput', span: 8 }
]

export const columns = [
  { title: '字典名称', key: 'name', width: 150 },
  { title: '关键字', key: 'value', width: 200 },
  { title: '创建者', key: 'createBy', width: 150 },
  { title: '更新者', key: 'updateBy', width: 150 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 }
]

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'name', label: '字典名称', required: true, component: 'NInput' },
  { path: 'value', label: '关键字', required: true, component: 'NInput' },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' }
  }
]
