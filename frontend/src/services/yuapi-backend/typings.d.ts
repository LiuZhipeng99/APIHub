declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
    description?: string;
  };

  type BaseResponseInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponseListInterfaceInfo = {
    code?: number;
    data?: InterfaceInfo[];
    message?: string;
    description?: string;
  };

  type BaseResponseListInterfaceInfoVO = {
    code?: number;
    data?: InterfaceInfoVO[];
    message?: string;
    description?: string;
  };

  type BaseResponseListUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo[];
    message?: string;
    description?: string;
  };

  type BaseResponseListUserVO = {
    code?: number;
    data?: UserVO[];
    message?: string;
    description?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
    description?: string;
  };

  type BaseResponseObject = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
    description?: string;
  };

  type BaseResponsePageInterfaceInfo = {
    code?: number;
    data?: PageInterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponsePageUserInterfaceInfo = {
    code?: number;
    data?: PageUserInterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
    description?: string;
  };

  type BaseResponseString = {
    code?: number;
    data?: string;
    message?: string;
    description?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
    description?: string;
  };

  type BaseResponseUserInterfaceInfo = {
    code?: number;
    data?: UserInterfaceInfo;
    message?: string;
    description?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
    description?: string;
  };

  type getInterfaceInfoByIdParams = {
    id: number;
  };

  type getUserInterfaceInfoByIdParams = {
    id: number;
  };

  type IdRequest = {
    id?: number;
  };

  type InterfaceInfo = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type InterfaceInfoAddRequest = {
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    method?: string;
  };

  type InterfaceInfoInvokeRequest = {
    id?: number;
    userRequestParams?: string;
    userRequestBody?: string;
    userRequestHeader?: string;
  };

  type InterfaceInfoQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
    userId?: number;
  };

  type InterfaceInfoUpdateRequest = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: string;
  };

  type InterfaceInfoVO = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    requestParams?: string;
    requestHeader?: string;
    responseHeader?: string;
    status?: number;
    method?: number;
    userId?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
    totalNum?: number;
  };

  type listInterfaceInfoByPageParams = {
    interfaceInfoQueryRequest: InterfaceInfoQueryRequest;
  };

  type listInterfaceInfoParams = {
    interfaceInfoQueryRequest: InterfaceInfoQueryRequest;
  };

  type listUserByPageParams = {
    userQueryRequest: UserQueryRequest;
  };

  type listUserInterfaceInfoByPageParams = {
    userInterfaceInfoQueryRequest: UserInterfaceInfoQueryRequest;
  };

  type listUserInterfaceInfoParams = {
    userInterfaceInfoQueryRequest: UserInterfaceInfoQueryRequest;
  };

  type listUserParams = {
    userQueryRequest: UserQueryRequest;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageInterfaceInfo = {
    records?: InterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserInterfaceInfo = {
    records?: UserInterfaceInfo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type User = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    userPassword?: string;
    accessKey?: string;
    secretKey?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    userPassword?: string;
  };

  type UserInterfaceInfo = {
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserInterfaceInfoAddRequest = {
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
  };

  type UserInterfaceInfoQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userId?: number;
    interfaceInfoId?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
  };

  type UserInterfaceInfoUpdateRequest = {
    id?: number;
    totalNum?: number;
    leftNum?: number;
    status?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    userPassword?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAccount?: string;
    userAvatar?: string;
    gender?: number;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };
}
