import type { FormSchema } from '@/components/Form';
import { getMenuList, updateMenu, type MenuInfo } from '@/api/system/menu';
import { NPopconfirm, NSwitch } from 'naive-ui';
import type { BasicColumn } from '@/components/Table';

export const searchSchemas: FormSchema[] = [
  { path: 'name', label: '菜单名称', component: 'NInput', span: 8 },
  {
    path: '[beginTime, endTime]',
    component: 'NDatePicker',
    label: '创建时间',
    span: 16,
    componentProps: { type: 'datetimerange' },
  },
];

export const columns: BasicColumn<MenuInfo & { pendingStatus: boolean }>[] = [
  { title: '菜单名称', key: 'name', width: 150 },
  { title: '菜单路径', key: 'path', width: 200 },
  {
    title: '菜单图标',
    key: 'icon',
    width: 100,
    render: (rowData) => h('i', { class: rowData.icon }),
  },
  {
    title: '是否隐藏',
    key: 'hidden',
    width: 150,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            updateMenu({
              id: rowData.id,
              hidden: !rowData.hidden,
              status: rowData.status,
              sort: rowData.sort,
            })
              .then(async () => {
                rowData.hidden = !rowData.hidden;
                window.$message.success(`已成功修改菜单状态`);
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              })
              .catch(() => {
                window.$message.error('修改菜单状态失败');
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
          default: () => (rowData.hidden ? '是否展示菜单' : '是否隐藏菜单'),
          trigger: () =>
            h(
              NSwitch,
              {
                loading: rowData.pendingStatus,
                value: rowData.hidden,
                onUpdateValue() {
                  rowData.pendingStatus = true;
                },
              },
              { checked: () => '隐藏', unchecked: () => '展示' },
            ),
        },
      ),
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    render: (rowData) =>
      h(
        NPopconfirm,
        {
          onPositiveClick() {
            if (!Reflect.has(rowData, 'pendingStatus')) {
              rowData.pendingStatus = false;
            }
            updateMenu({
              id: rowData.id,
              status: !rowData.status,
              hidden: rowData.hidden,
              sort: rowData.sort,
            })
              .then(() => {
                rowData.status = !rowData.status;
                window.$message.success(`已成功修改菜单状态`);
              })
              .catch(() => {
                window.$message.error('修改菜单状态失败');
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
          default: () => (rowData.status ? '是否停用菜单' : '是否启用菜单'),
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
  { title: '排序', key: 'sort', width: 100 },
];

export const setSchemas: FormSchema[] = [
  { path: 'id', component: 'NInputNumber', show: false },
  {
    path: 'parentId',
    label: '上级菜单',
    component: 'ApiTreeSelect',
    componentProps: {
      immediate: true,
      api: getMenuList,
      labelField: 'name',
      keyField: 'id',
      cascade: true,
    },
  },
  { path: 'name', label: '菜单名称', required: true, component: 'NInput' },
  { path: 'path', label: '菜单路径', required: true, component: 'NInput' },
  { path: 'icon', label: '菜单图标', required: true, component: 'NInput' },
  {
    path: 'hidden',
    label: '是否隐藏',
    component: 'NRadioGroup',
    componentProps: {
      options: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
  {
    path: 'status',
    label: '状态',
    component: 'NRadioGroup',
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '禁用', value: false },
      ],
    },
  },
  { path: 'sort', label: '排序', required: true, component: 'NInputNumber' },
  {
    path: 'remark',
    label: '备注',
    component: 'NInput',
    componentProps: { type: 'textarea', placeholder: '请输入内容' },
  },
];
