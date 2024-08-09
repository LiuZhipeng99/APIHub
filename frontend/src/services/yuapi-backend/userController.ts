// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/add */
export async function addUser(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/be */
export async function throwBusinessException(options?: { [key: string]: any }) {
  return request<any>('/user/be', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/delete */
export async function deleteUser(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/get */
export async function getUserById(body: API.IdRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/user/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/get/login */
export async function getLoginUser(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/hello */
export async function hello(options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/user/hello', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/list */
export async function listUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>('/user/list', {
    method: 'GET',
    params: {
      ...params,
      userQueryRequest: undefined,
      ...params['userQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/list/page */
export async function listUserByPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByPageParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/user/list/page', {
    method: 'POST',
    params: {
      ...params,
      userQueryRequest: undefined,
      ...params['userQueryRequest'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseUser>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/logout */
export async function userLogout(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user/re */
export async function throwRuntimeException(options?: { [key: string]: any }) {
  return request<any>('/user/re', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/update */
export async function updateUser(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean>('/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
