import type { components, operations } from '#/openapi';
import { client } from '@/utils';

export type DictDataInfo = components['schemas']['DictDataEntity'];
export type DictTypeInfo = components['schemas']['DictTypeEntity'];
export type SearchParams = operations['DictTypeController_findAll']['parameters']['query'];

// 获取字典列表
export const getDictTypeList = (query?: SearchParams) =>
  client.GET('/api/system/dict-type', { params: { query } });
// 创建字典
export const createDictType = (body: components['schemas']['CreateDictTypeDto']) =>
  client.POST('/api/system/dict-type', { body });
// 获取单个字典信息
export const getDictTypeDetail = (id: number) =>
  client.GET('/api/system/dict-type/{id}', { params: { path: { id } } });
// 更新字典
export const updateDictType = (body: components['schemas']['UpdateDictTypeDto']) =>
  client.PATCH('/api/system/dict-type/{id}', { body, params: { path: { id: body.id } } });
// 删除字典
export const deleteDictType = (id: number) =>
  client.DELETE('/api/system/dict-type/{id}', { params: { path: { id } } });

// 获取字典数据列表
export const getDictDataList = (query: SearchParams) =>
  client.GET('/api/system/dict-data', { params: { query } });
// 创建字典数据
export const createDictData = (body: components['schemas']['CreateDictDataDto']) =>
  client.POST('/api/system/dict-data', { body });
// 获取单个字典数据信息
export const getDictDataDetail = (id: number) =>
  client.GET('/api/system/dict-data/{id}', { params: { path: { id } } });
// 更新字典数据
export const updateDictData = (body: components['schemas']['UpdateDictDataDto']) =>
  client.PATCH('/api/system/dict-data/{id}', { body, params: { path: { id: body.id } } });
// 删除字典数据
export const deleteDictData = (id: number) =>
  client.DELETE('/api/system/dict-data/{id}', { params: { path: { id } } });
