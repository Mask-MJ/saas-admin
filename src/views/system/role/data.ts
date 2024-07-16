import type { UserInfo } from '@/api/system/user'
import type { FormSchema } from '@/components/Form'
import type { BasicColumn } from '@/components/Table'

import { getMenuList } from '@/api/system/menu'
import { getFactoryList } from '@/api/project/factory'

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '角色名称', component: 'NInput', span: 8 },
  { path: 'value', label: '权限字符', component: 'NInput', span: 8 }
]

export const columns: BasicColumn<UserInfo & { pendingStatus: boolean }>[] = [
  { title: '角色名称', key: 'name', width: 150 },
  { title: '权限字符', key: 'value', width: 150 },
  { title: '排序', key: 'sort', width: 80 },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 }
]

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  { path: 'name', label: '角色名称', required: true, component: 'NInput' },
  { path: 'sort', label: '排序', required: true, component: 'NInputNumber' },
  { path: 'value', label: '权限字符', required: true, component: 'NInput' },
  {
    path: 'menuIds',
    label: '菜单权限',
    component: 'ApiTreeSelect',
    componentProps: {
      immediate: true,
      api: getMenuList,
      multiple: true,
      labelField: 'name',
      keyField: 'id',
      checkable: true,
      cascade: true
    }
  },
  {
    path: 'factoryIds',
    label: '工厂权限',
    component: 'ApiTreeSelect',
    componentProps: {
      immediate: true,
      api: getFactoryList,
      multiple: true,
      labelField: 'name',
      keyField: 'id',
      checkable: true,
      cascade: true
    }
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' }
  }
]
