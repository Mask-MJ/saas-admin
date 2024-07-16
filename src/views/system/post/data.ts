import type { FormSchema } from '@/components/Form'

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '岗位名称', component: 'NInput', span: 6 },
  { path: 'code', label: '岗位编码', component: 'NInput', span: 6 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 12,
    componentProps: { type: 'datetimerange' }
  }
]

export const columns = [
  { title: '岗位名称', key: 'name', width: 150 },
  { title: '岗位编码', key: 'code', width: 150 },
  { title: '创建者', key: 'createBy', width: 150 },
  { title: '更新者', key: 'updateBy', width: 150 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 }
]

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'name', label: '岗位名称', required: true, component: 'NInput' },
  { path: 'sort', label: '岗位排序', required: true, component: 'NInputNumber' },
  { path: 'code', label: '岗位编码', required: true, component: 'NInput' },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' }
  }
]
