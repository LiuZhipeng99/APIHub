// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /interfaceInfo/add */
export async function addInterfaceInfo(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/interfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interfaceInfo/delete */
export async function deleteInterfaceInfo(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interfaceInfo/get */
export async function getInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfo>('/interfaceInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interfaceInfo/invoke */
export async function invokeInterfaceInfo(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/interfaceInfo/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interfaceInfo/list */
export async function listInterfaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfo>('/interfaceInfo/list', {
    method: 'GET',
    params: {
      ...params,
      interfaceInfoQueryRequest: undefined,
      ...params['interfaceInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /interfaceInfo/list/page */
export async function listInterfaceInfoByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfo>('/interfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
      interfaceInfoQueryRequest: undefined,
      ...params['interfaceInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interfaceInfo/offline */
export async function offlineInterfaceInfo(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interfaceInfo/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interfaceInfo/online */
export async function onlineInterfaceInfo(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/interfaceInfo/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /interfaceInfo/update */
export async function updateInterfaceInfo(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/interfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
