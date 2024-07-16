import { getDeptList } from '@/api/system/dept'
import type { FormSchema } from '@/components/Form'

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '部门名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' }
  }
]

export const columns = [
  { title: '部门名称', key: 'name', width: 150 },
  { title: '负责人', key: 'leader', width: 200 },
  { title: '联系方式', key: 'phone', width: 200 },
  { title: '邮箱', key: 'email', width: 200 },
  { title: '排序', key: 'sort', width: 200 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 }
]

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  {
    path: 'parentId',
    label: '上级部门',
    component: 'ApiTreeSelect',
    componentProps: {
      immediate: true,
      api: getDeptList,
      labelField: 'name',
      keyField: 'id',
      cascade: true
    }
  },
  { path: 'name', label: '部门名称', required: true, component: 'NInput' },
  { path: 'leader', label: '负责人', required: true, component: 'NInput' },
  { path: 'phone', label: '联系方式', required: true, component: 'NInput' },
  { path: 'email', label: '邮箱', required: true, component: 'NInput' },
  { path: 'sort', label: '排序', required: true, component: 'NInput' },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' }
  }
]
