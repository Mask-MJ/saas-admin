import type { FormSchema } from '@/components/Form';
import type { BasicColumn } from '@/components/Table';
import { client } from '@/utils';

import { NPopconfirm, NSwitch } from 'naive-ui';
import { getRoleList } from '@/api/system/role';
import { updateUser, type UserInfo } from '@/api/system/user';

export const searchSchemas: FormSchema[] = [
  { path: 'account', label: '用户账号', component: 'NInput', span: 8 },
  { path: 'nickname', label: '用户昵称', component: 'NInput', span: 8 },
  {
    path: 'status',
    label: '状态',
    component: 'NSelect',
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    span: 8,
  },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' },
  },
];

export const columns: BasicColumn<UserInfo & { pendingStatus: boolean }>[] = [
  { title: '账号', key: 'account', width: 100 },
  { title: '用户昵称', key: 'nickname', width: 100 },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) =>
      rowData.isAdmin
        ? '启用'
        : h(
            NPopconfirm,
            {
              onPositiveClick() {
                if (!Reflect.has(rowData, 'pendingStatus')) {
                  rowData.pendingStatus = false;
                }
                updateUser({ id: rowData.id, status: !rowData.status })
                  .then(() => {
                    rowData.status = !rowData.status;
                    window.$message.success(`已成功修改用户状态`);
                  })
                  .catch(() => {
                    window.$message.error('修改用户状态失败');
                  })
                  .finally(() => {
                    rowData.pendingStatus = false;
                  });
              },
              onNegativeClick() {
                rowData.pendingStatus = false;
              },
            },
            {
              default: () => (rowData.status ? '是否停用用户' : '是否启用用户'),
              trigger: () =>
                h(
                  NSwitch,
                  {
                    loading: rowData.pendingStatus,
                    value: rowData.status,
                    onUpdateValue() {
                      rowData.pendingStatus = true;
                    },
                  },
                  { checked: () => '启用', unchecked: () => '停用' },
                ),
            },
          ),
  },
  {
    title: '角色',
    key: 'role',
    width: 150,
    render: (rowData) => h('div', {}, rowData.role.map((role) => role.name).join('、')),
  },
  { title: '创建时间', key: 'createdAt', width: 200 },
  { title: '更新时间', key: 'updatedAt', width: 200 },
];

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  {
    path: 'account',
    label: '账号',
    required: true,
    component: 'NInput',
    componentProps: ({ formModel }) => {
      return { disabled: Boolean(formModel.id) };
    },
  },
  { path: 'nickname', label: '用户昵称', required: true, component: 'NInput' },
  {
    path: 'password',
    label: '用户密码',
    required: true,
    component: 'NInput',
    componentProps: { type: 'password' },
    ifShow: ({ model }) => !model.id,
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    path: 'roleIds',
    label: '角色',
    component: 'ApiSelect',
    componentProps: {
      immediate: true,
      api: getRoleList,
      multiple: true,
      resultField: 'rows',
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];

export const resetSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  {
    path: 'password',
    label: '新密码',
    component: 'NInput',
    componentProps: { type: 'password', showPasswordOn: 'click' },
    rule: [
      {
        required: true,
        trigger: 'change',
        validator: (_rule, value) =>
          new RegExp(/^.{4,20}$/).test(value)
            ? Promise.resolve()
            : Promise.reject('用户密码长度必须介于 4 和 20 之间'),
      },
    ],
  },
];
