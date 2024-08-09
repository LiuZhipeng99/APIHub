// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /userInterfaceInfo/add */
export async function addUserInterfaceInfo(
  body: API.UserInterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/userInterfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /userInterfaceInfo/delete */
export async function deleteUserInterfaceInfo(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/userInterfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterfaceInfo/get */
export async function getUserInterfaceInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserInterfaceInfoByIdParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserInterfaceInfo>('/userInterfaceInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterfaceInfo/list */
export async function listUserInterfaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserInterfaceInfo>('/userInterfaceInfo/list', {
    method: 'GET',
    params: {
      ...params,
      userInterfaceInfoQueryRequest: undefined,
      ...params['userInterfaceInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /userInterfaceInfo/list/page */
export async function listUserInterfaceInfoByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserInterfaceInfoByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceInfo>('/userInterfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
      userInterfaceInfoQueryRequest: undefined,
      ...params['userInterfaceInfoQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /userInterfaceInfo/update */
export async function updateUserInterfaceInfo(
  body: API.UserInterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/userInterfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
