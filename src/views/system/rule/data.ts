import { uploadRuleFile } from '@/api/system/rule'
import type { FormSchema } from '@/components/Form'

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '规则名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' }
  }
]

export const columns = [
  { title: '规则名称', key: 'name', width: 150 },
  { title: '文件名', key: 'fileName', width: 200 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 }
]

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'name', label: '规则名称', required: true, component: 'NInput' },
  {
    path: 'file',
    component: 'Upload',
    label: '规则文件',
    required: true,
    componentProps: {
      api: uploadRuleFile,
      listType: 'text',
      max: 1
    }
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' }
  }
]
